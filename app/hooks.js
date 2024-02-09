"use client";

import { useLayoutEffect, useState } from "react";

export function useVisualViewportSize() {
  // TODO make more abstracted logic, which can distinguish between mobile device and tabs
  const [visualViewport, setVisualViewport] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateVisualViewportSize() {
      setVisualViewport({
        width: window.visualViewport.width,
        height: window.visualViewport.height,
      });
    }
    window.visualViewport.addEventListener("resize", () =>
      setTimeout(updateVisualViewportSize, 200)
    );
    updateVisualViewportSize();
    return () => window.removeEventListener("resize", updateVisualViewportSize);
  }, []);

  return visualViewport;
}
