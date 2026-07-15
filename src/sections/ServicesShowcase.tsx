"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import ServiceIcon from "@/components/ServiceIcon";

import { EASE } from "@/lib/motion";
import { SERVICES_SHOWCASE } from "@/data/servicesShowcase";

const TOTAL = SERVICES_SHOWCASE.length;

/** Pinned scroll section traced from the reference: scroll position (not
 *  clicks) drives which service is shown, crossfading title/description/
 *  icon in place — cream background instead of the reference's black, and
 *  no bullet checklist since the source copy didn't include one. */
export default function ServicesShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const rounded = Math.min(TOTAL - 1, Math.max(0, Math.round(v)));
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  const service = SERVICES_SHOWCASE[active];

  return (
    <section
      ref={wrapperRef}
      className="relative bg-cream"
      style={{ height: `${TOTAL * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink/60"
          >
            <Burst className="h-4 w-4 text-orange" />
            Our service
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-heading text-[clamp(1.75rem,4vw,3.25rem)] font-bold uppercase leading-[0.95] text-ink"
                >
                  {service.title}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={service.description}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                  className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
                >
                  {service.description}
                </motion.p>
              </AnimatePresence>

              {/* Progress dots — signals position in the 6-service cycle */}
              
            </div>

            <div className="flex items-center justify-center sm:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.icon}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <ServiceIcon
                    icon={service.icon}
                    className="h-40 w-40 text-ink/70 sm:h-56 sm:w-56"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
