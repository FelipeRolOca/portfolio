'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import { cn } from './utils';
import { useCanHover } from './use-can-hover';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  tiltReverse?: boolean;
  scale?: number;
  showDashedBorder?: boolean;
}

interface CardTiltContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardTiltContext = React.createContext<{
  rotateX: MotionValue<number> | number;
  rotateY: MotionValue<number> | number;
  scale: MotionValue<number> | number;
} | null>(null);

const CardTilt = React.forwardRef<HTMLDivElement, CardTiltProps>(
  (
    {
      children,
      className,
      tiltMaxAngle = 10,
      tiltReverse = false,
      scale = 1.05,
      showDashedBorder = false,
      ...props
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canHover = useCanHover();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(
      mouseYSpring,
      [-0.5, 0.5],
      tiltReverse
        ? [tiltMaxAngle, -tiltMaxAngle]
        : [-tiltMaxAngle, tiltMaxAngle],
    );
    const rotateY = useTransform(
      mouseXSpring,
      [-0.5, 0.5],
      tiltReverse
        ? [-tiltMaxAngle, tiltMaxAngle]
        : [tiltMaxAngle, -tiltMaxAngle],
    );

    const scaleValue = useSpring(1, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !containerRef.current) return;

      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        scaleValue.set(scale);
      });
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      scaleValue.set(1);
    };

    React.useImperativeHandle(forwardedRef, () => containerRef.current!);

    return (
      <CardTiltContext.Provider value={{ 
        rotateX: canHover ? rotateX : 0, 
        rotateY: canHover ? rotateY : 0, 
        scale: canHover ? scaleValue : 1 
      }}>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn('relative inline-block w-full h-full', className)}
          style={{ perspective: canHover ? '1000px' : 'none' }}
          {...props}
        >
          {showDashedBorder && (
            <div className='absolute inset-0 rounded-2xl border-2 border-dashed border-zinc-800 pointer-events-none' />
          )}
          {children}
        </div>
      </CardTiltContext.Provider>
    );
  },
);
CardTilt.displayName = 'CardTilt';

const CardTiltContent = React.forwardRef<HTMLDivElement, CardTiltContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(CardTiltContext);
    const canHover = useCanHover();

    if (!context) {
      throw new Error('CardTiltContent must be used within CardTilt');
    }

    const { rotateX, rotateY, scale } = context;

    return (
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: canHover ? 'preserve-3d' : 'flat',
          willChange: canHover ? 'transform' : 'auto',
        }}
        className={cn('relative w-full h-full', className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
CardTiltContent.displayName = 'CardTiltContent';

export { CardTilt, CardTiltContent };
