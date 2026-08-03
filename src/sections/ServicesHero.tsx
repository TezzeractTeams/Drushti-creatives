"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import Container from "@/components/Container";

type ServiceItem = {
  id: string;
  label: string;
  src: string;
  scatter: { x: number; y: number; rotate: number };
};

// Paths are root-relative to /public — public/art/halfcircle.png -> "/art/halfcircle.png"
// ids match subservices.tsx's BANDS ids (and /services/[id] routes) — this
// is what lets a hero tag select/filter the matching band below.
const SERVICES: ServiceItem[] = [
  {
    id: "marketing",
    label: "Social Media & Digital Marketing",
    src: "/art/halfcircle.png",
    scatter: { x: -260, y: -40, rotate: -20 },
  },
  {
    id: "logo",
    label: "Logo Design & Graphic Design",
    src: "/art/element1.png",
    scatter: { x: 40, y: -70, rotate: 15 },
  },
  {
    id: "content",
    label: "Content Development",
    src: "/art/element2.png",
    scatter: { x: -90, y: 170, rotate: 30 },
  },
  {
    id: "web",
    label: "Website & UI Designing",
    src: "/art/circle.png",
    scatter: { x: 300, y: 150, rotate: -18 },
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
  progress,
  selected,
  onSelect,
}: {
  service: ServiceItem;
  progress: MotionValue<number>;
  selected: boolean;
  onSelect?: (id: string) => void;
}) {
  // Converge well before the pinned section actually releases (scroll
  // progress 1) — the spring's own settle time otherwise oozes past the
  // unpin point, so the section would let go and scroll away while the
  // images were still visibly sliding into place.
  const x = useTransform(progress, [0, 0.6], [service.scatter.x, 0], { clamp: true });
  const y = useTransform(progress, [0, 0.6], [service.scatter.y, 0], { clamp: true });
  const rotate = useTransform(progress, [0, 0.6], [service.scatter.rotate, 0], { clamp: true });
  // Shape starts at 5x its landed icon size and shrinks in as it lands —
  // transform: scale doesn't affect layout, so the oversized shape floats
  // freely over the (still-invisible) pill without pushing its bounds out.
  const iconScale = useTransform(progress, [0, 0.6], [5, 1], { clamp: true });

  // Spring on top of the scroll-linked values for the settle feel
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const springRotate = useSpring(rotate, { stiffness: 120, damping: 18 });
  const springIconScale = useSpring(iconScale, { stiffness: 120, damping: 18 });

  // The shape flies in on its own (always visible); the pill outline and
  // label only appear once it's essentially landed — so the loose shape
  // visibly "becomes" a selectable tag/button rather than the button just
  // popping in already-formed.
  const pillOpacity = useTransform(progress, [0.45, 0.75], [0, 1], { clamp: true });
  const pillOpacityRef = useOpacity(pillOpacity);
  const labelOpacity = pillOpacity;
  const labelOpacityRef = useOpacity(labelOpacity);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(service.id)}
      aria-pressed={selected}
      style={{ x: springX, y: springY, rotate: springRotate }}
      className="relative flex shrink-0 cursor-pointer items-center"
    >
      <div
        ref={pillOpacityRef}
        style={{ opacity: pillOpacity.get() }}
        aria-hidden
        className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${selected ? "border-white" : "border-white/50"}`}
      />
      <div className="relative flex items-center gap-2.5 px-2.5 py-1.5 sm:gap-3 sm:px-3.5 sm:py-2">
        <motion.div style={{ scale: springIconScale }} className="shrink-0">
          <Image
            src={service.src}
            alt=""
            width={200}
            height={200}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
        </motion.div>
        <span
          ref={labelOpacityRef}
          style={{ opacity: labelOpacity.get() }}
          className="whitespace-nowrap text-base uppercase tracking-wide text-white sm:text-lg"
        >
          {service.label}
        </span>
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Tune h-[100vh] below to control how much scroll the sequence eats up
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const paragraphOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const paragraphOpacityRef = useOpacity(paragraphOpacity);

  return (
    <section ref={containerRef} className="relative h-[85vh] bg-blue sm:h-[100vh]">
      {/* h-[70svh], not 70vh: svh stays fixed as mobile browser chrome
          shows/hides on scroll, so the pinned content doesn't resize (and
          re-center) under the user mid-scroll. */}
      <div className="sticky top-0 flex h-[70svh] flex-col items-center justify-center overflow-hidden px-4">
        <Container>
          <h1 className="font-heading text-center text-heading-hero-half font-bold leading-[0.85] tracking-tight text-white">
            {heading}
          </h1>

          <div
            ref={paragraphOpacityRef}
            style={{ opacity: paragraphOpacity.get() }}
            className="mx-auto mt-6 max-w-xs text-center text-sm leading-relaxed text-white/70 sm:mt-8 sm:max-w-xl sm:text-base"
          >
            {paragraph}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            {SERVICES.map((service) => (
              <ServiceIcon
                key={service.id}
                service={service}
                progress={scrollYProgress}
                selected={selectedId === service.id}
                onSelect={(id) => onSelectService?.(selectedId === id ? null : id)}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
