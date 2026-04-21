import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { Language } from '../../App';

interface LampToggleProps {
  isDark: boolean;
  onToggle: () => void;
  language: Language;
}

export function LampToggle({ isDark, onToggle, language }: LampToggleProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [stringLength, setStringLength] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const stringRef = useRef<HTMLDivElement>(null);

  const handlePullStart = () => {
    setIsPulling(true);
  };

  const handlePull = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPulling || isAnimating) return;

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = stringRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pullDistance = Math.max(0, clientY - rect.top);
    setStringLength(Math.min(pullDistance, 62));
  };

  const handlePullEnd = () => {
    if (stringLength > 38 && !isAnimating) {
      setIsAnimating(true);
      onToggle();

      setTimeout(() => {
        setIsAnimating(false);
        setStringLength(0);
      }, 700);
    } else {
      setStringLength(0);
    }

    setIsPulling(false);
  };

  const label =
    language === 'es'
      ? isDark
        ? 'Tirar para apagar'
        : 'Tirar para encender'
      : isDark
        ? 'Pull to turn off'
        : 'Pull to turn on';

  return (
    <div className="fixed right-4 top-0 z-50 flex select-none flex-col items-center md:right-6">
      <div
        ref={stringRef}
        className="relative h-36 w-16 touch-none cursor-grab active:cursor-grabbing"
        onMouseDown={handlePullStart}
        onMouseMove={handlePull}
        onMouseUp={handlePullEnd}
        onMouseLeave={handlePullEnd}
        onTouchStart={handlePullStart}
        onTouchMove={handlePull}
        onTouchEnd={handlePullEnd}
      >
        <motion.div
          animate={{ height: 58 + stringLength }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-400 to-neutral-500 dark:via-neutral-500 dark:to-neutral-300"
        />

        <motion.div
          animate={
            isAnimating
              ? { y: [stringLength, stringLength + 6, 0] }
              : { y: stringLength, scale: isPulling ? 1.08 : 1 }
          }
          transition={
            isAnimating
              ? { duration: 0.7, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 260, damping: 18 }
          }
          className={`absolute left-1/2 top-14 h-8 w-8 -translate-x-1/2 rounded-full border shadow-md ${
            isDark
              ? 'border-[var(--yellow)]/35 bg-[var(--yellow)] shadow-[0_0_22px_rgba(255,220,0,0.35)]'
              : 'border-neutral-300 bg-white'
          }`}
        />
      </div>

      <p className="mt-2 rounded-full border border-white/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-300">
        {label}
      </p>
    </div>
  );
}
