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

/** One card in the overlapping row. On sm+, rotate/scale/lift are driven
 *  by scroll progress so each card "pops" in turn as you scroll, plus a
 *  hover bump. On mobile, none of that runs — cards render flat, static,
 *  and stacked, since there's no room for the fan effect and no hover
 *  on touch anyway. */
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
    <>
      {/* Mobile: flat, static, stacked — no scroll or hover motion at all */}
      <div
        style={{ backgroundColor: card.color }}
        className="flex h-64 w-full max-w-sm flex-col justify-end rounded-2xl p-6 shadow-xl sm:hidden"
      >
        <h3 className="font-heading text-xl font-bold leading-tight text-white">{card.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{card.description}</p>
      </div>

      {/* sm+: original overlapping, scroll- and hover-driven fan card */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={hovered ? { rotate: 0, scale: 1.08, y: -20, zIndex: 99 } : {}}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ rotate, scale, y, zIndex: z }}
        className="relative hidden h-96 w-72 shrink-0 cursor-pointer sm:-ml-10 sm:first:ml-0 sm:block md:h-[28rem] md:w-80"
      >
        <div
          style={{ backgroundColor: card.color }}
          className="flex h-full w-full flex-col justify-end rounded-2xl p-7 shadow-xl"
        >
          <h3 className="font-heading text-2xl font-bold leading-tight text-white">{card.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/85">{card.description}</p>
        </div>
      </motion.div>
    </>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    // No pinned scroll-jack section on mobile — h-auto lets the stacked
    // cards flow normally instead of needing 220vh of scroll runway for
    // an animation that no longer exists there.
    <section ref={sectionRef} className="relative h-auto sm:h-[220vh] bg-green">
      <div className="flex h-auto flex-col justify-center overflow-hidden py-16 sm:sticky sm:top-0 sm:h-screen">
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
            className="mb-16 max-w-2xl font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] text-white"
          >
            We Build on &ldquo;Deep Strategic Thinking&rdquo;
          </motion.h2>

          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-0">
            {CARDS.map((card, i) => (
              <ContentCard key={card.title} card={card} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
