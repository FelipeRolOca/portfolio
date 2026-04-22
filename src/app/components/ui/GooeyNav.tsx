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
.gooey-nav-container {
  position: relative;
}

.gooey-nav-container nav {
  display: flex;
  position: relative;
  transform: translate3d(0, 0, 0.01px);
}

.gooey-nav-container nav ul {
  display: flex;
  gap: 2em;
  list-style: none;
  padding: 0.35em 1em;
  margin: 0;
  position: relative;
  z-index: 3;
  color: white;
  text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2);
  border-radius: 999px;
  border: 1px solid rgb(141 224 255 / 12%);
  background: linear-gradient(180deg, rgb(9 14 28 / 82%), rgb(5 9 20 / 72%));
  box-shadow: 0 18px 40px rgb(2 6 23 / 24%);
}

.gooey-nav-container nav ul li {
  border-radius: 100vw;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 0 0.5px 1.5px transparent;
  color: rgb(228 228 231);
}

.gooey-nav-container nav ul li a {
  display: inline-block;
  padding: 0.65em 1.05em;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: inherit;
  outline: none;
}

.gooey-nav-container nav ul li:focus-within {
  box-shadow: 0 0 0.5px 1.5px white;
}

.gooey-nav-container nav ul li::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: -1;
}

.gooey-nav-container nav ul li.active {
  color: #03131c;
  text-shadow: none;
}

.gooey-nav-container nav ul li.active::after {
  opacity: 1;
  transform: scale(1);
}

.gooey-nav-container .effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  opacity: 1;
  pointer-events: none;
  display: grid;
  place-items: center;
  z-index: 1;
}

.gooey-nav-container .effect.text {
  color: white;
  transition: color 0.3s ease;
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  z-index: 4;
}

.gooey-nav-container .effect.text.active {
  color: #03131c;
}

.gooey-nav-container .effect.filter {
  filter: url('#gooey-filter');
}

.gooey-nav-container .effect.filter::before {
  content: "";
  position: absolute;
  inset: -75px;
  z-index: -2;
}

.gooey-nav-container .effect.filter::after {
  content: "";
  position: absolute;
  inset: 0;
  background: white;
  transform: scale(0);
  opacity: 0;
  z-index: -1;
  border-radius: 100vw;
}

.gooey-nav-container .effect.active::after {
  animation: pill 0.3s ease both;
}

@keyframes pill {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.particle,
.point {
  display: block;
  opacity: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  transform-origin: center;
}

.particle {
  --time: 5s;
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
  animation: particle calc(var(--time)) ease 1 -350ms;
}

.point {
  background: var(--color, #38bdf8);
  opacity: 1;
  animation: point calc(var(--time)) ease 1 -350ms;
}

@keyframes particle {
  0% {
    transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
    opacity: 1;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }

  70% {
    transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
    opacity: 1;
    animation-timing-function: ease;
  }

  85% {
    transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
    opacity: 1;
  }

  100% {
    transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
    opacity: 1;
  }
}

@keyframes point {
  0% {
    transform: scale(0);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }

  25% {
    transform: scale(calc(var(--scale) * 0.25));
  }

  38% {
    opacity: 1;
  }

  65% {
    transform: scale(var(--scale));
    opacity: 1;
    animation-timing-function: ease;
  }

  85% {
    transform: scale(var(--scale));
    opacity: 1;
  }

  100% {
    transform: scale(0);
    opacity: 0;
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
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = ["#38bdf8", "#8b5cf6", "#22d3ee", "#67e8f9"],
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

    const box = {
      left: `${targetRect.x - containerRect.x}px`,
      top: `${targetRect.y - containerRect.y}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
    };

    Object.assign(filterRef.current.style, box);
    Object.assign(textRef.current.style, box);
    textRef.current.textContent = element.innerText;
  };

  const createParticle = (index: number) => {
    const time = animationTime * 2 + noise(timeVariance * 2);
    const rotate = noise(particleR / 10);

    return {
      start: getXY(particleDistances[0], particleCount - index, particleCount),
      end: getXY(particleDistances[1] + noise(7), particleCount - index, particleCount),
      time,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + particleR / 20) * 10 : (rotate - particleR / 20) * 10,
    };
  };

  const makeParticles = () => {
    const filter = filterRef.current;
    if (!filter) return;

    const bubbleTime = animationTime * 2 + timeVariance;
    filter.style.setProperty("--time", `${bubbleTime}ms`);
    filter.querySelectorAll(".particle").forEach((particle) => particle.remove());
    filter.classList.remove("active");

    for (let index = 0; index < particleCount; index++) {
      const particleConfig = createParticle(index);

      window.setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");

        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${particleConfig.start[0]}px`);
        particle.style.setProperty("--start-y", `${particleConfig.start[1]}px`);
        particle.style.setProperty("--end-x", `${particleConfig.end[0]}px`);
        particle.style.setProperty("--end-y", `${particleConfig.end[1]}px`);
        particle.style.setProperty("--time", `${particleConfig.time}ms`);
        particle.style.setProperty("--scale", `${particleConfig.scale}`);
        particle.style.setProperty("--color", particleConfig.color);
        particle.style.setProperty("--rotate", `${particleConfig.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        filter.appendChild(particle);

        requestAnimationFrame(() => {
          filter.classList.add("active");
          textRef.current?.classList.add("active");
        });

        window.setTimeout(() => {
          particle.remove();
        }, particleConfig.time);
      }, 30);
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeElement = navRef.current.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
    if (activeElement) {
      updateEffectPosition(activeElement);
      textRef.current?.classList.add("active");
      filterRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentElement = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
      if (currentElement) {
        updateEffectPosition(currentElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <style>{styles}</style>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="gooey-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </svg>
      <nav aria-label="Primary navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? "active" : ""}>
              <a
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  if (activeIndex !== index) {
                    textRef.current?.classList.remove("active");
                    filterRef.current?.classList.remove("active");
                    onItemSelect(item.href);
                    makeParticles();
                  } else {
                    onItemSelect(item.href);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    if (activeIndex !== index) {
                      textRef.current?.classList.remove("active");
                      filterRef.current?.classList.remove("active");
                      onItemSelect(item.href);
                      makeParticles();
                    } else {
                      onItemSelect(item.href);
                    }
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
}
