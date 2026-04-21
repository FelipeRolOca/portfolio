import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  tiltReverse?: boolean;
  glareEnable?: boolean;
  scale?: number;
}

interface CardTiltContentProps {
  children: ReactNode;
  className?: string;
}

const tiltSpring = {
  stiffness: 190,
  damping: 20,
  mass: 0.75,
};

const scaleSpring = {
  stiffness: 220,
  damping: 18,
  mass: 0.7,
};

export function CardTilt({
  children,
  className = '',
  tiltMaxAngle = 15,
  tiltReverse = false,
  glareEnable = false,
  scale = 1.05,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const hoverScale = useSpring(1, scaleSpring);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const pointerActive = useMotionValue(0);
  const pointerXVar = useMotionTemplate`${pointerX}%`;
  const pointerYVar = useMotionTemplate`${pointerY}%`;

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    hoverScale.set(1);
    pointerX.set(50);
    pointerY.set(50);
    pointerActive.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia('(hover: none)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    const maxX = tiltReverse ? tiltMaxAngle : -tiltMaxAngle;
    const maxY = tiltReverse ? -tiltMaxAngle : tiltMaxAngle;

    rotateX.set((relativeY - 0.5) * maxX * 2);
    rotateY.set((relativeX - 0.5) * maxY * 2);
    hoverScale.set(scale);
    pointerX.set(relativeX * 100);
    pointerY.set(relativeY * 100);
    pointerActive.set(glareEnable ? 1 : 0.92);
  };

  const tiltStyle = {
    rotateX,
    rotateY,
    scale: hoverScale,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    '--pointer-x': pointerXVar,
    '--pointer-y': pointerYVar,
    '--pointer-active': pointerActive,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (!window.matchMedia('(hover: none)').matches) hoverScale.set(scale);
      }}
      onMouseLeave={() => {
        resetTilt();
      }}
      style={{ perspective: '1600px' }}
    >
      <motion.div style={tiltStyle}>
        {children}
      </motion.div>
    </div>
  );
}

export function CardTiltContent({ children, className = '' }: CardTiltContentProps) {
  return (
    <div className={`relative h-full [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}
