"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/components/Container";

/* ── Phase 1: intro sentences (appear first, then fade out) ── */
const INTRO = [
  "For us creativity isn't just a service.",
  "It's our mindset.",
];

/* ── Phase 2: remaining sentences (appear after intro fades, then fade out at end) ── */
const BODY = [
  "We believe your business objectives deserve to be translated into authentic communication that people actually want to follow.",
  "We step into your shoes to ensure every visual, strategy, and digital experience we build is rooted in your specific culture and goals.",
];

export default function AboutTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ── Scroll timeline ──
     0.00 – 0.10  intro fades in
     0.10 – 0.30  intro stays visible
     0.30 – 0.40  intro fades out
     0.40 – 0.50  body fades in
     0.50 – 0.80  body stays visible
     0.80 – 0.95  body fades out */

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.30, 0.40],
    [0, 1, 1, 0]
  );

  const bodyOpacity = useTransform(
    scrollYProgress,
    [0.40, 0.50, 0.80, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-orange"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden py-12 md:py-20">
        <Container>
          <div className="relative w-full max-w-5xl">
            {/* Phase 1: Intro sentences */}
            <motion.div
              style={{ opacity: introOpacity }}
              className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-6"
            >
              {INTRO.map((sentence, i) => (
                <span
                  key={i}
                  className="block font-heading text-[clamp(2.5rem,8vw,5rem)] font-bold uppercase leading-[1.1] text-white"
                >
                  {sentence}
                </span>
              ))}
            </motion.div>

            {/* Phase 2: Body sentences */}
            <motion.div
              style={{ opacity: bodyOpacity }}
              className="flex flex-col justify-center gap-4 md:gap-6"
            >
              {BODY.map((sentence, i) => (
                <span
                  key={i}
                  className="block font-heading text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-[1.15] text-white"
                >
                  {sentence}
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
