import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LampToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function LampToggle({ isDark, onToggle }: LampToggleProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [stringLength, setStringLength] = useState(0);
  const [lampSwing, setLampSwing] = useState(0);
  const stringRef = useRef<HTMLDivElement>(null);

  const handlePullStart = () => {
    setIsPulling(true);
  };

  const handlePull = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPulling) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = stringRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pullDistance = Math.max(0, clientY - rect.top);
    setStringLength(Math.min(pullDistance, 100));
  };

  const handlePullEnd = () => {
    if (stringLength > 50) {
      onToggle();
      setLampSwing(15);
      setTimeout(() => setLampSwing(0), 500);
    }
    setIsPulling(false);
    setStringLength(0);
  };

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col items-center">
      {/* Lamp */}
      <motion.div
        animate={{ rotate: lampSwing }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_0_30px_rgba(255,220,0,0.6)] relative overflow-hidden">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-dark)]" />
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="on"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full bg-[var(--yellow)]/30 blur-md"
              />
            ) : null}
          </AnimatePresence>
          {/* Light rays */}
          <AnimatePresence>
            {isDark && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-4 rounded-full bg-[var(--yellow)]/20 blur-xl"
              />
            )}
          </AnimatePresence>
        </div>
        {/* Lamp cord */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 bg-gray-400" style={{ height: `${80 + stringLength}px` }} />
      </motion.div>

      {/* Pull string */}
      <div 
        ref={stringRef}
        className="relative w-8 h-24 cursor-grab active:cursor-grabbing"
        onMouseDown={handlePullStart}
        onMouseMove={handlePull}
        onMouseUp={handlePullEnd}
        onMouseLeave={handlePullEnd}
        onTouchStart={handlePullStart}
        onTouchMove={handlePull}
        onTouchEnd={handlePullEnd}
      >
        {/* String */}
        <motion.div
          animate={{ height: 40 + stringLength }}
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
        />
        
        {/* Pull handle */}
        <motion.div
          animate={{ y: stringLength }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-md border-2 border-gray-500 flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-gray-500" />
        </motion.div>
      </div>

      {/* Instruction */}
      <p className="text-xs text-gray-500 mt-2 font-medium">
        {isDark ? 'Pull to turn off' : 'Pull to turn on'}
      </p>
    </div>
  );
}
