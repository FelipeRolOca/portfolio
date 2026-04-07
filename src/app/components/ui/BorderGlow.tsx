import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const suffixes = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};

  opacities.forEach((opacity, index) => {
    vars[`--glow-color${suffixes[index]}`] = `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
  });

  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const palette = colors.length ? colors : ["#60a5fa", "#22d3ee", "#2dd4bf"];
  const vars: Record<string, string> = {};

  for (let index = 0; index < 7; index++) {
    const color = palette[Math.min(COLOR_MAP[index], palette.length - 1)];
    vars[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${palette[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value: number) {
  return value * value * value;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (value: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
}) {
  const initialTime = performance.now() + delay;

  function tick() {
    const elapsed = performance.now() - initialTime;
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(progress));
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      onEnd?.();
    }
  }

  const timeoutId = window.setTimeout(() => requestAnimationFrame(tick), delay);
  return () => window.clearTimeout(timeoutId);
}

export default function BorderGlow({
  children,
  className = "",
  contentClassName = "",
  edgeSensitivity = 30,
  glowColor = "195 100 72",
  backgroundColor = "rgba(24, 24, 27, 0.82)",
  borderRadius = 24,
  glowRadius = 34,
  glowIntensity = 1,
  coneSpread = 24,
  animated = false,
  colors = ["#3b82f6", "#22d3ee", "#14b8a6"],
  fillOpacity = 0.38,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const getCenterOfElement = useCallback((element: HTMLDivElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (element: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (element: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [getCursorAngle, getEdgeProximity]
  );

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--edge-proximity", "0");
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return;

    const card = cardRef.current;
    const angleStart = 120;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    const cleanups = [
      animateValue({
        duration: 500,
        onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
      }),
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: (value) => {
          card.style.setProperty("--cursor-angle", `${((angleEnd - angleStart) * (value / 100) + angleStart).toFixed(3)}deg`);
        },
      }),
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: (value) => {
          card.style.setProperty("--cursor-angle", `${((angleEnd - angleStart) * (value / 100) + angleStart).toFixed(3)}deg`);
        },
      }),
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
        onEnd: () => card.classList.remove("sweep-active"),
      }),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      card.classList.remove("sweep-active");
    };
  }, [animated]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);
  const gradientVars = buildGradientVars(colors);

  const rootStyle = {
    "--edge-proximity": 0,
    "--cursor-angle": "45deg",
    "--edge-sensitivity": edgeSensitivity,
    "--color-sensitivity": edgeSensitivity + 20,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    "--card-bg": backgroundColor,
    ...glowVars,
    ...gradientVars,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative isolate grid rounded-[var(--border-radius)] border border-white/10 bg-[var(--card-bg)] ${className}`.trim()}
      style={{
        ...rootStyle,
        transform: "translate3d(0,0,0.01px)",
        boxShadow:
          "rgba(0,0,0,0.08) 0px 1px 2px, rgba(0,0,0,0.1) 0px 8px 16px, rgba(0,0,0,0.16) 0px 18px 38px",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          opacity: "calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)))",
          border: "1px solid transparent",
          background: `
            linear-gradient(var(--card-bg) 0 100%) padding-box,
            linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
            var(--gradient-one) border-box,
            var(--gradient-two) border-box,
            var(--gradient-three) border-box,
            var(--gradient-four) border-box,
            var(--gradient-five) border-box,
            var(--gradient-six) border-box,
            var(--gradient-seven) border-box,
            var(--gradient-base) border-box
          `,
          WebkitMaskImage:
            "conic-gradient(from var(--cursor-angle) at center, black calc(var(--cone-spread) * 1%), transparent calc((var(--cone-spread) + 15) * 1%), transparent calc((100 - var(--cone-spread) - 15) * 1%), black calc((100 - var(--cone-spread)) * 1%))",
          maskImage:
            "conic-gradient(from var(--cursor-angle) at center, black calc(var(--cone-spread) * 1%), transparent calc((var(--cone-spread) + 15) * 1%), transparent calc((100 - var(--cone-spread) - 15) * 1%), black calc((100 - var(--cone-spread)) * 1%))",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          opacity: "calc(var(--fill-opacity) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)))",
          background: `
            var(--gradient-one) padding-box,
            var(--gradient-two) padding-box,
            var(--gradient-three) padding-box,
            var(--gradient-four) padding-box,
            var(--gradient-five) padding-box,
            var(--gradient-six) padding-box,
            var(--gradient-seven) padding-box,
            var(--gradient-base) padding-box
          `,
          mixBlendMode: "soft-light",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black), radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%), radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%), radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%), radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%), radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%), conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] rounded-[inherit] transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          inset: "calc(var(--glow-padding) * -1)",
          opacity: "calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)))",
          mixBlendMode: "plus-lighter",
          WebkitMaskImage:
            "conic-gradient(from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)",
          maskImage:
            "conic-gradient(from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)",
        }}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: "var(--glow-padding)",
            boxShadow: `
              inset 0 0 0 1px var(--glow-color),
              inset 0 0 1px 0 var(--glow-color-60),
              inset 0 0 3px 0 var(--glow-color-50),
              inset 0 0 6px 0 var(--glow-color-40),
              inset 0 0 15px 0 var(--glow-color-30),
              inset 0 0 25px 2px var(--glow-color-20),
              inset 0 0 50px 2px var(--glow-color-10),
              0 0 1px 0 var(--glow-color-60),
              0 0 3px 0 var(--glow-color-50),
              0 0 6px 0 var(--glow-color-40),
              0 0 15px 0 var(--glow-color-30),
              0 0 25px 2px var(--glow-color-20),
              0 0 50px 2px var(--glow-color-10)
            `,
          }}
        />
      </span>

      <div className={`relative z-[2] flex h-full flex-col overflow-hidden rounded-[inherit] ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
