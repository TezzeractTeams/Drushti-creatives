"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Container from "@/components/Container";

const SERVICES = [
  {
    id: "marketing",
    lines: ["Digital & Social", "Media Marketing"],
    description:
      "We help you reach the right people and turn them into customers. We handle everything from creating your daily posts to managing your ad campaigns, ensuring every dollar you spend helps your business grow.",
    bg: "bg-blue",
    text: "text-white",
    border: "border-white/40",
    tabs: ["Social Media Management", "Paid Ad Campaigns", "Audience Targeting & Analytics", "Performance Reporting"],
    image: "/services/digital-social-media.png",
    tint: "#FFFFFF",
  },
  {
    id: "brand",
    lines: ["Logo Design &", "Brand Identity"],
    description:
      "We create a professional look that fits your business perfectly. From your logo to your brand colors, we make sure you look consistent everywhere.",
    bg: "bg-yellow",
    text: "text-ink",
    border: "border-ink/40",
    tabs: ["Logo Design", "Brand Identity & Guidelines", "Social Media Post Designs", "Marketing Collateral & Brochures", "Digital & Print Banners", "Infographics & Presentation Design"],
    image: "/services/logo-design.png",
    tint: "#000000",
  },
  /*{
    id: "content",
    lines: ["Content", "Development"],
    description:
      "We find the right words to explain what you do. We write clear, simple, and honest messages that help your audience trust your brand.",
    bg: "bg-orange",
    text: "text-white",
    border: "border-white/40",
    tabs: ["Copywriting & Messaging Strategy", "Social Media Content Creation", "Video Production & Editing", "Social Meida Reels & Editing", "Blog & Article Writing"],
    image: "/services/Content-Development.png",
    tint: "#FFFFFF",
  },*/
  {
    id: "content",
    lines: ["Content", "Development"],
    description:
      "We find the right words to explain what you do. We write clear, simple, and honest messages that help your audience trust your brand.",
    bg: "bg-green",
    text: "text-white",
    border: "border-white/40",
    tabs: ["Copywriting & Messaging Strategy", "Social Media Content Creation", "Video Production & Editing", "Social Meida Reels & Editing", "Blog & Article Writing"],
    image: "/services/Content-Development.png",
    tint: "#FFFFFF",
  },
  /*{
    id: "video",
    lines: ["Video", "Production"],
    description:
      "We create high-quality videos that tell your brand's story. We use visuals and sound to grab attention and make your message stand out.",
    bg: "bg-green",
    text: "text-white",
    border: "border-white/40",
    tabs: ["STORY", "VISUALS", "SOUND"],
    image: "/services/Video-Production.png",
    tint: "#FFFFFF",
  },*/
  {
    id: "web",
    lines: ["Website &", "UI Designing"],
    description:
      "We build websites that are easy for your customers to use. Our designs are clean and simple, making sure people have a great experience when they visit you online.",
    bg: "bg-orange",
    text: "text-white",
    border: "border-white/40",
    tabs: ["Custom Website Development", "UI/UX Design & Prototyping", "Landing Page Optimization", "Website Maintenance & Support"],
    image: "/services/Website.png",
    tint: "#FFFFFF",
  },
];

// Entrance + stagger windows live inside the FIRST ~35-40% of each panel's
// scroll progress. The remaining time is pure "dwell" — the panel sits
// fully visible and static while the user keeps scrolling — so fast/large
// scroll jumps (trackpad flicks, fast wheel scroll) don't skip past content
// before it's had a chance to be seen.
//
// This used to be a fixed 3-entry array (STAGGER_WINDOWS[index]), which
// crashed with "undefined is not iterable" as soon as any service had a
// 4th tab — index 3 had no corresponding entry. Generating the window from
// a formula instead means it now works for any number of tabs, for any
// service, without needing to remember to extend an array by hand.
const STAGGER_STEP = 0.08; // how much later each subsequent tag starts
const STAGGER_SPAN = 0.22; // how long each tag's own entrance takes

function getStaggerWindow(index: number): [number, number] {
  const start = index * STAGGER_STEP;
  const end = start + STAGGER_SPAN;
  return [start, end];
}

// How much extra scroll distance (beyond one viewport) each panel gets.
// 1 viewport is consumed by the entrance animation; the rest is dwell time.
const PANEL_HEIGHT = "h-[230vh]";

function ServicePanel({
  service,
  index,
}: {
  service: (typeof SERVICES)[number] & { image?: string };
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
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="w-full max-w-3xl flex flex-col">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight normal-case select-none">
                {service.lines.map((line, lIdx) => (
                  <span key={lIdx} className="block">
                    {line.charAt(0).toUpperCase() + line.slice(1)}
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

            {service.image && (
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
                <div
                  role="img"
                  aria-label={service.lines.join(" ")}
                  className="w-full max-w-[500px] aspect-square"
                  style={{
                    backgroundColor: service.tint,
                    WebkitMaskImage: `url("${service.image}")`,
                    maskImage: `url("${service.image}")`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>
            )}
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
  const [start, end] = getStaggerWindow(index);

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
