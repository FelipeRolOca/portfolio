import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles, Wrench, BriefcaseBusiness, FolderKanban, Mail } from 'lucide-react';
import type { Language, Translation } from '../App';
import GooeyNav from './ui/GooeyNav';

interface NavbarProps {
  language: Language;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  isDark: boolean;
  t: Translation['nav'];
}

export default function Navbar({ language, toggleLanguage, toggleTheme, isDark, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');

  const navLinks = useMemo(
    () => [
      { name: t.about, href: '#about', icon: Sparkles },
      { name: t.skills, href: '#skills', icon: Wrench },
      { name: t.experience, href: '#experience', icon: BriefcaseBusiness },
      { name: t.projects, href: '#projects', icon: FolderKanban },
      { name: t.contact, href: '#contact', icon: Mail },
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.4;
      let currentHref = navLinks[0]?.href ?? '#about';

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentHref = link.href;
        }
      });

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [navLinks]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHref(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-[var(--yellow)]/20' : 'bg-white/95 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-[var(--yellow-dark)] to-[var(--yellow)] bg-clip-text text-transparent cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              FO
            </motion.div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center gap-4">
                <GooeyNav
                  items={navLinks.map((link) => ({ label: link.name, href: link.href }))}
                  activeHref={activeHref}
                  onItemSelect={scrollToSection}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--yellow)]/30 bg-white text-sm font-semibold text-gray-900 transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/10"
                >
                  <Globe size={16} className="text-[var(--yellow)]" />
                  <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full bg-white border-2 border-[var(--yellow)]/30 flex items-center justify-center hover:border-[var(--yellow)] transition-all shadow-md"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="lamp-on"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_0_15px_rgba(255,220,0,0.6)]">
                          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-dark)]" />
                        </div>
                        <div className="absolute -inset-1.5 rounded-full bg-[var(--yellow)]/20 blur-lg animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="lamp-off"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5 rounded-full bg-gray-300"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/30 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-[var(--yellow)]/10 transition-all"
              >
                <Globe size={16} className="text-[var(--yellow-dark)]" />
                <span>{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-white border-2 border-[var(--yellow)]/30 flex items-center justify-center hover:border-[var(--yellow)] transition-all shadow-md"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="lamp-on"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_0_15px_rgba(255,220,0,0.6)]">
                        <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-dark)]" />
                      </div>
                      <div className="absolute -inset-1.5 rounded-full bg-[var(--yellow)]/20 blur-lg animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lamp-off"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 rounded-full bg-gray-300"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div
        className="fixed inset-x-0 bottom-0 left-0 right-0 z-[70] px-3 md:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--yellow)]/20 bg-white/95 backdrop-blur-xl px-2 pb-2 pt-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-x-10 top-2 h-14 rounded-full bg-[var(--yellow)]/6 blur-2xl" />
            <div className="pointer-events-none absolute inset-px rounded-[31px] border border-[var(--yellow)]/10" />

            <div className="relative grid grid-cols-5 items-end gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeHref === link.href;

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="relative flex h-[66px] items-center justify-center rounded-2xl"
                    aria-label={link.name}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        className="absolute top-2 h-1 w-8 rounded-full bg-[var(--yellow)] shadow-[0_2px_10px_rgba(255,220,0,0.6)]"
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon
                        className={`h-[22px] w-[22px] transition-all duration-300 ${
                          isActive
                            ? 'text-[var(--yellow-dark)] scale-110 drop-shadow-[0_0_8px_rgba(255,220,0,0.3)] translate-y-1'
                            : 'text-gray-400 hover:text-[var(--yellow-dark)]'
                        }`}
                      />
                      <span className="sr-only">{link.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
