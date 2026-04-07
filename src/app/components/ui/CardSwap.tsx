import React, {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { cn } from "./utils";
import { useCanHover } from "./use-can-hover";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClassName?: string;
}

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  className?: string;
  children: React.ReactNode;
}

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClassName, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={cn(
      "absolute left-1/2 top-1/2 overflow-hidden rounded-[28px] border border-zinc-800/90 bg-zinc-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_42%)]",
      customClassName,
      className
    )}
  />
));

Card.displayName = "Card";

const makeSlot = (index: number, distanceX: number, distanceY: number, total: number): Slot => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.35,
  zIndex: total - index,
});

const placeCard = (element: HTMLDivElement, slot: Slot, skew: number) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export default function CardSwap({
  width = 320,
  height = 220,
  cardDistance = 44,
  verticalDistance = 30,
  delay = 4200,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  easing = "elastic",
  className,
  children,
}: CardSwapProps) {
  const canHover = useCanHover();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const childArray = useMemo(
    () => Children.toArray(children).filter((child): child is React.ReactElement<CardProps> => isValidElement<CardProps>(child)),
    [children]
  );
  const refs = useMemo(() => childArray.map(() => createRef<HTMLDivElement>()), [childArray.length]);
  const order = useRef<number[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.82)",
          dropDuration: 1.55,
          moveDuration: 1.35,
          returnDuration: 1.4,
          promoteOverlap: 0.82,
          returnDelay: 0.08,
        }
      : {
          ease: "power2.inOut",
          dropDuration: 0.75,
          moveDuration: 0.75,
          returnDuration: 0.7,
          promoteOverlap: 0.42,
          returnDelay: 0.16,
        };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!refs.length) return;

    order.current = Array.from({ length: refs.length }, (_, index) => index);
    let cleanupHover: (() => void) | undefined;

    const contextCleanup = gsap.context(() => {
      refs.forEach((ref, index) => {
        if (!ref.current) return;
        placeCard(ref.current, makeSlot(index, cardDistance, verticalDistance, refs.length), skewAmount);
      });

      if (prefersReducedMotion || refs.length < 2) return;

      const swap = () => {
        const [front, ...rest] = order.current;
        if (front === undefined || rest.length === 0) return;

        const frontElement = refs[front]?.current;
        if (!frontElement) return;

        const timeline = gsap.timeline({
          onComplete: () => {
            order.current = [...rest, front];
          },
        });
        timelineRef.current = timeline;

        timeline.to(frontElement, {
          y: `+=${Math.max(height * 1.4, 320)}`,
          duration: config.dropDuration,
          ease: config.ease,
        });

        timeline.addLabel("promote", `-=${config.dropDuration * config.promoteOverlap}`);
        rest.forEach((itemIndex, slotIndex) => {
          const element = refs[itemIndex]?.current;
          if (!element) return;

          const slot = makeSlot(slotIndex, cardDistance, verticalDistance, refs.length);
          timeline.set(element, { zIndex: slot.zIndex }, "promote");
          timeline.to(
            element,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.moveDuration,
              ease: config.ease,
            },
            `promote+=${slotIndex * 0.12}`
          );
        });

        const lastSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        timeline.addLabel("return", `promote+=${config.moveDuration * config.returnDelay}`);
        timeline.call(() => {
          gsap.set(frontElement, { zIndex: lastSlot.zIndex });
        }, undefined, "return");
        timeline.to(
          frontElement,
          {
            x: lastSlot.x,
            y: lastSlot.y,
            z: lastSlot.z,
            duration: config.returnDuration,
            ease: config.ease,
          },
          "return"
        );
      };

      swap();
      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover && canHover && containerRef.current) {
        const pause = () => {
          timelineRef.current?.pause();
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        };

        const resume = () => {
          timelineRef.current?.play();
          if (!intervalRef.current) {
            intervalRef.current = window.setInterval(swap, delay);
          }
        };

        const node = containerRef.current;
        node.addEventListener("mouseenter", pause);
        node.addEventListener("mouseleave", resume);
        cleanupHover = () => {
          node.removeEventListener("mouseenter", pause);
          node.removeEventListener("mouseleave", resume);
        };
      }
    }, containerRef);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      timelineRef.current?.kill();
      timelineRef.current = null;
      cleanupHover?.();
      contextCleanup.revert();
    };
  }, [
    canHover,
    cardDistance,
    config.dropDuration,
    config.ease,
    config.moveDuration,
    config.promoteOverlap,
    config.returnDelay,
    config.returnDuration,
    delay,
    height,
    pauseOnHover,
    prefersReducedMotion,
    refs,
    skewAmount,
    verticalDistance,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-visible [perspective:1100px]", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {childArray.map((child, index) =>
        cloneElement(child as React.ReactElement<any>, {
          key: index,
          ref: refs[index],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (event: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(event);
            onCardClick?.(index);
          },
        })
      )}
    </div>
  );
}
