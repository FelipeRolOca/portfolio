"use client";

import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (!canHover || !containerRef.current) return;

    const container = containerRef.current;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty("--mouse-x", `${x}px`);
        container.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canHover]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700",
        (className || "").includes("overflow-visible") ? "overflow-visible" : "overflow-hidden",
        className
      )}
      style={{
        ["--spotlight-color" as any]: spotlightColor,
      }}
      {...props}
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), var(--spotlight-color), transparent 80%)`,
        }}
      />
      <div className={cn("relative z-10 w-full h-full", innerClassName)}>{children}</div>
    </div>
  );
};
