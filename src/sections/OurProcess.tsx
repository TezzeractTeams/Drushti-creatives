"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import { EASE } from "@/lib/motion";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

// Each card gets its own color (cycled) instead of every card sharing one
// section-wide background — traced from WorkProcess.tsx's horizontal
// expanding cards, but with per-card color and a centered title block.
// Orange is left out since the section background itself is orange (an
// inactive orange card would disappear into it). Each entry carries its own
// inactive-state text color, since yellow needs dark ink text rather than
// the white used by the darker colors.
const CARD_COLORS = [
  { bg: "rgb(var(--blue))", text: "#ffffff", textMuted: "rgba(255, 255, 255, 0.9)" },
  { bg: "rgb(var(--green))", text: "#ffffff", textMuted: "rgba(255, 255, 255, 0.9)" },
  { bg: "rgb(var(--sky))", text: "#ffffff", textMuted: "rgba(255, 255, 255, 0.9)" },
  { bg: "rgb(var(--yellow))", text: "rgb(var(--ink))", textMuted: "rgba(var(--ink) / 0.8)" },
];

// Tailwind rem scale: 7xl=4.5rem, 12xl=12rem, 14xl=14rem
const CONTRACTED_SIZE_PX = 72; // text-7xl (4.5rem)
const EXPANDED_SIZE_MIN_PX = 192;
const EXPANDED_SIZE_MAX_PX = 224;

// How much each card overlaps its left neighbor, collapsed or expanded —
// negative margin rather than a gap, so cards read as a tightly packed,
// slightly overlapping stack instead of separated tiles.
const CARD_OVERLAP = "-3rem";

function ProcessStepNumber({
  step,
  strokeColor,
  isActive,
  cardRef,
}: {
  step: number;
  strokeColor: string;
  isActive: boolean;
  cardRef: React.RefObject<HTMLElement | null>;
}) {
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateSize = () => {
      const { width: cardWidth } = card.getBoundingClientRect();

      if (cardWidth < 48) {
        setFontSize(0);
        return;
      }

      const widthTarget = isActive
        ? EXPANDED_SIZE_MIN_PX +
        (EXPANDED_SIZE_MAX_PX - EXPANDED_SIZE_MIN_PX) *
        Math.min(1, Math.max(0, (cardWidth - 64) / (560 - 64)))
        : CONTRACTED_SIZE_PX;

      const fitByCardWidth = cardWidth * 0.82;
      const size = Math.min(widthTarget, fitByCardWidth);
      setFontSize(size < 40 ? 0 : Math.round(size));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(card);
    return () => observer.disconnect();
  }, [cardRef, isActive]);

  return (
    <motion.span
      initial={false}
      animate={{
        fontSize,
        opacity: fontSize > 0 ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: EASE }}
      aria-hidden={fontSize === 0}
      className="shrink-0 font-heading leading-none select-none"
      style={{
        color: "transparent",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: `1px ${strokeColor}`,
      }}
    >
      {step}
    </motion.span>
  );
}

function ProcessCard({
  step,
  index,
  isActive,
  onActivate,
}: {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardColor = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      animate={{
        flex: isActive ? 4 : 1,
        backgroundColor: isActive ? "#ffffff" : cardColor.bg,
      }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        overflow: "hidden",
        borderRadius: "1.5rem",
        marginLeft: index === 0 ? 0 : CARD_OVERLAP,
        zIndex: isActive ? 30 : index,
      }}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      aria-pressed={isActive}
      className="relative flex cursor-pointer flex-col justify-between"
    >
      {/* Content wrapper */}
      <motion.div
        animate={{
          padding: "1.5rem",
          // Push collapsed content to the right so it doesn't sit
          // underneath the overlapping expanded card.
          paddingLeft: isActive ? "1.5rem" : "3.75rem",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex h-full flex-col justify-between"
      >
        <div className="flex flex-col">
          <ProcessStepNumber
            step={index + 1}
            strokeColor={isActive ? "rgb(var(--ink))" : cardColor.text}
            isActive={isActive}
            cardRef={cardRef}
          />

          <motion.h3
            initial={false}
            animate={{
              color: isActive ? "rgb(var(--ink))" : cardColor.text,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            style={
              isActive
                ? undefined
                : {
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }
            }
            className={`mt-2 shrink-0 whitespace-nowrap font-heading leading-heading ${isActive
                ? "text-heading-xl sm:text-heading-2xl"
                : "text-base sm:text-lg"
              }`}
          >
            {step.title}
          </motion.h3>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="shrink-0 text-xs sm:text-sm"
              style={{ color: "rgba(var(--ink) / 0.8)" }}
            >
              {step.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Static mobile card — plain layout, no scroll-driven flex/color/number
 *  animation, no click-to-expand. Just a stacked, always-expanded step. */
function ProcessCardStatic({ step, index }: { step: ProcessStep; index: number }) {
  const cardColor = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: cardColor.bg }}>
      <span
        className="block font-heading text-5xl leading-none"
        style={{
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: `1px ${cardColor.text}`,
        }}
      >
        {index + 1}
      </span>
      <h3 className="mt-2 font-heading text-heading-xl leading-heading" style={{ color: cardColor.text }}>
        {step.title}
      </h3>
      <p className="mt-2 text-sm" style={{ color: cardColor.textMuted }}>
        {step.description}
      </p>
    </div>
  );
}

/** "Our Process" for a single-service page: a horizontal row of cards where
 *  clicking (or scrolling, on desktop) expands one card to white while the
 *  rest contract — each card keeping its own distinct color instead of all
 *  sharing one section-wide background. Traced from the homepage's
 *  WorkProcess.tsx, with a centered title block instead of left-aligned. */
export default function OurProcess({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(Math.max(0, latest) * steps.length);
    if (index >= steps.length) index = steps.length - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  if (steps.length === 0) return null;

  return (
    <section ref={containerRef} className="relative bg-orange" style={{ height: "auto" }}>
      {/* ---------- Mobile: plain stacked list, no sticky, no scroll effect ---------- */}
      <div className="sm:hidden">
        <Container className="py-12">
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white">
            <Burst className="h-4 w-4 text-white" />
            Our Process
          </div>

          <h2 className="mb-8 text-center font-heading text-heading-3xl leading-heading text-white">
            How we collaborate with you from discovery to management &amp; growth.
          </h2>

          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <ProcessCardStatic key={step.step} step={step} index={i} />
            ))}
          </div>
        </Container>
      </div>

      {/* ---------- Desktop: pinned, scroll-driven expanding cards ---------- */}
      <div className="hidden sm:block" style={{ height: `${steps.length * 55}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10 lg:py-20">
          <Container className="flex h-full w-full flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white lg:mb-10"
            >
              <Burst className="h-4 w-4 text-white" />
              Our Process
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mx-auto mb-8 max-w-4xl text-center lg:mb-12"
            >
              <h2 className="font-heading text-heading-3xl leading-heading text-white sm:text-heading-4xl lg:text-heading-5xl">
                How we collaborate with you from discovery to management &amp; growth.
              </h2>
            </motion.div>

            {/* The Horizontal Expanding Cards — no gap className anymore;
                overlap comes from each card's own negative marginLeft. */}
            <div className="flex flex-1 w-full min-h-[300px] max-h-[500px]">
              {steps.map((step, i) => {
                const isActive = activeIndex === i;

                return (
                  <ProcessCard
                    key={step.step}
                    step={step}
                    index={i}
                    isActive={isActive}
                    onActivate={() => setActiveIndex(i)}
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
