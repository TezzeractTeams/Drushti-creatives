"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Container from "@/components/Container";

const SERVICES = [
  {
    id: "brand",
    lines: ["BRAND &", "CREATIVE"],
    description:
      "We build brands that move culture and make sense. From strategy and storytelling to identity and creative direction, we help brands sound, look, and feel like they mean it.",
    bg: "bg-[#0D0D0D]",
    text: "text-white",
    border: "border-white/40",
    tabs: ["STRATEGY", "NARRATIVE", "DIRECTION"],
  },
  {
    id: "campaign",
    lines: ["CAMPAIGN &", "FILM"],
    description:
      "We turn insights into impact. From the big idea to the final frame, we create campaigns and films that get people talking, sharing, and acting.",
    bg: "bg-[#E12222]",
    text: "text-black",
    border: "border-black/40",
    tabs: ["CONCEPT", "PRODUCTION", "STORYTELLING"],
  },
  {
    id: "visual",
    lines: ["VISUAL &", "EXPERIENTIAL"],
    description:
      "We don't just design spaces, we design experiences. From exhibitions to retail environments, we create physical and digital touchpoints that engage senses and build communities.",
    bg: "bg-[#CEFC00]",
    text: "text-black",
    border: "border-black/40",
    tabs: ["DESIGN", "ENVIRONMENTS", "MERCHANDISING"],
  },
  {
    id: "growth",
    lines: ["GROWTH &", "PARTNERSHIP"],
    description:
      "Behind every creative leap is a solid system. We connect the dots between creativity and operations. We build processes, partnerships, and strategies that help you scale without the chaos.",
    bg: "bg-[#343029]",
    text: "text-white",
    border: "border-white/40",
    tabs: ["PR", "PROCESS", "PROCUREMENT"],
  },
];

const ROTATIONS = [-8, -4, 0];
// Staggered scroll-progress windows per tab — each tab's rise starts a beat
// after the previous one, instead of all three animating over the same
// [0,1] range. This is what produces the cascading "pop up one after
// another" motion rather than three bars moving in lockstep.
const STAGGER_WINDOWS: [number, number][] = [
  [0, 0.55],
  [0.15, 0.7],
  [0.3, 0.85],
];
const RISE_DISTANCES = [440, 565, 700]; // starting y-offset (px) per tab

function ServicePanel({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  return (
    <div
      ref={ref}
      style={{ zIndex: index + 1 }}
      className={`sticky top-0 h-screen w-full overflow-hidden flex items-center ${service.bg} ${service.text}`}
    >
      <Container className="w-full h-full flex flex-col justify-between py-12 md:py-16">
        <div className="grid w-full h-full grid-cols-1 md:grid-cols-12 items-end">
          {/* Left Column: Heading at top-left, description at bottom-left */}
          <div className="md:col-span-7 h-full flex flex-col justify-between py-6 md:py-10">
            <h2 className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] font-black leading-[0.82] tracking-tighter uppercase select-none">
              {service.lines.map((line, lIdx) => (
                <span key={lIdx} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-12 max-w-lg text-lg sm:text-xl md:text-2xl font-medium leading-snug opacity-95">
              {service.description}
            </p>
          </div>

          {/* Right Column: Overlapping staggered tilted tabs, cascading up from the bottom */}
          <div className="md:col-span-5 flex items-end justify-center md:justify-end h-full pb-6 md:pb-10 pl-6 md:pl-0">
            {service.tabs.map((tab, tIdx) => (
              <Tab
                key={tab}
                label={tab}
                index={tIdx}
                border={service.border}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Tab({
  label,
  index,
  border,
  scrollYProgress,
}: {
  label: string;
  index: number;
  border: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [start, end] = STAGGER_WINDOWS[index];
  const rawY = useTransform(
    scrollYProgress,
    [start, end],
    [RISE_DISTANCES[index], 0]
  );
  // Spring settle so each tab has a gentle overshoot/settle instead of a
  // linear stop, matching the "pop" feel of the reference.
  const y = useSpring(rawY, { stiffness: 220, damping: 24, mass: 0.6 });

  const opacity = useTransform(scrollYProgress, [start, start + 0.12], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.92, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotate: ROTATIONS[index],
        zIndex: index + 1,
      }}
      className={`relative w-20 sm:w-24 md:w-28 lg:w-32 h-[50vh] sm:h-[60vh] md:h-[68vh] lg:h-[75vh] border-[1.5px] ${border} rounded-t-full overflow-hidden shrink-0 -ml-4 sm:-ml-6 md:-ml-8 first:ml-0 bg-inherit`}
    >
      <span className="absolute bottom-10 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 origin-bottom -rotate-90 whitespace-nowrap font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.12em]">
        {label}
      </span>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="services" className="relative">
      {SERVICES.map((service, index) => (
        <ServicePanel key={service.id} service={service} index={index} />
      ))}
    </section>
  );
}
