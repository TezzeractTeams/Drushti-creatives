"use client";

import { motion } from "motion/react";
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

/** One card in the overlapping row — rests at its own tilt angle, and
 *  straightens + lifts on hover, traced from the reference's card-shuffle
 *  treatment ("the way the sides of the cards change when hovering"). */
function ContentCard({ card, index }: { card: (typeof CARDS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: card.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      style={{ backgroundColor: card.color, zIndex: index }}
      className="relative -ml-6 flex h-72 w-52 shrink-0 flex-col justify-end rounded-2xl p-5 shadow-xl first:ml-0 sm:h-80 sm:w-60 sm:p-6"
    >
      <h3 className="font-heading text-lg font-bold leading-tight text-white sm:text-xl">
        {card.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-white/85 sm:text-sm">
        {card.description}
      </p>
    </motion.div>
  );
}

export default function WhatWeDo() {
  return (
    <section className="relative bg-green py-24 sm:py-32">
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

        <div className="flex flex-wrap items-center justify-center gap-y-10 pl-6 sm:justify-start sm:pl-10">
          {CARDS.map((card, i) => (
            <ContentCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
