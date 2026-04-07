"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, extend, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import { Text, useFBO } from "@react-three/drei";
import { easing } from "maath";
import { useCanHover } from "./use-can-hover";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  hovering: boolean;
  pressing: boolean;
};

class CircularBackdropMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: {
        uMap: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec2 vUv;
        void main() {
          vec2 centered = vUv - 0.5;
          float dist = length(centered);
          float alpha = 1.0 - smoothstep(0.46, 0.5, dist);
          vec2 sampleUv = 0.5 + centered * 1.06;
          vec4 tex = texture2D(uMap, sampleUv);
          gl_FragColor = vec4(tex.rgb, tex.a * alpha);
        }
      `,
    });
  }
}

class BubbleGlassMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: {
        uMap: { value: null },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDir);

          vec2 centered = vUv * 2.0 - 1.0;
          vec2 offset = normal.xy * 0.14;
          vec2 sampleUv = vUv + offset;

          vec4 texR = texture2D(uMap, sampleUv + normal.xy * 0.018);
          vec4 texG = texture2D(uMap, sampleUv);
          vec4 texB = texture2D(uMap, sampleUv - normal.xy * 0.018);

          vec3 refracted = vec3(texR.r, texG.g, texB.b);

          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);
          float rim = smoothstep(0.15, 0.98, fresnel);
          float highlight = pow(max(dot(reflect(-viewDir, normal), normalize(vec3(-0.35, 0.4, 1.0))), 0.0), 20.0);
          float lowerGlow = smoothstep(0.75, -0.1, centered.y) * smoothstep(0.2, 1.0, length(centered));

          vec3 cyan = vec3(0.12, 0.85, 1.0);
          vec3 violet = vec3(0.42, 0.18, 1.0);
          vec3 magenta = vec3(1.0, 0.38, 0.88);

          vec3 color = refracted;
          color += mix(cyan, violet, vUv.y) * rim * 0.75;
          color += magenta * lowerGlow * 0.18;
          color += vec3(1.0) * highlight * 0.45;

          float alpha = 0.84 + rim * 0.14;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
  }
}

extend({ CircularBackdropMaterial, BubbleGlassMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    circularBackdropMaterial: ReactThreeFiber.Object3DNode<CircularBackdropMaterial, typeof CircularBackdropMaterial>;
    bubbleGlassMaterial: ReactThreeFiber.Object3DNode<BubbleGlassMaterial, typeof BubbleGlassMaterial>;
  }
}

function HiddenFluidScene() {
  const bandMaterial = useRef<THREE.ShaderMaterial | null>(null);
  const leftBlobMaterial = useRef<THREE.ShaderMaterial | null>(null);
  const rightBlobMaterial = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (bandMaterial.current) bandMaterial.current.uniforms.uTime.value = time;
    if (leftBlobMaterial.current) leftBlobMaterial.current.uniforms.uTime.value = time;
    if (rightBlobMaterial.current) rightBlobMaterial.current.uniforms.uTime.value = time;
  });

  return (
    <>
      <color attach="background" args={["#07010f"]} />

      <mesh position={[0, 0, -4]} scale={[8.8, 8.8, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#07010f" />
      </mesh>

      <mesh position={[-2.7, 0.55, -2.4]} scale={[2.4, 6.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#5f22ff" />
      </mesh>

      <mesh position={[2.75, 1.15, -2.2]} scale={[5.6, 4.85, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#6425ff" />
      </mesh>

      <mesh position={[2.6, 0.35, -1.8]} scale={[3.2, 2.75, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#08020f" />
      </mesh>

      <mesh position={[-2.2, -0.95, -0.4]} scale={[1.55, 1.8, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={leftBlobMaterial}
          transparent
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              uv.x *= 0.82;
              float glow = smoothstep(0.96, 0.22, length(uv));
              float sparkle = 0.75 + 0.25 * sin(uTime * 2.0);
              vec3 color = mix(vec3(0.55, 0.05, 0.95), vec3(1.0, 0.38, 0.84), vUv.y);
              gl_FragColor = vec4(color * sparkle, glow * 0.96);
            }
          `}
        />
      </mesh>

      <mesh position={[3.45, -0.72, -0.35]} scale={[1.95, 1.95, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={rightBlobMaterial}
          transparent
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              float pulse = 0.88 + 0.12 * sin(uTime * 1.7);
              float glow = smoothstep(0.98, 0.15, length(uv));
              vec3 color = mix(vec3(0.36, 0.12, 1.0), vec3(0.95, 0.2, 0.92), vUv.x);
              gl_FragColor = vec4(color * pulse, glow * 0.94);
            }
          `}
        />
      </mesh>

      <mesh position={[0.2, 0.18, -1.0]} scale={[7.2, 1.25, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={bandMaterial}
          transparent
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              float wave = sin(uv.x * 4.8 + uTime * 1.5) * 0.12;
              float band = smoothstep(0.22, 0.0, abs(uv.y + wave));
              float fade = smoothstep(1.15, 0.1, length(vec2(uv.x * 0.4, uv.y)));
              vec3 color = mix(vec3(0.12, 0.78, 1.0), vec3(1.0, 0.42, 0.88), vUv.x * 0.5 + 0.5);
              gl_FragColor = vec4(color, band * fade * 0.55);
            }
          `}
        />
      </mesh>

      <Text
        position={[0.1, -1.35, 0.7]}
        fontSize={1.98}
        color="white"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.08}
        depthWrite={false}
        outlineWidth={0}
      >
        React Bits
      </Text>
    </>
  );
}

