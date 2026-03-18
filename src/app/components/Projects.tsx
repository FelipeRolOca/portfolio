import { motion } from "motion/react";
import { ExternalLink, Github, Code2, Layers, Cpu, Globe, Palette, Zap, Layout, MousePointer2, QrCode, Map, Settings, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BorderBeam } from "./ui/BorderBeam";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Projects() {
  const featuredProjects = [
    {
      title: "Paper Pops",
      type: "Featured Project",
      image: "/paper-pops-preview.jpeg",
      description: "Interactive website that combines creative design with dynamic functionality for a modern portfolio.",
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://paper-pops.vercel.app/",
      highlights: [
        { icon: <Palette className="w-4 h-4" />, text: "Creative Design" },
        { icon: <Zap className="w-4 h-4" />, text: "Dynamic Features" },
        { icon: <Layout className="w-4 h-4" />, text: "Modern Portfolio" },
        { icon: <MousePointer2 className="w-4 h-4" />, text: "Interactive Experience" },
      ]
    },
    {
      title: "JJAsist",
      type: "Featured Project",
      image: "https://images.unsplash.com/photo-1685575112968-7dd67bc447b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBzY2FubmluZyUyMG1vYmlsZSUyMGFwcCUyMGludGVyZmFjZSUyMG1vZGVybiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczNzU4MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A full-stack web application designed for comprehensive employee attendance tracking. Features real-time QR and barcode scanning, precise GPS validation to ensure location accuracy, and a powerful admin dashboard. Built with advanced automation using Google Apps Script to streamline reporting.",
      tech: ["Next.js", "Supabase", "Vercel", "Google Apps Script", "Tailwind CSS"],
      liveUrl: "https://v0-pwa-ux-ui-design.vercel.app/",
      highlights: [
        { icon: <QrCode className="w-4 h-4" />, text: "QR/Barcode scanning" },
        { icon: <Map className="w-4 h-4" />, text: "GPS Location Validation" },
        { icon: <Settings className="w-4 h-4" />, text: "Admin Panel & Reports" },
        { icon: <ShieldCheck className="w-4 h-4" />, text: "Automated Workflows" },
      ]
    }
  ];

  const otherProjects = [
    {
      title: "JJ Servicios Empresariales",
      description: "Professional business website for an HR services company. Features modern responsive design, service showcases, and optimized for search engines and performance.",
      tech: ["Web Development", "SEO", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080",
      liveUrl: "https://jjserviciosempresarialesrrhh.com/"
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
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">My Work</h2>
          <TextReveal text="Featured Projects" className="text-3xl md:text-4xl font-bold text-white justify-center" />
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
            >
              <SpotlightCard 
                className="overflow-visible border border-zinc-800 group hover:border-zinc-700 transition-colors shadow-2xl relative"
                innerClassName="grid lg:grid-cols-2"
                data-particle-target
              >
                <BorderBeam size={500} duration={12} delay={index * 0.5} borderWidth={8} offset={-18} />
                {/* Image Side */}
                <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <div className="absolute inset-0 bg-blue-500/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700">
                        {t}
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
                        Visit Website
                        <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16 relative z-20">
          <TextReveal text="More Projects" className="text-3xl font-bold text-white justify-center" />
        </div>

        {/* Other Projects */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-2xl mx-auto lg:max-w-none"
        >
          {otherProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="relative overflow-visible"
            >
              <SpotlightCard 
                className="overflow-visible group relative h-full"
                innerClassName="lg:grid lg:grid-cols-3"
                data-particle-target
              >
                <BorderBeam size={300} duration={10} delay={idx * 0.8} borderWidth={5} offset={-12} />
                <div className="h-48 lg:h-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10" />
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:col-span-2 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <Magnetic>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </Magnetic>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-zinc-400 bg-zinc-950 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Magnetic strength={0.2}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </Magnetic>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
