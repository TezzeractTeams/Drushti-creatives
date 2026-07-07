"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";
import FloatingShape from "@/components/FloatingShape";
import TypewriterWord from "@/components/TypewriterWord";
import { Burst, Circle, Spike, HalfCircle } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Mask/clip reveal — child words roll up from behind a bar, staggered. */
const lineGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const wordMask: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

const lineFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** A single word wrapped in an overflow-hidden mask. */
function Word({ children, className }: { children: string; className?: string }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
      <motion.span variants={wordMask} className={`inline-block ${className ?? ""}`}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // --- Scroll parallax ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBurst = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yCircle = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const ySpike = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yHalf = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // --- Pointer parallax (spring-followed, normalized -0.5..0.5) ---
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

  // Per-shape pointer depth (px of travel across the full viewport).
  const burstPX = useTransform(sx, (v) => v * 46);
  const burstPY = useTransform(sy, (v) => v * 46);
  const circlePX = useTransform(sx, (v) => v * -70);
  const circlePY = useTransform(sy, (v) => v * -70);
  const spikePX = useTransform(sx, (v) => v * 34);
  const spikePY = useTransform(sy, (v) => v * 34);
  const halfPX = useTransform(sx, (v) => v * -52);
  const halfPY = useTransform(sy, (v) => v * -52);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="relative flex min-h-screen items-center overflow-hidden bg-orange"
    >
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <FloatingShape
          scrollY={yBurst}
          pointerX={burstPX}
          pointerY={burstPY}
          floatRotate={20}
          duration={9}
          className="absolute right-[8%] top-[16%] w-24 text-sky sm:w-32 lg:w-40"
        >
          <Burst className="h-auto w-full" />
        </FloatingShape>

        <FloatingShape
          scrollY={yCircle}
          pointerX={circlePX}
          pointerY={circlePY}
          floatY={26}
          floatRotate={0}
          duration={8}
          delay={0.5}
          className="absolute right-[22%] top-[62%] w-16 text-blue sm:w-20 lg:w-24"
        >
          <Circle className="h-auto w-full" />
        </FloatingShape>

        <FloatingShape
          scrollY={ySpike}
          pointerX={spikePX}
          pointerY={spikePY}
          floatY={14}
          floatRotate={-30}
          duration={11}
          delay={0.2}
          className="absolute left-[6%] top-[18%] w-14 text-yellow sm:w-20 lg:w-24"
        >
          <Spike className="h-auto w-full" />
        </FloatingShape>

        <FloatingShape
          scrollY={yHalf}
          pointerX={halfPX}
          pointerY={halfPY}
          floatY={20}
          floatRotate={12}
          duration={10}
          delay={0.8}
          className="absolute bottom-[12%] left-[12%] w-20 text-green sm:w-28 lg:w-32"
        >
          <HalfCircle className="h-auto w-full" />
        </FloatingShape>
      </div>

      <Container className="relative z-10 py-28">
        {/* Kicker */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 sm:text-sm">
          A creative marketing agency
        </p>

        {/* Headline with staggered word mask reveal */}
        <motion.h1
          variants={lineGroup}
          initial="hidden"
          animate="visible"
          className="font-heading font-bold text-white text-display-lg"
        >
          <span className="block">
            <Word>YOUR</Word>
          </span>
          <motion.div variants={lineFade} className="block">
            <TypewriterWord className="text-blue" />
          </motion.div>
          <span className="block">
            <Word>OUR</Word> <Word>CREATIVITY</Word>
          </span>
        </motion.h1>

        {/* Sub-line */}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          We turn the way you see your brand into results the world can&apos;t look
          away from — clarity of vision, made real.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <BadgeButton href="#contact">Let&apos;s create</BadgeButton>
          <a href="#work" className="text-sm font-semibold text-white hover:underline">
            See our work →
          </a>
        </div>
      </Container>
    </section>
  );
}
