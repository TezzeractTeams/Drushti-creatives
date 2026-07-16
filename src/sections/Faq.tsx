"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/Container";
import { EASE, fadeUp } from "@/lib/motion";
import { FAQ_ITEMS } from "@/data/faq";

/** Two overlapping outlined rings — a simple decorative echo of the
 *  reference's logo mark, not a copy of it. */
function OverlappingRings() {
  return (
    <svg viewBox="0 0 140 80" className="h-16 w-28 text-orange" aria-hidden>
      <circle cx="50" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="90" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left sm:px-9 sm:py-7"
      >
        <span className="font-heading text-base font-bold uppercase leading-snug text-ink sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 text-2xl leading-none text-ink"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-7 text-sm leading-relaxed text-ink/70 sm:px-9 sm:pb-8 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** FAQ accordion traced from the reference: static left column (title +
 *  subtitle + decorative mark), pill-shaped question rows on the right that
 *  expand one at a time to reveal the answer. */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // Tall wrapper + sticky inner (same pattern as TeamSection/WhyWeExist):
    // the extra height below gives the pinned panel room to hold in place
    // as the page keeps scrolling. z-10 + solid bg-cream ensure whatever
    // section sits before this one (About Drushti) scrolls fully behind it
    // instead of bleeding through during the overlap.
    <section className="relative z-10 h-[130vh] bg-cream">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <motion.h2
                {...fadeUp()}
                className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-none text-ink"
              >
                FAQ
              </motion.h2>
              <motion.p
                {...fadeUp(0.1)}
                className="mt-4 max-w-xs text-sm text-ink/70 sm:text-base"
              >
                Find the answers to your questions here
              </motion.p>
              <motion.div {...fadeUp(0.2)} className="mt-8">
                <OverlappingRings />
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div key={item.question} {...fadeUp(0.05 * i)}>
                  <FaqRow
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