const FluidLens = memo(function FluidLens({ cursor }: { cursor: CursorState }) {
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const shellMaterialRef = useRef<BubbleGlassMaterial | null>(null);
  const backdropMaterialRef = useRef<CircularBackdropMaterial | null>(null);
  const causticRef = useRef<THREE.Mesh | null>(null);
  const { viewport: vp } = useThree();
  const buffer = useFBO(1024, 1024);
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    if (!sphereRef.current) return;

    const { gl, camera } = state;
    const targetScale = cursor.pressing ? 0.048 : cursor.hovering ? 0.053 : 0.05;
    const causticScale = cursor.hovering ? 1.08 : 1;

    easing.damp3(sphereRef.current.position, [0, 0, 15], 0.18, delta);
    easing.damp3(sphereRef.current.scale, [targetScale, targetScale, targetScale], 0.16, delta);

    if (causticRef.current) {
      easing.damp3(causticRef.current.scale, [0.32 * causticScale, 0.11 * causticScale, 1], 0.18, delta);
    }

    if (shellMaterialRef.current) {
      shellMaterialRef.current.uniforms.uMap.value = buffer.texture;
      shellMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (backdropMaterialRef.current) {
      backdropMaterialRef.current.uniforms.uMap.value = buffer.texture;
    }

    gl.setRenderTarget(buffer);
    gl.clearColor();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(<HiddenFluidScene />, scene)}

      <mesh scale={[vp.width, vp.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <circularBackdropMaterial ref={backdropMaterialRef} transparent />
      </mesh>

      <mesh ref={causticRef} position={[0, -0.24, 14.5]} scale={[0.32, 0.11, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{}}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              float alpha = smoothstep(1.0, 0.08, length(vec2(uv.x, uv.y * 1.9)));
              vec3 color = mix(vec3(0.05, 0.75, 1.0), vec3(0.55, 0.12, 1.0), vUv.x);
              gl_FragColor = vec4(color, alpha * 0.28);
            }
          `}
        />
      </mesh>

      <mesh ref={sphereRef} scale={[0.05, 0.05, 0.05]} position={[0, 0, 15]}>
        <sphereGeometry args={[5.5, 128, 128]} />
        <bubbleGlassMaterial ref={shellMaterialRef} transparent />
      </mesh>
    </>
  );
});

function FluidGlassCursorScene({ cursor }: { cursor: CursorState }) {
  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: cursor.x,
        top: cursor.y,
        width: 230,
        height: 230,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Canvas
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 0, 20], fov: 15 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        <FluidLens cursor={cursor} />
      </Canvas>
    </div>
  );
}

export const CustomCursor = () => {
  const canHover = useCanHover();
  const [cursor, setCursor] = useState<CursorState>({
    x: -300,
    y: -300,
    visible: false,
    hovering: false,
    pressing: false,
  });

  useEffect(() => {
    if (!canHover) {
      setCursor((prev) => ({ ...prev, visible: false, hovering: false, pressing: false }));
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
      return;
    }

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const handleMouseMove = (event: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        visible: true,
      }));
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor='interactive']"
      );
      setCursor((prev) => ({ ...prev, hovering: Boolean(interactive) }));
    };

    const handleMouseDown = () => setCursor((prev) => ({ ...prev, pressing: true }));
    const handleMouseUp = () => setCursor((prev) => ({ ...prev, pressing: false }));
    const handleMouseLeave = () => setCursor((prev) => ({ ...prev, visible: false }));
    const handleMouseEnter = () => setCursor((prev) => ({ ...prev, visible: true }));

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
    };
  }, [canHover]);

  if (!canHover || !cursor.visible) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <FluidGlassCursorScene cursor={cursor} />
    </>
  );
};
