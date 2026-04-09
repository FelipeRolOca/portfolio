import React from 'react';
import { cn } from './utils';

type GlowingBorderCardProps = {
  children: React.ReactNode;
  fromColor: string;
  toColor: string;
  className?: string;
};

export default function GlowingBorderCard({
  children,
  fromColor,
  toColor,
  className,
}: GlowingBorderCardProps) {
  return (
    <div className={cn('relative group', className)}>
      <div
        className={cn(
          'absolute -inset-0.5 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt',
          // Tailwind v4 dynamic colors work if these are base colors (blue-500, etc.)
          `bg-gradient-to-r from-${fromColor} to-${toColor}`,
        )}
      />
      <div className='relative flex flex-col h-full bg-white dark:bg-zinc-950 rounded-lg p-6'>
        {children}
      </div>
    </div>
  );
}
