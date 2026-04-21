import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  href: string;
  label: string;
}

interface LamphomeProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  children?: ReactNode;
  className?: string;
}

export function Lamphome({
  title = 'SCROLLX UI',
  description = 'An open-source collection.',
  logoSrc,
  logoAlt = 'Logo',
  navItems = [],
  children,
  className = '',
}: LamphomeProps) {
  const [isDark, setIsDark] = useState(false);
  const [lampOn, setLampOn] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      setLampOn(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setLampOn(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${isDark ? 'dark' : ''} ${className}`}>
      {/* Lamp Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-24 right-6 z-50 w-16 h-16 rounded-full bg-white dark:bg-neutral-900 shadow-2xl flex items-center justify-center border-2 border-gray-200 dark:border-[var(--yellow)]/30 hover:scale-110 transition-transform"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {lampOn ? (
            <motion.div
              key="lamp-on"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_0_20px_rgba(255,220,0,0.6)]">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-dark)]" />
              </div>
              <div className="absolute -inset-2 rounded-full bg-[var(--yellow)]/20 blur-xl animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="lamp-off"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-gray-300"
            />
          )}
        </AnimatePresence>
      </button>

      {/* Lamp Light Effect */}
      <AnimatePresence>
        {lampOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none bg-gradient-to-br from-[var(--yellow)]/20 via-transparent to-transparent z-40"
          />
        )}
      </AnimatePresence>

      {children}
    </div>
  );
}
