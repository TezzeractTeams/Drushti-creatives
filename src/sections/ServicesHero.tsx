"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";

type Band = {
  id: string;
  label: string;
  image: string;
  // Negative = drifts left as you scroll down, positive = drifts right.
  // Magnitude controls how far it travels — bigger number, more drift.
  speed: number;
};

// Same 5 sub-services as SubServicesCarousel/ServicesHero's arc version —
// this just presents them as labeled parallax bands instead. Each band's
// id matches a key in SERVICES_DATA in services/[id]/page.tsx, so the
// button links straight to that service's detail page.
const BANDS: Band[] = [
  { id: "marketing", label: "DIGITAL MARKETING", image: "/images/sub-services/content-front.png", speed: -70 },
  { id: "brand", label: "BRAND IDENTITY", image: "/images/sub-services/brand-front.png", speed: 55 },
  { id: "web", label: "WEB DESIGN", image: "/images/sub-services/web-front.jpg", speed: -85 },
  { id: "video", label: "VIDEO PRODUCTION", image: "/images/sub-services/innovative.png", speed: 65 },
  { id: "graphic", label: "GRAPHIC DESIGN", image: "/images/sub-services/landscape-front.jpg", speed: -50 },
];

// Each band owns a slice of the section's overall scroll progress, with a
// slight overlap so the next band starts expanding a beat before the
// previous one finishes — that's what produces the "one after another"
// cascade rather than every band expanding in lockstep.
const BAND_WINDOWS: [number, number][] = [
  [0.0, 0.22],
  [0.15, 0.37],
  [0.3, 0.52],
  [0.45, 0.67],
  [0.6, 0.82],
];

const COLLAPSED_HEIGHT = "9vh";
const EXPANDED_HEIGHT = "34vh";

// How many pixels of scrolling map across the full 0..1 band cascade above.
// Deliberately NOT derived from the bands' own layout size — see the note
// on scrollYProgress in ServicesHero for why.
const SCROLL_DISTANCE = 1400;

// Framer's `style={{ opacity: motionValue }}` binding doesn't reliably push
// updates to the DOM in this project's setup (confirmed by comparison: the
// same motionValue's "change" events fire correctly, and other style keys
// like height/scale/color update fine on the same elements — only opacity
// gets stuck at its initial value). Subscribing manually and writing
// `el.style.opacity` ourselves sidesteps it.
function useOpacity(value: MotionValue<number>) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.style.opacity = String(v);
  });
  return ref;
}

function ParallaxBand({
  band,
  window: [start, end],
  scrollYProgress,
}: {
  band: Band;
  window: [number, number];
  scrollYProgress: MotionValue<number>;
}) {
  const x = useTransform(scrollYProgress, [0, 1], [0, band.speed]);

  // Band grows taller as scroll passes through its own window, pushing the
  // bands below it down the page — a real layout height change (not an
  // absolute-positioned overlay), so collapsed cards stay flush against
  // each other with no gap, and an expanding card never covers the next one.
  const height = useTransform(
    scrollYProgress,
    [start, end],
    [COLLAPSED_HEIGHT, EXPANDED_HEIGHT],
    { clamp: true }
  );
  // The button fades/scales in during the back half of the window, once
  // the card has mostly finished expanding.
  const mid = start + (end - start) * 0.55;
  const buttonOpacity = useTransform(scrollYProgress, [mid, end], [0, 1]);
  const buttonOpacityRef = useOpacity(buttonOpacity);
  const buttonScale = useTransform(scrollYProgress, [mid, end], [0.85, 1]);

  return (
    <motion.div style={{ height }} className="relative w-full overflow-hidden">
      {/* Static centering lives on this wrapper (Tailwind's translate
          utilities also set `transform`, so combining them with Framer's
          `style={{ x }}` on the SAME element would let Framer's inline
          transform silently clobber the centering). The inner motion.img
          only carries the scroll-driven drift. */}
      <div className="absolute left-1/2 top-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <motion.img
          src={band.image}
          alt=""
          style={{ x }}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 bg-ink/20" />

      <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
        <span className="font-heading text-heading-4xl font-black uppercase leading-heading tracking-tight text-white sm:text-heading-5xl lg:text-heading-6xl">
          {band.label}
        </span>
      </div>

      {/* Revealed once the band has (mostly) finished expanding */}
      <motion.div
        ref={buttonOpacityRef}
        style={{ scale: buttonScale, opacity: buttonOpacity.get() }}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12"
      >
        <PillButton href={`/services/${band.id}`} variant="light">
          Explore service
        </PillButton>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionTop, setSectionTop] = useState(0);

  // Measured once (and on viewport resize) rather than tracked live: the
  // bands inside this section grow in real layout height as they expand,
  // so if scrollYProgress were computed from THIS section's own live
  // bounding rect (via useScroll's target option), growing a band would
  // resize the section, which would shift scrollYProgress, which would
  // grow the band again — a self-referential loop that threw a "cannot
  // update a component while rendering" React warning. Anchoring to a
  // one-time measurement of the section's starting position breaks the
  // loop while still letting the bands' heights genuinely push the layout.
  useEffect(() => {
    if (!sectionRef.current) return;
    const measure = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      setSectionTop(rect.top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (v) => {
    const p = (v - sectionTop) / SCROLL_DISTANCE;
    return Math.min(1, Math.max(0, p));
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pt-16 md:pt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h1 className="font-heading text-6xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl md:text-8xl">
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
        {BANDS.map((band, i) => (
          <ParallaxBand
            key={band.id}
            band={band}
            window={BAND_WINDOWS[i]}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
