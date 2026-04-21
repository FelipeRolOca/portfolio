import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import type { Translation } from '../App';

interface HeroProps {
  t: Translation['hero'];
}

export default function Hero({ t }: HeroProps) {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-20 transition-colors duration-1000 dark:bg-gray-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <div className="relative h-[30rem] w-[min(92vw,72rem)]">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute left-1/2 top-0 h-12 w-28 -translate-x-1/2 rounded-b-[2rem] border border-[var(--yellow)]/20 bg-white/80 shadow-[0_12px_30px_rgba(255,220,0,0.14)] backdrop-blur dark:bg-gray-900/85 dark:shadow-[0_12px_32px_rgba(255,220,0,0.2)]"
          />

          <motion.div
            animate={{ opacity: [0.45, 0.72, 0.45], scaleX: [1, 1.03, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-10 h-[28rem] w-full -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,220,0,0.28)_0%,rgba(255,220,0,0.12)_30%,rgba(255,220,0,0.04)_60%,transparent_78%)] opacity-45 blur-3xl [clip-path:polygon(48%_0%,52%_0%,88%_100%,12%_100%)] dark:opacity-100"
          />

          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-10 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,130,0.55),transparent_72%)] blur-3xl dark:opacity-95"
          />
        </div>
      </div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-[var(--yellow)]/25 to-transparent"
            style={{
              left: `${12 + i * 11}%`,
              height: '100%',
            }}
            animate={{ opacity: [0.12, 0.28, 0.12] }}
            transition={{
              duration: 3.5 + i * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-6 py-20 md:flex-row md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--yellow-dark)]"
          >
            {t.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white md:text-7xl"
          >
            {t.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-3xl font-semibold text-[var(--yellow-dark)] md:text-4xl"
          >
            {t.role}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 220, 0, 0.55)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] px-8 py-4 font-semibold text-black shadow-lg transition-all hover:shadow-[0_0_30px_rgba(255,220,0,0.45)]"
            >
              {t.cta1}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="rounded-full border-2 border-[var(--yellow)] px-8 py-4 font-semibold text-gray-900 transition-all hover:bg-[var(--yellow)]/10 dark:text-white"
            >
              {t.cta2}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1"
        >
          <div className="relative mx-auto aspect-square w-full max-w-xs md:max-w-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-[var(--yellow)]/30"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border border-[var(--yellow)]/35"
            />

            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.28, 0.4, 0.28] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-16 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] blur-3xl"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-48 w-48 overflow-hidden rounded-full border-4 border-[var(--yellow)] shadow-[0_20px_60px_rgba(255,220,0,0.22)] md:h-64 md:w-64 lg:h-72 lg:w-72"
              >
                <img src="/felipe.png" alt="Felipe Roldan" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="text-[var(--yellow-dark)]" size={32} />
      </motion.div>
    </section>
  );
}
