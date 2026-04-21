import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe2,
  QrCode,
  Store,
  type LucideIcon,
} from 'lucide-react';
import type { Translation, Language } from '../App';
import { CardTilt, CardTiltContent } from './ui/CardTilt';

interface ProjectsProps {
  t: Translation['projects'];
  language: Language;
}

interface Project {
  title: string;
  category: string;
  subtitle: string;
  status: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  Icon: LucideIcon;
}

export default function Projects({ t, language }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentProject, setCurrentProject] = useState(0);

  const projects: Project[] = [
    {
      title: 'Paper Pops',
      category: language === 'es' ? 'E-commerce creativo' : 'Creative e-commerce',
      subtitle: language === 'es' ? 'Catalogo, stock y pagos' : 'Catalog, stock and payments',
      status: language === 'es' ? 'Lanzado' : 'Launched',
      description:
        language === 'es'
          ? 'Tienda online para productos creativos, con foco en navegacion clara, exhibicion visual del catalogo y una experiencia de compra simple para convertir visitas en ventas.'
          : 'Online store for creative products with a clear browsing flow, visual merchandising, and a straightforward checkout experience built to turn visits into sales.',
      technologies: ['React', 'JavaScript', 'Stripe', 'Firebase'],
      image: '/paper-pops-preview.jpeg',
      link: 'https://paper-pops.vercel.app/',
      Icon: Store,
    },
    {
      title: 'JJAsist',
      category: language === 'es' ? 'Sistema de asistencia' : 'Attendance platform',
      subtitle: language === 'es' ? 'QR, GPS y automatizacion' : 'QR, GPS and automation',
      status: language === 'es' ? 'Activo' : 'Live',
      description:
        language === 'es'
          ? 'Aplicacion web para control de asistencia y operacion en campo, con lectura de QR, validacion GPS y automatizaciones que ordenan reportes, fichadas y seguimiento diario.'
          : 'Web application for attendance control and field operations, combining QR scans, GPS validation, and automation for reports, check-ins, and daily oversight.',
      technologies: ['Next.js', 'React', 'Supabase', 'Google Apps Script', 'GPS / QR'],
      image: '/JJ ASIST (1).png',
      link: 'https://v0-pwa-ux-ui-design.vercel.app/',
      Icon: QrCode,
    },
    {
      title: 'JJ Servicios Empresariales',
      category: language === 'es' ? 'Sitio institucional' : 'Corporate website',
      subtitle: language === 'es' ? 'WordPress, Elementor y SEO' : 'WordPress, Elementor and SEO',
      status: language === 'es' ? 'Publicado' : 'Published',
      description:
        language === 'es'
          ? 'Sitio web para una consultora de RRHH realizado con WordPress y Elementor, pensado para presentar servicios con claridad, mejorar la presencia digital y captar consultas desde desktop y mobile.'
          : 'Business website for an HR consultancy built with WordPress and Elementor, focused on clear service presentation, stronger online presence, and lead capture across desktop and mobile.',
      technologies: ['WordPress', 'Elementor', 'SEO On-Page', 'Responsive Design'],
      image: '/Captura de pantalla 2026-04-09 191343.png',
      link: 'https://jjserviciosempresarialesrrhh.com/',
      Icon: BriefcaseBusiness,
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={ref} className="px-6 py-12 md:py-20 transition-colors duration-1000 dark:bg-gray-900">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-5xl">
            {t.title}
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)]" />
          <p className="text-lg text-gray-600 dark:text-gray-300">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mx-auto max-w-5xl"
          >
            <ProjectCard project={projects[currentProject]} viewText={t.viewProject} />
          </motion.div>

          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 z-10 hidden md:flex h-10 w-10 md:h-12 md:w-12 -translate-x-2 md:-translate-x-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--yellow)] bg-white transition-all hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] dark:bg-gray-800"
            aria-label={language === 'es' ? 'Proyecto anterior' : 'Previous project'}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 z-10 hidden md:flex h-10 w-10 md:h-12 md:w-12 translate-x-2 md:translate-x-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--yellow)] bg-white transition-all hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] dark:bg-gray-800"
            aria-label={language === 'es' ? 'Proyecto siguiente' : 'Next project'}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setCurrentProject(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentProject ? 'w-8 bg-[var(--yellow)]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${language === 'es' ? 'Ver' : 'View'} ${project.title}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 hidden gap-6 md:grid md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setCurrentProject(index)}
              className={`overflow-hidden rounded-2xl border-2 text-left transition-all hover:-translate-y-2 ${
                index === currentProject
                  ? 'border-[var(--yellow)] shadow-[0_0_30px_rgba(255,220,0,0.25)]'
                  : 'border-gray-200 hover:border-[var(--yellow)]/50 dark:border-gray-700'
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              </div>
              <div className="bg-white p-4 dark:bg-gray-800">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--yellow-dark)]">
                  <project.Icon size={14} />
                  <span>{project.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  viewText: string;
}

function ProjectCard({ project, viewText }: ProjectCardProps) {
  return (
    <CardTilt className="w-full" tiltMaxAngle={10} scale={1.025}>
      <CardTiltContent className="h-full">
        <div className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--yellow)]/30 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.14)] dark:bg-[#101113]/95 dark:shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.28), rgba(255,220,0,0.16) 18%, transparent 56%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%)]" />
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative p-4 md:p-5 lg:p-6" style={{ transform: 'translateZ(42px)' }}>
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-[1.4rem] border border-[var(--yellow)]/20 bg-gray-950 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/14 to-transparent" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-between p-6 md:p-8">
              <div style={{ transform: 'translateZ(40px)' }}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--yellow)]/20 bg-[var(--yellow)]/12 text-[var(--yellow-dark)]">
                      <project.Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-300">
                        {project.category}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.subtitle}</p>
                    </div>
                  </div>

                  <span className="rounded-full border border-[var(--yellow)]/20 bg-[var(--yellow)]/12 px-3 py-1 text-xs font-semibold text-[var(--yellow-dark)]">
                    {project.status}
                  </span>
                </div>

                <h3 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mb-7 text-base leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--yellow)]/18 bg-[var(--yellow)]/10 px-3 py-1 text-sm font-medium text-[var(--yellow-dark)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200/80 pt-5 dark:border-white/10" style={{ transform: 'translateZ(34px)' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] px-5 py-3 text-sm font-semibold text-black shadow-[0_14px_26px_rgba(255,220,0,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(255,220,0,0.32)]"
                >
                  {viewText}
                  <ExternalLink size={16} />
                </a>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Globe2 size={16} />
                  <span>{project.link.replace(/^https?:\/\//, '')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardTiltContent>
    </CardTilt>
  );
}
