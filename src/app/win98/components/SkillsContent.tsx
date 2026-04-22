import { useLanguage } from '../contexts/LanguageContext';
import { Code, Globe, Database, Wrench } from 'lucide-react';

export function SkillsContent() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <Code className="w-5 h-5" />,
      title: t('Programming', 'Programación'),
      skills: ['Java', 'JavaScript', 'Python', 'C'],
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: t('Web Development', 'Desarrollo Web'),
      skills: ['HTML', 'CSS', 'Next.js', 'React', 'Tailwind CSS', 'Vite'],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: t('Databases', 'Bases de Datos'),
      skills: ['SQL', 'Oracle', 'MongoDB', 'Neo4j', 'Supabase'],
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: t('Tools & Technologies', 'Herramientas y Tecnologías'),
      skills: [
        'Git',
        'WordPress',
        'VS Code',
        'Eclipse',
        'Google Apps Script',
        'Vercel',
        'Motion',
      ],
    },
  ];

  const extraAbilities = [
    t('QR/Barcode Scanning', 'Escaneo de QR/Códigos de barras'),
    t('GPS Validation', 'Validación GPS'),
    t('Admin Panels', 'Paneles de Administración'),
    t('Automated Reports', 'Reportes Automatizados'),
    t('SEO Optimization', 'Optimización SEO'),
    t('Responsive Design', 'Diseño Responsivo'),
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="border-2 border-[#808080] border-t-white border-l-white bg-white"
          >
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2 flex items-center gap-2">
              <div className="text-white">{category.icon}</div>
              <h3 className="text-white font-bold text-sm">{category.title}</h3>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="px-2 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs font-mono"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-[#808080] border-t-white border-l-white bg-white">
        <div className="bg-[#008080] px-3 py-2">
          <h3 className="text-white font-bold text-sm">
            {t('Additional Abilities', 'Habilidades Adicionales')}
          </h3>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {extraAbilities.map((ability, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-800"
              >
                <div className="w-2 h-2 bg-[#000080]"></div>
                {ability}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
