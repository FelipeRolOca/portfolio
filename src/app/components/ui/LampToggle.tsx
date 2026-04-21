import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
    setStringLength(Math.min(pullDistance, 60));
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
    <div className="fixed top-24 right-8 z-50 flex flex-col items-center">
      {/* String from top */}
      <div className="w-0.5 h-16 bg-gray-300" />
      
      {/* Pull string */}
      <div 
        ref={stringRef}
        className="relative w-12 h-32 cursor-grab active:cursor-grabbing"
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
          animate={{ height: 32 + stringLength }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gray-400"
        />
        
        {/* Pull handle (dot) */}
        <motion.div
          animate={{ y: stringLength }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4 h-4 rounded-full bg-gray-400 shadow-md"
        />
      </div>

      {/* Instruction */}
      <p className="text-xs text-gray-500 mt-3 font-medium">
        {isDark ? 'Pull to turn off' : 'Pull to turn on'}
      </p>
    </div>
  );
}
