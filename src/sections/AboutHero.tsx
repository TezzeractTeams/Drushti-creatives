"use client";

import { motion } from "motion/react";
import Container from "@/components/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINES = ["We build the voice your vision deserves."];

/** About-page hero traced from the reference: full-viewport solid orange,
 *  massive white two-line heading anchored bottom-left, staggered rise-in. */
export default function AboutHero() {
  return (
    <section className="relative flex min-h-screen items-end bg-orange pb-16 pt-32 sm:pb-24">
      <Container>
        <h2 className="font-heading text-[clamp(3.25rem,9vw,9rem)] font-bold leading-[1.02] text-white">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
