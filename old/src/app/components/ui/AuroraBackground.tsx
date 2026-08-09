

import { useEffect, useRef } from "react";

interface Blob {
  baseX: number;
  baseY: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  phaseX: number;
  phaseY: number;
  radiusX: number;
  radiusY: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
}

const BLOBS: Blob[] = [
  // Blue â€“ top-left anchor, drifts slowly
  {
    baseX: 0.18, baseY: 0.3,
    freqX: 0.00038, freqY: 0.00028,
    ampX: 0.13,    ampY: 0.11,
    phaseX: 0,     phaseY: 1.2,
    radiusX: 0.58, radiusY: 0.44,
    r: 59,  g: 130, b: 246,
    opacity: 0.38,
  },
  // Cyan â€“ top-right, faster vertical drift
  {
    baseX: 0.78, baseY: 0.22,
    freqX: 0.00028, freqY: 0.00048,
    ampX: 0.09,    ampY: 0.13,
    phaseX: 2.1,   phaseY: 0.5,
    radiusX: 0.48, radiusY: 0.36,
    r: 6,   g: 182, b: 212,
    opacity: 0.34,
  },
  // Violet â€“ center-bottom, lazy orbit
  {
    baseX: 0.52, baseY: 0.62,
    freqX: 0.00050, freqY: 0.00038,
    ampX: 0.07,    ampY: 0.09,
    phaseX: 3.7,   phaseY: 1.8,
    radiusX: 0.42, radiusY: 0.32,
    r: 139, g: 92,  b: 246,
    opacity: 0.24,
  },
  // Indigo â€“ right edge, tall ellipse, slow
  {
    baseX: 0.88, baseY: 0.6,
    freqX: 0.00022, freqY: 0.00042,
    ampX: 0.07,    ampY: 0.08,
    phaseX: 1.5,   phaseY: 4.2,
    radiusX: 0.3,  radiusY: 0.52,
    r: 99,  g: 102, b: 241,
    opacity: 0.2,
  },
  // Teal â€“ bottom-left accent
  {
    baseX: 0.3, baseY: 0.72,
    freqX: 0.00018, freqY: 0.00055,
    ampX: 0.1,     ampY: 0.07,
    phaseX: 5.0,   phaseY: 2.5,
    radiusX: 0.28, radiusY: 0.38,
    r: 34,  g: 211, b: 238,
    opacity: 0.18,
  },
  // Electric blue â€“ top-center shimmer, faster
  {
    baseX: 0.5,  baseY: 0.1,
    freqX: 0.00065, freqY: 0.00032,
    ampX: 0.14,    ampY: 0.08,
    phaseX: 0.8,   phaseY: 3.1,
    radiusX: 0.55, radiusY: 0.25,
    r: 96,  g: 165, b: 250,
    opacity: 0.22,
  },
];

export const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);

      const maxDim = Math.max(w, h);

      for (const blob of BLOBS) {
        const cx = (blob.baseX + blob.ampX * Math.sin(now * blob.freqX + blob.phaseX)) * w;
        const cy = (blob.baseY + blob.ampY * Math.sin(now * blob.freqY + blob.phaseY)) * h;
        const rx = blob.radiusX * maxDim * 0.6;
        const ry = blob.radiusY * maxDim * 0.6;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        gradient.addColorStop(0,   `rgba(${blob.r},${blob.g},${blob.b},${blob.opacity})`);
        gradient.addColorStop(0.35,`rgba(${blob.r},${blob.g},${blob.b},${(blob.opacity * 0.65).toFixed(3)})`);
        gradient.addColorStop(0.7, `rgba(${blob.r},${blob.g},${blob.b},${(blob.opacity * 0.25).toFixed(3)})`);
        gradient.addColorStop(1,   `rgba(${blob.r},${blob.g},${blob.b},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
