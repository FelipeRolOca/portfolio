"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest("[data-particle-target]") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0)",
        }}
        transition={{ type: "spring", bounce: 0.3 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-400 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};
