import { useLanguage } from '../contexts/LanguageContext';
import { Folder, Globe } from 'lucide-react';

export function ProjectsContent() {
  const { t } = useLanguage();

  const projects = [
    {
      name: 'JJAsist',
      description: t(
        'Business management system with automation features',
        'Sistema de gestión empresarial con funciones de automatización'
      ),
      technologies: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
      liveUrl: 'https://jj-asist.vercel.app/',
      image: '/jj-asist-logo.png',
    },
    {
      name: 'JJ Servicios Empresariales',
      description: t(
        'Professional business website with SEO optimization',
        'Sitio web empresarial profesional con optimización SEO'
      ),
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://jjserviciosempresarialesrrhh.com/',
      image: '/Rehace_el_logo_202604262015.jpeg',
      portals: [
        {
          name: 'JJHire',
          url: 'https://jj-hire.vercel.app/',
          description: t(
            'Public portal for candidates to submit their CV and apply for job openings.',
            'Portal público para que los postulantes envíen su CV y apliquen a búsquedas laborales.'
          ),
          isBeta: true,
        },
        {
          name: 'JJBusca',
          url: 'https://jj-busca.vercel.app/',
          description: t(
            'Administrative portal enabling recruiters and admins to query and manage candidate CVs.',
            'Portal administrativo para que reclutadores y administradores busquen y gestionen los currículums recibidos.'
          ),
          isBeta: true,
        },
      ],
    },
    {
      name: 'Paper Pops',
      description: t(
        'Full-featured web application built with modern stack. (Currently inactive for a few months)',
        'Aplicación web completa construida con stack moderno. (Actualmente inactiva por unos meses)'
      ),
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://paper-pops.vercel.app/',
      image: '/paper-pops-preview.jpeg',
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
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] text-sm font-bold text-black no-underline"
              >
                <Globe className="w-4 h-4" />
                {t('Visit Site', 'Visitar Sitio')}
              </a>
            )}

            {/* Associated Portals for Win98 */}
            {(project as any).portals && (
              <div className="mt-4 pt-3 border-t-2 border-dashed border-[#808080]">
                <div className="text-xs font-bold text-gray-800 mb-2">
                  {t('Associated Portals (Beta - Aesthetic details pending):', 'Portales Asociados (Beta - Faltan detalles estéticos):')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(project as any).portals.map((portal: any, pIdx: number) => (
                    <div key={pIdx} className="border-2 border-[#808080] border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] p-2 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-bold text-[#000080]">{portal.name}</span>
                          {portal.isBeta && (
                            <span className="px-1 bg-[#ffffcc] border border-[#808080] text-[9px] font-mono font-bold text-red-700 leading-none">
                              BETA
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-800 leading-normal">
                          {portal.description}
                        </p>
                      </div>
                      <div className="pt-2">
                        <a
                          href={portal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#c0c0c0] border-t border-l border-r-2 border-b-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white text-[11px] font-bold text-black no-underline"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          {t('Visit Portal', 'Visitar Portal')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="border-2 border-[#808080] border-t-white border-l-white bg-[#c0c0c0] p-4">
        <div className="text-sm text-gray-800">
          <strong>{t('Tech Stack Highlights:', 'Aspectos destacados del stack tecnológico:')}</strong>
          <div className="mt-2 space-y-1 text-xs">
            <div>â€¢ {t('Modern React frameworks (Next.js, Vite)', 'Frameworks modernos de React (Next.js, Vite)')}</div>
            <div>â€¢ {t('Backend & databases (Supabase, Google Apps Script)', 'Backend y bases de datos (Supabase, Google Apps Script)')}</div>
            <div>â€¢ {t('Styling & animation (Tailwind CSS, Motion)', 'Estilos y animación (Tailwind CSS, Motion)')}</div>
            <div>â€¢ {t('Deployment & hosting (Vercel)', 'Despliegue y alojamiento (Vercel)')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
