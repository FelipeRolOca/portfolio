import { motion } from 'motion/react';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-1000">
      <motion.div
        className="relative flex h-24 w-24 items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute h-full w-full rounded-full border-4 border-transparent border-t-[var(--yellow)] border-r-[var(--yellow)] animate-spin" style={{ animationDuration: '1s' }} />
        <div className="absolute h-16 w-16 rounded-full border-4 border-transparent border-b-[var(--yellow)] border-l-[var(--yellow)] animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        
        <span className="text-xl font-bold tracking-widest text-gray-800 dark:text-gray-200">
          FR
        </span>
      </motion.div>
      <motion.p
        className="mt-6 text-sm font-medium tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Cargando Experiencia
      </motion.p>
    </div>
  );
}
