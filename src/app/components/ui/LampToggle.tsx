import { useEffect, useRef, useState } from 'react';
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
  const timeoutRef = useRef<number | null>(null);
  const baseHeight = 126;

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      setStringLength(0);
      onToggle();

      timeoutRef.current = window.setTimeout(() => {
        setIsAnimating(false);
        timeoutRef.current = null;
      }, 450);
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
    <div className="fixed right-4 top-0 z-[60] hidden select-none flex-col items-center md:flex md:right-6">
      <div
        ref={stringRef}
        className="relative h-56 w-16 touch-none cursor-grab active:cursor-grabbing"
        role="button"
        tabIndex={0}
        aria-label={label}
        onMouseDown={handlePullStart}
        onMouseMove={handlePull}
        onMouseUp={handlePullEnd}
        onMouseLeave={handlePullEnd}
        onTouchStart={handlePullStart}
        onTouchMove={handlePull}
        onTouchEnd={handlePullEnd}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (!isAnimating) {
              setIsAnimating(true);
              setStringLength(0);
              onToggle();

              timeoutRef.current = window.setTimeout(() => {
                setIsAnimating(false);
                timeoutRef.current = null;
              }, 450);
            }
          }
        }}
      >
        <motion.div
          animate={{ height: baseHeight + stringLength }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="absolute left-1/2 top-0 w-8 -translate-x-1/2"
        >
          <div className="absolute left-1/2 top-0 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-400 to-neutral-500 dark:via-neutral-500 dark:to-neutral-300" />
          <motion.div
            animate={isAnimating ? { scale: [1, 1.08, 1] } : { scale: isPulling ? 1.08 : 1 }}
            transition={
              isAnimating
                ? { duration: 0.45, times: [0, 0.45, 1], ease: 'easeInOut' }
                : { type: 'spring', stiffness: 260, damping: 18 }
            }
            className={`absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border shadow-md ${
              isDark
                ? 'border-[var(--yellow)]/35 bg-[var(--yellow)] shadow-[0_0_22px_rgba(255,220,0,0.35)]'
                : 'border-neutral-300 bg-white'
            }`}
          />
        </motion.div>
      </div>

      <p className="mt-2 rounded-full border border-white/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-300">
        {label}
      </p>
    </div>
  );
}
