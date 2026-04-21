import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle, MapPin } from 'lucide-react';
import type { Translation, Language } from '../App';

interface ExperienceProps {
  t: Translation['experience'];
  language: Language;
}

export default function Experience({ t, language }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      role: language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
      company: language === 'es' ? 'JJAsist (Proyecto Freelance)' : 'JJAsist (Freelance Project)',
      date: language === 'es' ? '2026 - Presente' : '2026 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary:
        language === 'es'
          ? 'Desarrolle un sistema de asistencia con escaneo de codigos QR, validacion GPS y un panel administrativo pensado para operaciones reales.'
          : 'Built an attendance platform with QR scanning, GPS validation, and an admin panel designed for real operational workflows.',
      achievements:
        language === 'es'
          ? [
              'Construido con Next.js, Supabase y Vercel para un despliegue escalable',
              'Apps Script integrado para reportes automaticos y sincronizacion',
              'Escaneo QR/codigo de barras y validacion GPS implementados',
              'Panel administrativo para empleados, reportes y configuraciones',
            ]
          : [
              'Built with Next.js, Supabase, and Vercel for scalable deployment',
              'Integrated Apps Script for automated reporting and sync tasks',
              'Implemented QR and barcode scanning with GPS validation',
              'Created an admin panel for employees, reports, and settings',
            ],
    },
    {
      role: language === 'es' ? 'Desarrollador Web Freelance' : 'Freelance Web Developer',
      company: 'JJ Servicios Empresariales',
      date: language === 'es' ? '2025 - Presente' : '2025 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary:
        language === 'es'
          ? 'Disene y publique un sitio institucional para una consultora de RRHH usando WordPress y Elementor, con foco en claridad comercial, SEO on-page y experiencia responsive.'
          : 'Designed and launched a corporate website for an HR consultancy using WordPress and Elementor, focused on clear messaging, on-page SEO, and responsive UX.',
      achievements:
        language === 'es'
          ? [
              'Armado del sitio en WordPress con maquetacion visual en Elementor',
              'Optimizacion SEO on-page, estructura de servicios y jerarquia de contenido',
              'Formularios de contacto, version mobile y ajustes de rendimiento',
            ]
          : [
              'Built the site in WordPress with visual layout work in Elementor',
              'Improved on-page SEO, service structure, and content hierarchy',
              'Implemented contact forms, mobile polish, and performance adjustments',
            ],
    },
  ];

  return (
    <section id="experience" ref={ref} className="bg-white px-6 py-20 transition-colors duration-1000 dark:bg-gray-900">
      <div className="relative z-10 mx-auto max-w-5xl">
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
          <div className="absolute bottom-0 left-0 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--yellow)] to-[var(--yellow-glow)] md:left-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col gap-8 md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1" />

                <div className="absolute left-0 z-10 h-4 w-4 rounded-full border-4 border-white bg-[var(--yellow)] shadow-lg md:left-1/2 md:-translate-x-1/2" />

                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(255, 220, 0, 0.2)' }}
                  className="ml-8 flex-1 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-[var(--yellow)] dark:border-gray-700 dark:bg-gray-800 md:ml-0"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)]">
                      <Briefcase className="text-black" size={24} />
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="mb-2 text-lg font-semibold text-[var(--yellow-dark)]">{exp.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-700 dark:text-gray-300">{exp.summary}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 flex-shrink-0 text-[var(--yellow-dark)]" size={16} />
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
