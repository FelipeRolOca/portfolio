import { ReactNode, useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  defaultSize?: { width: number; height: number };
  isMaximized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export function Window({
  title,
  children,
  onClose,
  position: propPosition,
  onPositionChange,
  defaultSize = { width: 600, height: 500 },
  isMaximized = false,
  onMinimize,
  onMaximize,
}: WindowProps) {
  const [position, setPosition] = useState(propPosition || { x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propPosition) {
      setPosition(propPosition);
    }
  }, [propPosition]);

  const updatePosition = (newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
    if (onPositionChange) {
      onPositionChange(newPosition);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Calculate screen bounds
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const taskbarHeight = 28;
      const windowWidth = defaultSize.width;
      const windowHeight = defaultSize.height;

      // Constrain within screen bounds
      const constrainedX = Math.max(0, Math.min(newX, screenWidth - windowWidth));
      const constrainedY = Math.max(0, Math.min(newY, screenHeight - windowHeight - taskbarHeight));

      updatePosition({ x: constrainedX, y: constrainedY });
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
  }, [isDragging, dragOffset, defaultSize.width, defaultSize.height, onPositionChange]);

  if (isMaximized) {
    return (
      <div className="fixed inset-0 top-0 left-0 right-0 bottom-12 z-50 flex flex-col bg-[#c0c0c0]">
        <WindowTitleBar
          title={title}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onMouseDown={handleMouseDown}
        />
        <div className="flex-1 overflow-auto bg-white border-2 border-[#808080] border-t-white border-l-white">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className="absolute z-40 flex flex-col bg-[#c0c0c0] shadow-[2px_2px_0_rgba(0,0,0,0.8),4px_4px_10px_rgba(0,0,0,0.5)] border-2 border-[#dfdfdf] border-r-[#404040] border-b-[#404040]"
      style={{
        left: position.x,
        top: position.y,
        width: defaultSize.width,
        height: defaultSize.height,
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      <WindowTitleBar
        title={title}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onMouseDown={handleMouseDown}
      />
      <div className="flex-1 overflow-auto bg-white border-2 border-[#808080] border-t-white border-l-white m-[2px]">
        {children}
      </div>
    </div>
  );
}

function WindowTitleBar({
  title,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown,
}: {
  title: string;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="window-drag-handle bg-gradient-to-r from-[#000080] to-[#1084d0] px-1 py-1 flex items-center justify-between cursor-move select-none"
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 bg-white border border-black flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 bg-[#000080]"></div>
        </div>
        <span className="text-white font-bold text-sm tracking-tight drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
          {title}
        </span>
      </div>
      <div className="flex gap-[2px]">
        {onMinimize && (
          <button
            onClick={onMinimize}
            className="w-[18px] h-[18px] bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center justify-center hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:shadow-inner transition-none"
          >
            <div className="w-[6px] h-[2px] bg-black mb-1"></div>
          </button>
        )}
        {onMaximize && (
          <button
            onClick={onMaximize}
            className="w-[18px] h-[18px] bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center justify-center hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:shadow-inner transition-none"
          >
            <div className="w-[7px] h-[7px] border border-black"></div>
          </button>
        )}
        <button
          onClick={onClose}
          className="w-[18px] h-[18px] bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center justify-center hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:shadow-inner transition-none"
        >
          <X className="w-3 h-3 text-black stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
