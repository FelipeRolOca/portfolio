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
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="flex flex-shrink-0 items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-600 shadow-lg shadow-blue-950/30">
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
                  className="group flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-semibold text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                >
                  <Languages className="h-4 w-4 text-cyan-400 transition-transform group-hover:rotate-12" />
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
        className="fixed inset-x-0 bottom-0 z-[70] px-3 md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-sm">
          <div className="relative overflow-visible rounded-t-[30px] border-x border-t border-zinc-800/80 bg-zinc-950/96 px-2 pb-3 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-16 rounded-full bg-blue-500/10 blur-2xl" />

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
                        layoutId="mobile-nav-bubble"
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="absolute left-1/2 top-1 h-[54px] w-[54px] -translate-x-1/2 rounded-full border border-blue-200/80 bg-white shadow-[0_10px_30px_rgba(96,165,250,0.35)]"
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-shadow"
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="absolute left-1/2 top-0 h-[60px] w-[60px] -translate-x-1/2 rounded-full border-4 border-zinc-950/90"
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon className={`h-[20px] w-[20px] transition-all ${isActive ? "text-zinc-950 -translate-y-2 scale-105" : "translate-y-1 text-zinc-500"}`} />
                      {!isActive && <span className="mt-2 h-1.5 w-1.5 rounded-full bg-transparent" />}
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
