"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { useCanHover } from "./use-can-hover";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canHover || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    setPosition({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
      animate={{ x: canHover ? x : 0, y: canHover ? y : 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};
