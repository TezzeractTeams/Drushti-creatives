"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import PillButton from "@/components/PillButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Custom shapes matching the user's uploaded elements */
const SHAPES = [
  { src: "/images/hero-shapes/shape-1.png" },
  { src: "/images/hero-shapes/shape-3.png" },
  { src: "/images/hero-shapes/shape-2.png" },
  { src: "/images/hero-shapes/shape-4.png" },
];

/* Per-card placement + properties for continuous float and pointer parallax.
   Entrance windows are compressed into the first ~55% of scroll so there's a
   long "hold" phase afterwards — cards stay fully visible and settled well
   before the section releases, instead of finishing right as it exits. */
const CARD_LAYOUT = [
  {
    position: "left-[1%] xl:left-[4%] top-[6%]",
    rotate: -12,
    initRotate: -4,
    start: 0.0,
    end: 0.16,
    aspect: "aspect-[1/1]",
    width: "w-[420px] xl:w-[560px]",
    depth: 55,
    floatY: 22,
    duration: 9,
  },
  {
    position: "right-[1%] xl:right-[4%] top-[10%]",
    rotate: 15,
    initRotate: 5,
    start: 0.13,
    end: 0.29,
    aspect: "aspect-[1/1]",
    width: "w-[390px] xl:w-[520px]",
    depth: -45,
    floatY: 26,
    duration: 11,
  },
  {
    position: "left-[4%] xl:left-[7%] bottom-[4%]",
    rotate: -8,
    initRotate: -2,
    start: 0.26,
    end: 0.42,
    aspect: "aspect-[1/1]",
    width: "w-[440px] xl:w-[600px]",
    depth: 70,
    floatY: 16,
    duration: 8,
  },
  {
    position: "right-[3%] xl:right-[6%] bottom-[6%]",
    rotate: 12,
    initRotate: 3,
    start: 0.39,
    end: 0.55,
    aspect: "aspect-[1/1]",
    width: "w-[400px] xl:w-[540px]",
    depth: -65,
    floatY: 19,
    duration: 10,
  },
];

function ServiceCard({
  layout,
  index,
  progress,
  pointerX,
  pointerY,
}: {
  layout: (typeof CARD_LAYOUT)[number];
  index: number;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();

  // Scroll-based entrance animations. useTransform clamps to the last
  // keyframe value once progress passes `end`, so opacity/scale/rotate all
  // stay locked at their settled state for the rest of the scroll — cards
  // never fade or shrink back out on their own.
  const y = useTransform(progress, [layout.start, layout.end], [650, 0]);
  const opacity = useTransform(progress, [layout.start, layout.end], [0, 1]);
  const scale = useTransform(progress, [layout.start, layout.end], [0.8, 1]);
  const rotate = useTransform(progress, [layout.start, layout.end], [layout.initRotate, layout.rotate]);

  // Pointer parallax transforms
  const px = useTransform(pointerX, (v) => v * layout.depth);
  const py = useTransform(pointerY, (v) => v * layout.depth);

  const shape = SHAPES[index];

  return (
    <motion.div
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : { y, opacity, scale, rotate, zIndex: 10 + index }
      }
      className={`absolute ${layout.position} hidden lg:flex flex-col ${layout.width} ${layout.aspect} cursor-pointer`}
    >
      {/* Pointer Parallax Container */}
      <motion.div style={prefersReducedMotion ? undefined : { x: px, y: py }} className="w-full h-full">
        {/* Continuous slow floating animation */}
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -layout.floatY, 0] }}
          transition={{ duration: layout.duration, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full pointer-events-none"
        >
          <motion.img
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }
            }
            src={shape.src}
            alt={`Service shape ${index + 1}`}
            className="w-full h-full object-contain filter drop-shadow-[0_35px_70px_rgba(0,0,0,0.4)] pointer-events-auto"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Services-page hero — pinned for 3.4 viewport-heights of scroll while the 4
 *  sub-service cards appear one by one, then hold fully settled for a long
 *  stretch before the page continues on to the next section. */
export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Pointer tracking for parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.4 });

  const handlePointer = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="relative h-[340vh] bg-blue"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ── AMBIENT BACKGROUND TEXTURE ───────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/20 blur-[160px]" />
          <div className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-green/10 blur-[140px]" />
          <div className="absolute right-[15%] bottom-[15%] h-[500px] w-[500px] rounded-full bg-yellow/10 blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.07]"

          />
        </div>

        {/* ── FLOATING SUB-SERVICE CARDS ───────────────────── */}
        {CARD_LAYOUT.map((layout, i) => (
          <ServiceCard
            key={i}
            layout={layout}
            index={i}
            progress={scrollYProgress}
            pointerX={sx}
            pointerY={sy}
          />
        ))}

        {/* ── HERO CONTENT (pinned, above cards on z-axis) ──── */}
        <div className="relative z-30 flex flex-col items-center gap-6 px-4 text-center select-none pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-orange"
          >
            <span className="relative flex h-1.5 w-1.5">
            </span>
            Our services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="max-w-6xl font-heading text-[clamp(2.75rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-tight text-white"
          >
            Clear solutions for your{" "}
            <span className="italic text-orange">brand&apos;s</span> growth.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="max-w-xl text-sm text-white/50 leading-relaxed font-body"
          >
            From digital marketing to video production — we connect your story
            to the people who matter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="pointer-events-auto"
          >
            <PillButton href="#services">View services</PillButton>
          </motion.div>
        </div>

        {/* ── SCROLL CUE ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-9 w-[1px] bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
