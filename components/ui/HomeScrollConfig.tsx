"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function HomeScrollConfig() {
  const lenis = useLenis((lenis) => {
    // Access the raw Lenis instance to tune scroll speed on this page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lenis as any).options.wheelMultiplier = 0.6;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lenis as any).options.touchMultiplier = 0.9;
  });

  useEffect(() => {
    return () => {
      if (!lenis) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenis as any).options.wheelMultiplier = 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenis as any).options.touchMultiplier = 1.5;
    };
  }, [lenis]);

  return null;
}
