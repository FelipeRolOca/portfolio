import { useRef, useState, ReactNode, useEffect } from 'react';

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

export function CardTilt({
  children,
  className = '',
  tiltMaxAngle = 15,
  tiltReverse = false,
  glareEnable = false,
  scale = 1.05,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMaxAngle;
    const rotateY = ((x - centerX) / centerX) * tiltMaxAngle;

    const finalRotateX = tiltReverse ? -rotateX : rotateX;
    const finalRotateY = tiltReverse ? -rotateY : rotateY;

    setTransform(
      `perspective(1000px) rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) scale(${scale})`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}

export function CardTiltContent({ children, className = '' }: CardTiltContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 });
  };

  const topLineOffset = (mousePos.y / 100) * 20 - 10;
  const bottomLineOffset = (mousePos.y / 100) * 20 - 10;
  const leftLineOffset = (mousePos.x / 100) * 20 - 10;
  const rightLineOffset = (mousePos.x / 100) * 20 - 10;

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--yellow)]/20" />
      <div
        className="pointer-events-none absolute inset-x-4 h-px bg-gradient-to-r from-transparent via-[var(--yellow)]/30 to-transparent transition-all duration-150 ease-out"
        style={{ top: `calc(1rem + ${topLineOffset}px)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-4 h-px bg-gradient-to-r from-transparent via-[var(--yellow)]/30 to-transparent transition-all duration-150 ease-out"
        style={{ bottom: `calc(1rem + ${bottomLineOffset}px)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-4 w-px bg-gradient-to-b from-transparent via-[var(--yellow)]/30 to-transparent transition-all duration-150 ease-out"
        style={{ left: `calc(1rem + ${leftLineOffset}px)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-4 w-px bg-gradient-to-b from-transparent via-[var(--yellow)]/30 to-transparent transition-all duration-150 ease-out"
        style={{ right: `calc(1rem + ${rightLineOffset}px)` }}
      />
      {children}
    </div>
  );
}
