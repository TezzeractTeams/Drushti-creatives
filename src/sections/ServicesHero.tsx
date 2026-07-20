"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import PillButton from "@/components/PillButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Sub-service cards ────────────────────────────────────────── */
const SUB_SERVICES = [
  { num: "01", title: "Digital Marketing & Ad Management", image: "/work/advantis.webp" },
  { num: "02", title: "Logo Design & Brand Identity", image: "/work/fairfirst.webp" },
  { num: "03", title: "Website & UI Designing", image: "/work/softlogic.webp" },
  { num: "04", title: "Video Production / Editing", image: "/work/norlanka.webp" },
  { num: "05", title: "Graphic Design & Content Development", image: "/work/ginger-fresh.webp" },
];

/* Per-card placement + the slice of scroll progress (0–1) each card
   owns. Cards are staggered so #05 finishes right around progress 0.9,
   leaving a little headroom before the section un-pins. */
const CARD_LAYOUT: {
  position: string;
  rotate: number;
  initRotate: number;
  start: number;
  end: number;
  aspect: string;
  width: string;
}[] = [
    {
      position: "left-[1%] xl:left-[3%] top-[8%]",
      rotate: -11,
      initRotate: -5,
      start: 0.0,
      end: 0.22,
      aspect: "aspect-[3/4]",
      width: "w-[220px] xl:w-[260px]",
    },
    {
      position: "right-[1%] xl:right-[3%] top-[8%]",
      rotate: 10,
      initRotate: 4,
      start: 0.15,
      end: 0.37,
      aspect: "aspect-[3/4]",
      width: "w-[210px] xl:w-[250px]",
    },
    {
      position: "left-[4%] xl:left-[8%] bottom-[4%]",
      rotate: -7,
      initRotate: -3,
      start: 0.3,
      end: 0.52,
      aspect: "aspect-[3/4]",
      width: "w-[200px] xl:w-[240px]",
    },
    {
      position: "right-[4%] xl:right-[8%] bottom-[4%]",
      rotate: 8,
      initRotate: 3,
      start: 0.45,
      end: 0.67,
      aspect: "aspect-[3/4]",
      width: "w-[210px] xl:w-[250px]",
    },
    {
      position: "left-1/2 -translate-x-1/2 bottom-[-6%]",
      rotate: 3,
      initRotate: 0,
      start: 0.6,
      end: 0.85,
      aspect: "aspect-[9/14]",
      width: "w-[230px] xl:w-[270px]",
    },
  ];

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="w-3 h-3">
      <path
        d="M1 11L11 1M11 1H3.5M11 1V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({
  service,
  layout,
  index,
  progress,
}: {
  service: (typeof SUB_SERVICES)[number];
  layout: (typeof CARD_LAYOUT)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const prefersReducedMotion = useReducedMotion();

  // Map this card's slice of the overall scroll progress to its entrance.
  const y = useTransform(progress, [layout.start, layout.end], [650, 0]);
  const opacity = useTransform(progress, [layout.start, layout.end], [0, 1]);
  const scale = useTransform(progress, [layout.start, layout.end], [0.88, 1]);
  const rotate = useTransform(progress, [layout.start, layout.end], [layout.initRotate, layout.rotate]);

  return (
    <motion.div
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : { y, opacity, scale, rotate, zIndex: index === 4 ? 20 : 10 + index }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
            scale: 1.06,
            y: -18,
            rotate: layout.rotate * 0.6,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }
      }
      className={`absolute ${layout.position} hidden lg:flex flex-col ${layout.width} ${layout.aspect} bg-white/[0.06] backdrop-blur-lg border border-white/[0.12] rounded-2xl p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] overflow-hidden cursor-pointer group`}
    >
      {/* Image */}
      <div className="relative flex-1 rounded-xl overflow-hidden bg-black/30">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[9px] font-bold text-white tracking-wider">
          {service.num}
        </span>
      </div>

      {/* Title + CTA */}
      <div className="pt-2.5 pb-1 flex flex-col items-center gap-2">
        <p className="font-heading text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white/90 text-center leading-snug px-1 line-clamp-2">
          {service.title}
        </p>
        <motion.span
          className="inline-flex items-center gap-1.5 bg-orange text-white text-[9px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg group-hover:bg-white group-hover:text-[#1A1A1A] transition-colors duration-300"
          whileHover={{ scale: 1.08 }}
        >
          Read case study
          <ArrowIcon />
        </motion.span>
      </div>
    </motion.div>
  );
}

/** Services-page hero — pinned for 3 viewport-heights of scroll while the 5
 *  sub-service cards appear one by one, each owning its own slice of the
 *  scroll range (traced from the TeamSection pinning pattern). Once the
 *  last card has settled, the page continues scrolling to the next section. */
export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-blue">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-[#0B1424]/40 pointer-events-none" />

        {/* ── FLOATING SUB-SERVICE CARDS ───────────────────── */}
        {SUB_SERVICES.map((service, i) => (
          <ServiceCard
            key={service.num}
            service={service}
            layout={CARD_LAYOUT[i]}
            index={i}
            progress={scrollYProgress}
          />
        ))}

        {/* ── HERO CONTENT (pinned, above cards on z-axis) ──── */}
        <div className="relative z-30 flex flex-col items-center gap-6 px-4 text-center select-none pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-orange"
          >
            Our services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="max-w-5xl font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] text-white"
          >
            Clear solutions for your brand&apos;s growth.
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

        {/* ── MOBILE FALLBACK (cards hidden on <lg) ──────────── */}
        <div className="absolute bottom-8 left-0 right-0 flex lg:hidden justify-center gap-3 px-4 overflow-x-auto z-20">
          {SUB_SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
              className="shrink-0 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
            >
              <span className="text-[10px] font-bold text-orange">{service.num}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 whitespace-nowrap">
                {service.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}