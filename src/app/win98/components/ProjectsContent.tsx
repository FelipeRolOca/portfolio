import { useLanguage } from '../contexts/LanguageContext';
import { Folder, Globe } from 'lucide-react';

export function ProjectsContent() {
  const { t } = useLanguage();

  const projects = [
    {
      name: 'Paper Pops',
      description: t(
        'Full-featured web application built with modern stack',
        'AplicaciÃ³n web completa construida con stack moderno'
      ),
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://paper-pops.vercel.app/',
      image: '/paper-pops-preview.jpeg',
    },
    {
      name: 'JJAsist',
      description: t(
        'Business management system with automation features',
        'Sistema de gestiÃ³n empresarial con funciones de automatizaciÃ³n'
      ),
      technologies: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
      liveUrl: 'https://v0-pwa-ux-ui-design.vercel.app/',
      image: '/JJ ASIST (1).png',
    },
    {
      name: 'JJ Servicios Empresariales',
      description: t(
        'Professional business website with SEO optimization',
        'Sitio web empresarial profesional con optimizaciÃ³n SEO'
      ),
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://jjserviciosempresarialesrrhh.com/',
      image: '/Captura de pantalla 2026-04-09 191343.png',
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="border-2 border-[#808080] border-t-white border-l-white bg-white"
        >
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2 flex items-center gap-2">
            <Folder className="w-4 h-4 text-white" />
            <h3 className="text-white font-bold text-sm">{project.name}</h3>
          </div>
          <div className="p-4 space-y-3">
            {/* Preview image in Win98 bordered container - adapts to image */}
            <div className="border-2 border-[#808080] border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-white p-1 inline-block">
              <div className="border-2 border-[#808080] border-t-white border-l-white">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-auto h-auto max-w-full max-h-60 object-contain bg-white block"
                  onError={(e) => console.error('Image failed to load:', project.image, e)}
                />
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="px-2 py-1 bg-[#000080] text-white text-xs font-mono border border-[#1084d0]"
                >
                  {tech}
                </div>
              ))}
            </div>
            {/* Visit Site button styled as Win98 system button */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] text-sm font-bold text-black no-underline"
            >
              <Globe className="w-4 h-4" />
              {t('Visit Site', 'Visitar Sitio')}
            </a>
          </div>
        </div>
      ))}

      <div className="border-2 border-[#808080] border-t-white border-l-white bg-[#c0c0c0] p-4">
        <div className="text-sm text-gray-800">
          <strong>{t('Tech Stack Highlights:', 'Aspectos destacados del stack tecnolÃ³gico:')}</strong>
          <div className="mt-2 space-y-1 text-xs">
            <div>â€¢ {t('Modern React frameworks (Next.js, Vite)', 'Frameworks modernos de React (Next.js, Vite)')}</div>
            <div>â€¢ {t('Backend & databases (Supabase, Google Apps Script)', 'Backend y bases de datos (Supabase, Google Apps Script)')}</div>
            <div>â€¢ {t('Styling & animation (Tailwind CSS, Motion)', 'Estilos y animaciÃ³n (Tailwind CSS, Motion)')}</div>
            <div>â€¢ {t('Deployment & hosting (Vercel)', 'Despliegue y alojamiento (Vercel)')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
