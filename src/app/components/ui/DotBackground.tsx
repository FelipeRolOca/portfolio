"use client";

import React, { useEffect, useRef } from "react";

export const DotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    const mouseRadius = 120;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      dots.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y, baseSize: 1 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let size = dot.baseSize;
        let opacity = 0.15;
        let color = "rgba(161, 161, 170"; // zinc-400 equivalent

        if (distance < mouseRadius) {
          const factor = 1 - distance / mouseRadius;
          size = dot.baseSize + factor * 2;
          opacity = 0.15 + factor * 0.45;
          color = "59, 130, 246"; // blue-500
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
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
