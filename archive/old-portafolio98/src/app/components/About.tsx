import { motion } from "motion/react";
import { BookOpen, Lightbulb, Users } from "lucide-react";
import GlowingBorderCard from "./ui/glowingbordercard";
import { TextReveal } from "./ui/TextReveal";
import { useLanguage } from "../i18n/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.about.sectionSubtitle}</h2>
          <TextReveal text={t.about.sectionTitle} className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.about.aboutSubtitle}</h2>
              <p className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t.about.aboutTitleLine1} <br /> {t.about.aboutTitleLine2}
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed">
              {t.about.p1}
            </motion.p>

            <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed">
              {t.about.p2}
            </motion.p>
          </div>

          <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-6 relative z-10">
            <motion.div variants={itemVariants}>
              <GlowingBorderCard 
                className="h-full"
                fromColor="from-blue-600"
                toColor="to-blue-400"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.about.card1Title}</h3>
                <p className="text-zinc-400 text-sm">{t.about.card1Desc}</p>
              </GlowingBorderCard>
            </motion.div>

            <motion.div variants={itemVariants} className="sm:mt-8">
              <GlowingBorderCard 
                className="h-full"
                fromColor="from-cyan-600"
                toColor="to-cyan-400"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Lightbulb className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.about.card2Title}</h3>
                <p className="text-zinc-400 text-sm">{t.about.card2Desc}</p>
              </GlowingBorderCard>
            </motion.div>

            <motion.div variants={itemVariants} className="sm:col-span-2">
              <GlowingBorderCard 
                className="h-full"
                fromColor="from-emerald-600"
                toColor="to-emerald-400"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.about.card3Title}</h3>
                <p className="text-zinc-400 text-sm">{t.about.card3Desc}</p>
              </GlowingBorderCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
