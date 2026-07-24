"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import { EASE } from "@/lib/motion";

const CARDS = [
  {
    title: "Deep Alignment",
    description:
      "We step into your shoes to ensure every design and strategy feels like an honest reflection of your vision.",
    color: "#284F9F", // Drushti blue
    rotate: -6,
  },
  {
    title: "Radical Clarity",
    description:
      "We strip away the noise to turn your complex ideas into a simple, professional message that everyone understands.",
    color: "#DC5C26", // Drushti orange
    rotate: 4,
  },
  {
    title: "Genuine Rapport",
    description:
      "We move past generic content to build authentic visuals and words that create a real human bond with your audience.",
    color: "#257FC2", // Drushti sky blue — swapped from green since the section background is now green
    rotate: -3,
  },
  {
    title: "Total Accountability",
    description:
      "We handle the creative & strategic thinking focus on the fine details, giving you the freedom to focus entirely on leading your business.",
    color: "#E0B624", // Drushti yellow
    rotate: 5,
  },
] as const;

const TOTAL = CARDS.length;

/** One card in the overlapping row. Rotate/scale/lift are driven directly
 *  by scroll progress (own segment of the shared track), so each card
 *  "pops" — straightening, growing, lifting, coming to front — in turn as
 *  you scroll, the same visual as the old hover effect but scroll-gated.
 *  Hover still adds a small extra bump via a nested wrapper, so it doesn't
 *  fight the scroll-driven transform on the outer element. */
function ContentCard({
  card,
  index,
  scrollYProgress,
}: {
  card: (typeof CARDS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  const mid = (start + end) / 2;

  const rotate = useTransform(scrollYProgress, [start, mid, end], [card.rotate, 0, card.rotate], {
    clamp: true,
  });
  const scale = useTransform(scrollYProgress, [start, mid, end], [1, 1.08, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [start, mid, end], [0, -20, 0], { clamp: true });
  const z = useTransform(scrollYProgress, [start, mid, end], [index, TOTAL + index, index], {
    clamp: true,
  });

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? { rotate: 0, scale: 1.08, y: -20, zIndex: 99 } : {}}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ rotate, scale, y, zIndex: z }}
      // No negative margin / overlap on mobile — cards sit one after
      // another in normal document flow. Overlap only kicks in from sm.
      className="relative h-64 w-full max-w-sm shrink-0 sm:-ml-10 sm:h-96 sm:w-72 sm:first:ml-0 md:h-[28rem] md:w-80 cursor-pointer"
    >
      <div
        style={{ backgroundColor: card.color }}
        className="flex h-full w-full flex-col justify-end rounded-2xl p-6 shadow-xl sm:p-7"
      >
        <h3 className="font-heading text-xl font-bold leading-tight text-white sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative h-auto md:h-[220vh] bg-green">
      <div className="md:sticky md:top-0 flex h-auto md:h-screen flex-col justify-center overflow-hidden py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            <Burst className="h-4 w-4 text-orange" />
            Why We Exist
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mb-12 md:mb-16 max-w-2xl font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] text-white"
          >
            We Build on &ldquo;Deep Strategic Thinking&rdquo;
          </motion.h2>

          <div className="flex w-full flex-col sm:flex-row items-center sm:justify-center gap-6 sm:gap-0">
            {CARDS.map((card, i) => (
              <ContentCard key={card.title} card={card} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
