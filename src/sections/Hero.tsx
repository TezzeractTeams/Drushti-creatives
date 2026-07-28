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

import { EASE } from "@/lib/motion";

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

  const sy = useTransform(
    scrollY,
    [0, 900],
    [0, scrollDrift]
  );

  return (
    <motion.div
      className={`absolute ${className}`}
      style={
        prefersReducedMotion
          ? undefined
          : {
            y: sy,
          }
      }
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
              x: px,
              y: py,
            }
        }
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                y: [0, -floatY, 0],
              }
          }
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.3,
              ease: EASE,
            }}
            className="
              relative block aspect-[8/5]
              overflow-hidden rounded-2xl
              shadow-xl
              transition-shadow
              hover:shadow-2xl
            "
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="
                (max-width:768px) 35vw,
                (max-width:1024px) 25vw,
                18vw
              "
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

  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      scrollY.set(window.scrollY);
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        update
      );
  }, [scrollY]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const pointerX = useSpring(px, {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  const pointerY = useSpring(py, {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  const handlePointer = (
    e: React.MouseEvent
  ) => {
    if (prefersReducedMotion) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    px.set(
      (e.clientX - rect.left) /
      rect.width -
      0.5
    );

    py.set(
      (e.clientY - rect.top) /
      rect.height -
      0.5
    );
  };
  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="
        relative flex
        min-h-[78svh]
        lg:min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-blue
      "
    >
      {/* Floating images */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="pointer-events-auto h-full w-full">

          {/* Top Left */}
          <FloatingImage
            src="/work/advantis.webp"
            alt="Advantis project"
            pointerX={pointerX}
            pointerY={pointerY}
            scrollY={scrollY}
            depth={35}
            scrollDrift={-100}
            duration={10}
            delay={0.7}
            className="
              left-3 top-10
              w-32
              sm:w-40
              md:left-[4%]
              md:top-[4%]
              md:w-60
              lg:w-72
            "
          />

          {/* Left Middle - desktop only */}
          <FloatingImage
            src="/work/softlogic.webp"
            alt="Softlogic project"
            pointerX={pointerX}
            pointerY={pointerY}
            scrollY={scrollY}
            depth={-35}
            scrollDrift={-150}
            duration={9}
            className="
              hidden
              md:block
              left-[2%]
              top-[32%]
              w-56
              lg:w-72
            "
          />

          {/* Bottom Center */}
          <FloatingImage
            src="/work/ginger-fresh.webp"
            alt="Ginger Fresh project"
            pointerX={pointerX}
            pointerY={pointerY}
            scrollY={scrollY}
            depth={25}
            scrollDrift={-70}
            duration={8}
            delay={0.4}
            className="
              left-1/2
              top-[70%]
              w-32
              -translate-x-1/2

              sm:w-40

              md:left-[38%]
              md:top-[62%]
              md:w-56
              md:translate-x-0

              lg:w-64
            "
          />

          {/* Top Right */}
          <FloatingImage
            src="/work/norlanka.webp"
            alt="Norlanka project"
            pointerX={pointerX}
            pointerY={pointerY}
            scrollY={scrollY}
            depth={-40}
            scrollDrift={-120}
            duration={11}
            delay={0.2}
            className="
              right-3
              top-10
              w-32

              sm:w-40

              md:right-[2%]
              md:top-[4%]
              md:w-60

              lg:w-72
            "
          />

          {/* Right Middle - desktop only */}
          <FloatingImage
            src="/work/fairfirst.webp"
            alt="Fairfirst Insurance project"
            pointerX={pointerX}
            pointerY={pointerY}
            scrollY={scrollY}
            depth={-25}
            scrollDrift={-90}
            duration={8.5}
            delay={0.5}
            className="
              hidden
              md:block
              right-[4%]
              top-[42%]
              w-56
              lg:w-64
            "
          />

        </div>
      </div>


      {/* Wordmark */}
      <h1
        className="
          pointer-events-none
          relative
          z-10

          px-6

          font-heading
          text-[clamp(4.5rem,22vw,12rem)]
          font-bold
          leading-[0.85]
          tracking-tight
          text-white

          md:text-[clamp(7rem,16vw,12rem)]
        "
      >
        Drushti
      </h1>


      {/* Bottom CTA / Scroll */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-10
          -translate-x-1/2

          text-xs
          uppercase
          tracking-[0.25em]
          text-white/70

          md:bottom-10
        "
      >
        Scroll
      </div>

    </section>
  );
}