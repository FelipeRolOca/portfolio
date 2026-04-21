import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Palette, Zap, Layout, MousePointer2, QrCode, Map, Settings, ShieldCheck, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";
import { useCanHover } from "./ui/use-can-hover";
import { useLanguage } from "../i18n/LanguageContext";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Projects() {
  const canHover = useCanHover();
  const [openFeaturedIndex, setOpenFeaturedIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const featuredProjects = [
    {
      title: "Paper Pops",
      type: t.projects.p1Type,
      image: "/paper-pops-preview.jpeg",
      description: t.projects.p1Desc,
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://paper-pops.vercel.app/",
      meta: {
        role: t.projects.p1MetaRole,
        problem: t.projects.p1MetaProblem,
        value: t.projects.p1MetaValue
      },
      highlights: [
        { icon: <Palette className="w-4 h-4" />, text: t.projects.p1H1 },
        { icon: <Zap className="w-4 h-4" />, text: t.projects.p1H2 },
        { icon: <Layout className="w-4 h-4" />, text: t.projects.p1H3 },
        { icon: <MousePointer2 className="w-4 h-4" />, text: t.projects.p1H4 },
      ]
    },
    {
      title: "JJAsist",
      type: t.projects.p2Type,
      image: "/JJ%20ASIST%20(1).png",
      description: t.projects.p2Desc,
      tech: ["Next.js", "Supabase", "Vercel", "Google Apps Script", "Tailwind CSS"],
      liveUrl: "https://v0-pwa-ux-ui-design.vercel.app/",
      meta: {
        role: t.projects.p2MetaRole,
        problem: t.projects.p2MetaProblem,
        value: t.projects.p2MetaValue
      },
      highlights: [
        { icon: <QrCode className="w-4 h-4" />, text: t.projects.p2H1 },
        { icon: <Map className="w-4 h-4" />, text: t.projects.p2H2 },
        { icon: <Settings className="w-4 h-4" />, text: t.projects.p2H3 },
        { icon: <ShieldCheck className="w-4 h-4" />, text: t.projects.p2H4 },
      ]
    },
    {
      title: "JJ Servicios Empresariales",
      type: t.projects.p1Type,
      image: "/Captura%20de%20pantalla%202026-04-09%20191343.png",
      description: t.projects.p3Desc,
      tech: [t.projects.p3Tech1, t.projects.p3Tech2, t.projects.p3Tech3],
      liveUrl: "https://jjserviciosempresarialesrrhh.com/",
      meta: {
        role: t.projects.p3MetaRole,
        problem: t.projects.p3MetaProblem,
        value: t.projects.p3MetaValue
      },
      highlights: [
        { icon: <Layout className="w-4 h-4" />, text: t.projects.p3Tech1 },
        { icon: <Zap className="w-4 h-4" />, text: t.projects.p3Tech2 },
        { icon: <MousePointer2 className="w-4 h-4" />, text: t.projects.p3Tech3 },
        { icon: <Settings className="w-4 h-4" />, text: "UI / UX" },
      ]
    }
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.projects.sectionSubtitle}</h2>
          <TextReveal text={t.projects.sectionTitle} className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className=""
              onMouseEnter={canHover ? () => setOpenFeaturedIndex(index) : undefined}
              onMouseLeave={canHover ? () => setOpenFeaturedIndex(current => (current === index ? null : current)) : undefined}
            >
              <SpotlightCard 
                className="border border-zinc-800 group hover:border-zinc-700 transition-colors shadow-2xl relative"
                innerClassName="grid lg:grid-cols-2"
              >

                {/* Image Side */}
                <div className={`relative overflow-hidden bg-zinc-900 min-h-[300px] ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <div className="absolute inset-0 bg-blue-500/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">{project.type}</span>
                  </div>

                  <h4 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h4>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                        <span className="text-cyan-400">{h.icon}</span>
                        {h.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tItem, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700">
                        {tItem}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <Magnetic>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors text-lg group/link"
                      >
                        {t.projects.visitWebsite}
                        <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </Magnetic>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-800/80">
                    <button
                      type="button"
                      onClick={() => setOpenFeaturedIndex(openFeaturedIndex === index ? null : index)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {openFeaturedIndex === index ? t.projects.hideProjectDetails : t.projects.exploreProjectDetails}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFeaturedIndex === index ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {openFeaturedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 grid gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/75 p-4 sm:grid-cols-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.projects.role}</p>
                              <p className="text-sm text-white">{project.meta.role}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.projects.problemSolved}</p>
                              <p className="text-sm text-zinc-300 leading-relaxed">{project.meta.problem}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.projects.whyItMatters}</p>
                              <p className="text-sm text-zinc-300 leading-relaxed">{project.meta.value}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
