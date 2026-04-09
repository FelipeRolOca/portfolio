"use client";

import React, { useEffect, useRef } from "react";

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  startTime: number;
}

export const DotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const wavesRef = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mousePending = false;

    const dots: { x: number; y: number }[] = [];
    const spacing = 44; // reduced from 50 for bigger dots that need a bit less gap
    const mouseRadius = 120;
    const waveWidth = 80;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      dots.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      wavesRef.current = wavesRef.current.filter((wave) => {
        wave.radius = (now - wave.startTime) * 0.45;
        return wave.radius < wave.maxRadius;
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dots) {
        const dx = mx - dot.x;
        const dy = my - dot.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);

        let size = 1.5;
        let opacity = 0.13;
        let r = 161, g = 161, b = 170; // zinc-400

        // Mouse interaction
        if (mouseDistance < mouseRadius) {
          const factor = 1 - mouseDistance / mouseRadius;
          size += factor * 3;
          opacity = 0.13 + factor * 0.65;
          r = 59; g = 130; b = 246;
        }

        // Wave interaction (no displacement — saves per-dot trig)
        for (const wave of wavesRef.current) {
          const wdx = dot.x - wave.x;
          const wdy = dot.y - wave.y;
          const waveDistance = Math.sqrt(wdx * wdx + wdy * wdy);
          if (waveDistance < wave.radius && waveDistance > wave.radius - waveWidth) {
            const intensity = Math.sin(((wave.radius - waveDistance) / waveWidth) * Math.PI);
            size += intensity * 3;
            opacity = Math.min(0.9, opacity + intensity * 0.5);
            r = 59; g = 130; b = 246;
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle: only update between frames
      if (!mousePending) {
        mousePending = true;
        requestAnimationFrame(() => {
          mouseRef.current = { x: e.clientX, y: e.clientY };
          mousePending = false;
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select, [role='button'], nav")) return;
      wavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height),
        startTime: Date.now(),
      });
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleClick, { passive: true });
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent", willChange: "contents" }}
    />
  );
};
