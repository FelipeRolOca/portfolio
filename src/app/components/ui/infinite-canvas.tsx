import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { BadgeCheck, Lock, Minus, Move, Plus, RotateCcw, Search } from 'lucide-react';
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

interface ViewWindow {
  startCol: number;
  startRow: number;
  zoom: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const EXTRA_COLUMNS = 1;
const EXTRA_ROWS = 1;

export function Card({
  className = '',
  style,
  ...props
}: React.ComponentProps<typeof BaseCard>) {
  return (
    <BaseCard
      className={`border-white/60 bg-white/92 shadow-[0_14px_34px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-[#111315]/94 dark:shadow-[0_14px_40px_rgba(0,0,0,0.28)] ${className}`}
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
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const hasInitializedView = useRef(false);
  const frameRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const windowRef = useRef({ startCol: 0, startRow: 0 });

  const [bounds, setBounds] = useState<CanvasBounds>({ width: 0, height: 0 });
  const [viewWindow, setViewWindow] = useState<ViewWindow>({
    startCol: 0,
    startRow: 0,
    zoom: 1,
  });
  const [interactionEnabled, setInteractionEnabled] = useState(true);

  const cards = useMemo(() => Children.toArray(children), [children]);
  const preparedCards = useMemo(
    () =>
      cards.map((child) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<{ style?: CSSProperties }>;
        return cloneElement(element, {
          style: {
            ...(element.props.style ?? {}),
            width: '100%',
            height: '100%',
          },
        });
      }),
    [cards]
  );
  const stepX = cardWidth + spacing;
  const stepY = cardHeight + spacing;

  const applyTransform = () => {
    if (!canvasRef.current) return;

    canvasRef.current.style.transform = `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0) scale(${zoomRef.current})`;
  };

  const getWindowPosition = (x: number, y: number, zoom: number) => ({
    startCol: Math.floor((-x / zoom) / stepX),
    startRow: Math.floor((-y / zoom) / stepY),
  });

  const syncWindow = (force = false) => {
    const nextWindow = getWindowPosition(offsetRef.current.x, offsetRef.current.y, zoomRef.current);

    if (
      force ||
      nextWindow.startCol !== windowRef.current.startCol ||
      nextWindow.startRow !== windowRef.current.startRow ||
      zoomRef.current !== viewWindow.zoom
    ) {
      windowRef.current = nextWindow;
      setViewWindow({
        ...nextWindow,
        zoom: zoomRef.current,
      });
    }
  };

  const schedulePaint = (forceWindowSync = false) => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      applyTransform();
      syncWindow(forceWindowSync);
    });
  };

  useEffect(() => {
    const updateBounds = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      setBounds({ width: rect.width, height: rect.height });
    };

    updateBounds();

    const resizeObserver = viewportRef.current ? new ResizeObserver(updateBounds) : null;
    if (viewportRef.current && resizeObserver) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener('resize', updateBounds);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height || hasInitializedView.current) return;

    hasInitializedView.current = true;
    offsetRef.current = {
      x: bounds.width / 2 - stepX * 1.1,
      y: bounds.height / 2 - stepY * 0.95,
    };
    zoomRef.current = 1;
    applyTransform();
    syncWindow(true);
  }, [bounds.height, bounds.width, stepX, stepY, viewWindow.zoom]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionEnabled) return;

    dragRef.current = {
      x: event.clientX - offsetRef.current.x,
      y: event.clientY - offsetRef.current.y,
      pointerId: event.pointerId,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionEnabled || !dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    offsetRef.current = {
      x: event.clientX - dragRef.current.x,
      y: event.clientY - dragRef.current.y,
    };

    schedulePaint(false);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
      schedulePaint(false);
    }
  };

  const updateZoom = (nextZoom: number, pointer?: { clientX: number; clientY: number }) => {
    const clampedZoom = clamp(nextZoom, 0.92, 1.12);

    if (!viewportRef.current) {
      zoomRef.current = clampedZoom;
      syncWindow(true);
      return;
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const anchorX = pointer ? pointer.clientX - rect.left : rect.width / 2;
    const anchorY = pointer ? pointer.clientY - rect.top : rect.height / 2;
    const worldX = (anchorX - offsetRef.current.x) / zoomRef.current;
    const worldY = (anchorY - offsetRef.current.y) / zoomRef.current;

    zoomRef.current = clampedZoom;
    offsetRef.current = {
      x: anchorX - worldX * clampedZoom,
      y: anchorY - worldY * clampedZoom,
    };

    schedulePaint(true);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!interactionEnabled) return;

    event.preventDefault();
    const zoomDelta = event.deltaY > 0 ? -0.05 : 0.05;
    updateZoom(zoomRef.current + zoomDelta, { clientX: event.clientX, clientY: event.clientY });
  };

  const resetView = () => {
    if (!bounds.width || !bounds.height) return;

    zoomRef.current = 1;
    offsetRef.current = {
      x: bounds.width / 2 - stepX * 1.1,
      y: bounds.height / 2 - stepY * 0.95,
    };
    schedulePaint(true);
  };

  const visibleColumns = bounds.width ? Math.ceil(bounds.width / (stepX * viewWindow.zoom)) + EXTRA_COLUMNS : 5;
  const visibleRows = bounds.height ? Math.ceil(bounds.height / (stepY * viewWindow.zoom)) + EXTRA_ROWS : 4;

  const gridItems = useMemo(() => {
    if (!preparedCards.length) return [];

    const items: Array<{
      key: string;
      node: ReactNode;
      style: CSSProperties;
    }> = [];

    for (let row = viewWindow.startRow; row < viewWindow.startRow + visibleRows; row += 1) {
      for (let col = viewWindow.startCol; col < viewWindow.startCol + visibleColumns; col += 1) {
        const safeModulo = (n: number, m: number) => ((n % m) + m) % m;
        const index = safeModulo(row * 7 + col, preparedCards.length);
        const child = preparedCards[index];

        const baseStyle: CSSProperties = {
          position: 'absolute',
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          left: `${col * stepX}px`,
          top: `${row * stepY}px`,
        };

        items.push({
          key: `${row}-${col}`,
          node: child,
          style: baseStyle,
        });
      }
    }

    return items;
  }, [cardHeight, cardWidth, preparedCards, stepX, stepY, viewWindow.startCol, viewWindow.startRow, visibleColumns, visibleRows]);

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-[var(--yellow)]/20 bg-white/82 shadow-[0_20px_60px_rgba(15,23,42,0.1)] dark:bg-[#0f1113]/92 dark:shadow-[0_20px_70px_rgba(0,0,0,0.28)] ${className}`}
      style={{ contain: 'layout paint style' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,220,0,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent_16%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,220,0,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_16%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,220,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,220,0,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45 dark:opacity-28" />

      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
        {showStatus && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 shadow-sm dark:bg-[#131518] dark:text-gray-200">
            {interactionEnabled ? <BadgeCheck size={14} className="text-[var(--yellow-dark)]" /> : <Lock size={14} className="text-gray-400" />}
            <span>{interactionEnabled ? 'Canvas activo' : 'Canvas bloqueado'}</span>
          </div>
        )}

        {showZoom && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 shadow-sm dark:bg-[#131518] dark:text-gray-200">
            <Search size={14} className="text-[var(--yellow-dark)]" />
            <span>{Math.round(viewWindow.zoom * 100)}%</span>
          </div>
        )}
      </div>

      {showControls && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[var(--yellow)]/20 bg-white/94 p-1.5 shadow-lg dark:bg-[#131518]">
          <button
            type="button"
            onClick={() => setInteractionEnabled((current) => !current)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              interactionEnabled ? 'bg-[var(--yellow)] text-black' : 'bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-300'
            }`}
            aria-label="Toggle canvas interaction"
          >
            <Move size={18} />
          </button>
          <button
            type="button"
            onClick={() => updateZoom(zoomRef.current + 0.08)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-[var(--yellow)]/12 dark:bg-white/8 dark:text-white"
            aria-label="Zoom in"
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            onClick={() => updateZoom(zoomRef.current - 0.08)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-[var(--yellow)]/12 dark:bg-white/8 dark:text-white"
            aria-label="Zoom out"
          >
            <Minus size={18} />
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
        <div className="absolute bottom-4 left-4 z-20 max-w-xs rounded-2xl border border-[var(--yellow)]/20 bg-white/92 px-4 py-3 text-xs leading-relaxed text-gray-600 shadow-lg dark:bg-[#131518] dark:text-gray-300">
          Arrastra para moverte por el canvas. Usa la rueda o los botones para acercar y alejar.
        </div>
      )}

      <div
        ref={viewportRef}
        className={`relative h-full w-full select-none ${interactionEnabled ? 'touch-none cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        style={{ contain: 'layout paint' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 origin-top-left transform-gpu will-change-transform"
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
