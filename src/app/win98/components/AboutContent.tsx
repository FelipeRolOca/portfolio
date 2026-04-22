import { useLanguage } from '../contexts/LanguageContext';
import { User, MapPin, GraduationCap, Briefcase, Globe } from 'lucide-react';

export function AboutContent() {
  const { t } = useLanguage();

  const infoCards = [
    {
      icon: <User className="w-6 h-6" />,
      label: t('Age', 'Edad'),
      value: t('20 years old', '20 aÃ±os'),
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      label: t('Education', 'EducaciÃ³n'),
      value: t('Computer Engineering Student', 'Estudiante de IngenierÃ­a InformÃ¡tica'),
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      label: t('Focus', 'Enfoque'),
      value: t('Web systems, automation, business solutions', 'Sistemas web, automatizaciÃ³n, soluciones empresariales'),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: t('English Level', 'Nivel de InglÃ©s'),
      value: 'B2',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: t('Location', 'UbicaciÃ³n'),
      value: 'San Pedro, Buenos Aires, Argentina',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-2 border-[#808080] border-t-white border-l-white bg-white p-4">
        <h2 className="text-xl font-bold mb-4 text-[#000080]">
          {t('About Me', 'Sobre MÃ­')}
        </h2>
        <p className="text-sm leading-relaxed text-gray-800">
          {t(
            'I am a Full Stack Developer and Computer Engineering student focused on building practical, real-world systems. My work centers on web development, automation, and business solutions. I have a hands-on approach to solving problems and a commitment to continuous learning.',
            'Soy un Desarrollador Full Stack y estudiante de IngenierÃ­a InformÃ¡tica enfocado en construir sistemas prÃ¡cticos y del mundo real. Mi trabajo se centra en el desarrollo web, la automatizaciÃ³n y las soluciones empresariales. Tengo un enfoque prÃ¡ctico para resolver problemas y un compromiso con el aprendizaje continuo.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="border-2 border-[#808080] border-t-white border-l-white bg-[#c0c0c0] p-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#000080] border-2 border-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-white flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#000080] mb-1">{card.label}</div>
                <div className="text-sm text-gray-800 break-words">{card.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
