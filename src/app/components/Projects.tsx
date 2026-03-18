import { motion } from "motion/react";
import { ExternalLink, QrCode, Map, Settings, ShieldCheck, Palette, Zap, Layout, MousePointer2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

  return (
    <section id="projects" className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">My Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h3>
        </motion.div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className=""
            >
              <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 grid lg:grid-cols-2 hover:border-zinc-700 transition-colors shadow-2xl">
                {/* Image Side */}
                <div className={`relative h-64 lg:h-auto overflow-hidden group ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <div className="absolute inset-0 bg-blue-500/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px]" />

                  <h4 className="text-blue-400 font-mono text-sm mb-2">{project.type}</h4>
                  <h3 className="text-3xl font-bold text-white mb-6">{project.title}</h3>

                  <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 mb-6 backdrop-blur">
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-4">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800/50">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                          <span className="text-cyan-400">{h.icon}</span>
                          {h.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded-xl hover:bg-zinc-200 transition-colors font-bold"
                    >
                      View Live <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-2xl mx-auto lg:max-w-none">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group hover:-translate-y-1 shadow-lg lg:grid lg:grid-cols-3"
            >
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
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
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
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm"
                >
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
