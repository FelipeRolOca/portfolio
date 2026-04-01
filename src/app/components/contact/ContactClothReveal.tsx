"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { useIsMobile } from "../ui/use-mobile";

type ContactClothRevealProps = {
  onRevealComplete?: () => void;
};

type ClothRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
};

type ClothPoint = {
  position: THREE.Vector3;
  previous: THREE.Vector3;
  original: THREE.Vector3;
  anchorStrength: number;
  windWeight: number;
  u: number;
  v: number;
};

type ClothSimulation = {
  points: ClothPoint[];
  constraints: Array<[number, number, number]>;
  geometry: THREE.PlaneGeometry;
  width: number;
  height: number;
  elapsed: number;
  centerX: number;
  centerY: number;
};

const CLOTH_CONFIG = {
  cols: 42,
  rows: 30,
  iterations: 6,
  gravity: -2100,
  drag: 0.987,
  restDuration: 1.35,
  peelDuration: 1.9,
  flyDuration: 2.9,
};

const TOTAL_DURATION =
  CLOTH_CONFIG.restDuration +
  CLOTH_CONFIG.peelDuration +
  CLOTH_CONFIG.flyDuration;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0 || 1), 0, 1);
  return x * x * (3 - 2 * x);
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function createFabricTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  const base = ctx.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, "#dce7f5");
  base.addColorStop(0.28, "#bfd1e7");
  base.addColorStop(0.58, "#a2bbd8");
  base.addColorStop(1, "#86a7ca");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "rgba(255,255,255,0.11)";
  ctx.lineWidth = 1;
  for (let y = 0; y < size; y += 9) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(108,138,176,0.10)";
  for (let x = 0; x < size; x += 9) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  const foldBands = [
    { x0: 60, y0: 0, x1: 310, y1: size, h: "rgba(255,255,255,0.28)", s: "rgba(81,112,152,0.22)" },
    { x0: 360, y0: -60, x1: 620, y1: size, h: "rgba(255,255,255,0.18)", s: "rgba(73,103,144,0.25)" },
    { x0: 660, y0: 0, x1: 920, y1: size, h: "rgba(255,255,255,0.24)", s: "rgba(67,98,140,0.24)" },
  ];

  foldBands.forEach((band) => {
    const grad = ctx.createLinearGradient(band.x0, band.y0, band.x1, band.y1);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.3, band.h);
    grad.addColorStop(0.48, band.s);
    grad.addColorStop(0.62, band.h);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  });

  for (let i = 0; i < 5400; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = 0.015 + Math.random() * 0.05;
    const light = 185 + Math.floor(Math.random() * 55);
    ctx.fillStyle = `rgba(${light},${light + 6},${light + 18},${alpha})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const sheen = ctx.createRadialGradient(size * 0.22, size * 0.18, 14, size * 0.22, size * 0.18, size * 0.34);
  sheen.addColorStop(0, "rgba(255,255,255,0.48)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.6, 3.2);
  return texture;
}

function createBumpTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = "rgb(128,128,128)";
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 9) {
    ctx.fillStyle = "rgba(156,156,156,0.22)";
    ctx.fillRect(0, y, size, 1);
  }

  for (let x = 0; x < size; x += 9) {
    ctx.fillStyle = "rgba(100,100,100,0.16)";
    ctx.fillRect(x, 0, 1, size);
  }

  const ridges = [
    { x0: 110, y0: 0, x1: 340, y1: size },
    { x0: 430, y0: -80, x1: 650, y1: size },
    { x0: 700, y0: 0, x1: 930, y1: size },
  ];

  ridges.forEach((ridge, index) => {
    const grad = ctx.createLinearGradient(ridge.x0, ridge.y0, ridge.x1, ridge.y1);
    grad.addColorStop(0, "rgba(128,128,128,0)");
    grad.addColorStop(0.36, index % 2 === 0 ? "rgba(220,220,220,0.66)" : "rgba(70,70,70,0.56)");
    grad.addColorStop(0.5, index % 2 === 0 ? "rgba(68,68,68,0.58)" : "rgba(220,220,220,0.62)");
    grad.addColorStop(0.62, index % 2 === 0 ? "rgba(210,210,210,0.50)" : "rgba(80,80,80,0.46)");
    grad.addColorStop(1, "rgba(128,128,128,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.6, 3.2);
  return texture;
}

function createRoughnessTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = "rgb(214,214,214)";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 3600; i += 1) {
    const alpha = 0.03 + Math.random() * 0.08;
    const shade = 155 + Math.floor(Math.random() * 50);
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.6, 3.2);
  return texture;
}

function createShadowTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.08, size / 2, size / 2, size * 0.48);
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.56, "rgba(255,255,255,0.26)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function buildSimulation(rect: ClothRect) {
  const width = rect.width * 1.16;
  const height = rect.height * 1.14;
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    CLOTH_CONFIG.cols - 1,
    CLOTH_CONFIG.rows - 1,
  );

  const centerX = rect.left + rect.width / 2 - rect.viewportWidth / 2;
  const centerY = -(rect.top + rect.height / 2 - rect.viewportHeight / 2);

  const points: ClothPoint[] = [];
  const constraints: Array<[number, number, number]> = [];
  const cols = CLOTH_CONFIG.cols;
  const rows = CLOTH_CONFIG.rows;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const u = col / (cols - 1);
      const v = row / (rows - 1);
      const x = (u - 0.5) * width;
      const y = (0.5 - v) * height - Math.pow(v, 1.5) * 14;
      const foldPrimary = Math.sin(u * Math.PI * 2.2 + v * 1.8) * (8 + v * 14);
      const foldSecondary = Math.cos((u + v) * Math.PI * 1.7) * (4 + v * 10);
      const z = foldPrimary + foldSecondary - Math.pow(v, 1.8) * 18;
      const original = new THREE.Vector3(x, y, z);

      const anchorStrength = smoothstep(0.42, 1, 1 - u) * smoothstep(0.68, 1, 1 - v);
      const windWeight = 0.28 + (1 - v) * 0.9 + (1 - u) * 0.2;

      points.push({
        position: original.clone(),
        previous: original.clone(),
        original,
        anchorStrength,
        windWeight,
        u,
        v,
      });
    }
  }

  const link = (a: number, b: number) => {
    constraints.push([a, b, points[a].original.distanceTo(points[b].original)]);
  };

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = row * cols + col;
      if (col < cols - 1) link(index, index + 1);
      if (row < rows - 1) link(index, index + cols);
      if (col < cols - 1 && row < rows - 1) {
        link(index, index + cols + 1);
        link(index + 1, index + cols);
      }
    }
  }

  const positions = geometry.attributes.position.array as Float32Array;
  points.forEach((point, index) => {
    positions[index * 3] = point.position.x;
    positions[index * 3 + 1] = point.position.y;
    positions[index * 3 + 2] = point.position.z;
  });
  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();

  return {
    points,
    constraints,
    geometry,
    width,
    height,
    elapsed: 0,
    centerX,
    centerY,
  };
}

function ClothScene({
  rect,
  onComplete,
}: {
  rect: ClothRect;
  onComplete: () => void;
}) {
  const simulationRef = useRef<ClothSimulation | null>(null);
  const clothRef = useRef<THREE.Group>(null);
  const clothMeshRef = useRef<THREE.Mesh>(null);
  const clothMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shadowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const diffuseMap = useMemo(() => createFabricTexture(), []);
  const bumpMap = useMemo(() => createBumpTexture(), []);
  const roughnessMap = useMemo(() => createRoughnessTexture(), []);
  const shadowMap = useMemo(() => createShadowTexture(), []);
  const completedRef = useRef(false);

  if (!simulationRef.current) {
    simulationRef.current = buildSimulation(rect);
  }

  useEffect(() => {
    return () => {
      simulationRef.current?.geometry.dispose();
      diffuseMap.dispose();
      bumpMap.dispose();
      roughnessMap.dispose();
      shadowMap.dispose();
    };
  }, [bumpMap, diffuseMap, roughnessMap, shadowMap]);

  useFrame((_, delta) => {
    const simulation = simulationRef.current;
    if (
      !simulation ||
      !clothRef.current ||
      !clothMeshRef.current ||
      !clothMaterialRef.current ||
      !shadowRef.current ||
      !shadowMaterialRef.current
    ) {
      return;
    }

    const step = Math.min(delta, 1 / 35);
    simulation.elapsed += step;

    const elapsed = simulation.elapsed;
    const restEnd = CLOTH_CONFIG.restDuration;
    const peelEnd = restEnd + CLOTH_CONFIG.peelDuration;
    const flyEnd = peelEnd + CLOTH_CONFIG.flyDuration;
    const peel = smoothstep(restEnd * 0.68, peelEnd, elapsed);
    const fly = smoothstep(peelEnd - 0.18, flyEnd, elapsed);
    const fade = smoothstep(flyEnd - 0.4, flyEnd, elapsed);

    const baseX = simulation.centerX + peel * 24 + fly * (rect.viewportWidth * 0.86);
    const baseY = simulation.centerY + peel * 10 + fly * (rect.viewportHeight * 0.72);
    const baseZ = peel * 8 + fly * 46;
    const rotX = peel * -0.06 + fly * -0.32;
    const rotY = peel * 0.18 + fly * 0.52;
    const rotZ = peel * -0.1 + fly * 0.62;

    clothRef.current.position.set(baseX, baseY, baseZ);
    clothRef.current.rotation.set(rotX, rotY, rotZ);
    shadowRef.current.position.set(
      simulation.centerX + peel * 8 + fly * (rect.viewportWidth * 0.42),
      simulation.centerY - 10 + peel * 6 + fly * (rect.viewportHeight * 0.16),
      -40,
    );
    shadowRef.current.scale.set(1 + peel * 0.08 - fly * 0.42, 1 - peel * 0.02 - fly * 0.5, 1);

    const wind = {
      x: 10 + peel * 90 + fly * 420,
      y: 8 + peel * 70 + fly * 240,
      z: 16 + peel * 120 + fly * 380,
    };

    const geometry = simulation.geometry;
    const positionAttr = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < simulation.points.length; i += 1) {
      const point = simulation.points[i];
      const anchored = point.anchorStrength > 0.04;

      if (anchored) {
        const lead = point.anchorStrength;
        const pullX = peel * (35 + lead * 120) + fly * (120 + lead * 660);
        const pullY = peel * (20 + lead * 85) + fly * (120 + lead * 430);
        const pullZ =
          peel * (18 + lead * 54) +
          fly * (48 + lead * 220) +
          Math.sin(elapsed * 4.8 + point.u * 4.2 + point.v * 2.2) * (8 + fly * 12);

        point.position.set(
          point.original.x + pullX,
          point.original.y + pullY,
          point.original.z + pullZ,
        );
        point.previous.copy(point.position);
        continue;
      }

      const velocity = point.position.clone().sub(point.previous).multiplyScalar(CLOTH_CONFIG.drag);
      point.previous.copy(point.position);
      point.position.add(velocity);
      point.position.y += CLOTH_CONFIG.gravity * step * step;

      const flutter =
        Math.sin(elapsed * 3.2 + point.u * 6.4 + point.v * 4.8) * (4 + fly * 10) +
        Math.cos(elapsed * 4.6 + point.v * 7.2) * (2 + fly * 6);

      point.position.x += wind.x * point.windWeight * step;
      point.position.y += wind.y * point.windWeight * step;
      point.position.z += wind.z * point.windWeight * step + flutter * step;
    }

    for (let iteration = 0; iteration < CLOTH_CONFIG.iterations; iteration += 1) {
      for (let i = 0; i < simulation.constraints.length; i += 1) {
        const [aIndex, bIndex, restLength] = simulation.constraints[i];
        const a = simulation.points[aIndex];
        const b = simulation.points[bIndex];
        const deltaVector = b.position.clone().sub(a.position);
        const distance = deltaVector.length() || 1;
        const correction = deltaVector.multiplyScalar((distance - restLength) / distance * 0.5);
        const aPinned = a.anchorStrength > 0.04;
        const bPinned = b.anchorStrength > 0.04;

        if (!aPinned) a.position.add(correction);
        if (!bPinned) b.position.sub(correction);
      }
    }

    for (let i = 0; i < simulation.points.length; i += 1) {
      const point = simulation.points[i];
      positionAttr[i * 3] = point.position.x;
      positionAttr[i * 3 + 1] = point.position.y;
      positionAttr[i * 3 + 2] = point.position.z;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    clothMaterialRef.current.opacity = 1 - fade;
    shadowMaterialRef.current.opacity = 0.34 - fly * 0.17 - fade * 0.16;

    if (elapsed >= TOTAL_DURATION && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  });

  const simulation = simulationRef.current;

  return (
    <>
      <orthographicCamera
        makeDefault
        args={[
          -rect.viewportWidth / 2,
          rect.viewportWidth / 2,
          rect.viewportHeight / 2,
          -rect.viewportHeight / 2,
          0.1,
          4000,
        ]}
        position={[0, 0, 1000]}
      />

      <ambientLight intensity={1.2} />
      <hemisphereLight intensity={1.05} color="#ffffff" groundColor="#5579a7" />
      <directionalLight position={[-480, 620, 760]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[420, -140, 520]} intensity={0.7} color="#7db5f2" />

      <mesh ref={shadowRef} position={[simulation.centerX, simulation.centerY - 10, -40]}>
        <planeGeometry args={[simulation.width * 1.1, simulation.height * 1.06]} />
        <meshBasicMaterial
          ref={shadowMaterialRef}
          transparent
          color="#020617"
          opacity={0.34}
          alphaMap={shadowMap}
          depthWrite={false}
        />
      </mesh>

      <group ref={clothRef} position={[simulation.centerX, simulation.centerY, 0]}>
        <mesh ref={clothMeshRef}>
          <primitive object={simulation.geometry} attach="geometry" />
          <meshStandardMaterial
            ref={clothMaterialRef}
            map={diffuseMap}
            bumpMap={bumpMap}
            roughnessMap={roughnessMap}
            bumpScale={7.5}
            roughness={0.94}
            metalness={0.02}
            transparent
            opacity={1}
            color="#d3e3f5"
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}

function PreviewCloth({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{ scale: [1, 1.003, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 z-20 cursor-pointer overflow-hidden rounded-[inherit] border border-sky-100/20"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 16% 16%, rgba(255,255,255,0.48), transparent 14%)",
          "linear-gradient(160deg, rgba(219,232,247,0.98) 0%, rgba(191,211,233,0.97) 30%, rgba(155,184,215,0.98) 66%, rgba(121,153,193,1) 100%)",
        ].join(", "),
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -26px 34px rgba(57,93,137,0.20), 0 24px 36px rgba(0,0,0,0.18)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(106deg,transparent_0%,rgba(255,255,255,0.16)_12%,transparent_22%,transparent_36%,rgba(84,117,161,0.16)_50%,transparent_62%,rgba(255,255,255,0.14)_74%,transparent_92%)]" />
      <div className="absolute left-[10%] top-[-4%] h-[118%] w-px -rotate-[10deg] bg-white/28" />
      <div className="absolute left-[32%] top-[-4%] h-[118%] w-px rotate-[4deg] bg-sky-100/18" />
      <div className="absolute right-[22%] top-[-6%] h-[122%] w-px rotate-[12deg] bg-blue-100/24" />
      <div className="absolute inset-x-[10%] top-[18%] h-10 rounded-full bg-white/16 blur-2xl" />
      <div className="absolute inset-x-[16%] top-[46%] h-12 rounded-full bg-blue-100/10 blur-2xl" />
      <div className="absolute inset-x-[18%] bottom-[8%] h-[4.5rem] rounded-full bg-slate-900/10 blur-3xl" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-slate-950/28 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/92 shadow-[0_12px_24px_rgba(0,0,0,0.20)] backdrop-blur-md">
        Click para revelar
      </div>
    </motion.button>
  );
}

function FixedFallback({
  rect,
  onDone,
}: {
  rect: ClothRect;
  onDone: () => void;
}) {
  return (
    <motion.div
      initial={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        rotate: 0,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        left: rect.left + rect.viewportWidth * 0.82,
        top: rect.top - rect.viewportHeight * 0.6,
        rotate: 28,
        scale: 0.88,
        opacity: 0,
      }}
      transition={{ duration: TOTAL_DURATION * 0.72, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onDone}
      className="fixed z-[80] overflow-hidden rounded-[32px] border border-sky-100/20"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 16% 16%, rgba(255,255,255,0.48), transparent 14%)",
          "linear-gradient(160deg, rgba(219,232,247,0.98) 0%, rgba(191,211,233,0.97) 30%, rgba(155,184,215,0.98) 66%, rgba(121,153,193,1) 100%)",
        ].join(", "),
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -26px 34px rgba(57,93,137,0.20), 0 24px 36px rgba(0,0,0,0.18)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(106deg,transparent_0%,rgba(255,255,255,0.16)_12%,transparent_22%,transparent_36%,rgba(84,117,161,0.16)_50%,transparent_62%,rgba(255,255,255,0.14)_74%,transparent_92%)]" />
    </motion.div>
  );
}

export function ContactClothReveal({ onRevealComplete }: ContactClothRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fallbackTimeoutRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [webglSupported] = useState(() =>
    typeof window !== "undefined" ? supportsWebGL() : false,
  );
  const [activeRect, setActiveRect] = useState<ClothRect | null>(null);
  const [revealed, setRevealed] = useState(false);

  const fallbackMode = reducedMotion || isMobile || !webglSupported;

  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);

  const finishReveal = () => {
    setActiveRect(null);
    setRevealed(true);
    onRevealComplete?.();
  };

  const handleActivate = () => {
    if (!rootRef.current || activeRect || revealed) return;
    const rect = rootRef.current.getBoundingClientRect();
    setActiveRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    if (!fallbackMode || !activeRect) return;
    fallbackTimeoutRef.current = window.setTimeout(() => {
      finishReveal();
    }, TOTAL_DURATION * 1000);

    return () => {
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [activeRect, fallbackMode]);

  if (revealed) {
    return null;
  }

  return (
    <>
      {!activeRect && (
        <div ref={rootRef} className="absolute inset-0 z-20 rounded-[inherit]">
          <PreviewCloth onClick={handleActivate} />
        </div>
      )}

      {activeRect && typeof document !== "undefined"
        ? createPortal(
            <div className="pointer-events-none fixed inset-0 z-[90]">
              {fallbackMode ? (
                <FixedFallback rect={activeRect} onDone={finishReveal} />
              ) : (
                <Canvas
                  orthographic
                  dpr={[1, 1.7]}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  className="absolute inset-0"
                >
                  <ClothScene rect={activeRect} onComplete={finishReveal} />
                </Canvas>
              )}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
