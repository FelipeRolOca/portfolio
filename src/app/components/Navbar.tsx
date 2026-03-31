import { motion } from "motion/react";
import { Menu, X, Code2, Languages } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
    setIsOpen(false);
  };

  const navLinks = [
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.skills, href: "#skills" },
    { name: t.navbar.experience, href: "#experience" },
    { name: t.navbar.projects, href: "#projects" },
    { name: t.navbar.contact, href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Felipe Roldan</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 text-sm font-semibold group"
              >
                <Languages className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                {t.navbar.toggle}
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-zinc-950 border-b border-zinc-800"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-zinc-400 hover:text-white block px-3 py-3 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 w-full text-left px-3 py-4 rounded-xl text-base font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all border border-zinc-900/50"
            >
              <div className="p-2 bg-zinc-900 rounded-lg">
                <Languages className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="flex-1">{t.navbar.toggle}</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
