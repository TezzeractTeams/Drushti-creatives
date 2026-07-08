"use client";

import { useRef } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ForegroundLayer } from "@/components/ForegroundLayer";

export default function Hero() {
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
