import { RouterProvider } from "react-router";
import { router } from "./routes";
import { UIModeProvider, useUIMode } from "./win98/contexts/UIModeContext";
import { Portfolio } from "./Portfolio";
import { Win98Portfolio } from "./win98/Win98Portfolio";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
}

function AppContent() {
  const { mode } = useUIMode();

  // Force modern mode on mobile devices
  if (mode === 'retro' && isMobile()) {
    return <RouterProvider router={router} />;
  }

  if (mode === 'retro') {
    return <Win98Portfolio />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <UIModeProvider>
      <AppContent />
    </UIModeProvider>
  );
}
