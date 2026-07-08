"use client";

import { useId, useState } from "react";
import type { SVGProps } from "react";
import { motion } from "motion/react";
import Container from "@/components/Container";
import { Burst, Coil } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGOS = Array.from({ length: 17 }, (_, i) => `/clients/${i + 1}.png`);

/** Even 9-petal flower, local to this badge only — not the shared
 *  ScallopBadge (which stays untouched for the Hero/CTA buttons). */
function ScoreBadgeShape(props: SVGProps<SVGSVGElement>) {
  const petals = 9;
  const segments = 240;
  const outer = 48;
  const inner = 41;
  const cx = 50;
  const cy = 50;
  let d = "";
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const r = (outer + inner) / 2 + ((outer - inner) / 2) * Math.cos(petals * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  d += "Z";
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

function RatingBadge() {
  const pathId = `rating-circle-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  // Text ring sits at r=38, safely inside the petals' minimum radius (41).
  const textRadius = 38;
  const circumference = 2 * Math.PI * textRadius;

  return (
    <div className="relative h-36 w-36 shrink-0 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
      <ScoreBadgeShape className="absolute inset-0 h-full w-full text-blue" />
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path
            id={pathId}
            d={`M 50,${50 - textRadius} A ${textRadius},${textRadius} 0 1,1 ${50 - 0.001},${
              50 - textRadius
            } Z`}
            fill="none"
          />
        </defs>
        <text fill="white" fontSize="5.4" fontWeight="700">
          <textPath
            href={`#${pathId}`}
            textLength={circumference}
            lengthAdjust="spacing"
          >
            OVERALL CLIENT RATING SCORE • OVERALL CLIENT RATING SCORE •
          </textPath>
        </text>
      </motion.svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-4xl font-bold text-white sm:text-5xl">9.6</span>
      </div>
    </div>
  );
}

/** Client logo strip: a continuous, seamless-loop marquee that pauses on
 *  hover. The logo array is duplicated once so the translateX(-50%) loop
 *  has no visible seam. */
function ClientMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex w-max items-center gap-6 animate-marquee ${
          paused ? "animate-marquee-paused" : ""
        }`}
      >
        {[...LOGOS, ...LOGOS].map((src, i) => (
          // Fixed height, natural (auto) width per logo — no internal
          // letterbox padding, so the only space between logos is the gap.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" className="h-40 w-auto shrink-0 object-contain" />
        ))}
      </div>
    </div>
  );
}

export default function OurClients() {
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
          Our clients
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative max-w-3xl"
        >
          <h2 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            <span className="block">When the</span>
            <span className="flex items-center">
              C
              <Coil className="mx-1 h-[0.7em] w-[3.5em] text-orange sm:w-[3.8em]" />
              NNECTION
            </span>
            <span className="block">Is real, it shows</span>
          </h2>

          <div className="absolute right-0 -bottom-16 md:right-0 md:bottom-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-0">
            <RatingBadge />
          </div>
        </motion.div>

        <div className="mt-20">
          <ClientMarquee />
        </div>
      </Container>
    </section>
  );
}
