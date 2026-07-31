"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/components/Container";

const BLOCK_1 = [
  "For us creativity isn't just a service.",
  "It's our mindset.",
];
const BLOCK_2 = [
  "We believe your business objectives deserve to be translated into authentic communication that people actually want to follow.",
  "We step into your shoes to ensure every visual, strategy, and digital experience we build is rooted in your specific culture and goals.",
];

export default function AboutTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Block 1 starts fully visible, stays until 40% scroll, fades out by 50%
  const block1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const block1Y = useTransform(scrollYProgress, [0.4, 0.5], [0, -20]);

  // Block 2 starts invisible, fades in from 50% to 60%, stays until end
  const block2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const block2Y = useTransform(scrollYProgress, [0.5, 0.6], [20, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-orange"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden py-12 md:py-20">
        <Container>
          <div className="relative w-full">
            {/* BLOCK 1 */}
            <motion.div
              style={{ opacity: block1Opacity, y: block1Y }}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex w-full flex-col gap-4 font-heading text-[clamp(2rem,7vw,2.5rem)] font-bold uppercase leading-[1.15] md:gap-6 text-white"
            >
              {BLOCK_1.map((sentence, sIdx) => (
                <span key={sIdx} className="block">
                  {sentence}
                </span>
              ))}
            </motion.div>

            {/* BLOCK 2 */}
            <motion.div
              style={{ opacity: block2Opacity, y: block2Y }}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex w-full flex-col gap-4 font-heading text-[clamp(2rem,7vw,2.5rem)] font-bold uppercase leading-[1.15] md:gap-6 text-white"
            >
              {BLOCK_2.map((sentence, sIdx) => (
                <span key={sIdx} className="block">
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
