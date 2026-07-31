"use client";

import { useRef, type ReactNode } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ForegroundLayer } from "@/components/ForegroundLayer";
import { useHeroLoadPhase } from "@/hooks/useHeroLoadPhase";
import type { FloatingImageConfig } from "@/types/floatingImage";

type HeroProps = {
  floatingImages: FloatingImageConfig[];
  children?: ReactNode;
};

export default function Hero({ floatingImages, children }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { phase, completeFocusSequence } = useHeroLoadPhase();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-blue"
    >
      <BackgroundLayer
        containerRef={sectionRef}
        floatingImages={floatingImages}
        loadPhase={phase}
        onFocusSequenceComplete={completeFocusSequence}
      />
      <div className="h-[calc(0.9rem+3rem+0.9rem+1px)] shrink-0" aria-hidden />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="flex-[0.9]" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-12">
          {children}
          <ForegroundLayer />
        </div>
        <div className="flex-[1.1]" aria-hidden />
      </div>
    </section>
  );
}
