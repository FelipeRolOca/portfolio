import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface LampToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function LampToggle({ isDark, onToggle }: LampToggleProps) {
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
    setStringLength(Math.min(pullDistance, 64));
  };

  const handlePullEnd = () => {
    if (stringLength > 40 && !isAnimating) {
      setIsAnimating(true);
      onToggle();

      setTimeout(() => {
        setIsAnimating(false);
        setStringLength(0);
      }, 800);
    } else {
      setStringLength(0);
    }

    setIsPulling(false);
  };

  return (
    <div className="fixed right-4 top-0 z-50 flex select-none flex-col items-center md:right-6">
      <div className="h-5 w-20 rounded-b-full border border-white/40 bg-white/85 shadow-[0_14px_28px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-neutral-900/85" />

      <div
        ref={stringRef}
        className="relative mt-1 h-40 w-16 touch-none cursor-grab active:cursor-grabbing"
        onMouseDown={handlePullStart}
        onMouseMove={handlePull}
        onMouseUp={handlePullEnd}
        onMouseLeave={handlePullEnd}
        onTouchStart={handlePullStart}
        onTouchMove={handlePull}
        onTouchEnd={handlePullEnd}
      >
        <motion.div
          animate={{ height: 56 + stringLength }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-500 dark:from-neutral-700 dark:via-neutral-400 dark:to-neutral-200"
        />

        <motion.div
          animate={
            isAnimating
              ? { rotate: [0, 7, -5, 3, 0], y: [stringLength, stringLength + 4, 0] }
              : { rotate: isPulling ? Math.min(stringLength / 6, 8) : 0, y: stringLength }
          }
          transition={
            isAnimating
              ? { duration: 0.8, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 240, damping: 18 }
          }
          className="absolute left-1/2 top-12 -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <div className="relative h-10 w-14 rounded-t-full rounded-b-[1rem] border border-neutral-200/80 bg-white/90 shadow-[0_10px_25px_rgba(15,23,42,0.08)] backdrop-blur dark:border-[var(--yellow)]/20 dark:bg-neutral-900/88">
              <div className="absolute inset-x-2 top-2 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>

            <motion.div
              animate={
                isDark
                  ? {
                      scale: [1, 1.06, 1],
                      boxShadow: [
                        '0 0 0 rgba(255,220,0,0)',
                        '0 0 28px rgba(255,220,0,0.55)',
                        '0 0 0 rgba(255,220,0,0)',
                      ],
                    }
                  : {
                      scale: 1,
                      boxShadow: '0 0 0 rgba(255,220,0,0)',
                    }
              }
              transition={{
                duration: 2.4,
                repeat: isDark ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className={`-mt-2 h-9 w-9 rounded-full border ${
                isDark
                  ? 'border-[var(--yellow)]/30 bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)]'
                  : 'border-neutral-300 bg-neutral-200 dark:bg-neutral-700'
              }`}
            />

            <div className="mt-3 h-4 w-4 rounded-full bg-neutral-300 shadow-md dark:bg-neutral-500" />
          </div>
        </motion.div>
      </div>

      <p className="mt-2 rounded-full border border-white/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-300">
        {isDark ? 'Pull to dim' : 'Pull to light'}
      </p>
    </div>
  );
}
