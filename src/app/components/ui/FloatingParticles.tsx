"use client";

import React, { useEffect, useRef } from "react";
import { useCanHover } from "./use-can-hover";

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
  const targetElementRef = useRef<HTMLElement | null>(null);
  const canHover = useCanHover();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap for perf

    const particles: Particle[] = [];
    const particleCount = 80; // Reduced density

    const init = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      // draw in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

      const targetRect = targetElementRef.current?.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const orbitTime = performance.now() * 0.0015;
      const glowTime = performance.now() * 0.001;

      particles.forEach((p, idx) => {
        if (targetRect) {
          // Calculate target position relative to the LOCAL canvas/container
          const localLeft = targetRect.left - containerRect.left;
          const localTop = targetRect.top - containerRect.top;
          const localRight = localLeft + targetRect.width;
          const localBottom = localTop + targetRect.height;
          
          // Distribute particles along the perimeter
          // Each particle gets a fixed spot on the perimeter based on its index
          const perimeter = 2 * (targetRect.width + targetRect.height);
          const step = perimeter / particles.length;
          const pos = (idx * step + orbitTime * 28) % perimeter;
          const wobble = 4 + (idx % 5);

          let targetX, targetY;
          const offset = 18;
          if (pos < targetRect.width) {
            targetX = localLeft + pos;
            targetY = localTop - offset;
          } else if (pos < targetRect.width + targetRect.height) {
            targetX = localRight + offset;
            targetY = localTop + (pos - targetRect.width);
          } else if (pos < 2 * targetRect.width + targetRect.height) {
            targetX = localRight - (pos - (targetRect.width + targetRect.height));
            targetY = localBottom + offset;
          } else {
            targetX = localLeft - offset;
            targetY = localBottom - (pos - (2 * targetRect.width + targetRect.height));
          }

          targetX += Math.sin(orbitTime + idx * 0.7) * wobble;
          targetY += Math.cos(orbitTime * 1.2 + idx * 0.5) * wobble;

          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const follow = 0.24;
          const maxStep = 24;
          const nextX = dx * follow;
          const nextY = dy * follow;
          p.x += Math.max(-maxStep, Math.min(maxStep, nextX));
          p.y += Math.max(-maxStep, Math.min(maxStep, nextY));
          p.vx *= 0.5;
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
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap around within section
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const l = p.baseColor.l + Math.sin(glowTime + p.x * 0.01) * 15;
        ctx.shadowBlur = targetRect ? 5 : 0;
        ctx.shadowColor = `hsla(${p.baseColor.h}, ${p.baseColor.s}%, 70%, ${targetRect ? 0.45 : 0})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.baseColor.h}, ${p.baseColor.s}%, ${l}%, ${targetRect ? 0.7 : 0.45})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY);
      const target = element?.closest("[data-particle-target]") as HTMLElement | null;
      if (!target) {
        targetElementRef.current = null;
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const isInsideContainer =
        targetRect.bottom >= containerRect.top &&
        targetRect.top <= containerRect.bottom &&
        targetRect.right >= containerRect.left &&
        targetRect.left <= containerRect.right;

      targetElementRef.current = isInsideContainer ? target : null;
    };

    const handleMouseMove = (e: MouseEvent) => updateTarget(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleResize = () => {
      init();
    };

    init();
    draw();

    if (canHover) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      targetElementRef.current = null;
    };
  }, [canHover]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
    </div>
  );
};
