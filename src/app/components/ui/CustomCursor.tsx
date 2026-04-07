"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useCanHover } from "./use-can-hover";

export const CustomCursor = () => {
  const canHover = useCanHover();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!canHover) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select, [role='button'], [data-cursor='interactive']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <>
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-cyan-400 mix-blend-screen"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.1,
        }}
        style={{ left: 0, top: 0 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] h-10 w-10 rounded-full border-[1.5px] border-cyan-400 mix-blend-screen"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.3 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5,
        }}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};
