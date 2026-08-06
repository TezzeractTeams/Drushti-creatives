"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import clsx from "clsx";
import PillButton from "@/components/PillButton";
import { Burst, Circle, ScallopBadge, Spike } from "@/components/HeroShapes";
import { EASE } from "@/lib/motion";

type HeroStampProps = {
  className?: string;
  badgeColor?: "yellow" | "blue" | "green" | "orange";
  icon?: "burst" | "spike" | "circle";
  size?: "lg" | "md";
};

function GreenBurst({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("inline-block bg-green", className)}
      style={{
        maskImage: "url(/blast-icon.png)",
        WebkitMaskImage: "url(/blast-icon.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function HeadlinePill({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "blue" | "orange";
}) {
  return (
    <span
      className={clsx(
        "mx-[0.06em] inline-flex translate-y-[0.06em] items-center rounded-pill px-[0.42em] py-[0.08em] align-baseline",
        variant === "blue" ? "bg-blue text-white" : "bg-orange text-white",
      )}
    >
      {children}
    </span>
  );
}

const BADGE_COLORS = {
  yellow: "text-yellow",
  blue: "text-blue",
  "light-blue": "text-light-blue",
  green: "text-green",
  orange: "text-orange",
} as const;

/** Decorative stamp — reuses the site's scalloped badge shape and hero icons. */
function HeroStamp({
  className,
  badgeColor = "yellow",
  icon,
  size = "lg",
}: HeroStampProps) {
  const shell =
    size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20";
  const iconSize =
    size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : "h-7 w-7 sm:h-8 sm:w-8";

  return (
    <div
      className={clsx("relative inline-flex items-center justify-center", shell, className)}
      aria-hidden
    >
      <ScallopBadge className={clsx("absolute inset-0 h-full w-full", BADGE_COLORS[badgeColor])} />
      {icon === "burst" ? (
        <Burst className={clsx("relative", iconSize)} />
      ) : icon === "spike" ? (
        <Spike className={clsx("relative text-orange", iconSize)} />
      ) : icon === "circle" ? (
        <Circle className={clsx("relative text-white", iconSize)} />
      ) : null}
    </div>
  );
}

/** Flipped stamp — sharp spike shell outside. */
function HeroStampFlipped({
  className,
  size = "md",
}: {
  className?: string;
  size?: "lg" | "md";
}) {
  const shell =
    size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20";

  return (
    <div
      className={clsx("relative inline-flex items-center justify-center", shell, className)}
      aria-hidden
    >
      <Spike className="absolute inset-0 h-full w-full scale-[1.08] text-light-blue" />
    </div>
  );
}

function ServicesHeroIntro() {
  return (
    <div className="relative ml-[calc(50%-50vw)] w-screen max-w-[100vw] bg-grain pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-32">
      <div className="relative z-[1] px-4 sm:px-8 lg:px-12">
        <div className="relative mx-auto w-full max-w-[92rem] py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="pointer-events-none absolute left-0 top-[34%] z-0 hidden md:block md:-left-3 lg:left-1 xl:left-5"
          >
            <HeroStamp badgeColor="yellow" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
            className="pointer-events-none absolute right-[10%] top-[20%] z-0 hidden md:block lg:right-[14%] xl:right-[18%]"
          >
            <GreenBurst className="h-10 w-10 sm:h-11 sm:w-11" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 14 }}
            transition={{ duration: 0.75, delay: 0.48, ease: EASE }}
            className="pointer-events-none absolute right-0 top-[58%] z-0 hidden md:block md:-right-4 lg:right-0 xl:right-3"
          >
            <HeroStampFlipped />
          </motion.div>

          <div className="relative z-[1] flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="w-full font-heading text-[clamp(2rem,7.5vw,7.25rem)] font-bold leading-[0.88] tracking-tight text-ink"
          >
            <span className="block whitespace-nowrap max-[480px]:whitespace-normal">
              Clear <HeadlinePill variant="blue">solutions</HeadlinePill>
            </span>
            <span className="block whitespace-nowrap max-[480px]:whitespace-normal">
              for your brand&apos;s
            </span>
            <span className="block whitespace-nowrap max-[480px]:whitespace-normal">
              <HeadlinePill variant="orange">growth</HeadlinePill>.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="mt-8 w-full max-w-4xl text-sm leading-relaxed text-ink/70 sm:mt-10 sm:text-base"
          >
            We handle everything from strategy to execution — branding, digital
            marketing, web, video, and graphic design — so your brand stays
            consistent, professional, and always moving forward.
          </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  { id: "brand", label: "Logo Design & Graphic Design", bg: "bg-green", text: "text-white", buttonVariant: "light" },
  { id: "web", label: "Website & UI Designing", bg: "bg-orange", text: "text-white", buttonVariant: "light" },
  /*{ id: "video", label: "Video Production", bg: "bg-yellow", text: "text-white", buttonVariant: "light" },*/
  { id: "graphic", label: "Content Development", bg: "bg-blue", text: "text-white", buttonVariant: "light" },
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

      {/* Revealed once the band has (mostly) finished expanding*/}
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
    <section ref={sectionRef} className="relative overflow-hidden">
      <ServicesHeroIntro />

      <div className="relative">
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
