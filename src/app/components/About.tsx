import { motion } from "motion/react";
import { BookOpen, Lightbulb, Users } from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { useLanguage } from "../i18n/LanguageContext";
import CardSwap, { Card } from "./ui/CardSwap";

export function About() {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const aboutCards = [
    {
      icon: BookOpen,
      eyebrow: "01",
      title: t.about.card1Title,
      description: t.about.card1Desc,
      accent: "from-blue-500/20 via-blue-500/5 to-transparent",
      badge: "border-blue-500/20 bg-blue-500/10 text-blue-300",
      iconWrap: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    },
    {
      icon: Lightbulb,
      eyebrow: "02",
      title: t.about.card2Title,
      description: t.about.card2Desc,
      accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      badge: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
      iconWrap: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    },
    {
      icon: Users,
      eyebrow: "03",
      title: t.about.card3Title,
      description: t.about.card3Desc,
      accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
      iconWrap: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-500">{t.about.sectionSubtitle}</h2>
          <TextReveal text={t.about.sectionTitle} className="justify-center text-3xl font-bold text-white md:text-4xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-500">{t.about.aboutSubtitle}</h2>
              <p className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {t.about.aboutTitleLine1} <br /> {t.about.aboutTitleLine2}
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-zinc-400">
              {t.about.p1}
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-zinc-400">
              {t.about.p2}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="relative min-h-[440px] lg:min-h-[560px]">
            <div className="absolute inset-0 rounded-[32px] border border-zinc-800/80 bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(9,9,11,0.92))]" />
            <div className="absolute inset-x-8 top-10 h-32 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute inset-y-10 right-4 w-24 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[32px] p-6 sm:p-8">
              <div className="max-w-sm space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300">
                  {language === "es" ? "Motores clave" : "Core Drivers"}
                </span>
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {language === "es"
                    ? "Cada tarjeta resume una parte de como pienso, construyo y colaboro cuando llevo una idea a produccion."
                    : "Each card captures a core part of how I think, build, and collaborate when turning an idea into production."}
                </p>
              </div>

              <div className="mt-8 flex-1 rounded-[28px] border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5">
                <CardSwap
                  delay={5000}
                  pauseOnHover
                  className="h-full min-h-[340px]"
                  viewportClassName="rounded-[24px] border border-zinc-800/80 bg-zinc-950/80"
                >
                  {aboutCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Card key={item.title} customClassName="relative h-full w-full">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                        <div className="relative flex h-full flex-col justify-between p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${item.iconWrap}`}>
                              <Icon className="h-7 w-7" />
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.22em] ${item.badge}`}>
                              {item.eyebrow}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            <p className="max-w-[30ch] text-sm leading-relaxed text-zinc-300">{item.description}</p>
                          </div>

                          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                            <span>Auto Slide</span>
                            <span>{language === "es" ? "Seccion About" : "About Section"}</span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
