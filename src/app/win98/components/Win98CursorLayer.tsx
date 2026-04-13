"use client";

import { useEffect } from "react";

export function Win98CursorLayer() {
  useEffect(() => {
    document.documentElement.classList.add("win98-cursors");
    return () => {
      document.documentElement.classList.remove("win98-cursors");
    };
  }, []);

  return null;
}
