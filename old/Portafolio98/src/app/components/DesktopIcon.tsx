import { ReactNode, useState } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleDoubleClick = () => {
    setIsSelected(false);
    onDoubleClick();
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`flex flex-col items-center gap-1 p-2 w-20 transition-colors duration-75 ${
        isSelected
          ? 'bg-[#000080]/60 outline outline-1 outline-dashed outline-white/50'
          : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-white/30'
      }`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center transition-all ${
          isSelected ? 'brightness-110 scale-105' : ''
        }`}
        style={{ imageRendering: 'pixelated' }}
      >
        {icon}
      </div>
      <span
        className={`text-xs text-center leading-tight px-1 py-0.5 transition-all ${
          isSelected
            ? 'bg-[#000080] text-white'
            : 'text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
