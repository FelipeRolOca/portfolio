import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Zap } from 'lucide-react';

interface TaskbarProps {
  openWindows: string[];
  time: string;
}

export function Taskbar({ openWindows, time }: TaskbarProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-[#c0c0c0] border-t-2 border-t-[#dfdfdf] border-l-[#dfdfdf] flex items-center px-[2px] gap-[2px] z-50 shadow-[0_-1px_0_rgba(255,255,255,0.8),0_-2px_4px_rgba(0,0,0,0.3)]">
      <button className="h-[22px] px-3 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center gap-2 hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] shadow-sm">
        <div className="w-4 h-4 flex items-center justify-center font-bold text-xs">
          <svg width="16" height="16" viewBox="0 0 16 16" className="pixelated">
            <rect x="0" y="0" width="16" height="16" fill="#008080" />
            <rect x="2" y="2" width="12" height="12" fill="#00C0C0" />
            <rect x="4" y="4" width="8" height="8" fill="#FFFF00" />
            <rect x="6" y="6" width="4" height="4" fill="#FF0000" />
          </svg>
        </div>
        <span className="text-[11px] font-bold tracking-tight">Start</span>
      </button>

      <a
        href="http://localhost:5173/"
        className="h-[22px] px-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center gap-1.5 hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] no-underline"
        title="Return to Modern"
      >
        <Zap className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold">Back to Future</span>
      </a>

      <div className="h-[22px] w-[1px] bg-[#808080] mx-0.5"></div>

      <div className="flex-1 flex gap-[2px] overflow-x-auto">
        {openWindows.map((window, index) => (
          <div
            key={index}
            className="h-[22px] px-2 min-w-[120px] max-w-[160px] bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#404040] border-l-[#404040] border-r-[#dfdfdf] border-b-[#dfdfdf] flex items-center gap-1.5 shadow-inner"
          >
            <div className="w-3 h-3 bg-white border border-black flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-[#000080] m-[1px]"></div>
            </div>
            <span className="text-[11px] truncate font-medium">{window}</span>
          </div>
        ))}
      </div>

      <div className="h-[22px] w-[1px] bg-[#808080] mx-0.5"></div>

      <button
        onClick={toggleLanguage}
        className="h-[22px] px-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center gap-1.5 hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf]"
        title="Toggle Language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold">{language.toUpperCase()}</span>
      </button>

      <div className="h-[22px] px-2 bg-[#c0c0c0] border-t border-l border-[#808080] flex items-center gap-1.5 shadow-inner">
        <svg width="12" height="12" viewBox="0 0 12 12" className="pixelated">
          <rect x="1" y="1" width="10" height="10" fill="#FFD700" />
          <rect x="3" y="3" width="6" height="6" fill="#FFA500" />
          <rect x="5" y="5" width="2" height="2" fill="#FF6600" />
        </svg>
        <span className="text-[11px] font-mono tabular-nums">{time}</span>
      </div>
    </div>
  );
}
