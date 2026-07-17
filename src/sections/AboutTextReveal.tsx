"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";

const SENTENCES = [
  "For us creativity isn't just a service.",
  "It's our mindset.",
  "We believe your business objectives deserve to be translated into authentic communication that people actually want to follow.",
  "We step into your shoes to ensure every visual, strategy, and digital experience we build is rooted in your specific culture and goals.",
];

let globalWordIndex = 0;
const FORMATTED_SENTENCES = SENTENCES.map((sentence) => {
  const words = sentence.trim().split(/\s+/);
  return words.map((word) => {
    const index = globalWordIndex;
    globalWordIndex += 1;
    return { word, index };
  });
});

const TOTAL_WORDS = globalWordIndex;

/** One word, lit from dim to full white as scroll progress passes its
 *  index-based gate — no per-word animation, just a direct scroll-linked
 *  color function, traced from the reference's line-by-line text reveal. */
function RevealWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.3)", "rgba(255,255,255,1)"]
  );

  // Plain inline (not inline-block) so the trailing space stays in the same
  // inline formatting context as the surrounding text.
  return (
    <motion.span style={{ color }}>
      {word}{" "}
    </motion.span>
  );
}

/** Pinned scroll section: the paragraph is always fully visible in a dim
 *  tone, and words light up to full white left-to-right as scroll position
 *  passes each one — traced from the reference's orange text-reveal. */
export default function AboutTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-orange">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden py-20">
        <Container>
          <div className="flex flex-col gap-4 font-heading text-[clamp(1.2rem,2.8vw,2.5rem)] font-bold uppercase leading-[1.2] md:gap-6">
            {FORMATTED_SENTENCES.map((sentenceWords, sIdx) => (
              <span key={sIdx} className="block">
                {sentenceWords.map(({ word, index }) => (
                  <RevealWord
                    key={index}
                    word={word}
                    start={index / TOTAL_WORDS}
                    end={(index + 1) / TOTAL_WORDS}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
