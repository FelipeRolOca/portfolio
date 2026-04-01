"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useIsMobile } from "../ui/use-mobile";

type ContactClothRevealProps = {
  onRevealComplete?: () => void;
};

type Bounds = {
  width: number;
  height: number;
};

type ClothPoint = {
  position: THREE.Vector3;
  previous: THREE.Vector3;
  original: THREE.Vector3;
  pinWeight: number;
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
};

export const CONTACT_CLOTH_CONFIG = {
  cols: 30,
  rows: 22,
  iterations: 5,
  gravity: -5.8,
  drag: 0.985,
  activationDelayMs: 950,
  restDuration: 1.9,
  peelDuration: 1.9,
  flyDuration: 2.45,
  coverPadding: 1.06,
};

const TOTAL_DURATION =
  CONTACT_CLOTH_CONFIG.restDuration +
  CONTACT_CLOTH_CONFIG.peelDuration +
  CONTACT_CLOTH_CONFIG.flyDuration;

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
  const size = 768;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = "#edf3fb";
  ctx.fillRect(0, 0, size, size);

  const wash = ctx.createLinearGradient(0, 0, size, size);
  wash.addColorStop(0, "rgba(255,255,255,0.82)");
  wash.addColorStop(0.42, "rgba(219,229,243,0.88)");
  wash.addColorStop(0.75, "rgba(196,211,230,0.92)");
  wash.addColorStop(1, "rgba(171,191,214,0.96)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  for (let y = 0; y < size; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(120,145,180,0.08)";
  for (let x = 0; x < size; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  for (let i = 0; i < 3000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = 0.02 + Math.random() * 0.03;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const folds = [
    { x0: 40, y0: 0, x1: 250, y1: size, a0: 0.14, a1: 0 },
    { x0: 300, y0: -80, x1: 520, y1: size, a0: 0, a1: 0.12 },
    { x0: 520, y0: -10, x1: 680, y1: size, a0: 0.09, a1: 0 },
  ];

  folds.forEach((fold) => {
    const gradient = ctx.createLinearGradient(fold.x0, fold.y0, fold.x1, fold.y1);
    gradient.addColorStop(0, `rgba(255,255,255,${fold.a0})`);
    gradient.addColorStop(0.5, "rgba(110,140,176,0.08)");
    gradient.addColorStop(1, `rgba(255,255,255,${fold.a1})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  });

  const highlight = ctx.createRadialGradient(size * 0.2, size * 0.18, 10, size * 0.2, size * 0.18, size * 0.28);
  highlight.addColorStop(0, "rgba(255,255,255,0.55)");
  highlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = highlight;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 3.4);
  return texture;
}

function createBumpTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = "rgb(128,128,128)";
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 7) {
    ctx.fillStyle = "rgba(156,156,156,0.24)";
    ctx.fillRect(0, y, size, 1);
  }

  for (let x = 0; x < size; x += 7) {
    ctx.fillStyle = "rgba(110,110,110,0.18)";
    ctx.fillRect(x, 0, 1, size);
  }

  const foldBands = [
    { x0: 70, y0: 0, x1: 220, y1: size },
    { x0: 270, y0: -40, x1: 420, y1: size },
    { x0: 420, y0: 0, x1: 590, y1: size },
  ];

  foldBands.forEach((band, index) => {
    const gradient = ctx.createLinearGradient(band.x0, band.y0, band.x1, band.y1);
    gradient.addColorStop(0, "rgba(165,165,165,0)");
    gradient.addColorStop(0.42, index % 2 === 0 ? "rgba(218,218,218,0.60)" : "rgba(82,82,82,0.52)");
    gradient.addColorStop(0.58, index % 2 === 0 ? "rgba(78,78,78,0.50)" : "rgba(222,222,222,0.55)");
    gradient.addColorStop(1, "rgba(140,140,140,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 3.4);
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

  for (let i = 0; i < 2600; i += 1) {
    const alpha = 0.02 + Math.random() * 0.08;
    const shade = 160 + Math.floor(Math.random() * 40);
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 3.4);
  return texture;
}

function createShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.Texture();
  }

  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.08, size / 2, size / 2, size * 0.5);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.32)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function buildSimulation(aspect: number) {
  const width = 1.72 * aspect * CONTACT_CLOTH_CONFIG.coverPadding;
  const height = 1.72 * CONTACT_CLOTH_CONFIG.coverPadding;
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    CONTACT_CLOTH_CONFIG.cols - 1,
    CONTACT_CLOTH_CONFIG.rows - 1,
  );

  const points: ClothPoint[] = [];
  const constraints: Array<[number, number, number]> = [];
  const cols = CONTACT_CLOTH_CONFIG.cols;
  const rows = CONTACT_CLOTH_CONFIG.rows;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const u = col / (cols - 1);
      const v = row / (rows - 1);
      const x = (u - 0.5) * width;
      const y = (0.5 - v) * height - Math.pow(v, 1.5) * 0.04;
      const z =
        (Math.sin(u * Math.PI) * 0.02 + Math.sin((u + v) * Math.PI * 1.7) * 0.014) * (0.2 + v) -
        Math.pow(v, 2.1) * 0.03;

      const original = new THREE.Vector3(x, y, z);
      const pinWeight = Math.pow(1 - u, 2.8) * Math.pow(1 - v, 2.2);
      const windWeight = 0.28 + (1 - v) * 0.6 + (1 - u) * 0.2;

      points.push({
        position: original.clone(),
        previous: original.clone(),
        original,
        pinWeight,
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
      const i = row * cols + col;
      if (col < cols - 1) link(i, i + 1);
      if (row < rows - 1) link(i, i + cols);
      if (col < cols - 1 && row < rows - 1) {
        link(i, i + cols + 1);
        link(i + 1, i + cols);
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

  return { points, constraints, geometry, width, height, elapsed: 0 };
}

function ClothSimulationMesh({
  aspect,
  active,
  onComplete,
}: {
  aspect: number;
  active: boolean;
  onComplete: () => void;
}) {
  const clothRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shadowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const simulationRef = useRef<ClothSimulation | null>(null);
  const completeRef = useRef(false);
  const diffuseMapRef = useRef<THREE.Texture | null>(null);
  const bumpMapRef = useRef<THREE.Texture | null>(null);
  const roughnessMapRef = useRef<THREE.Texture | null>(null);
  const shadowMapRef = useRef<THREE.Texture | null>(null);

  if (!simulationRef.current) {
    simulationRef.current = buildSimulation(aspect);
  }

  if (!diffuseMapRef.current) diffuseMapRef.current = createFabricTexture();
  if (!bumpMapRef.current) bumpMapRef.current = createBumpTexture();
  if (!roughnessMapRef.current) roughnessMapRef.current = createRoughnessTexture();
  if (!shadowMapRef.current) shadowMapRef.current = createShadowTexture();

  useEffect(() => {
    return () => {
      simulationRef.current?.geometry.dispose();
      diffuseMapRef.current?.dispose();
      bumpMapRef.current?.dispose();
      roughnessMapRef.current?.dispose();
      shadowMapRef.current?.dispose();
    };
  }, []);

  useFrame((_, delta) => {
    const simulation = simulationRef.current;
    if (!simulation || !clothRef.current || !materialRef.current || !shadowRef.current || !shadowMaterialRef.current) {
      return;
    }

    if (!active) {
      return;
    }

    const step = Math.min(delta, 1 / 30);
    simulation.elapsed += step;
    const elapsed = simulation.elapsed;
    const geometry = simulation.geometry;
    const positionAttr = geometry.attributes.position.array as Float32Array;
    const restEnd = CONTACT_CLOTH_CONFIG.restDuration;
    const peelEnd = restEnd + CONTACT_CLOTH_CONFIG.peelDuration;
    const flyEnd = peelEnd + CONTACT_CLOTH_CONFIG.flyDuration;

    const peel = smoothstep(restEnd * 0.75, peelEnd, elapsed);
    const fly = smoothstep(peelEnd - 0.15, flyEnd, elapsed);
    const fade = smoothstep(flyEnd - 0.42, flyEnd, elapsed);

    const windStrength = 0.3 + peel * 1.3 + fly * 3.8;
    const wind = new THREE.Vector3(
      0.2 + fly * 1.5,
      0.1 + peel * 0.45 + fly * 0.95,
      0.25 + peel * 0.75 + fly * 1.2,
    );

    const groupX = peel * 0.05 + fly * 0.65;
    const groupY = peel * 0.08 + fly * 0.78;
    const groupZ = peel * 0.04 + fly * 0.12;
    const rotX = peel * -0.05 + fly * -0.1;
    const rotY = peel * 0.08 + fly * 0.18;
    const rotZ = peel * -0.08 + fly * 0.4;

    clothRef.current.position.set(groupX, groupY, groupZ);
    clothRef.current.rotation.set(rotX, rotY, rotZ);
    shadowRef.current.position.set(groupX * 0.45, groupY * 0.2 - 0.02, -0.22);
    shadowRef.current.rotation.set(rotX * 0.15, rotY * 0.1, rotZ * 0.2);
    shadowRef.current.scale.set(1 + peel * 0.03 - fly * 0.18, 1 - peel * 0.02 - fly * 0.28, 1);

    for (let i = 0; i < simulation.points.length; i += 1) {
      const point = simulation.points[i];
      const isDriven = point.pinWeight > 0.03;

      if (isDriven) {
        const lead = point.pinWeight;
        const targetX = point.original.x + peel * (0.06 + lead * 0.12) + fly * (0.22 + lead * 0.86);
        const targetY = point.original.y + peel * (0.04 + lead * 0.14) + fly * (0.12 + lead * 0.94);
        const targetZ =
          point.original.z +
          peel * (0.04 + lead * 0.18) +
          fly * (0.08 + lead * 0.65) +
          Math.sin(elapsed * 5.2 + point.u * 4 + point.v * 2) * 0.02 * fly;
        point.position.set(targetX, targetY, targetZ);
        point.previous.copy(point.position);
        continue;
      }

      const velocity = point.position.clone().sub(point.previous).multiplyScalar(CONTACT_CLOTH_CONFIG.drag);
      point.previous.copy(point.position);
      point.position.add(velocity);
      point.position.y += CONTACT_CLOTH_CONFIG.gravity * step * step;

      const flutter =
        Math.sin(elapsed * 3.4 + point.u * 6.2 + point.v * 4.1) * 0.012 +
        Math.cos(elapsed * 5.1 + point.v * 5.6) * 0.008;

      point.position.x += wind.x * windStrength * point.windWeight * step * step;
      point.position.y += wind.y * windStrength * point.windWeight * step * step;
      point.position.z += (wind.z * point.windWeight + flutter) * step * step;
    }

    for (let iteration = 0; iteration < CONTACT_CLOTH_CONFIG.iterations; iteration += 1) {
      for (let i = 0; i < simulation.constraints.length; i += 1) {
        const [aIndex, bIndex, restLength] = simulation.constraints[i];
        const a = simulation.points[aIndex];
        const b = simulation.points[bIndex];
        const deltaVector = b.position.clone().sub(a.position);
        const distance = deltaVector.length() || 1;
        const correction = deltaVector.multiplyScalar((distance - restLength) / distance * 0.5);
        const aPinned = a.pinWeight > 0.03;
        const bPinned = b.pinWeight > 0.03;

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

    materialRef.current.opacity = 1 - fade;
    shadowMaterialRef.current.opacity = 0.22 - fly * 0.1 - fade * 0.12;

    if (elapsed >= TOTAL_DURATION && !completeRef.current) {
      completeRef.current = true;
      onComplete();
    }
  });

  const simulation = simulationRef.current;

  return (
    <>
      <mesh ref={shadowRef} position={[0, -0.02, -0.22]}>
        <planeGeometry args={[simulation.width * 1.08, simulation.height * 1.02]} />
        <meshBasicMaterial
          ref={shadowMaterialRef}
          transparent
          color="#020617"
          opacity={0.2}
          alphaMap={shadowMapRef.current ?? undefined}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={clothRef} position={[0, 0, 0]}>
        <primitive object={simulation.geometry} attach="geometry" />
        <meshStandardMaterial
          ref={materialRef}
          map={diffuseMapRef.current ?? undefined}
          bumpMap={bumpMapRef.current ?? undefined}
          roughnessMap={roughnessMapRef.current ?? undefined}
          bumpScale={0.032}
          roughness={0.96}
          metalness={0}
          transparent
          opacity={1}
          color="#eef4fb"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function FallbackCover({
  active,
  onDone,
}: {
  active: boolean;
  onDone: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={
        active
          ? {
              x: [0, 12, 70],
              y: [0, -12, -58],
              rotate: [0, -4, 14],
              opacity: [1, 1, 0],
            }
          : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
      }
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      onAnimationComplete={() => {
        if (active) onDone();
      }}
      className="absolute inset-0 overflow-hidden rounded-[inherit] border border-white/18"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.82), transparent 18%)",
          "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(229,237,247,0.94) 35%, rgba(197,212,230,0.95) 100%)",
        ].join(", "),
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -18px 28px rgba(94,122,160,0.18), 0 18px 36px rgba(0,0,0,0.18)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(104deg,transparent_0%,rgba(255,255,255,0.20)_12%,transparent_24%,transparent_42%,rgba(116,142,178,0.16)_54%,transparent_70%)]" />
      <div className="absolute left-[12%] top-[8%] h-[110%] w-px -rotate-[8deg] bg-white/30" />
      <div className="absolute right-[24%] top-[-4%] h-[116%] w-px rotate-[12deg] bg-slate-300/24" />
      <div className="absolute inset-x-[16%] bottom-[8%] h-14 rounded-full bg-slate-500/10 blur-3xl" />
    </motion.div>
  );
}

export function ContactClothReveal({ onRevealComplete }: ContactClothRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activationTimeoutRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [webglSupported] = useState(() =>
    typeof window !== "undefined" ? supportsWebGL() : false,
  );
  const [bounds, setBounds] = useState<Bounds>({ width: 0, height: 0 });
  const [active, setActive] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rootRef.current || active || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          activationTimeoutRef.current = window.setTimeout(() => {
            setActive(true);
          }, CONTACT_CLOTH_CONFIG.activationDelayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.82 },
    );

    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      if (activationTimeoutRef.current !== null) {
        window.clearTimeout(activationTimeoutRef.current);
      }
    };
  }, [active, revealed]);

  const fallbackMode = reducedMotion || isMobile || !webglSupported;

  const finishReveal = () => {
    setRevealed(true);
    onRevealComplete?.();
  };

  if (revealed) {
    return null;
  }

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <AnimatePresence mode="wait">
        {fallbackMode ? (
          <FallbackCover key="fallback" active={active} onDone={finishReveal} />
        ) : bounds.width > 0 && bounds.height > 0 ? (
          <motion.div
            key="canvas"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Canvas
              dpr={[1, 1.6]}
              gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
              className="absolute inset-0"
            >
              <perspectiveCamera makeDefault position={[0, 0.02, 3.6]} fov={28} />
              <ambientLight intensity={1.1} />
              <directionalLight position={[-2.4, 2.8, 2.5]} intensity={2.3} color="#ffffff" />
              <directionalLight position={[1.5, -0.5, 1.2]} intensity={0.55} color="#9dc3ee" />
              <ClothSimulationMesh aspect={bounds.width / bounds.height} active={active} onComplete={finishReveal} />
            </Canvas>
          </motion.div>
        ) : (
          <FallbackCover key="placeholder" active={false} onDone={() => undefined} />
        )}
      </AnimatePresence>
    </div>
  );
}
