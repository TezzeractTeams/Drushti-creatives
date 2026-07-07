"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/Container";
import { Burst, Circle, HalfCircle } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

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
 *  match — the expanded title picks up that same color. */
export default function Services() {
  const [active, setActive] = useState(0);
  const ActiveShape = CATEGORIES[active].Shape;

  return (
    <section className="bg-white py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink"
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
                    className={`text-left font-heading text-3xl font-bold uppercase tracking-tight transition-colors duration-300 sm:text-4xl lg:text-5xl ${
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
    </section>
  );
}
