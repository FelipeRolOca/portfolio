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
  const mouseRef = useRef({ x: 0, y: 0 });
  const wavesRef = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const dots: { x: number; y: number; baseSize: number }[] = [];
    const spacing = 35;
    const mouseRadius = 150; // Increased mouse radius for better visibility
    const waveWidth = 100;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      dots.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y, baseSize: 1.2 }); // Increased base size
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      // Update waves
      wavesRef.current = wavesRef.current.filter((wave) => {
        const elapsed = now - wave.startTime;
        wave.radius = elapsed * 0.5; // Wave speed
        return wave.radius < wave.maxRadius;
      });

      dots.forEach((dot) => {
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);

        let size = dot.baseSize;
        let opacity = 0.25; // Increased base opacity
        let color = "rgba(161, 161, 170"; // zinc-400
        let offsetX = 0;
        let offsetY = 0;

        // Mouse interaction
        if (mouseDistance < mouseRadius) {
          const factor = 1 - mouseDistance / mouseRadius;
          size += factor * 2.5;
          opacity = 0.25 + factor * 0.5;
          color = "59, 130, 246"; // blue-500
        }

        // Wave interaction
        wavesRef.current.forEach((wave) => {
          const wdx = dot.x - wave.x;
          const wdy = dot.y - wave.y;
          const waveDistance = Math.sqrt(wdx * wdx + wdy * wdy);

          if (waveDistance < wave.radius && waveDistance > wave.radius - waveWidth) {
            const factor = 1 - (wave.radius - waveDistance) / waveWidth;
            const intensity = Math.sin(factor * Math.PI); // Smooth pulse
            
            size += intensity * 4;
            opacity = Math.min(1, opacity + intensity * 0.6);
            color = "59, 130, 246"; // blue-500

            // Displacement effect
            const push = intensity * 15;
            const angle = Math.atan2(wdy, wdx);
            offsetX += Math.cos(angle) * push;
            offsetY += Math.sin(angle) * push;
          }
        });

        ctx.beginPath();
        ctx.arc(dot.x + offsetX, dot.y + offsetY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select, [role='button'], nav, .prevent-dot-wave")) {
        return;
      }

      wavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 1.5,
        startTime: Date.now(),
      });
    };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};
