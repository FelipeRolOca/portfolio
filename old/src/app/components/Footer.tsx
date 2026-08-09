import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Felipe Roldan Ocampo
            </span>
          </div>

          <p className="text-zinc-500 text-sm font-medium text-center">
            {t.footer.subtitle}
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="mailto:felipeoca123@hotmail.com" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors" 
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+5493329523459" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors" 
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors" 
              aria-label="Contact Location"
            >
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
          <p className="text-zinc-600 text-sm">
            © {currentYear} Felipe Roldan Ocampo. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
