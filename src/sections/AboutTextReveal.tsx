"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";

const TEXT =
  "For us creativity isn't just a service. it's our mindset. We believe your business objectives deserve to be translated into authentic communication that people actually want to follow. We step into your shoes to ensure every visual, strategy, and digital experience we build is rooted in your specific culture and goals.";

const WORDS = TEXT.split(" ");

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
  // inline formatting context as the surrounding text — inline-block would
  // trim it as trailing whitespace at the end of its own box, collapsing
  // every word together with no visible gap.
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
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container>
          <p className="font-heading text-[clamp(1.5rem,3.4vw,3rem)] font-bold uppercase leading-[1.25]">
            {WORDS.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                start={i / WORDS.length}
                end={(i + 1) / WORDS.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </Container>
      </div>
    </section>
  );
}
