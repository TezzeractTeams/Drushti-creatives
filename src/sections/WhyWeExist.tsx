"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import { EASE } from "@/lib/motion";

// TODO: swap in Drushti's real service categories/copy — these are
// placeholders that mirror the reference's structure (a short category
// name, one line of description, and 3 sub-tags) so the layout is ready to
// drop real content into.
const SERVICE_CATEGORIES = [
  {
    name: "Brand & Creative",
    description:
      "We build brands that move people and make sense — strategy, identity, and creative direction that sounds and feels like you mean it.",
    tags: ["Strategy", "Identity", "Direction"],
    color: "#284F9F", // Drushti blue
  },
  {
    name: "Campaign & Digital",
    description:
      "We turn ideas into campaigns that actually move — concept to execution, across every channel that matters to your audience.",
    tags: ["Concept", "Content", "Paid Media"],
    color: "#DC5C26", // Drushti orange
  },
  {
    name: "Visual & Motion",
    description:
      "We don't just design visuals, we design experiences — from stills to motion, we make brands tangible and memorable.",
    tags: ["Design", "Animation", "Photography"],
    color: "#77C26B", // Drushti green
  },
  {
    name: "Growth & Partnership",
    description:
      "Behind every creative leap is a solid system — we build the process and partnership that let you scale without the chaos.",
    tags: ["Consulting", "Process", "Analytics"],
    color: "#E0B624", // Drushti yellow
  },
] as const;

const TOTAL = SERVICE_CATEGORIES.length;

// CSS custom properties carry the block size so nested offsets can reference
// `var(--bw)` and stay responsive without JS measurement — same approach
// used by the "Why We Exist" domino blocks.
const ROW_STYLE = {
  "--bw": "clamp(64px, 6.5vw, 96px)",
  "--bh": "clamp(180px, 20vw, 260px)",
} as CSSProperties;

const LEAN = 68; // resting angle once a block topples onto its neighbor

/** Block i topples during its own scroll segment [i/TOTAL, (i+1)/TOTAL] and
 *  then HOLDS that lean for the rest of the scroll — no further compounding,
 *  and no final "all flat" stage, since the last block has nothing to its
 *  right to fall onto and stays upright the whole time. This mirrors the
 *  independent (non-nested) rotation approach used for the "Why We Exist"
 *  section, which avoids rotations compounding across blocks. */
function useDominoRotation(index: number, scrollYProgress: MotionValue<number>) {
  const isLast = index === TOTAL - 1;
  const ownStart = index / TOTAL;
  const ownEnd = (index + 1) / TOTAL;

  return useTransform(
    scrollYProgress,
    isLast ? [0, 1] : [0, ownStart, ownEnd, 1],
    isLast ? [0, 0] : [0, 0, LEAN, LEAN],
    { clamp: true }
  );
}

/** One category block in the right-side domino row — falls onto its
 *  neighbor during its own scroll segment, in its own brand color. */
function DominoBlock({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const category = SERVICE_CATEGORIES[index];
  const rotate = useDominoRotation(index, scrollYProgress);

  return (
    <motion.div
      style={{
        rotate,
        originX: 1,
        originY: 1,
        left: `calc(${index} * var(--bw))`,
        width: "var(--bw)",
        height: "var(--bh)",
        zIndex: TOTAL - index,
        willChange: "transform",
      }}
      className="absolute bottom-0"
    >
      <div
        className="flex h-full w-full items-end rounded-xl p-3 shadow-xl"
        style={{ backgroundColor: category.color }}
      >
        <span className="font-heading text-xs font-bold uppercase leading-tight text-white sm:text-sm">
          {category.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const rounded = Math.min(TOTAL - 1, Math.max(0, Math.round(v)));
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  const category = SERVICE_CATEGORIES[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink"
      // Controls how much scroll distance it takes to cycle through all 4
      // categories — bigger number = slower/longer scroll per category.
      style={{ height: `${TOTAL * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            <Burst className="h-4 w-4 text-orange" />
            What We Do
          </motion.div>

          {/* Category name + description crossfade as the active index
              changes, matching the reference's persistent-heading-with-
              changing-subject treatment rather than each category having
              its own separate static block. */}
          <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={category.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] text-white"
                >
                  {category.name}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={category.description}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                  className="mt-6 max-w-md text-base leading-relaxed text-white/60"
                >
                  {category.description}
                </motion.p>
              </AnimatePresence>

              {/* Progress dots — lets someone see where they are in the
                  4-category cycle at a glance, since the scroll-driven
                  reveal alone doesn't otherwise signal position/count. */}
              <div className="mt-10 flex items-center gap-2">
                {SERVICE_CATEGORIES.map((c, i) => (
                  <span
                    key={c.name}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-orange" : "w-1.5 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Domino row: 4 blocks, one per category. Each topples onto
                its neighbor during its own scroll segment and holds that
                lean — a running visual tally of how far through the 4
                categories the scroll has progressed. */}
            <div
              className="relative mx-auto sm:ml-auto sm:mr-0"
              style={{
                ...ROW_STYLE,
                width: `calc(${TOTAL} * var(--bw))`,
                height: "var(--bh)",
              }}
            >
              {SERVICE_CATEGORIES.map((_, i) => (
                <DominoBlock key={i} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
