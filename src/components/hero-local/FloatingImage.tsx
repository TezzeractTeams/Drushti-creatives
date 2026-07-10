"use client";

import { useRef } from "react";
import Image from "next/image";
import type { FloatingImageConfig } from "@/types/floatingImage";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";

export function FloatingImage({ src, alt, speed, phase, amplitude, priority }: FloatingImageConfig) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time) => {
    const el = wrapRef.current;
    if (!el) return;
    const t = time / 1000;
    const floatY = Math.sin((t / speed) * Math.PI * 2 + phase) * amplitude;
    el.style.transform = `translate3d(0px, ${floatY.toFixed(2)}px, 0)`;
  });

  return (
    <div ref={wrapRef} className="relative h-full w-full" style={{ willChange: "transform" }}>
      <a
        href="#work"
        className="block h-full w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:scale-110 hover:rounded-[14.5px] hover:shadow-2xl hover:brightness-110"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="20vw"
          priority={priority}
        />
      </a>
    </div>
  );
}
