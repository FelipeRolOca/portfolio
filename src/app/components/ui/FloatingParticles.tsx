"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseColor: { h: number; s: number; l: number };
}

export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const h = 200 + Math.random() * 40; // Blues to Cyans
        const s = 50 + Math.random() * 30;
        const l = 40 + Math.random() * 20;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 3,
          baseColor: { h, s, l },
          color: `hsla(${h}, ${s}%, ${l}%, 0.5)`,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const targetRect = targetRectRef.current;

      particles.forEach((p) => {
        if (targetRect) {
          // Move towards target rect perimeter
          const centerX = targetRect.left + targetRect.width / 2;
          const centerY = targetRect.top + targetRect.height / 2;
          
          // Simple attraction to a slightly larger area around the rect
          const targetX = targetRect.left - 20 + Math.random() * (targetRect.width + 40);
          const targetY = targetRect.top - 20 + Math.random() * (targetRect.height + 40);

          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const force = 0.05;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          
          // Damping
          p.vx *= 0.95;
          p.vy *= 0.95;
        } else {
          // Drifting motion
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01;
          
          // Natural speed limit
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1) {
            p.vx *= 0.9;
            p.vy *= 0.9;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse color
        const time = Date.now() * 0.001;
        const l = p.baseColor.l + Math.sin(time + p.x * 0.01) * 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.baseColor.h}, ${p.baseColor.s}%, ${l}%, 0.4)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-particle-target]");
      if (target) {
        targetRectRef.current = target.getBoundingClientRect();
      } else {
        targetRectRef.current = null;
      }
    };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseOver);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseOver);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: "transparent" }}
    />
  );
};
