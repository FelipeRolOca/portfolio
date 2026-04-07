import { useEffect, useRef } from "react";
import * as THREE from "three";

type LiquidEtherProps = {
  colors?: [string, string, string] | string[];
  className?: string;
  style?: React.CSSProperties;
  mouseForce?: number;
  autoSpeed?: number;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseForce;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  float blob(vec2 uv, vec2 center, float radius, float softness) {
    float distanceToCenter = length(uv - center);
    return smoothstep(radius, radius - softness, distanceToCenter);
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 centered = (uv - 0.5) * aspect;

    vec2 mouse = (uMouse - 0.5) * aspect;
    float mouseDistance = length(centered - mouse);
    float mouseRipple = exp(-mouseDistance * 5.5) * uMouseForce * 0.05;

    vec2 flow = centered;
    flow += vec2(
      fbm(centered * 2.2 + vec2(0.0, uTime * 0.18)),
      fbm(centered * 2.2 + vec2(4.0, -uTime * 0.15))
    ) * 0.22;
    flow += normalize(centered - mouse + 0.0001) * mouseRipple;

    vec2 centerA = vec2(-0.36 + sin(uTime * 0.22) * 0.08, 0.12 + cos(uTime * 0.18) * 0.08);
    vec2 centerB = vec2(0.18 + cos(uTime * 0.16) * 0.10, -0.14 + sin(uTime * 0.21) * 0.09);
    vec2 centerC = vec2(0.02 + sin(uTime * 0.12) * 0.18, 0.28 + cos(uTime * 0.14) * 0.08);

    float fieldA = blob(flow, centerA, 0.54, 0.33);
    float fieldB = blob(flow, centerB, 0.48, 0.30);
    float fieldC = blob(flow, centerC, 0.44, 0.28);

    float swirl = fbm(flow * 3.4 + uTime * 0.12);
    fieldA += swirl * 0.18;
    fieldB += swirl * 0.14;
    fieldC += swirl * 0.12;

    vec3 color = vec3(0.0);
    color += uColorA * fieldA;
    color += uColorB * fieldB;
    color += uColorC * fieldC;

    float glow = max(fieldA, max(fieldB, fieldC));
    glow += smoothstep(0.15, 0.95, swirl) * 0.18;

    color = mix(color, vec3(0.02, 0.05, 0.10), 0.32);
    color *= 0.92 + glow * 0.38;

    float alpha = clamp(glow * 0.88, 0.0, 0.92);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function LiquidEther({
  colors = ["#1d4ed8", "#06b6d4", "#14b8a6"],
  className = "",
  style,
  mouseForce = 18,
  autoSpeed = 0.3,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const palette = [...colors];
    while (palette.length < 3) palette.push(palette[palette.length - 1] ?? "#ffffff");

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseForce: { value: mouseForce },
      uColorA: { value: new THREE.Color(palette[0]) },
      uColorB: { value: new THREE.Color(palette[1]) },
      uColorC: { value: new THREE.Color(palette[2]) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let frameId = 0;
    let lastInteraction = performance.now();
    const pointer = new THREE.Vector2(0.5, 0.5);
    const pointerTarget = new THREE.Vector2(0.5, 0.5);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      uniforms.uResolution.value.set(Math.max(1, width), Math.max(1, height));
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerTarget.set((clientX - rect.left) / rect.width, 1 - (clientY - rect.top) / rect.height);
      lastInteraction = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePointer(touch.clientX, touch.clientY);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      uniforms.uTime.value += 0.01;

      const idleFor = performance.now() - lastInteraction;
      if (idleFor > 1800) {
        pointerTarget.x = 0.5 + Math.sin(uniforms.uTime.value * autoSpeed) * 0.24;
        pointerTarget.y = 0.5 + Math.cos(uniforms.uTime.value * autoSpeed * 1.2) * 0.18;
      }

      pointer.lerp(pointerTarget, 0.06);
      uniforms.uMouse.value.copy(pointer);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      scene.remove(mesh);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [autoSpeed, colors, mouseForce]);

  return <div ref={mountRef} className={`h-full w-full ${className}`.trim()} style={style} />;
}
