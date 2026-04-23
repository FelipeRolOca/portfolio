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
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import GooeyNav from "./ui/GooeyNav";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [activeHref, setActiveHref] = useState("#about");

  const navLinks = useMemo(
    () => [
      { name: t.navbar.about, href: "#about", icon: Sparkles },
      { name: t.navbar.skills, href: "#skills", icon: Wrench },
      { name: t.navbar.experience, href: "#experience", icon: BriefcaseBusiness },
      { name: t.navbar.projects, href: "#projects", icon: FolderKanban },
      { name: t.navbar.contact, href: "#contact", icon: Mail },
    ],
    [t]
  );

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHref(href);
  };

  useEffect(() => {
    let isTicking = false;

    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.4;
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
      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateActiveSection);
        isTicking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navLinks]);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-500/10 bg-[rgba(5,7,18,0.78)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-tr from-sky-500 to-cyan-400 shadow-[0_12px_30px_rgba(34,211,238,0.18)]">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white md:text-xl">Felipe Roldan</span>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center gap-4">
                <GooeyNav
                  items={navLinks.map((link) => ({ label: link.name, href: link.href }))}
                  activeHref={activeHref}
                  onItemSelect={handleScroll}
                />
                <button
                  onClick={toggleLanguage}
                  className="group flex items-center gap-2 rounded-2xl border border-cyan-400/15 bg-[rgba(10,15,30,0.72)] px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-cyan-300/30 hover:text-white"
                >
                  <Languages className="h-4 w-4 text-cyan-300 transition-transform group-hover:rotate-12" />
                  {t.navbar.toggle}
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-[rgba(10,15,30,0.82)] px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.24)]"
                aria-label={t.navbar.toggle}
              >
                <Languages className="h-4 w-4 text-cyan-300" />
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-x-0 bottom-0 z-[70] px-3 md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/12 bg-[rgba(8,12,24,0.9)] px-2 pb-2 pt-2 shadow-[0_18px_45px_rgba(2,6,23,0.42)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-10 top-2 h-14 rounded-full bg-cyan-400/8 blur-2xl" />
            <div className="pointer-events-none absolute inset-px rounded-[31px] border border-white/5" />

            <div className="relative grid grid-cols-5 items-end gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeHref === link.href;

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleScroll(link.href)}
                    className="relative flex h-[66px] items-center justify-center rounded-2xl"
                    aria-label={link.name}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="absolute top-2 h-1 w-8 rounded-full bg-cyan-400 shadow-[0_2px_10px_rgba(34,211,238,0.6)]"
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon
                        className={`h-[22px] w-[22px] transition-all duration-300 ${isActive ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] translate-y-1" : "text-zinc-500 hover:text-zinc-300"
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
