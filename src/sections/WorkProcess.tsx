"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROCESS_STEPS = [
  {
    title: "The Immersion",
    description: "We start with a conversation to understand your goals, your pressures, and your audience.",
  },
  {
    title: "The Creative Crack",
    description: "Our team finds the \"spark\". The specific creative idea that solves your business problem.",
  },
  {
    title: "The Blueprint",
    description: "We show you the roadmap so you know exactly what we’re building before we start.",
  },
  {
    title: "The Craft",
    description: "We bring the plan to life, whether it’s a design, a video, or a communication strategy, with a focus on quality.",
  },
  {
    title: "The Evolution",
    description: "We stay with you to see how the work performed, using those insights to help your brand keep growing.",
  },
];

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
    <section ref={containerRef} className="relative h-[400vh] bg-[#284f9e]">
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
            <h2 className="font-heading text-3xl font-bold uppercase leading-[0.95] text-white sm:text-4xl lg:text-5xl">
              We follow a structured approach to deliver consistent and effective results:
            </h2>
          </motion.div>

          {/* The Horizontal Expanding Cards */}
          <div className="flex flex-1 w-full min-h-[300px] max-h-[500px]">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = activeIndex === i;
              // All cards are visible from the very start now — only their
              // width/color changes as scroll moves the active card along.

              return (
                <motion.div
                  key={step.title}
                  // initial={false} tells Framer Motion to render directly at the
                  // "animate" values on mount instead of transitioning in from a
                  // default state. This is what guarantees card 0 (The Immersion)
                  // shows up already big and white on first paint, with no flash.
                  initial={false}
                  animate={{
                    flex: isActive ? 4 : 1,
                    padding: "1.5rem", // sm:p-8 is 2rem, p-6 is 1.5rem. We will just use padding based on viewport via classes if possible, but animate overrides it. Let's use padding in animate.
                    marginLeft: i > 0 ? "1rem" : "0",
                    backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    overflow: "hidden",
                    borderRadius: "1.5rem", // rounded-3xl
                  }}
                  // Clicking a card manually sets it as the active/expanded one.
                  // This just calls the same setActiveIndex that scroll uses, so
                  // scrolling afterwards will naturally take over again once the
                  // scroll position moves past this card's range.
                  onClick={() => setActiveIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(i);
                    }
                  }}
                  aria-pressed={isActive}
                  className="relative flex cursor-pointer flex-col justify-between"
                >
                  {/* Title is always visible and wraps normally. Changes color based on state */}
                  <motion.h3
                    initial={false}
                    animate={{ color: isActive ? "rgb(var(--ink))" : "#ffffff" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="font-heading text-xl font-bold uppercase leading-tight sm:text-2xl"
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description is always visible, but changes color based on state */}
                  <motion.p
                    initial={false}
                    animate={{
                      color: isActive ? "rgba(var(--ink) / 0.8)" : "rgba(255, 255, 255, 0.9)",
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mt-4 text-xs sm:text-sm"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
