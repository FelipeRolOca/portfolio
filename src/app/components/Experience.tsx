import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
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
      summary: language === 'es'
        ? 'Desarrollé un sistema de asistencia con escaneo de códigos QR, validación de ubicación GPS y un potente panel de administración.'
        : 'Developed a comprehensive employee attendance tracking system with real-time QR and barcode scanning, GPS location validation, and a powerful admin dashboard.',
      achievements: language === 'es'
        ? [
            'Construido con Next.js, Supabase y Vercel para un despliegue escalable',
            'Google Apps Script integrado para reportes automáticos y sincronización',
            'Escaneo QR/código de barras y validación GPS implementados',
            'Panel de administración para la gestión de empleados y configuraciones',
          ]
        : [
            'Built with Next.js, Supabase, and Vercel for scalable deployment',
            'Integrated Google Apps Script for automated reporting and data sync',
            'Implemented QR/barcode scanning and GPS validation for accurate attendance',
            'Created admin panel for managing employees, reports, and system settings',
          ],
    },
    {
      role: language === 'es' ? 'Desarrollador Web Freelance' : 'Freelance Web Developer',
      company: 'JJ Servicios Empresariales',
      date: language === 'es' ? '2025 - Presente' : '2025 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary: language === 'es'
        ? 'Diseñé y desarrollé un sitio web empresarial para una consultora de RRHH, enfocándome en diseño moderno y optimización SEO.'
        : 'Designed and developed a professional business website for an HR services company, focusing on modern UI/UX and SEO optimization.',
      achievements: language === 'es'
        ? [
            'Desarrollo de sitio web responsivo utilizando tecnologías modernas',
            'Optimizado para motores de búsqueda y rendimiento',
            'Implementación de formularios de contacto y catálogo de servicios',
          ]
        : [
            'Built responsive website using modern web technologies',
            'Optimized for search engines and performance',
            'Implemented contact forms and business service showcases',
          ],
    },
  ];

  return (
    <section id="experience" ref={ref} className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-1000">

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--yellow)] to-[var(--yellow-glow)] transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1" />

                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--yellow)] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10" />

                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(255, 220, 0, 0.2)',
                  }}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[var(--yellow)] transition-all ml-8 md:ml-0"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-black" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                      <p className="text-lg text-[var(--yellow-dark)] font-semibold mb-2">{exp.company}</p>
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

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.summary}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-[var(--yellow-dark)] flex-shrink-0 mt-0.5" size={16} />
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
