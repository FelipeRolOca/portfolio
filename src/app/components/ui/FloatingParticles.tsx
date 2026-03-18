"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: { h: number; s: number; l: number };
}

export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 80; // Reduced density

    const init = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
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
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: 1 + Math.random() * 2.5,
          baseColor: { h, s, l },
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const targetRect = targetRectRef.current;

      particles.forEach((p, idx) => {
        if (targetRect) {
          // Calculate target position relative to the LOCAL canvas/container
          const containerRect = container.getBoundingClientRect();
          const localLeft = targetRect.left - containerRect.left;
          const localTop = targetRect.top - containerRect.top;
          const localRight = localLeft + targetRect.width;
          const localBottom = localTop + targetRect.height;
          
          // Distribute particles along the perimeter
          // Each particle gets a fixed spot on the perimeter based on its index
          const perimeter = 2 * (targetRect.width + targetRect.height);
          const step = perimeter / particles.length;
          const pos = (idx * step + Date.now() * 0.05) % perimeter;

          let targetX, targetY;
          const offset = 12; // More distance from the border for clarity
          if (pos < targetRect.width) {
            targetX = localLeft + pos;
            targetY = localTop - offset; // Top edge
          } else if (pos < targetRect.width + targetRect.height) {
            targetX = localRight + offset;
            targetY = localTop + (pos - targetRect.width); // Right edge
          } else if (pos < 2 * targetRect.width + targetRect.height) {
            targetX = localRight - (pos - (targetRect.width + targetRect.height));
            targetY = localBottom + offset; // Bottom edge
          } else {
            targetX = localLeft - offset;
            targetY = localBottom - (pos - (2 * targetRect.width + targetRect.height)); // Left edge
          }

          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Near-instant attraction: snap 40% of the distance each frame
          p.vx += dx * 0.4;
          p.vy += dy * 0.4;
          
          p.vx *= 0.5; // High damping to prevent overshoot during snap
          p.vy *= 0.5;
        } else {
          // Drifting motion
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01;
          
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.8) {
            p.vx *= 0.9;
            p.vy *= 0.9;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around within section
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const time = Date.now() * 0.001;
        const l = p.baseColor.l + Math.sin(time + p.x * 0.01) * 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Increased intensity: high opacity and glow-like fill
        ctx.fillStyle = `hsla(${p.baseColor.h}, ${p.baseColor.s}%, ${l}%, ${targetRect ? 0.7 : 0.45})`;
        ctx.fill();
        
        if (targetRect) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `hsla(${p.baseColor.h}, ${p.baseColor.s}%, 70%, 0.5)`;
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY);
      const target = element?.closest("[data-particle-target]");
      if (target) {
        targetRectRef.current = target.getBoundingClientRect();
      } else {
        targetRectRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => updateTarget(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleEnd = () => { targetRectRef.current = null; };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
    </div>
  );
};
