import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Translation, Language } from '../App';

interface ProjectsProps {
  t: Translation['projects'];
  language: Language;
}

export default function Projects({ t, language }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: 'JJAsist',
      description: language === 'es'
        ? 'Plataforma integral de gestión empresarial con validación geoespacial, escaneo de códigos QR y flujos de trabajo automatizados para operaciones de campo.'
        : 'Comprehensive business management platform with geospatial validation, QR code scanning, and automated workflows for field operations.',
      technologies: ['Next.js', 'React', 'Supabase', 'GPS API', 'QR'],
      image: '/JJ ASIST (1).png',
      link: '#',
    },
    {
      title: 'JJ Servicios Empresariales',
      description: language === 'es'
        ? 'Sitio web corporativo y sistema de gestión de servicios con seguimiento en tiempo real y portal de clientes para servicios empresariales.'
        : 'Corporate website and service management system with real-time tracking and client portal for business services.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      image: '/Captura de pantalla 2026-04-09 191343.png',
      link: '#',
    },
    {
      title: 'Paper Pops',
      description: language === 'es'
        ? 'Plataforma de comercio electrónico para productos creativos con gestión de inventario e integración de pagos.'
        : 'E-commerce platform for creative paper products with inventory management and payment integration.',
      technologies: ['React', 'JavaScript', 'Stripe', 'Firebase'],
      image: '/paper-pops-preview.jpeg',
      link: '#',
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={ref} className="py-20 px-6 bg-white">

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <ProjectCard project={projects[currentProject]} viewText={t.viewProject} />
          </motion.div>

          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white border-2 border-[var(--yellow)] flex items-center justify-center hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] transition-all z-10"
          >
            <ChevronLeft className="text-gray-900" size={24} />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white border-2 border-[var(--yellow)] flex items-center justify-center hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] transition-all z-10"
          >
            <ChevronRight className="text-gray-900" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentProject
                    ? 'bg-[var(--yellow)] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setCurrentProject(index)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                index === currentProject
                  ? 'border-[var(--yellow)] shadow-[0_0_30px_rgba(255,220,0,0.3)]'
                  : 'border-gray-200 hover:border-[var(--yellow)]/50'
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, viewText }: { project: any; viewText: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl overflow-hidden border-2 border-[var(--yellow)] shadow-2xl"
    >
      <div className="aspect-video overflow-hidden relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-[var(--yellow)]/10 text-[var(--yellow-dark)] text-sm font-medium border border-[var(--yellow)]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.a
          href={project.link}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] text-black font-semibold hover:shadow-[0_0_30px_rgba(255,220,0,0.5)] transition-all"
        >
          {viewText}
          <ExternalLink size={18} />
        </motion.a>
      </div>
    </motion.div>
  );
}
