import type { CSSProperties, ReactNode } from 'react';
import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { BadgeCheck, Lock, Move, RotateCcw, Search, SearchMinus, SearchPlus } from 'lucide-react';
import { Card as BaseCard } from './card';

interface InfiniteCanvasProps {
  children: ReactNode;
  className?: string;
  cardWidth?: number;
  cardHeight?: number;
  spacing?: number;
  showControls?: boolean;
  showZoom?: boolean;
  showStatus?: boolean;
  showInstructions?: boolean;
}

interface CanvasBounds {
  width: number;
  height: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function Card({
  className = '',
  style,
  ...props
}: React.ComponentProps<typeof BaseCard>) {
  return (
    <BaseCard
      className={`border-white/60 bg-white/85 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-[#111315]/88 dark:shadow-[0_18px_55px_rgba(0,0,0,0.36)] ${className}`}
      style={style}
      {...props}
    />
  );
}

export function InfiniteCanvas({
  children,
  className = '',
  cardWidth = 280,
  cardHeight = 220,
  spacing = 30,
  showControls = true,
  showZoom = true,
  showStatus = true,
  showInstructions = true,
}: InfiniteCanvasProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const [bounds, setBounds] = useState<CanvasBounds>({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [interactionEnabled, setInteractionEnabled] = useState(true);

  const cards = useMemo(() => Children.toArray(children), [children]);
  const stepX = cardWidth + spacing;
  const stepY = cardHeight + spacing;

  useEffect(() => {
    const updateBounds = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      setBounds({ width: rect.width, height: rect.height });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) return;

    const centeredStepX = stepX * zoom;
    const centeredStepY = stepY * zoom;

    setOffset({
      x: bounds.width / 2 - centeredStepX * 1.35,
      y: bounds.height / 2 - centeredStepY,
    });
  }, [bounds.height, bounds.width, stepX, stepY, zoom]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionEnabled) return;

    dragRef.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
      pointerId: event.pointerId,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionEnabled || !dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    setOffset({
      x: event.clientX - dragRef.current.x,
      y: event.clientY - dragRef.current.y,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const updateZoom = (nextZoom: number, pointer?: { clientX: number; clientY: number }) => {
    const clampedZoom = clamp(nextZoom, 0.7, 1.75);

    if (!viewportRef.current) {
      setZoom(clampedZoom);
      return;
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const anchorX = pointer ? pointer.clientX - rect.left : rect.width / 2;
    const anchorY = pointer ? pointer.clientY - rect.top : rect.height / 2;
    const worldX = (anchorX - offset.x) / zoom;
    const worldY = (anchorY - offset.y) / zoom;

    setZoom(clampedZoom);
    setOffset({
      x: anchorX - worldX * clampedZoom,
      y: anchorY - worldY * clampedZoom,
    });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!interactionEnabled) return;

    event.preventDefault();
    const zoomDelta = event.deltaY > 0 ? -0.08 : 0.08;
    updateZoom(zoom + zoomDelta, { clientX: event.clientX, clientY: event.clientY });
  };

  const resetView = () => {
    if (!bounds.width || !bounds.height) return;

    setZoom(1);
    setOffset({
      x: bounds.width / 2 - stepX * 1.35,
      y: bounds.height / 2 - stepY,
    });
  };

  const visibleColumns = bounds.width
    ? Math.ceil(bounds.width / (stepX * zoom)) + 4
    : 8;
  const visibleRows = bounds.height
    ? Math.ceil(bounds.height / (stepY * zoom)) + 4
    : 6;

  const startCol = Math.floor((-offset.x / zoom) / stepX) - 2;
  const startRow = Math.floor((-offset.y / zoom) / stepY) - 2;

  const gridItems = useMemo(() => {
    if (!cards.length) return [];

    const items: Array<{
      key: string;
      node: ReactNode;
      style: CSSProperties;
    }> = [];

    for (let row = startRow; row < startRow + visibleRows; row += 1) {
      for (let col = startCol; col < startCol + visibleColumns; col += 1) {
        const index = ((row - startRow) * visibleColumns + (col - startCol)) % cards.length;
        const child = cards[(index + cards.length) % cards.length];

        const baseStyle: CSSProperties = {
          position: 'absolute',
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          left: `${col * stepX}px`,
          top: `${row * stepY}px`,
        };

        let node = child;

        if (isValidElement(child)) {
          const mergedStyle = {
            ...(child.props.style ?? {}),
            width: '100%',
            height: '100%',
          };

          node = cloneElement(child, {
            style: mergedStyle,
          });
        }

        items.push({
          key: `${row}-${col}`,
          node,
          style: baseStyle,
        });
      }
    }

    return items;
  }, [cardHeight, cardWidth, cards, startCol, startRow, stepX, stepY, visibleColumns, visibleRows]);

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-[var(--yellow)]/20 bg-white/65 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:bg-[#0f1113]/80 dark:shadow-[0_25px_85px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,220,0,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.3),transparent_22%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,220,0,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,220,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,220,0,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70 dark:opacity-40" />

      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
        {showStatus && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 shadow-sm backdrop-blur dark:bg-black/35 dark:text-gray-200">
            {interactionEnabled ? <BadgeCheck size={14} className="text-[var(--yellow-dark)]" /> : <Lock size={14} className="text-gray-400" />}
            <span>{interactionEnabled ? 'Canvas activo' : 'Canvas bloqueado'}</span>
          </div>
        )}

        {showZoom && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 shadow-sm backdrop-blur dark:bg-black/35 dark:text-gray-200">
            <Search size={14} className="text-[var(--yellow-dark)]" />
            <span>{Math.round(zoom * 100)}%</span>
          </div>
        )}
      </div>

      {showControls && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/88 p-1.5 shadow-lg backdrop-blur dark:bg-black/35">
          <button
            type="button"
            onClick={() => setInteractionEnabled((current) => !current)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              interactionEnabled
                ? 'bg-[var(--yellow)] text-black'
                : 'bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-300'
            }`}
            aria-label="Toggle canvas interaction"
          >
            <Move size={18} />
          </button>
          <button
            type="button"
            onClick={() => updateZoom(zoom + 0.12)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-[var(--yellow)]/12 dark:bg-white/8 dark:text-white"
            aria-label="Zoom in"
          >
            <SearchPlus size={18} />
          </button>
          <button
            type="button"
            onClick={() => updateZoom(zoom - 0.12)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-[var(--yellow)]/12 dark:bg-white/8 dark:text-white"
            aria-label="Zoom out"
          >
            <SearchMinus size={18} />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-[var(--yellow)]/12 dark:bg-white/8 dark:text-white"
            aria-label="Reset view"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      )}

      {showInstructions && (
        <div className="absolute bottom-4 left-4 z-20 max-w-xs rounded-2xl border border-[var(--yellow)]/20 bg-white/85 px-4 py-3 text-xs leading-relaxed text-gray-600 shadow-lg backdrop-blur dark:bg-black/35 dark:text-gray-300">
          Arrastra para moverte por el canvas. Usa la rueda o los botones para acercar y alejar.
        </div>
      )}

      <div
        ref={viewportRef}
        className={`relative h-full w-full ${interactionEnabled ? 'cursor-grab active:cursor-grabbing touch-none' : 'cursor-default'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {gridItems.map((item) => (
            <div key={item.key} style={item.style}>
              {item.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
