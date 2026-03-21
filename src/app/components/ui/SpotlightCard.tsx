"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { cn } from "./utils";
import { useCanHover } from "./use-can-hover";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className,
  innerClassName,
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  ...props
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !containerRef.current) return;
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
      onMouseMove={canHover ? handleMouseMove : undefined}
      className={cn(
        "group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700",
        (className || "").includes("overflow-visible") ? "overflow-visible" : "overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px z-0 transition-opacity duration-300",
          canHover ? "opacity-0 group-hover:opacity-100" : "hidden"
        )}
        style={canHover ? { background } : undefined}
      />
      <div className={cn("relative z-10 w-full h-full", innerClassName)}>{children}</div>
    </div>
  );
};
