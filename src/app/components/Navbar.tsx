import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Languages,
  Mail,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [activeHref, setActiveHref] = useState("#about");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const navLinks = [
    { name: t.navbar.about, href: "#about", icon: Sparkles },
    { name: t.navbar.skills, href: "#skills", icon: Wrench },
    { name: t.navbar.experience, href: "#experience", icon: BriefcaseBusiness },
    { name: t.navbar.projects, href: "#projects", icon: FolderKanban },
    { name: t.navbar.contact, href: "#contact", icon: Mail },
  ];

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHref(href);
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.35;
      let currentHref = navLinks[0]?.href ?? "#about";

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
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navLinks]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-950/30">
                <Code2 className="text-white w-6 h-6" />
              </div>
              <span className="text-lg md:text-xl font-bold text-white tracking-tight">Felipe Roldan</span>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleScroll(link.href);
                    }}
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
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
                aria-label={t.navbar.toggle}
              >
                <Languages className="h-4 w-4 text-cyan-400" />
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="md:hidden fixed bottom-4 left-1/2 z-[70] w-[calc(100%-1rem)] max-w-sm -translate-x-1/2"
        style={{ paddingBottom: "max(0rem, env(safe-area-inset-bottom))" }}
      >
        <div className="relative overflow-hidden rounded-[30px] border border-zinc-800/80 bg-zinc-950/92 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-16 rounded-full bg-blue-500/10 blur-2xl" />

          <div className="relative grid grid-cols-5 items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeHref === link.href;

              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleScroll(link.href)}
                  className="relative flex h-[62px] items-center justify-center rounded-2xl"
                  aria-label={link.name}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="absolute inset-1 rounded-[20px] border border-blue-500/30 bg-gradient-to-b from-blue-500/25 via-cyan-500/15 to-transparent shadow-[0_10px_30px_rgba(14,165,233,0.18)]"
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <Icon className={`h-[20px] w-[20px] transition-all ${isActive ? "text-white -translate-y-0.5 scale-105" : "text-zinc-500"}`} />
                    <span className={`mt-1 h-1.5 w-1.5 rounded-full transition-all ${isActive ? "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.75)]" : "bg-transparent"}`} />
                    <span className="sr-only">{link.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
