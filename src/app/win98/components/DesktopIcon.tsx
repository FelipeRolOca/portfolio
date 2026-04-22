import { ReactNode, useState, useRef, useEffect } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onDoubleClick: () => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export function DesktopIcon({ icon, label, onDoubleClick, position, onPositionChange, isSelected, onSelect }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    onSelect();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      // Constrain to screen bounds
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 100;
      onPositionChange({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onPositionChange]);

  const handleDoubleClick = () => {
    onDoubleClick();
  };

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'move' : 'default',
      }}
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
