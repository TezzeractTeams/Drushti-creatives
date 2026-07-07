"use client";

import { useId, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

// Asymmetric cubic-Bézier measured off the reference: flat through the
// first third, dipping to its lowest point around 65-70% across (roughly
// under "BRAND"), easing back up through the close. Real path geometry for
// <textPath>; no sine/cosine anywhere.
const CURVE_VIEWBOX = "0 0 1400 400";
const CURVE_PATH_D = "M 60,150 C 550,142 950,330 1340,155";
const CURVE_CHORD = 1340 - 60;
const TEXT_LENGTH = Math.round(CURVE_CHORD * 0.87);

/** Pinned scroll section: a curved headline arcs across the screen (rotation
 *  flipping as it passes center), then a manifesto paragraph brightens
 *  from dim to full white — both driven directly by scroll position. */
export default function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const curveId = `manifesto-curve-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Phase A (0 -> 0.65): headline arcs from bottom-left to top-right,
  // rotation easing from a positive tilt through level to a negative tilt.
  const headlineX = useTransform(scrollYProgress, [0, 0.325, 0.6], ["-70vw", "0vw", "110vw"]);
  const headlineY = useTransform(scrollYProgress, [0, 0.325, 0.6], ["16vh", "0vh", "-18vh"]);
  const headlineRotate = useTransform(scrollYProgress, [0, 0.325, 0.6], [14, 0, -12]);

  // Phase B (0.6 -> 0.85): paragraph is invisible while the headline crosses,
  // then appears dim and brightens in place once the headline has cleared.
  const paragraphOpacity = useTransform(scrollYProgress, [0.6, 0.65, 0.85], [0, 0.25, 1]);

  return (
    <section ref={wrapperRef} className="relative h-[300vh] bg-blue">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <Container className="pt-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white"
          >
            <Burst className="h-4 w-4 text-white" />
            Our manifesto
          </motion.div>
        </Container>

        <div className="relative flex-1 overflow-hidden">
          <div
            className={`absolute inset-0 flex items-center justify-center px-6 ${
              prefersReducedMotion ? "items-start pt-16" : ""
            }`}
          >
            <motion.h2
              style={
                prefersReducedMotion
                  ? undefined
                  : { x: headlineX, y: headlineY, rotate: headlineRotate }
              }
              className="w-full max-w-5xl font-heading font-bold uppercase text-white"
            >
              <span className="sr-only">Seeing what others miss</span>
              <svg viewBox={CURVE_VIEWBOX} aria-hidden className="h-auto w-full overflow-visible">
                <defs>
                  <path id={curveId} d={CURVE_PATH_D} fill="none" />
                </defs>
                <text textAnchor="middle" fill="currentColor" fontSize="70" fontWeight="bold">
                  <textPath
                    href={`#${curveId}`}
                    startOffset="50%"
                    textLength={TEXT_LENGTH}
                    lengthAdjust="spacing"
                  >
                    SEEING WHAT OTHERS MISS
                  </textPath>
                </text>
              </svg>
            </motion.h2>
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.p
              style={prefersReducedMotion ? { opacity: 1 } : { opacity: paragraphOpacity }}
              className="max-w-3xl text-center font-heading text-2xl font-bold uppercase leading-snug text-white sm:text-3xl lg:text-4xl"
            >
              We bring strategy, creativity, and sharp perspective together to help
              brands see themselves clearly, and turn that clarity into real
              results.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
