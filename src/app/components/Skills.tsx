import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { 
  Code, 
  Globe, 
  Database, 
  Wrench,
  Zap,
  ChevronDown
} from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { useCanHover } from "./ui/use-can-hover";

export function Skills() {
  const canHover = useCanHover();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const skillCategories = [
    {
      title: "Programming",
      icon: <Code className="w-5 h-5 text-blue-400" />,
      skills: ["Java", "JavaScript", "Python", "C"],
      usageNote: "Used in academic work, frontend logic, scripting, and practical application development."
    },
    {
      title: "Web Development",
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      skills: ["HTML", "CSS", "Next.js", "React"],
      usageNote: "Applied to responsive websites, modern UI work, and full-stack product interfaces."
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      skills: ["SQL Oracle", "MongoDB", "Neo4j"],
      usageNote: "Used for structured data, business workflows, and backend-oriented information handling."
    },
    {
      title: "Tools & Environments",
      icon: <Wrench className="w-5 h-5 text-orange-400" />,
      skills: ["Git", "WordPress", "VS Code", "Eclipse"],
      usageNote: "Part of my day-to-day workflow for development, site delivery, and iteration."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">Technical Arsenal</h2>
          <TextReveal text="Skills & Technologies" className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="relative overflow-visible group"
              onMouseEnter={canHover ? () => setOpenIndex(idx) : undefined}
              onMouseLeave={canHover ? () => setOpenIndex(current => (current === idx ? null : current)) : undefined}
            >
              <SpotlightCard
                className="overflow-visible group relative h-full"
                innerClassName="p-6 pb-16"
              >
                <BorderBeam size={150} duration={8} delay={idx * 0.5} borderWidth={4} offset={-8} />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white">{category.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <span className="font-medium hover:text-zinc-200 transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>How I use this</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="pointer-events-none absolute left-4 right-4 -top-6"
                      style={{ zIndex: 1 }}
                    >
                      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/95 p-4 text-sm leading-relaxed text-zinc-300 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-lg">
                        {category.usageNote}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-full">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 text-sm">
              Also: QR/Barcode scanning, GPS validation, Google Apps Script
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
