"use client";

import { useEffect, useState } from "react";

type CursorMode = "arrow" | "hand";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>("arrow");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interactiveSelector =
      'a, button, input, textarea, select, label, [role="button"], [data-cursor="pointer"]';

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      setMode(target?.closest(interactiveSelector) ? "hand" : "arrow");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const prevBodyCursor = document.body.style.cursor;
    const prevHtmlCursor = document.documentElement.style.cursor;
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = prevBodyCursor;
      document.documentElement.style.cursor = prevHtmlCursor;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[99999]">
      {/* ARROW */}
      <div
        className={mode === "arrow" ? "opacity-100" : "opacity-0"}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pressed ? 0.95 : 1})`,
          transformOrigin: "top left",
          width: 40,
          height: 40,
          position: "absolute",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          shapeRendering="crispEdges"
          style={{ imageRendering: "pixelated", overflow: "visible" }}
        >
          <path
            d="M6 4h4v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h-4v2h-2v-2h-2v-2h-2v-2h-2v-2h-2v-4h-2v-2h-2v-2h-2v-2H6z"
            fill="#ffffff"
          />
          <path
            d="M7 5h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h-2v-1h-2v-2h-2v-2h-2v-2h-2v-2h-2v-4h-2v-2h-2v-2H7z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* HAND */}
      <div
        className={mode === "hand" ? "opacity-100" : "opacity-0"}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pressed ? 0.95 : 1})`,
          transformOrigin: "top left",
          width: 40,
          height: 40,
          position: "absolute",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          shapeRendering="crispEdges"
          style={{ imageRendering: "pixelated", overflow: "visible" }}
        >
          {/* outline */}
          <path
            d="M14 6h4v10h2V7h3v10h2V9h3v10h2V12h3v14c0 5-4 10-10 10H14c-4 0-7-3-7-7v-7c0-2 1-4 3-4h3V6z"
            fill="#ffffff"
          />
          {/* fill */}
          <path
            d="M15 7h2v10h4V8h1v10h4V10h1v10h4V13h1v12c0 4-3 8-9 8H14c-3 0-5-2-5-5v-7c0-1 1-2 2-2h4V7z"
            fill="#000000"
          />
          {/* finger gaps / definition */}
          <path d="M21 8v9" stroke="#ffffff" strokeWidth="1" />
          <path d="M26 10v8" stroke="#ffffff" strokeWidth="1" />
          <path d="M31 13v6" stroke="#ffffff" strokeWidth="1" />
          {/* thumb */}
          <path d="M12 18h3v6h-3z" fill="#ffffff" />
          <path d="M13 19h1v4h-1z" fill="#000000" />
          {/* wrist */}
          <path d="M16 27h6v4h-6z" fill="#ffffff" />
          <path d="M17 28h4v2h-4z" fill="#000000" />
        </svg>
      </div>
    </div>
  );
}
