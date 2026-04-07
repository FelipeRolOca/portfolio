"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO } from "@react-three/drei";
import { easing } from "maath";
import { useCanHover } from "./use-can-hover";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  hovering: boolean;
  pressing: boolean;
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  float blob(vec2 uv, vec2 pos, float size) {
    float dist = length(uv - pos);
    return smoothstep(size, size - 0.28, dist);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / max(uResolution.y, 1.0);

    float t = uTime * 0.35;
    vec2 p1 = vec2(sin(t * 0.9) * 0.42, cos(t * 0.65) * 0.18);
    vec2 p2 = vec2(cos(t * 0.55 + 1.4) * 0.52, sin(t * 0.72 + 2.2) * 0.22);
    vec2 p3 = vec2(sin(t * 0.45 + 2.1) * 0.36, cos(t * 0.86 + 0.75) * 0.48);

    float b1 = blob(uv, p1, 0.68);
    float b2 = blob(uv, p2, 0.58);
    float b3 = blob(uv, p3, 0.44);

    float ribbon = smoothstep(0.22, 0.0, abs(uv.y + sin((uv.x * 2.4) + t * 1.2) * 0.22));
    float glow = smoothstep(1.18, 0.1, length(uv));

    vec3 base = vec3(0.02, 0.01, 0.07);
    vec3 purple = vec3(0.44, 0.13, 0.98);
    vec3 pink = vec3(0.95, 0.36, 0.82);
    vec3 cyan = vec3(0.12, 0.75, 1.0);

    vec3 color = base;
    color += purple * b1 * 0.95;
    color += pink * b2 * 0.6;
    color += cyan * b3 * 0.32;
    color += purple * ribbon * 0.28;
    color *= glow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidBackdrop() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[40, 24, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
          }}
        />
      </mesh>
      <mesh position={[-4.3, 1.8, 0.2]}>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} />
      </mesh>
      <mesh position={[4.8, -1.4, 0.2]}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} />
      </mesh>
    </>
  );
}

const FluidLens = memo(function FluidLens({ cursor }: { cursor: CursorState }) {
  const lensRef = useRef<THREE.Mesh | null>(null);
  const buffer = useFBO();
  const { viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    if (!lensRef.current) return;

    const { gl, camera } = state;
    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const pointerX = ((cursor.x / window.innerWidth) * 2 - 1) * currentViewport.width * 0.5;
    const pointerY = (-(cursor.y / window.innerHeight) * 2 + 1) * currentViewport.height * 0.5;
    const targetScale = cursor.pressing ? 0.046 : cursor.hovering ? 0.056 : 0.05;

    easing.damp3(lensRef.current.position, [pointerX, pointerY, 15], 0.18, delta);
    easing.damp3(lensRef.current.scale, [targetScale, targetScale * 1.08, targetScale], 0.2, delta);
    lensRef.current.rotation.z = THREE.MathUtils.lerp(
      lensRef.current.rotation.z,
      cursor.hovering ? 0.22 : 0,
      0.08
    );

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(<FluidBackdrop />, scene)}
      <mesh ref={lensRef} scale={[0.05, 0.054, 0.05]} position={[0, 0, 15]}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={2}
          transmission={1}
          roughness={0}
          chromaticAberration={0.05}
          anisotropy={0.01}
          backside
          backsideThickness={2}
          samples={6}
          resolution={256}
        />
      </mesh>
    </>
  );
});

function FluidGlassScene({ cursor }: { cursor: CursorState }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <Canvas
        orthographic={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
      >
        <FluidLens cursor={cursor} />
      </Canvas>
    </div>
  );
}

export const CustomCursor = () => {
  const canHover = useCanHover();
  const [cursor, setCursor] = useState<CursorState>({
    x: -200,
    y: -200,
    visible: false,
    hovering: false,
    pressing: false,
  });

  const shouldRender = canHover && cursor.visible;

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

  if (!shouldRender) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <FluidGlassScene cursor={cursor} />
    </>
  );
};
