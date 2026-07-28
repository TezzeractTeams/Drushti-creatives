"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";

type Band = {
  id: string;
  label: string;
  image: string;
  // Negative = drifts left as you scroll down, positive = drifts right.
  // Magnitude controls how far it travels — bigger number, more drift.
  speed: number;
  align: "start" | "end";
};

// Same 5 sub-services as SubServicesCarousel/ServicesHero's arc version —
// this just presents them as labeled parallax bands instead.
const BANDS: Band[] = [
  { id: "marketing", label: "DIGITAL MARKETING", image: "/images/sub-services/content-front.png", speed: -140, align: "end" },
  { id: "brand", label: "BRAND IDENTITY", image: "/images/sub-services/brand-front.png", speed: 110, align: "start" },
  { id: "web", label: "WEB DESIGN", image: "/images/sub-services/web-front.jpg", speed: -170, align: "end" },
  { id: "video", label: "VIDEO PRODUCTION", image: "/images/sub-services/innovative.png", speed: 130, align: "start" },
  { id: "graphic", label: "GRAPHIC DESIGN", image: "/images/sub-services/landscape-front.jpg", speed: -100, align: "end" },
];

// Alternating diagonal edges so consecutive bands' slanted borders interlock
// when stacked with a small negative margin between them.
const CLIP_DOWN = "polygon(0 7%, 100% 0%, 100% 93%, 0% 100%)";
const CLIP_UP = "polygon(0 0%, 100% 7%, 100% 100%, 0% 93%)";

function ParallaxBand({
  band,
  index,
  scrollYProgress,
}: {
  band: Band;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const x = useTransform(scrollYProgress, [0, 1], [0, band.speed]);

  return (
    <div
      className="relative -mt-4 h-28 w-full overflow-hidden sm:-mt-6 sm:h-40 md:h-52 lg:h-60"
      style={{ clipPath: index % 2 === 0 ? CLIP_DOWN : CLIP_UP }}
    >
      <motion.img
        src={band.image}
        alt=""
        style={{ x }}
        className="absolute left-1/2 top-1/2 h-[145%] w-[130%] -translate-x-1/2 -translate-y-1/2 object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-ink/25" />

      <div
        className={`absolute inset-0 flex items-center px-6 sm:px-12 ${band.align === "end" ? "justify-end" : "justify-start"
          }`}
      >
        <span className="font-heading text-[2.6rem] font-black uppercase leading-none tracking-tight text-white/60 mix-blend-overlay sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem]">
          {band.label}
        </span>
      </div>
    </div>
  );
}

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Clear solutions for your{" "}
            <span className="italic text-orange">brand&apos;s</span> growth.
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-ink/60 sm:text-base lg:justify-self-end lg:text-right">
            We handle everything from strategy to execution — branding, digital
            marketing, web, video, and graphic design — so your brand stays
            consistent, professional, and always moving forward.
          </p>
        </div>
      </Container>

      <div className="relative mt-14 md:mt-20">
        {BANDS.map((band, index) => (
          <ParallaxBand key={band.id} band={band} index={index} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
