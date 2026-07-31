"use client";

import { useCallback, useEffect, useState } from "react";

export type HeroLoadPhase = "shell" | "focus" | "complete";

export function useHeroLoadPhase() {
  const [phase, setPhase] = useState<HeroLoadPhase>("shell");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("focus"));
    return () => cancelAnimationFrame(raf);
  }, []);

  const completeFocusSequence = useCallback(() => {
    setPhase("complete");
  }, []);

  return { phase, completeFocusSequence };
}
