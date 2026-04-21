import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Windows 98 pixel-art arrow cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <svg
          width="12"
          height="19"
          viewBox="0 0 12 19"
          fill="none"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Outer black outline */}
          <path d="M1 0h1v1H1zM0 1h1v1H0zM0 2h1v1H0zM0 3h1v1H0zM0 4h1v1H0zM0 5h1v1H0zM0 6h1v1H0zM0 7h1v1H0zM0 8h1v1H0zM0 9h1v1H0zM0 10h1v1H0zM0 11h1v1H0zM0 12h1v1H0zM0 13h1v1H0zM1 14h1v1H1zM2 15h1v1H2zM3 16h1v1H3zM5 17h1v1H5zM6 16h1v1H6zM7 15h1v1H7zM8 14h1v1H8zM9 13h1v1H9zM10 12h1v1H10zM11 11h1v1H11zM6 11h1v1H6zM7 12h1v1H7zM8 13h1v1H8zM2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM8 0h1v1H8zM9 0h1v1H9zM10 0h1v1H10zM10 1h1v1H10zM10 2h1v1H10zM10 3h1v1H10zM10 4h1v1H10zM10 5h1v1H10zM10 6h1v1H10zM10 7h1v1H10zM10 8h1v1H10zM10 9h1v1H10zM10 10h1v1H10zM9 11h1v1H9zM8 12h1v1H8zM7 13h1v1H7zM6 14h1v1H6zM5 15h1v1H5zM4 15h1v1H4zM3 15h1v1H3zM2 14h1v1H2zM1 13h1v1H1z" fill="black" />
          {/* White fill */}
          <path d="M2 1h8v1H2zM1 2h1v1H1zM1 3h1v1H1zM1 4h1v1H1zM1 5h1v1H1zM1 6h1v1H1zM1 7h1v1H1zM1 8h1v1H1zM1 9h1v1H1zM1 10h1v1H1zM1 11h1v1H1zM1 12h1v1H1zM2 13h1v1H2zM3 14h1v1H3zM4 14h1v1H4zM5 14h1v1H5zM6 13h1v1H6zM7 12h1v1H7zM8 11h1v1H8zM9 10h1v1H9zM2 2h8v8H2z" fill="white" />
        </svg>
      </div>
    </>
  );
}
