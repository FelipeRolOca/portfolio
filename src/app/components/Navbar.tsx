import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, BriefcaseBusiness, FolderKanban, Mail, Moon, Sparkles, SunMedium, Wrench } from 'lucide-react';
import type { Language, Translation } from '../App';
import GooeyNav from './ui/GooeyNav';

interface NavbarProps {
  language: Language;
  toggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  t: Translation['nav'];
}

export default function Navbar({ language, toggleLanguage, isDark, onToggleTheme, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
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
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 no-outline transition-all duration-300 ${
          isScrolled ? 'border-b border-[var(--yellow)]/20 bg-white shadow-lg dark:bg-gray-900' : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-gradient-to-r from-[var(--yellow-dark)] to-[var(--yellow)] bg-clip-text text-xl font-bold text-transparent"
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
                  className="flex items-center gap-2 rounded-lg border border-[var(--yellow)]/30 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/10 dark:bg-gray-800 dark:text-white"
                >
                  <Globe size={16} className="text-[var(--yellow)]" />
                  <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
                </motion.button>
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/30 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:bg-[var(--yellow)]/10 dark:bg-gray-800 dark:text-white"
                >
                  <Globe size={16} className="text-[var(--yellow-dark)]" />
                  <span>{language === 'es' ? 'EN' : 'ES'}</span>
                </button>

                <button
                  onClick={onToggleTheme}
                  aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--yellow)]/30 bg-white text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:bg-[var(--yellow)]/10 dark:bg-gray-800 dark:text-white"
                >
                  {isDark ? <Moon size={16} className="text-[var(--yellow-dark)]" /> : <SunMedium size={16} className="text-[var(--yellow-dark)]" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div
        className="fixed inset-x-0 bottom-0 left-0 right-0 z-[70] px-3 md:hidden no-outline"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--yellow)]/20 bg-white/95 px-2 pb-2 pt-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-colors duration-1000 dark:bg-gray-900/95">
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
                            ? 'translate-y-1 scale-110 text-[var(--yellow-dark)] drop-shadow-[0_0_8px_rgba(255,220,0,0.3)]'
                            : 'text-gray-400 hover:text-[var(--yellow-dark)] dark:text-gray-500'
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
