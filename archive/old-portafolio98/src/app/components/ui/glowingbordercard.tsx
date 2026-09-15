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
          'absolute -inset-0.5 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition duration-700 animate-tilt pointer-events-none',
          fromColor,
          toColor,
          'bg-gradient-to-r'
        )}
      />
      <div className='relative flex flex-col h-full bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-sm border border-zinc-800/50'>
        {children}
      </div>
    </div>
  );
}
