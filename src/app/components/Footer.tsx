import type { Translation, Language } from '../App';

interface FooterProps {
  t: Translation['footer'];
  language: Language;
}

export default function Footer({ t, language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 px-6 transition-colors duration-1000">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-2 text-xs text-gray-400">
          <p>Felipe Roldán Ocampo</p>
          <p>
            {language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer'}
          </p>
          <p>© {currentYear} {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
