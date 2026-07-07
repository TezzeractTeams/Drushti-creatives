"use client";

import { motion } from "motion/react";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-width pill CTA banner: bold headline on the left, scalloped badge
 *  button on the right — reusing the Hero's badge component and shape. */
export default function CtaBanner() {
  return (
    <section className="bg-white pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center justify-between gap-8 rounded-full bg-orange px-10 py-10 sm:px-14 sm:py-12"
        >
          <p className="font-heading text-xl font-bold uppercase leading-snug text-white sm:text-2xl lg:text-3xl">
            Ready when you are. Reach out and see what happens when the right
            minds connect
          </p>
          <BadgeButton href="#contact" className="shrink-0">
            Let&apos;s talk
          </BadgeButton>
        </motion.div>
      </Container>
    </section>
  );
}
