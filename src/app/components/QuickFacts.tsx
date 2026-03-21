import { motion } from "motion/react";
import { BriefcaseBusiness, GraduationCap, Languages, MapPin, Sparkles } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";

const quickFacts = [
  {
    label: "Age",
    value: "20 years old",
    icon: <Sparkles className="w-5 h-5 text-blue-400" />,
  },
  {
    label: "Education",
    value: "Computer Engineering Student",
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
  },
  {
    label: "Focus",
    value: "Open to Trainee / Junior IT Roles",
    icon: <BriefcaseBusiness className="w-5 h-5 text-emerald-400" />,
  },
  {
    label: "English",
    value: "B2 Level",
    icon: <Languages className="w-5 h-5 text-orange-400" />,
  },
  {
    label: "Location",
    value: "San Pedro, Buenos Aires",
    icon: <MapPin className="w-5 h-5 text-rose-400" />,
  },
];

export function QuickFacts() {
  return (
    <section className="relative pt-4 pb-12 md:pt-6 md:pb-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
        >
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className={index === quickFacts.length - 1 ? "col-span-2 lg:col-span-1" : ""}
            >
              <SpotlightCard
                data-particle-target
                className="h-full border-zinc-800/80 bg-zinc-900/65 transition-transform duration-300 hover:-translate-y-1"
                innerClassName="p-4 sm:p-5 min-h-[112px]"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 shadow-inner">
                    {fact.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-1">{fact.label}</p>
                    <p className="text-sm sm:text-base font-semibold text-white leading-snug max-w-[18ch]">{fact.value}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
