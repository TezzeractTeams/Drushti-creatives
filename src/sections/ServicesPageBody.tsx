"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";

type Band = {
  id: string;
  label: string;
  // Tailwind background class — solid brand-color fill instead of a photo.
  bg: string;
  // Light backgrounds (yellow) need dark text/button for contrast; dark
  // backgrounds (blue/green/orange/sky) keep white.
  text: string;
  buttonVariant?: "light";
};

// Same 5 sub-services as SubServicesCarousel/ServicesHero's arc version —
// now presented as flat brand-color bands instead of photos. Each band's
// id matches a key in SERVICES_DATA in services/[id]/page.tsx, so the
// button links straight to that service's detail page.
const BANDS: Band[] = [
  { id: "marketing", label: "Social Media & Digital Marketing", bg: "bg-sky", text: "text-white", buttonVariant: "light" },
  { id: "logo", label: "Logo Design & Graphic Design", bg: "bg-green", text: "text-white", buttonVariant: "light" },
  { id: "web", label: "Website & UI Designing", bg: "bg-orange", text: "text-white", buttonVariant: "light" },
  /*{ id: "video", label: "Video Production", bg: "bg-yellow", text: "text-white", buttonVariant: "light" },*/
  { id: "content", label: "Content Development", bg: "bg-blue", text: "text-white", buttonVariant: "light" },
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
    <motion.div style={{ height }} className={`relative w-full overflow-hidden ${band.bg}`}>
      <div className={`absolute inset-0 flex items-center justify-start px-6 sm:px-12 ${band.text}`}>
        <span className="font-heading text-heading-4xl font-black uppercase leading-heading tracking-tight sm:text-heading-5xl lg:text-heading-6xl">
          {band.label}
        </span>
      </div>

      {/* Revealed once the band has (mostly) finished expanding */}
      <motion.div
        ref={buttonOpacityRef}
        style={{ scale: buttonScale, opacity: buttonOpacity.get() }}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12"
      >
        <PillButton href={`/services/${band.id}`} variant={band.buttonVariant}>
          Explore service
        </PillButton>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Headline inline widgets
//
// The reference recording embeds small media directly inside a running
// sentence — not laid out in a flex/grid row, but genuinely inline (like an
// emoji or an <img> sitting mid-word), so the browser's own text-wrapping
// handles line breaks around them for free. That's reproduced here the same
// way: the <h1> below is plain text with inline-block spans dropped in, and
// wrapping is left entirely to the browser rather than choreographed by us.
// ---------------------------------------------------------------------------

// Static fanned strip of 3 overlapping rounded chips — a stand-in for real
// brand/tool logos or a small photo strip later. Swap PLACEHOLDER_CHIPS'
// bg classes for actual logo images/icons once assets are ready.
const PLACEHOLDER_CHIPS = [
  { bg: "bg-orange", rotate: -8 },
  { bg: "bg-blue", rotate: 0 },
  { bg: "bg-ink", rotate: 6 },
];

function InlineIconStack() {
  return (
    <span className="mx-1 inline-flex align-middle sm:mx-2" aria-hidden>
      {PLACEHOLDER_CHIPS.map((chip, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          style={{ rotate: `${chip.rotate}deg`, zIndex: PLACEHOLDER_CHIPS.length - i }}
          className={`h-9 w-9 rounded-xl border-2 border-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl ${chip.bg} ${i > 0 ? "-ml-3 sm:-ml-4" : ""}`}
        />
      ))}
    </span>
  );
}

// Hand-drawn squiggle-to-arrow doodle, same beat as the reference's loopy
// orange arrow bridging "into" and "brands" — a bit of informal, human
// energy dropped into an otherwise very geometric display face.
function ArrowDoodle() {
  return (
    <span className="mx-1 inline-flex align-middle sm:mx-2" aria-hidden>
      <svg
        viewBox="0 0 90 40"
        className="h-6 w-14 text-orange sm:h-8 sm:w-20"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 28C16 8 28 4 34 14C40 24 26 30 22 20C19 12 30 6 40 10C55 16 62 26 60 30" />
        <path d="M60 30L72 26M60 30L64 18" />
      </svg>
    </span>
  );
}

// Crossfading slot standing in for the reference's rotating showcase (client
// photos, a scrolling word list, etc.) — currently 4 flat brand-color
// placeholders cycling on a timer. Swap SLOT_ITEMS for real images/words
// later; the crossfade mechanics won't need to change.
const SLOT_ITEMS = ["bg-sky", "bg-green", "bg-yellow", "bg-blue"];
const SLOT_INTERVAL_MS = 2200;

function RotatingSlot() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLOT_ITEMS.length);
    }, SLOT_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative mx-1 inline-flex h-9 w-14 align-middle sm:mx-2 sm:h-12 sm:w-20 md:h-14 md:w-24" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 8 }}
          transition={{ type: "spring", bounce: 0.55, duration: 0.7 }}
          className={`absolute inset-0 rounded-xl sm:rounded-2xl ${SLOT_ITEMS[index]}`}
        />
      </AnimatePresence>
    </span>
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
    <section ref={sectionRef} className="relative overflow-hidden bg-blue pt-28 md:pt-36">
      <Container>
        <h1 className="font-heading text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          We
          <InlineIconStack />
          turn bold ideas
          <ArrowDoodle />
          into brands
          <RotatingSlot />
          people remember.
        </h1>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
          We handle everything from strategy to execution — branding, digital
          marketing, web, video, and graphic design — so your brand stays
          consistent, professional, and always moving forward.
        </p>
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
