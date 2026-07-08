"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollY: MotionValue<number>;
  depth: number;
  scrollDrift: number;
  floatY?: number;
  duration?: number;
  delay?: number;
}

function FloatingImage({
  src,
  alt,
  className,
  pointerX,
  pointerY,
  scrollY,
  depth,
  scrollDrift,
  floatY = 14,
  duration = 8,
  delay = 0,
}: FloatingImageProps) {
  const prefersReducedMotion = useReducedMotion();
  const px = useTransform(pointerX, (v) => v * depth);
  const py = useTransform(pointerY, (v) => v * depth);
  // Map 0→900px of window scroll to the drift distance for this image.
  // Using window scrollY directly (not target-based progress) so Lenis
  // smooth scroll doesn't interfere with Framer Motion's tracking.
  const sy = useTransform(scrollY, [0, 900], [0, scrollDrift]);

  return (
    // Outer: scroll parallax drift
    <motion.div
      className={`absolute ${className}`}
      style={prefersReducedMotion ? undefined : { y: sy }}
    >
      {/* Pointer parallax */}
      <motion.div style={prefersReducedMotion ? undefined : { x: px, y: py }}>
        {/* Continuous slow float */}
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -floatY, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative block aspect-square overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Manual scroll listener — bypasses Framer Motion's useScroll which conflicts
  // with Lenis smooth scroll. Native scroll events DO fire (Lenis uses native
  // scroll mode), so we set the MotionValue directly on each event.
  const scrollY = useMotionValue(0);
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__heroScrollY = scrollY;
    const update = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  // Pointer parallax (normalized -0.5..0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.4 });

  const handlePointer = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue"
    >
      {/* All images behind the wordmark (z-0 vs h1 z-10).
          Each has a unique scrollDrift so they travel at different speeds
          as the user scrolls — matching the reference's canvas parallax. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="pointer-events-auto h-full w-full">

          {/* Left mid — drifts slowly */}
          <FloatingImage
            src="/work/softlogic.webp"
            alt="Softlogic project"
            pointerX={sx}
            pointerY={sy}
            scrollY={scrollY}
            depth={-50}
            scrollDrift={-180}
            duration={9}
            className="left-[2%] top-[28%] w-44 sm:w-60 lg:w-72"
          />

          {/* Top left — faster drift, partially behind header on load */}
          <FloatingImage
            src="/work/advantis.webp"
            alt="Advantis project"
            pointerX={sx}
            pointerY={sy}
            scrollY={scrollY}
            depth={80}
            scrollDrift={-300}
            duration={10}
            delay={0.7}
            className="left-[4%] top-[2%] w-44 sm:w-60 lg:w-72"
          />

          {/* Center bottom — emerges from below as page loads */}
          <FloatingImage
            src="/work/ginger-fresh.webp"
            alt="Ginger Fresh project"
            pointerX={sx}
            pointerY={sy}
            scrollY={scrollY}
            depth={60}
            scrollDrift={-140}
            duration={7.5}
            delay={0.4}
            className="left-[38%] top-[60%] w-40 sm:w-56 lg:w-64"
          />

          {/* Top right — fastest drift, tucked near header */}
          <FloatingImage
            src="/work/norlanka.webp"
            alt="Norlanka project"
            pointerX={sx}
            pointerY={sy}
            scrollY={scrollY}
            depth={-70}
            scrollDrift={-260}
            duration={11}
            delay={0.2}
            className="right-[2%] top-[2%] w-44 sm:w-60 lg:w-72"
          />

          {/* Right mid — medium drift */}
          <FloatingImage
            src="/work/fairfirst.webp"
            alt="Fairfirst Insurance project"
            pointerX={sx}
            pointerY={sy}
            scrollY={scrollY}
            depth={-40}
            scrollDrift={-200}
            duration={8.5}
            delay={0.5}
            className="right-[4%] top-[40%] w-40 sm:w-56 lg:w-64"
          />

        </div>
      </div>

      {/* Central wordmark — sits above all images */}
      <h1 className="pointer-events-none relative z-10 font-heading text-[clamp(4rem,18vw,20rem)] font-bold uppercase leading-none tracking-tight text-white">
        Drushti
      </h1>
    </section>
  );
}
