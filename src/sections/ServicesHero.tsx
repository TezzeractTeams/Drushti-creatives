"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

type ServiceItem = {
  id: string;
  label: string;
  src: string;
};

// Tailwind class on the spacer — keep in sync with h-[14rem] below.
const SCROLL_BUDGET_CLASS = "h-[14rem]";

// Paths are root-relative to /public — public/art/halfcircle.png -> "/art/halfcircle.png"
// ids match subservices.tsx's BANDS ids (and /services/[id] routes) — this
// is what lets a hero tag select/filter the matching band below.
const SERVICES: ServiceItem[] = [
  {
    id: "marketing",
    label: "Social Media & Digital Marketing",
    src: "/art/halfcircle.png",
  },
  {
    id: "logo",
    label: "Logo Design & Graphic Design",
    src: "/art/element1.png",
  },
  {
    id: "content",
    label: "Content Development",
    src: "/art/element2.png",
  },
  {
    id: "web",
    label: "Website & UI Designing",
    src: "/art/circle.png",
  },
];

// Framer's `style={{ opacity: motionValue }}` binding doesn't reliably push
// updates to the DOM in this project's setup (see ServicesHero.tsx). Subscribe
// manually and write el.style.opacity ourselves to sidestep it.
function useOpacity(value: MotionValue<number>) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.style.opacity = String(v);
  });
  return ref;
}

function ServiceIcon({
  service,
  reveal,
  selected,
  onSelect,
}: {
  service: ServiceItem;
  reveal: MotionValue<number>;
  selected: boolean;
  onSelect?: (id: string) => void;
}) {
  const pillOpacityRef = useOpacity(reveal);
  const labelOpacityRef = useOpacity(reveal);
  // Expand to a generous ceiling so each tag grows to its natural text width.
  const labelWidth = useTransform(reveal, [0, 1], [0, 2400]);
  const labelGap = useTransform(reveal, [0, 1], [0, 8]);
  const iconScale = useTransform(reveal, [0, 1], [6, 1]);
  const springIconScale = useSpring(iconScale, { stiffness: 50, damping: 22, mass: 1.1 });

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(service.id)}
      aria-pressed={selected}
      className="relative flex shrink-0 cursor-pointer items-center overflow-visible"
    >
      <div
        ref={pillOpacityRef}
        style={{ opacity: reveal.get() }}
        aria-hidden
        className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${selected ? "border-white" : "border-white/50"}`}
      />
      <div className="relative flex items-center overflow-visible px-2 py-1.5 sm:px-2.5 sm:py-2">
        <motion.div
          style={{ scale: springIconScale }}
          className="origin-center shrink-0"
        >
          <Image
            src={service.src}
            alt=""
            width={200}
            height={200}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
        </motion.div>
        <motion.span
          ref={labelOpacityRef}
          style={{
            opacity: reveal.get(),
            maxWidth: labelWidth,
            marginLeft: labelGap,
          }}
          className="inline-block overflow-hidden whitespace-nowrap text-base uppercase tracking-wide text-white sm:text-lg"
        >
          {service.label}
        </motion.span>
      </div>
    </motion.button>
  );
}

type ServicesHeroProps = {
  heading?: string;
  paragraph?: string;
  /** Selected service id (matches subservices.tsx's BANDS ids). Omit on
   *  pages (e.g. Portfolio) that don't filter anything below the hero. */
  selectedId?: string | null;
  /** Called with the clicked tag's id, or null when re-clicking the
   *  already-selected tag to clear the filter. Omit to render inert tags. */
  onSelectService?: (id: string | null) => void;
};

export default function ServicesIntro({
  heading = "Clear solutions for your brand's growth.",
  paragraph = "We handle everything from strategy to execution — branding, digital marketing, web, video, and graphic design — so your brand stays consistent, professional, and always moving forward.",
  selectedId = null,
  onSelectService,
}: ServicesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [pinStart, setPinStart] = useState(0);
  // Scroll length while sticky — section height minus sticky panel height.
  // Progress reaches 1 exactly when the hero unpins.
  const [pinScrollLength, setPinScrollLength] = useState(224);

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;
    const measure = () => {
      const section = sectionRef.current!;
      const sticky = stickyRef.current!;
      setPinStart(section.offsetTop);
      setPinScrollLength(Math.max(1, section.offsetHeight - sticky.offsetHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sectionRef.current);
    ro.observe(stickyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (v) => {
    const p = (v - pinStart) / pinScrollLength;
    return Math.min(1, Math.max(0, p));
  });

  // Spring lags scroll so the squeeze/reveal feels slower without extra scroll length.
  const smoothReveal = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 22,
    mass: 1.15,
  });

  const iconRowGap = useTransform(smoothReveal, [0, 1], [72, 4]);
  const springRowGap = useSpring(iconRowGap, { stiffness: 50, damping: 22, mass: 1.1 });

  return (
    <section ref={sectionRef} className="relative w-full bg-blue">
      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-[58svh] w-full flex-col items-center justify-start overflow-visible px-6 pb-10 pt-[18vh] sm:px-8 sm:pb-12 sm:pt-[20vh]"
      >
        <div className="flex w-full flex-col items-center text-center">
          <h1 className="font-heading text-heading-hero-half font-bold leading-[0.85] tracking-tight text-white">
            {heading}
          </h1>

          <p className="mx-auto mb-8 mt-6 max-w-xs text-sm leading-relaxed text-white/70 sm:mb-10 sm:mt-8 sm:max-w-xl sm:text-base">
            {paragraph}
          </p>

          <motion.div
            style={{ gap: springRowGap }}
            className="mt-8 flex w-full flex-nowrap justify-center overflow-visible sm:mt-10"
          >
            {SERVICES.map((service) => (
              <ServiceIcon
                key={service.id}
                service={service}
                reveal={smoothReveal}
                selected={selectedId === service.id}
                onSelect={(id) => onSelectService?.(selectedId === id ? null : id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
      {/* Scroll track — length sets pinScrollLength; progress 1 = hero unpins */}
      <div aria-hidden className={SCROLL_BUDGET_CLASS} />
    </section>
  );
}
