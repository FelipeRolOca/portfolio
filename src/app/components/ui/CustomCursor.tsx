"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCanHover } from "./use-can-hover";
import "./FluidGlassCursor.css";

export const CustomCursor = () => {
  const canHover = useCanHover();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  const springConfig = { damping: 22, stiffness: 260, mass: 0.55 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!canHover) {
      setIsVisible(false);
      setIsHovering(false);
      setIsPressing(false);
      mouseX.set(-120);
      mouseY.set(-120);
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
      return;
    }

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor='interactive']"
      );
      setIsHovering(Boolean(interactive));
    };

    const handleMouseDown = () => setIsPressing(true);
    const handleMouseUp = () => setIsPressing(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
    };
  }, [canHover, isVisible, mouseX, mouseY]);

  if (!canHover || !isVisible) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <motion.div
        className="fluid-glass-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressing ? 0.92 : isHovering ? 1.12 : 1,
          width: isHovering ? 88 : 74,
          height: isHovering ? 88 : 74,
          rotate: isHovering ? 10 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <span className="fluid-glass-ring" />
        <span className="fluid-glass-glint" />
        <span className="fluid-glass-core" />
      </motion.div>
    </>
  );
};
