"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "./utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(59, 130, 246, 0.15)",
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300 group-hover:opacity-100 opacity-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
