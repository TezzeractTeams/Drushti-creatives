"use client";

import { motion } from "motion/react";
import PillButton from "@/components/PillButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Services-page hero — centered eyebrow, giant heading, and a black pill
 *  CTA, traced from the "Creative minds" team-section treatment. */
export default function ServicesHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue">
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.32em] text-orange"
        >
          Our services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="max-w-5xl font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] text-white"
        >
          Clear solutions for your brand&apos;s growth.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        >
          <PillButton href="#services">View services</PillButton>
        </motion.div>
      </div>
    </section>
  );
}
