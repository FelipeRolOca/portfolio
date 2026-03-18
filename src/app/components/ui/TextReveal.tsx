"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ text, className, delay = 0 }: TextRevealProps) => {
  const letters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("inline-flex flex-wrap items-center", className)}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className={char === " " ? "mr-2 whitespace-pre" : ""}
          transition={{ duration: 0.4 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
