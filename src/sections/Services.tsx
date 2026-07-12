"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Container from "@/components/Container";
import { Burst, Circle, HalfCircle } from "@/components/HeroShapes";

import { EASE } from "@/lib/motion";

const CATEGORIES = [
  {
    name: "Performance & Growth",
    description: "We track, measure, and optimize to ensure lasting results.",
    tags: [
      "Digital advertising strategy",
      "Analytics & reporting",
      "Campaign tracking & optimization",
      "Conversion rate optimization (CRO)",
      "SEO",
      "Email marketing",
      "Web design & development",
    ],
    Shape: Circle,
    color: "text-blue",
  },
  {
    name: "Creative Solutions",
    description: "We craft ideas and visuals that make brands impossible to ignore.",
    tags: [
      "Brand identity & strategy",
      "Content creation",
      "Social media design",
      "Video production",
      "Copywriting",
      "Illustration",
    ],
    Shape: Burst,
    color: "text-sky",
  },
  {
    name: "Digital Presence",
    description: "We build and maintain a digital home your audience wants to visit.",
    tags: [
      "Website design & development",
      "App design",
      "E-commerce solutions",
      "CMS management",
      "UX/UI design",
      "Maintenance & support",
    ],
    Shape: HalfCircle,
    color: "text-green",
  },
];

/** Services section: an accordion of categories (one expanded with subline +
 *  tags at a time) beside the active category's own Hero shape, colored to
 *  match — the expanded title picks up that same color.
 *
 *  Scroll behavior:
 *  - This section is "pinned" so the viewport stays visually stable while the
 *    scroll position maps to the active category.
 *  - We snap between categories by rounding the computed index.
 *  - Reduced-motion users keep the click-to-select accordion behavior. */
export default function Services() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const ActiveShape = CATEGORIES[active].Shape;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 progress into a category index from 0 -> 2.
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, CATEGORIES.length - 1]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    if (prefersReducedMotion) return;
    const rounded = Math.min(CATEGORIES.length - 1, Math.max(0, Math.round(v)));
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  return (
    <section
      ref={(node) => {
        wrapperRef.current = node;
      }}
      className="relative bg-white"
      // Controls "how fast" we move through categories:
      // smaller height => less scroll distance => faster snapping.
      style={{ height: `${CATEGORIES.length * 55}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-ink"
          >
            <Burst className="h-4 w-4 text-orange" />
            Services
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {CATEGORIES.map((cat, i) => {
                const isActive = i === active;
                return (
                  <div key={cat.name} className="border-b border-ink/10 py-6 first:pt-0">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className={`text-left font-heading text-heading-3xl leading-heading tracking-tight transition-colors duration-300 sm:text-heading-4xl lg:text-heading-5xl ${
                        isActive ? cat.color : "text-ink/25 hover:text-ink/50"
                      }`}
                    >
                      {cat.name}
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 max-w-xl text-base text-ink/70">{cat.description}</p>
                          <div className="mt-5 flex flex-wrap gap-3">
                            {cat.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`flex h-full w-full items-center justify-center ${CATEGORIES[active].color}`}
                >
                  <ActiveShape className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
