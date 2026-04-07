import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "./utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClassName?: string;
}

interface CardSwapProps {
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  className?: string;
  viewportClassName?: string;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClassName, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={cn(
      "h-full w-full overflow-hidden rounded-[28px] border border-zinc-800/90 bg-zinc-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_42%)]",
      customClassName,
      className
    )}
  />
));

Card.displayName = "Card";

export default function CardSwap({
  delay = 5000,
  pauseOnHover = true,
  onCardClick,
  className,
  viewportClassName,
  children,
}: CardSwapProps) {
  const prefersReducedMotion = useReducedMotion();
  const childArray = useMemo(
    () => Children.toArray(children).filter((child): child is React.ReactElement<CardProps> => isValidElement<CardProps>(child)),
    [children]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const total = childArray.length;

  const goTo = (nextIndex: number) => {
    if (!total) return;
    const normalized = (nextIndex + total) % total;
    setDirection(normalized > activeIndex ? 1 : normalized < activeIndex ? -1 : direction);
    setActiveIndex(normalized);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  useEffect(() => {
    if (total < 2) return;
    if (pauseOnHover && isHovered) return;

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, delay);

    return () => window.clearInterval(intervalId);
  }, [delay, isHovered, pauseOnHover, total]);

  useEffect(() => {
    if (activeIndex > total - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  if (!total) return null;

  const activeChild = childArray[activeIndex];

  return (
    <div
      className={cn("flex h-full w-full flex-col", className)}
      onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
    >
      <div className={cn("relative min-h-[300px] flex-1 overflow-hidden rounded-[28px]", viewportClassName)}>
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 54 : -54, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -54 : 54, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.18 : 0.42, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {cloneElement(activeChild as React.ReactElement<any>, {
              style: { width: "100%", height: "100%", ...(activeChild.props.style ?? {}) },
              onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                activeChild.props.onClick?.(event);
                onCardClick?.(activeIndex);
              },
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              aria-label="Next card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {childArray.map((child, index) => (
              <button
                key={`${child.key ?? "card"}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to card ${index + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex ? "w-8 bg-cyan-300" : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
