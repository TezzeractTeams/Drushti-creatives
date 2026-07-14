"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

import { EASE } from "@/lib/motion";
import { SERVICES } from "@/data/services";


/** Hover-driven service list: the left preview card crossfades to the
 *  hovered service's image; non-hovered items fade out, the hovered one
 *  keeps full ink and gains an ↗ arrow — traced from the reference. */
export default function ServicePillars() {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewIndex = hovered ?? 0;

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
          Our services
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="font-heading text-heading-4xl leading-heading text-ink sm:text-heading-5xl lg:text-heading-6xl">
            The navigational pillars
          </h2>
          <p className="mt-6 max-w-xl text-sm text-ink/70 sm:text-base">
            Our dedication and commitment to excellence ensure that your
            business thrives in the ever-evolving digital realm.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Preview card — crossfades to the hovered service's image */}
          <div className="relative hidden aspect-square overflow-hidden rounded-3xl lg:sticky lg:top-28 lg:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={previewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={SERVICES[previewIndex].image}
                  alt={SERVICES[previewIndex].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 40vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Service list */}
          <ul onMouseLeave={() => setHovered(null)}>
            {SERVICES.map((service, i) => {
              const dimmed = hovered !== null && hovered !== i;
              return (
                <li key={service.name} className="border-b border-ink/10 first:border-t">
                  <a
                    href="#contact"
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-xs transition-colors duration-300 ${
                          dimmed ? "text-ink/20" : "text-ink/40"
                        }`}
                      >
                        ({i + 1})
                      </span>
                      <span
                        className={`font-heading text-heading-2xl leading-heading tracking-tight transition-colors duration-300 sm:text-heading-3xl lg:text-heading-4xl ${
                          dimmed ? "text-ink/25" : "text-ink"
                        }`}
                        style={{ color: hovered === i ? service.color : undefined }}
                      >
                        {service.name}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className={`shrink-0 text-2xl text-ink transition-all duration-300 ${
                        hovered === i
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                      style={{ color: hovered === i ? service.color : undefined }}
                    >
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
