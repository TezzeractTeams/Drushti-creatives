"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

import { EASE } from "@/lib/motion";
import { PROCESS_STEPS } from "@/data/workProcess";


// Tailwind rem scale: 7xl=4.5rem, 12xl=12rem, 14xl=14rem
const CONTRACTED_SIZE_PX = 72; // text-7xl (4.5rem)
const EXPANDED_SIZE_MIN_PX = 192;
const EXPANDED_SIZE_MAX_PX = 224;

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
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      animate={{
        flex: isActive ? 4 : 1,
        padding: "1.5rem",
        backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
      }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        overflow: "hidden",
        borderRadius: "1.5rem",
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
      <div className="flex flex-col">
        <ProcessStepNumber
          step={index + 1}
          strokeColor={isActive ? "rgb(var(--ink))" : "#ffffff"}
          isActive={isActive}
          cardRef={cardRef}
        />

        <motion.h3
          initial={false}
          animate={{ color: isActive ? "rgb(var(--ink))" : "#ffffff" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-2 shrink-0 font-heading text-heading-xl leading-heading sm:text-heading-2xl"
        >
          {step.title}
        </motion.h3>
      </div>

      <motion.p
        initial={false}
        animate={{
          color: isActive ? "rgba(var(--ink) / 0.8)" : "rgba(255, 255, 255, 0.9)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className="shrink-0 text-xs sm:text-sm"
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

export default function WorkProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Start at 0 so "The Immersion" is the active/white card before any scrolling happens.
  const [activeIndex, setActiveIndex] = useState(0);

  // We make the section 400vh tall so there is plenty of room to scroll through the 5 steps.
  // We track the scroll progress through this container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Whenever the scroll progress changes, we calculate which of the 5 cards should be active.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0 -> 1 progress into an index from 0 to 4.
    // Clamp defensively so it never dips below 0 (keeps card 0 active pre-scroll).
    let index = Math.floor(Math.max(0, latest) * PROCESS_STEPS.length);
    if (index >= PROCESS_STEPS.length) {
      index = PROCESS_STEPS.length - 1;
    }
    if (index < 0) {
      index = 0;
    }
    setActiveIndex(index);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#77c26b]"
      // Controls "how fast" we move through steps: smaller height => faster snapping.
      style={{ height: `${PROCESS_STEPS.length * 55}vh` }}
    >
      {/* Sticky container that stays in the viewport while we scroll through the 400vh */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10 lg:py-20">
        <Container className="flex h-full w-full flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white lg:mb-10"
          >
            <Burst className="h-4 w-4 text-white" />
            Work Process
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-8 max-w-4xl lg:mb-12"
          >
            <h2 className="font-heading text-heading-3xl leading-heading text-white sm:text-heading-4xl lg:text-heading-5xl">
              We follow a structured approach to deliver consistent and effective results:
            </h2>
          </motion.div>

          {/* The Horizontal Expanding Cards */}
          <div className="flex flex-1 w-full min-h-[300px] max-h-[500px] gap-2">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = activeIndex === i;
              // All cards are visible from the very start now — only their
              // width/color changes as scroll moves the active card along.

              return (
                <ProcessCard
                  key={step.title}
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
    </section>
  );
}
