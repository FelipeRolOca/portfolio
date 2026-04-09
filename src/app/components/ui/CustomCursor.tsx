"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCanHover } from "./use-can-hover";

export const CustomCursor = () => {
  const canHover = useCanHover();
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.1 };
  const springConfigOuter = { stiffness: 250, damping: 20, mass: 0.5 };
  
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  const mouseXSpringOuter = useSpring(mouseX, springConfigOuter);
  const mouseYSpringOuter = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    if (!canHover) return;

    let rafId: number;
    
    const updateMousePosition = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
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
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [canHover, mouseX, mouseY]);

  if (!canHover) return null;

  return (
    <>
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-cyan-400 mix-blend-screen overflow-hidden"
        style={{ 
          left: 0, 
          top: 0, 
          x: mouseXSpring, 
          y: mouseYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] h-10 w-10 rounded-full border-[1.5px] border-cyan-400 mix-blend-screen overflow-hidden"
        style={{ 
          left: 0, 
          top: 0, 
          x: mouseXSpringOuter, 
          y: mouseYSpringOuter,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.3 : 0.6,
        }}
      />
    </>
  );
};
