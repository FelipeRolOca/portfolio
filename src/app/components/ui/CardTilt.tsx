import { useRef, useState, ReactNode } from 'react';

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
  return <div className={className}>{children}</div>;
}
