"use client";

// Local hero variant (compact parallax grid): 150vw × 150vh canvas,
// 30vw/20vh gaps, 20vh padding, radius-stable card hover.
// Swap heroes in src/config/hero.ts.

import { useRef } from "react";
import { BackgroundLayer } from "@/components/hero-local/BackgroundLayer";
import { ForegroundLayer } from "@/components/hero-local/ForegroundLayer";

export default function HeroLocal() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue"
    >
      <BackgroundLayer containerRef={sectionRef} />
      <ForegroundLayer />
    </section>
  );
}
