

import { cn } from "./utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  offset?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  borderWidth = 2,
  colorFrom = "#3b82f6",
  colorTo = "#60a5fa",
  delay = 0,
  offset = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `${delay}s`,
          "--offset": `${offset}px`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute rounded-[inherit] [border:calc(var(--border-width)*1)_solid_transparent]",
        "inset-[var(--offset)]",

        // mask-image logic to show only the border
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

        // pseudo-element for the moving beam
        "after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1))]",
        className
      )}
    />
  );
};
