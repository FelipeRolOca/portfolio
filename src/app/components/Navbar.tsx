import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import type { Language, Translation } from '../App';

interface NavbarProps {
  language: Language;
  toggleLanguage: () => void;
  t: Translation['nav'];
}

export default function Navbar({ language, toggleLanguage, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-[var(--yellow)]' : 'bg-transparent'
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

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: t.about, id: 'about' },
              { label: t.skills, id: 'skills' },
              { label: t.experience, id: 'experience' },
              { label: t.projects, id: 'projects' },
              { label: t.contact, id: 'contact' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm hover:text-[var(--yellow-dark)] transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--yellow)] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] text-black hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] transition-shadow"
            >
              <Globe size={16} />
              <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
            </motion.button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[var(--yellow-dark)]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 py-4 border-t border-[var(--yellow)]/20"
          >
            {[
              { label: t.about, id: 'about' },
              { label: t.skills, id: 'skills' },
              { label: t.experience, id: 'experience' },
              { label: t.projects, id: 'projects' },
              { label: t.contact, id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 hover:text-[var(--yellow-dark)] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] text-black w-full justify-center"
            >
              <Globe size={16} />
              <span className="font-medium">{language === 'es' ? 'English' : 'Español'}</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
