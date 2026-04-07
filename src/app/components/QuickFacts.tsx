import { motion } from "motion/react";
import { BriefcaseBusiness, GraduationCap, Languages, MapPin, Sparkles } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { useLanguage } from "../i18n/LanguageContext";
import BorderGlow from "./ui/BorderGlow";

export function QuickFacts() {
  const { t } = useLanguage();

  const quickFacts = [
    {
      label: t.quickFacts.ageLabel,
      value: t.quickFacts.ageValue,
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      glowColor: "210 100 74",
      borderColors: ["#2563eb", "#38bdf8", "#22d3ee"],
    },
    {
      label: t.quickFacts.educationLabel,
      value: t.quickFacts.educationValue,
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      glowColor: "190 96 72",
      borderColors: ["#0891b2", "#22d3ee", "#67e8f9"],
    },
    {
      label: t.quickFacts.focusLabel,
      value: t.quickFacts.focusValue,
      icon: <BriefcaseBusiness className="w-5 h-5 text-emerald-400" />,
      glowColor: "160 84 68",
      borderColors: ["#0f766e", "#14b8a6", "#2dd4bf"],
    },
    {
      label: t.quickFacts.englishLabel,
      value: t.quickFacts.englishValue,
      icon: <Languages className="w-5 h-5 text-orange-400" />,
      glowColor: "38 96 72",
      borderColors: ["#d97706", "#f59e0b", "#fbbf24"],
    },
    {
      label: t.quickFacts.locationLabel,
      value: t.quickFacts.locationValue,
      icon: <MapPin className="w-5 h-5 text-rose-400" />,
      glowColor: "350 92 76",
      borderColors: ["#e11d48", "#fb7185", "#f43f5e"],
    },
  ];

  return (
    <section className="relative pt-4 pb-12 md:pt-6 md:pb-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
        >
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className={index === quickFacts.length - 1 ? "min-[560px]:col-span-2 lg:col-span-1" : ""}
            >
              <BorderGlow
                className="h-full transition-transform duration-300 hover:-translate-y-1"
                contentClassName="min-h-[124px]"
                glowColor={fact.glowColor}
                colors={fact.borderColors}
                backgroundColor="#060010"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                fillOpacity={0.5}
              >
                <SpotlightCard
                  className="h-full border-transparent bg-transparent shadow-none"
                  innerClassName="p-5 sm:p-5 min-h-[124px]"
                  spotlightColor="rgba(34, 211, 238, 0.10)"
                >
                  <div className="flex flex-col items-start gap-4 min-[720px]:flex-row min-[720px]:items-start">
                    <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 shadow-inner">
                      {fact.icon}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-1">{fact.label}</p>
                      <p className="text-sm sm:text-base font-semibold text-white leading-snug break-words pr-1">{fact.value}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
