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
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      key={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("inline-flex flex-wrap items-center gap-x-[0.25em]", className)}
    >
      {words.map((word, wordIndex) => (
        <motion.span key={wordIndex} variants={wordVariants} className="whitespace-nowrap">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
