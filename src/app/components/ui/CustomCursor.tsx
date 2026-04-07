"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text, useFBO } from "@react-three/drei";
import { easing } from "maath";
import { useCanHover } from "./use-can-hover";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  hovering: boolean;
  pressing: boolean;
};

function BackdropCluster({
  position,
  scale,
  color,
  opacity = 1,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  opacity?: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function HiddenFluidScene() {
  const glowMaterial = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    if (!glowMaterial.current) return;
    glowMaterial.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <color attach="background" args={["#05010d"]} />

      <mesh position={[0, 0, -4]} scale={[22, 12, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#05010d" />
      </mesh>

      <BackdropCluster position={[-7.2, 0.8, -1.6]} scale={[4.8, 10.5, 1]} color="#6726ff" opacity={0.95} />
      <BackdropCluster position={[7.5, 1.1, -1.8]} scale={[7.4, 9.2, 1]} color="#6327ff" opacity={0.95} />
      <BackdropCluster position={[8.7, -1.7, -1.2]} scale={[4.1, 4.5, 1]} color="#05010d" opacity={1} />

      <mesh position={[-3.9, -0.95, -0.7]} scale={[2.2, 2.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={glowMaterial}
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
              float r = length(uv * vec2(0.8, 1.2));
              float pulse = 0.5 + 0.5 * sin(uTime * 1.4);
              float core = smoothstep(0.82, 0.12, r);
              float rim = smoothstep(0.68, 0.58, abs(r - 0.52));
              vec3 color = vec3(0.62, 0.12, 0.95) * core;
              color += vec3(1.0, 0.42, 0.9) * rim * (0.45 + pulse * 0.25);
              gl_FragColor = vec4(color, core * 0.9);
            }
          `}
        />
      </mesh>

      <mesh position={[6.1, -0.95, -0.6]} scale={[2.5, 2.5, 1]}>
        <planeGeometry args={[1.6, 1.6]} />
        <shaderMaterial
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
            void main() {
              vec2 uv = vUv * 2.0 - 1.0;
              float r = length(uv);
              float alpha = smoothstep(0.88, 0.24, r);
              vec3 color = mix(vec3(0.38, 0.12, 1.0), vec3(0.94, 0.26, 0.96), vUv.y * 0.5 + 0.5);
              gl_FragColor = vec4(color, alpha * 0.85);
            }
          `}
        />
      </mesh>

      <Text
        position={[0.1, -1.5, 0.2]}
        fontSize={2.9}
        color="white"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.08}
        outlineWidth={0}
        depthWrite={false}
      >
        React Bits
      </Text>

      <mesh position={[-0.3, 1.2, -0.4]} scale={[9, 1.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#3f1d92" transparent opacity={0.06} />
      </mesh>
    </>
  );
}

const FluidLens = memo(function FluidLens({ cursor }: { cursor: CursorState }) {
  const lensRef = useRef<THREE.Mesh | null>(null);
  const buffer = useFBO(1024, 1024);
  const { viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    if (!lensRef.current) return;

    const { gl, camera } = state;
    const view = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const targetX = ((cursor.x / window.innerWidth) * 2 - 1) * (view.width / 2);
    const targetY = (-(cursor.y / window.innerHeight) * 2 + 1) * (view.height / 2);
    const targetScale = cursor.pressing ? 0.047 : cursor.hovering ? 0.054 : 0.05;

    easing.damp3(lensRef.current.position, [targetX, targetY, 15], 0.16, delta);
    easing.damp3(lensRef.current.scale, [targetScale, targetScale, targetScale], 0.18, delta);
    lensRef.current.rotation.set(
      Math.PI / 2 + (cursor.hovering ? 0.06 : 0),
      0,
      THREE.MathUtils.lerp(lensRef.current.rotation.z, cursor.hovering ? 0.22 : 0, 0.1),
    );

    gl.setClearColor(0x000000, 0);
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <>
      {createPortal(<HiddenFluidScene />, scene)}
      <mesh ref={lensRef} scale={[0.05, 0.05, 0.05]} position={[0, 0, 15]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0}
          thickness={2}
          ior={1.15}
          chromaticAberration={0.05}
          anisotropy={0.01}
          backside
          backsideThickness={2}
          samples={8}
          resolution={512}
        />
      </mesh>
    </>
  );
});

function FluidGlassCursorScene({ cursor }: { cursor: CursorState }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
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
