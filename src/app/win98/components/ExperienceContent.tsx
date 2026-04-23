import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, Calendar } from 'lucide-react';

export function ExperienceContent() {
  const { t } = useLanguage();

  const experiences = [
    {
      company: 'JJAsist',
      role: t('Freelance Full Stack Developer', 'Desarrollador Full Stack Freelance'),
      period: t('2026 â€“ Present', '2026 â€“ Presente'),
      achievements: [
        t('Implemented QR/barcode scanning system', 'Implementé sistema de escaneo QR/códigos de barras'),
        t('Developed GPS validation features', 'Desarrollé funciones de validación GPS'),
        t('Built comprehensive admin panel', 'Construí panel de administración completo'),
        t('Created automated reporting systems', 'Creé sistemas de reportes automatizados'),
      ],
    },
    {
      company: 'JJ Servicios Empresariales',
      role: t('Freelance Web Developer', 'Desarrollador Web Freelance'),
      period: t('2025 â€“ Present', '2025 â€“ Presente'),
      achievements: [
        t('Designed and launched SEO-optimized business website', 'Diseñé y lancé sitio web empresarial optimizado para SEO'),
        t('Implemented responsive design across all devices', 'Implementé diseño responsivo en todos los dispositivos'),
        t('Enhanced site performance and user experience', 'Mejoré el rendimiento del sitio y la experiencia del usuario'),
        t('Integrated modern web technologies', 'Integré tecnologías web modernas'),
      ],
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="border-2 border-[#808080] border-t-white border-l-white bg-white"
        >
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-white" />
            <h3 className="text-white font-bold text-sm">{exp.company}</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="font-bold text-gray-800">{exp.role}</div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </div>
            </div>
            <div className="space-y-1.5">
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-800">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="border-2 border-[#808080] border-t-white border-l-white bg-[#ffffcc] p-4">
        <div className="text-xs text-gray-800 italic">
          {t(
            'ðŸ’¼ Focused on delivering production-ready systems for real business needs',
            'ðŸ’¼ Enfocado en entregar sistemas listos para producción para necesidades empresariales reales'
          )}
        </div>
      </div>
    </div>
  );
}
