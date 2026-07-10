"use client";

import { useId, useState } from "react";
import type { SVGProps } from "react";
import { motion } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGOS = Array.from({ length: 17 }, (_, i) => `/clients/${i + 1}.png`);

/** Even 9-petal flower, local to this badge only — not the shared
 *  ScallopBadge (which stays untouched for the Hero/CTA buttons). */


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
        className={`flex w-max items-center gap-6 animate-marquee ${paused ? "animate-marquee-paused" : ""
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
    <section className="sticky top-0 z-0 flex min-h-screen flex-col justify-center bg-white py-28">
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
            We believe every great business deserves a voice as strong as its vision.
          </h2>
          <p>More than a service provider, we are your strategic partner. We combine creativity, strategy, and digital
            expertise to help your business stand out. We strip away the noise to find the heart of your message, crafting visuals and narratives that don’t just look good. They actually move people.</p>


        </motion.div>

        <div className="mt-20">
          <ClientMarquee />
        </div>
      </Container>
    </section>
  );
}
