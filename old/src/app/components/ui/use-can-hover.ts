import * as React from "react";

export function useCanHover() {
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => setCanHover(mediaQuery.matches);

    updateCanHover();
    mediaQuery.addEventListener("change", updateCanHover);

    return () => mediaQuery.removeEventListener("change", updateCanHover);
  }, []);

  return canHover;
}
