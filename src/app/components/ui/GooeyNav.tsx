import { useEffect, useMemo, useRef } from "react";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  activeHref: string;
  onItemSelect: (href: string) => void;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: string[];
};

const styles = `
.gooey-nav-shell {
  position: relative;
  isolation: isolate;
}

.gooey-nav-shell nav {
  position: relative;
  display: flex;
  transform: translate3d(0, 0, 0.01px);
}

.gooey-nav-shell ul {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  list-style: none;
  margin: 0;
  padding: 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(39, 39, 42, 0.9);
  background: rgba(24, 24, 27, 0.76);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.26);
  backdrop-filter: blur(18px);
}

.gooey-nav-shell li {
  position: relative;
  z-index: 1;
  border-radius: 999px;
  color: rgb(161 161 170);
  transition: color 0.25s ease;
}

.gooey-nav-shell li.active {
  color: rgb(9 9 11);
}

.gooey-nav-shell a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.15rem;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  outline: none;
}

.gooey-nav-shell li:focus-within {
  box-shadow: 0 0 0 1.5px rgba(103, 232, 249, 0.75);
}

.gooey-nav-shell .effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.gooey-nav-shell .effect.text {
  z-index: 4;
  color: rgb(9 9 11);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.gooey-nav-shell .effect.filter {
  z-index: 2;
  filter: blur(10px) contrast(26);
}

.gooey-nav-shell .effect.filter::before {
  content: "";
  position: absolute;
  inset: -64px;
  background: transparent;
}

.gooey-nav-shell .effect.filter::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffffff 0%, #dbeafe 100%);
  opacity: 1;
}

.gooey-nav-shell .particle,
.gooey-nav-shell .point {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 999px;
}

.gooey-nav-shell .particle {
  position: absolute;
  top: calc(50% - 9px);
  left: calc(50% - 9px);
  animation: gooey-particle var(--time) ease both;
}

.gooey-nav-shell .point {
  background: var(--color, #38bdf8);
  animation: gooey-point var(--time) ease both;
}

@keyframes gooey-particle {
  0% {
    opacity: 0;
    transform: rotate(0deg) translate(var(--start-x), var(--start-y));
  }
  25% {
    opacity: 1;
  }
  70% {
    opacity: 1;
    transform: rotate(calc(var(--rotate) * 0.55)) translate(calc(var(--end-x) * 1.15), calc(var(--end-y) * 1.15));
  }
  100% {
    opacity: 0;
    transform: rotate(var(--rotate)) translate(calc(var(--end-x) * 0.45), calc(var(--end-y) * 0.45));
  }
}

@keyframes gooey-point {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
    transform: scale(var(--scale));
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
`;

function noise(n = 1) {
  return n / 2 - Math.random() * n;
}

function getXY(distance: number, pointIndex: number, totalPoints: number) {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
}

export default function GooeyNav({
  items,
  activeHref,
  onItemSelect,
  animationTime = 560,
  particleCount = 14,
  particleDistances = [72, 12],
  particleR = 80,
  timeVariance = 240,
  colors = ["#38bdf8", "#60a5fa", "#22d3ee", "#67e8f9"],
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.href === activeHref);
    return index >= 0 ? index : 0;
  }, [activeHref, items]);

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();

    const stylesToApply = {
      left: `${targetRect.x - containerRect.x}px`,
      top: `${targetRect.y - containerRect.y}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
    };

    Object.assign(filterRef.current.style, stylesToApply);
    Object.assign(textRef.current.style, stylesToApply);
    textRef.current.textContent = element.innerText;
  };

  const createParticle = (index: number) => {
    const time = animationTime * 2 + noise(timeVariance * 2);
    const rotate = noise(particleR / 10);
    return {
      start: getXY(particleDistances[0], particleCount - index, particleCount),
      end: getXY(particleDistances[1] + noise(6), particleCount - index, particleCount),
      time,
      scale: 1 + noise(0.18),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + particleR / 18) * 10 : (rotate - particleR / 18) * 10,
    };
  };

  const burstParticles = () => {
    const filter = filterRef.current;
    if (!filter) return;

    filter.querySelectorAll(".particle").forEach((particle) => particle.remove());

    for (let index = 0; index < particleCount; index++) {
      const particleConfig = createParticle(index);
      const particle = document.createElement("span");
      const point = document.createElement("span");

      particle.className = "particle";
      point.className = "point";

      particle.style.setProperty("--start-x", `${particleConfig.start[0]}px`);
      particle.style.setProperty("--start-y", `${particleConfig.start[1]}px`);
      particle.style.setProperty("--end-x", `${particleConfig.end[0]}px`);
      particle.style.setProperty("--end-y", `${particleConfig.end[1]}px`);
      particle.style.setProperty("--time", `${particleConfig.time}ms`);
      particle.style.setProperty("--scale", `${particleConfig.scale}`);
      particle.style.setProperty("--color", particleConfig.color);
      particle.style.setProperty("--rotate", `${particleConfig.rotate}deg`);

      particle.appendChild(point);
      filter.appendChild(particle);

      window.setTimeout(() => {
        particle.remove();
      }, particleConfig.time);
    }
  };

  useEffect(() => {
    if (!navRef.current) return;
    const activeElement = navRef.current.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
    if (activeElement) {
      updateEffectPosition(activeElement);
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentElement = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
      if (currentElement) {
        updateEffectPosition(currentElement);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="gooey-nav-shell">
      <style>{styles}</style>
      <nav aria-label="Primary navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? "active" : ""}>
              <a
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onItemSelect(item.href);
                  burstParticles();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span ref={filterRef} className="effect filter" aria-hidden="true" />
      <span ref={textRef} className="effect text" aria-hidden="true" />
    </div>
  );
}
