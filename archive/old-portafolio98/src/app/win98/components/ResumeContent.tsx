import { useLanguage } from '../contexts/LanguageContext';
import { Download, GraduationCap, Award, Code } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

export function ResumeContent() {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <Tabs.Root defaultValue="education" className="space-y-4">
        <Tabs.List className="flex gap-1 border-2 border-[#808080] border-t-white border-l-white bg-[#c0c0c0] p-1">
          <Tabs.Trigger
            value="education"
            className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#808080] hover:bg-[#d0d0d0]"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              {t('Education', 'Educación')}
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="skills"
            className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#808080] hover:bg-[#d0d0d0]"
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              {t('Key Skills', 'Habilidades Clave')}
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="strengths"
            className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#808080] hover:bg-[#d0d0d0]"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              {t('Strengths', 'Fortalezas')}
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="education">
          <div className="border-2 border-[#808080] border-t-white border-l-white bg-white p-4 space-y-4">
            <div>
              <h3 className="font-bold text-[#000080] mb-2">
                {t('Computer Engineering', 'Ingeniería Informática')}
              </h3>
              <p className="text-sm text-gray-700">
                {t('Currently pursuing degree', 'Actualmente cursando la carrera')}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {t('Focus: Software Development, Systems Design, Algorithms',
                   'Enfoque: Desarrollo de Software, Diseño de Sistemas, Algoritmos')}
              </p>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="skills">
          <div className="border-2 border-[#808080] border-t-white border-l-white bg-white p-4">
            <div className="space-y-3">
              <div>
                <div className="font-bold text-sm mb-1">
                  {t('Frontend Development', 'Desarrollo Frontend')}
                </div>
                <div className="text-xs text-gray-700">
                  React, Next.js, Tailwind CSS, HTML, CSS, JavaScript
                </div>
              </div>
              <div>
                <div className="font-bold text-sm mb-1">
                  {t('Backend Development', 'Desarrollo Backend')}
                </div>
                <div className="text-xs text-gray-700">
                  Node.js, Supabase, Google Apps Script, APIs
                </div>
              </div>
              <div>
                <div className="font-bold text-sm mb-1">
                  {t('Database Management', 'Gestión de Bases de Datos')}
                </div>
                <div className="text-xs text-gray-700">
                  SQL, MongoDB, Oracle, Neo4j
                </div>
              </div>
              <div>
                <div className="font-bold text-sm mb-1">
                  {t('Programming Languages', 'Lenguajes de Programación')}
                </div>
                <div className="text-xs text-gray-700">Java, JavaScript, Python, C</div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="strengths">
          <div className="border-2 border-[#808080] border-t-white border-l-white bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                <span>{t('Practical problem-solving mindset', 'Mentalidad práctica para resolver problemas')}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                <span>{t('Continuous learning and adaptation', 'Aprendizaje continuo y adaptación')}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                <span>{t('Full-stack development capabilities', 'Capacidades de desarrollo full-stack')}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                <span>{t('Business-oriented solutions', 'Soluciones orientadas a negocios')}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#000080] mt-1.5 flex-shrink-0"></div>
                <span>{t('Production-ready code delivery', 'Entrega de código listo para producción')}</span>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <button className="mt-4 px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] flex items-center gap-2 text-sm font-bold">
        <Download className="w-4 h-4" />
        {t('Download CV', 'Descargar CV')}
      </button>
    </div>
  );
}
