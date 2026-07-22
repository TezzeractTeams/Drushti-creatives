"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Container from "@/components/Container";

const SERVICES = [
  {
    id: "marketing",
    lines: ["DIGITAL & SOCIAL", "MEDIA MARKETING"],
    description:
      "We help you reach the right people and turn them into customers. We handle everything from creating your daily posts to managing your ad campaigns, ensuring every dollar you spend helps your business grow.",
    bg: "bg-blue",
    text: "text-white",
    border: "border-white/40",
    tabs: ["REACH", "ENGAGE", "GROW"],
  },
  {
    id: "brand",
    lines: ["LOGO DESIGN &", "BRAND IDENTITY"],
    description:
      "We create a professional look that fits your business perfectly. From your logo to your brand colors, we make sure you look consistent everywhere.",
    bg: "bg-orange",
    text: "text-white",
    border: "border-white/40",
    tabs: ["LOGO", "COLOR", "IDENTITY"],
  },
  {
    id: "graphic",
    lines: ["GRAPHIC", "DESIGN"],
    description:
      "We design clear and attractive visuals for your business needs. Whether it's a company profile or a banner, we make your information easy to read and follow.",
    bg: "bg-yellow",
    text: "text-ink",
    border: "border-ink/40",
    tabs: ["VISUALS", "LAYOUT", "CLARITY"],
  },
  {
    id: "content",
    lines: ["CONTENT", "DEVELOPMENT"],
    description:
      "We find the right words to explain what you do. We write clear, simple, and honest messages that help your audience trust your brand.",
    bg: "bg-green",
    text: "text-white",
    border: "border-white/40",
    tabs: ["WORDS", "MESSAGE", "TRUST"],
  },
  {
    id: "video",
    lines: ["VIDEO", "PRODUCTION"],
    description:
      "We create high-quality videos that tell your brand's story. We use visuals and sound to grab attention and make your message stand out.",
    bg: "bg-sky",
    text: "text-white",
    border: "border-white/40",
    tabs: ["STORY", "VISUALS", "SOUND"],
  },
  {
    id: "web",
    lines: ["WEBSITE &", "UI DESIGNING"],
    description:
      "We build websites that are easy for your customers to use. Our designs are clean and simple, making sure people have a great experience when they visit you online.",
    bg: "bg-blue",
    text: "text-white",
    border: "border-white/40",
    tabs: ["DESIGN", "BUILD", "EXPERIENCE"],
  },
];

// Entrance + stagger windows now live inside the FIRST ~35% of each panel's
// scroll progress. The remaining ~65% is pure "dwell" time — the panel sits
// fully visible and static while the user keeps scrolling — so fast/large
// scroll jumps (trackpad flicks, fast wheel scroll) don't skip past content
// before it's had a chance to be seen.
const STAGGER_WINDOWS: [number, number][] = [
  [0, 0.22],
  [0.08, 0.28],
  [0.16, 0.34],
];

// How much extra scroll distance (beyond one viewport) each panel gets.
// 1 viewport is consumed by the entrance animation; the rest is dwell time.
const PANEL_HEIGHT = "h-[230vh]";

function ServicePanel({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Track progress across the TALL wrapper, not the sticky element itself —
  // this is what creates the dwell period after the entrance finishes.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={wrapperRef} className={`relative w-full ${PANEL_HEIGHT}`}>
      <div
        style={{ zIndex: index + 1 }}
        className={`sticky top-0 h-screen w-full overflow-hidden flex items-center ${service.bg} ${service.text}`}
      >
        <Container className="w-full h-full flex flex-col justify-center py-12 md:py-16">
          <div className="w-full max-w-4xl flex flex-col">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight capitalize select-none">
              {service.lines.map((line, lIdx) => (
                <span key={lIdx} className="block">
                  {line.toLowerCase()}
                </span>
              ))}
            </h2>

            <p className="mt-10 md:mt-12 max-w-lg text-lg sm:text-xl md:text-2xl font-medium leading-snug opacity-95">
              {service.description}
            </p>

            {/* Tags: horizontal row directly under the paragraph */}
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {service.tabs.map((tab, tIdx) => (
                <Tag
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
    </div>
  );
}

function Tag({
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

  const rawY = useTransform(scrollYProgress, [start, end], [36, 0]);
  const y = useSpring(rawY, { stiffness: 220, damping: 24, mass: 0.6 });

  const opacity = useTransform(scrollYProgress, [start, start + 0.06], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

  return (
    <motion.span
      style={{ y, opacity, scale }}
      className={`inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border-[1.5px] ${border} rounded-full font-heading text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.12em] bg-inherit`}
    >
      {label}
    </motion.span>
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