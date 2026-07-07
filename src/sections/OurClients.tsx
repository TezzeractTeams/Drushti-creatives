"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/Container";
import { Burst, Coil, ScallopBadge } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGOS = Array.from({ length: 17 }, (_, i) => `/clients/${i + 1}.png`);

function RatingBadge() {
  const pathId = `rating-circle-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className="relative h-36 w-36 shrink-0 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
      <ScallopBadge className="absolute inset-0 h-full w-full text-blue" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id={pathId} d="M 50,8 A 42,42 0 1,1 49.9,8 Z" fill="none" />
        </defs>
        <text fill="white" fontSize="5.4" fontWeight="700" letterSpacing="0.3">
          <textPath href={`#${pathId}`}>
            OVERALL CLIENT RATING SCORE • OVERALL CLIENT RATING SCORE •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
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
          <div key={i} className="relative h-24 w-56 shrink-0 sm:h-32 sm:w-72 lg:h-36 lg:w-80">
            <Image src={src} alt="" fill className="object-contain" sizes="320px" />
          </div>
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
          className="relative"
        >
          <h2 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            <span className="block">When the</span>
            <span className="flex items-center">
              C
              <Coil className="mx-1 h-[0.5em] w-[1.4em] text-orange" />
              NNECTION
            </span>
            <span className="block">Is real, it shows</span>
          </h2>

          <div className="absolute left-48 top-0 sm:left-64 lg:left-[420px]">
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
