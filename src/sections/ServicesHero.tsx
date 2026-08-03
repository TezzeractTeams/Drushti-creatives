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
const SERVICES: ServiceItem[] = [
  {
    id: "branding",
    label: "Social Media & Digital Marketing",
    src: "/art/halfcircle.png",
    scatter: { x: -260, y: -40, rotate: -20 },
  },
  {
    id: "marketing",
    label: "Logo Design & Graphic Design",
    src: "/art/element1.png",
    scatter: { x: 40, y: -70, rotate: 15 },
  },
  {
    id: "design",
    label: "Content Development",
    src: "/art/element2.png",
    scatter: { x: -90, y: 170, rotate: 30 },
  },
  {
    id: "content",
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
}: {
  service: ServiceItem;
  progress: MotionValue<number>;
}) {
  // Converge well before the pinned section actually releases (scroll
  // progress 1) — the spring's own settle time otherwise oozes past the
  // unpin point, so the section would let go and scroll away while the
  // images were still visibly sliding into place.
  const x = useTransform(progress, [0, 0.6], [service.scatter.x, 0], { clamp: true });
  const y = useTransform(progress, [0, 0.6], [service.scatter.y, 0], { clamp: true });
  const rotate = useTransform(progress, [0, 0.6], [service.scatter.rotate, 0], { clamp: true });

  // Spring on top of the scroll-linked values for the settle feel
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const springRotate = useSpring(rotate, { stiffness: 120, damping: 18 });

  const labelOpacity = useTransform(progress, [0.45, 0.75], [0, 1], { clamp: true });
  const labelOpacityRef = useOpacity(labelOpacity);

  return (
    <div className="flex w-[45%] shrink-0 flex-col items-center gap-3 sm:w-auto sm:gap-4">
      <motion.div style={{ x: springX, y: springY, rotate: springRotate }}>
        <Image
          src={service.src}
          alt=""
          width={280}
          height={280}
          className="h-auto w-20 sm:w-44 md:w-52"
        />
      </motion.div>
      <div
        ref={labelOpacityRef}
        style={{ opacity: labelOpacity.get() }}
        className="max-w-[9rem] text-center text-xs leading-snug text-white/70 sm:max-w-none sm:text-sm"
      >
        {service.label}
      </div>
    </div>
  );
}

export default function ServicesIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tune h-[300vh] below to control how much scroll the sequence eats up
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const paragraphOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const paragraphOpacityRef = useOpacity(paragraphOpacity);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-blue sm:h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-4">
        <Container>
          <h1 className="font-heading text-center text-heading-hero-half font-bold leading-[0.85] tracking-tight text-white">
            Clear solutions for your brand&apos;s growth.
          </h1>

          <div
            ref={paragraphOpacityRef}
            style={{ opacity: paragraphOpacity.get() }}
            className="mx-auto mt-8 max-w-xs text-center text-sm leading-relaxed text-white/70 sm:mt-10 sm:max-w-xl sm:text-base"
          >
            We handle everything from strategy to execution — branding, digital
            marketing, web, video, and graphic design — so your brand stays
            consistent, professional, and always moving forward.
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-8 sm:mt-16 sm:flex-nowrap sm:gap-10">
            {SERVICES.map((service) => (
              <ServiceIcon key={service.id} service={service} progress={scrollYProgress} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
