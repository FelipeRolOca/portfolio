import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useMemo, useRef } from "react";

type LiquidEtherProps = {
  colors?: [string, string, string] | string[];
  className?: string;
  style?: CSSProperties;
  mouseForce?: number;
  autoSpeed?: number;
};

function hexToRgb(color: string) {
  const normalized = color.replace("#", "");
  const safe = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const value = Number.parseInt(safe, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(color: string, alpha: number) {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function LiquidEther({
  colors = ["#1d4ed8", "#06b6d4", "#14b8a6"],
  className = "",
  style,
  mouseForce = 18,
  autoSpeed = 0.3,
}: LiquidEtherProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const palette = useMemo(() => {
    const base = [...colors];
    while (base.length < 3) {
      base.push(base[base.length - 1] ?? "#14b8a6");
    }
    return base.slice(0, 3);
  }, [colors]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = rootRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    node.style.setProperty("--pointer-x", `${x}%`);
    node.style.setProperty("--pointer-y", `${y}%`);
    node.style.setProperty("--pointer-force", `${Math.max(10, Math.min(mouseForce, 26)) / 100}`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
      style={
        {
          "--pointer-x": "50%",
          "--pointer-y": "40%",
          "--pointer-force": `${Math.max(10, Math.min(mouseForce, 26)) / 100}`,
          ...style,
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,calc(0.1 + var(--pointer-force))) 0%, transparent 16%),
            radial-gradient(circle at 20% 20%, ${rgba(palette[0], 0.16)} 0%, transparent 28%),
            radial-gradient(circle at 78% 22%, ${rgba(palette[1], 0.18)} 0%, transparent 26%),
            radial-gradient(circle at 52% 78%, ${rgba(palette[2], 0.18)} 0%, transparent 30%),
            linear-gradient(180deg, rgba(9,9,11,0.08), rgba(9,9,11,0.30))
          `,
        }}
      />

      <motion.div
        className="absolute -left-16 top-6 h-56 w-56 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${rgba(palette[0], 0.48)} 0%, transparent 68%)` }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [-10, 18, -8],
                y: [0, 18, -4],
                scale: [1, 1.08, 0.98],
              }
        }
        transition={{ duration: 14 / autoSpeed, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-3rem] top-14 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${rgba(palette[1], 0.42)} 0%, transparent 68%)` }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -24, 10],
                y: [0, 14, -12],
                scale: [1.02, 0.94, 1.04],
              }
        }
        transition={{ duration: 16 / autoSpeed, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-4rem] left-[24%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${rgba(palette[2], 0.4)} 0%, transparent 70%)` }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 24, -10],
                y: [0, -18, 10],
                scale: [1, 1.06, 0.96],
              }
        }
        transition={{ duration: 18 / autoSpeed, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at 35% 34%, ${rgba(palette[0], 0.18)} 0%, transparent 22%),
            radial-gradient(circle at 68% 46%, ${rgba(palette[1], 0.16)} 0%, transparent 20%),
            radial-gradient(circle at 42% 72%, ${rgba(palette[2], 0.18)} 0%, transparent 24%)
          `,
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}
