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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-8 md:pt-20 transition-colors duration-1000 dark:bg-gray-900">
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-[var(--yellow)]/18 to-transparent"
            style={{
              left: `${16 + i * 14}%`,
              height: '100%',
            }}
            animate={{ opacity: [0.08, 0.2, 0.08] }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 py-12 md:py-20 md:flex-row md:gap-14">
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
            className="mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white sm:text-4xl md:text-5xl lg:text-7xl"
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
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] px-8 py-4 font-semibold text-black shadow-lg transition-all md:hover:scale-105 md:hover:shadow-[0_0_30px_rgba(255,220,0,0.55)] active:scale-95"
            >
              {t.cta1}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="rounded-full border-2 border-[var(--yellow)] px-8 py-4 font-semibold text-gray-900 transition-all md:hover:scale-105 md:hover:bg-[var(--yellow)]/10 dark:text-white active:scale-95"
            >
              {t.cta2}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-1 justify-center"
        >
          <div className="relative w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[23rem]">
            <div className="absolute -inset-5 rounded-[2.2rem] border border-[var(--yellow)]/18 opacity-70" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--yellow)]/30 bg-white p-3 shadow-[0_28px_90px_rgba(15,23,42,0.16)] dark:bg-[#121417] dark:shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
            >
              <div className="overflow-hidden rounded-[1.4rem] border border-[var(--yellow)]/20 bg-[#f7f5ef] dark:bg-[#181b1f]">
                <img
                  src="/felipe.png"
                  alt="Felipe Roldan"
                  className="aspect-[4/5] w-full object-contain object-center"
                />
              </div>
            </motion.div>
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
