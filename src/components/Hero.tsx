"use client";

import { useRef } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ForegroundLayer } from "@/components/ForegroundLayer";
import type { FloatingImageConfig } from "@/types/floatingImage";

type HeroProps = {
  floatingImages: FloatingImageConfig[];
};

export default function Hero({ floatingImages }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-blue"
    >
      <BackgroundLayer containerRef={sectionRef} floatingImages={floatingImages} />
      <div className="h-[calc(0.9rem+3rem+0.9rem+1px)] shrink-0" aria-hidden />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="flex-[0.9]" aria-hidden />
        <ForegroundLayer />
        <div className="flex-[1.1]" aria-hidden />
      </div>
    </section>
  );
}
