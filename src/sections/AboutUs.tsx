"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";
import { ABOUT_SCROLL_VH, SHAPE_CLOSED_AT } from "@/config/clientCurtain";

const IMAGES = [
  "/team-member-1.png",
  "/team-member-2.png",
];

const IMAGE_ROTATE_MS = 2500;

// --- Title timing -----------------------------------------------------
// These control how gradually the title/scrim fade in and out relative to
// scrollYProgress. Bigger windows = slower, smoother transitions.
// Previously the appear window was only 0.04 (a near-instant snap) and the
// exit window was 0.1 — both widened here so the fade actually reads as a
// fade instead of a pop.
const TITLE_APPEAR_START = Math.max(0, SHAPE_CLOSED_AT - 0.18); // was -0.04
const TITLE_HOLD_END = 0.55; // was 0.4 — title now stays fully visible much longer
const TITLE_FADE_END = 0.78; // was 0.6 — and the fade-out itself is slower too

// Content below the title now starts revealing only once the title has
// almost fully faded, over a wider window than before.
const CONTENT_FADE_START = 0.68;
const CONTENT_FADE_END = 0.85;

type AboutUsProps = {
  scrollRef?: RefObject<HTMLElement | null>;
};

export default function AboutUs({ scrollRef }: AboutUsProps) {
  const fallbackRef = useRef<HTMLElement>(null);
  const containerRef = scrollRef ?? fallbackRef;

  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });

  // Top shape control points
  const topCenterY = useTransform(scrollYProgress, [0, 0.2, SHAPE_CLOSED_AT], [0, 50, 50]);
  const topEdgeY = useTransform(scrollYProgress, [0, 0.1, SHAPE_CLOSED_AT], [0, 15, 50]);

  // Bottom shape control points
  const bottomCenterY = useTransform(scrollYProgress, [0, 0.2, SHAPE_CLOSED_AT], [100, 50, 50]);
  const bottomEdgeY = useTransform(scrollYProgress, [0, 0.1, SHAPE_CLOSED_AT], [100, 85, 50]);

  const topPath = useMotionTemplate`M 0 0 L 100 0 L 100 ${topEdgeY} Q 50 ${topCenterY} 0 ${topEdgeY} Z`;
  const bottomPath = useMotionTemplate`M 0 100 L 100 100 L 100 ${bottomEdgeY} Q 50 ${bottomCenterY} 0 ${bottomEdgeY} Z`;

  // CLOSING (scroll down) and OPENING (scroll up) share the same eased
  // curve now that both windows are wide enough to read as smooth fades in
  // either direction — kept as two separate values in case you want to
  // diverge them later.
  const closingOpacity = useTransform(
    scrollYProgress,
    [0, TITLE_APPEAR_START, SHAPE_CLOSED_AT, TITLE_HOLD_END, TITLE_FADE_END],
    [0, 0, 1, 1, 0]
  );

  const openingOpacity = useTransform(
    scrollYProgress,
    [0, TITLE_APPEAR_START, SHAPE_CLOSED_AT, TITLE_HOLD_END, TITLE_FADE_END],
    [0, 0, 1, 1, 0]
  );

  // Plain motion value driven manually, switching between the two curves
  // above depending on which way the user is actually scrolling, then
  // smoothed through a spring so any residual jump (e.g. on a direction
  // reversal mid-scroll) gets eased out rather than snapping.
  const titleOpacityRaw = useMotionValue(0);
  const titleOpacity = useSpring(titleOpacityRaw, { stiffness: 60, damping: 20, mass: 0.8 });
  const prevProgress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isScrollingDown = latest >= prevProgress.current;
    prevProgress.current = latest;
    titleOpacityRaw.set(isScrollingDown ? closingOpacity.get() : openingOpacity.get());

    if (latest < CONTENT_FADE_START) {
      contentOpacity.set(0);
      contentY.set("50px");
      return;
    }

    if (latest >= CONTENT_FADE_END) {
      contentOpacity.set(1);
      contentY.set("0px");
      return;
    }

    if (isScrollingDown) {
      const t = (latest - CONTENT_FADE_START) / (CONTENT_FADE_END - CONTENT_FADE_START);
      contentOpacity.set(t);
      contentY.set(`${50 * (1 - t)}px`);
    } else {
      contentOpacity.set(1);
      contentY.set("0px");
    }
  });

  const titleScale = useTransform(
    scrollYProgress,
    [0, TITLE_APPEAR_START, SHAPE_CLOSED_AT, TITLE_HOLD_END, TITLE_FADE_END],
    [0.9, 0.9, 1, 1, 0.8]
  );
  const titleY = useTransform(scrollYProgress, [TITLE_HOLD_END, TITLE_FADE_END], ["0%", "-20%"]);

  const contentY = useMotionValue("50px");
  const contentOpacity = useMotionValue(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, IMAGE_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef as RefObject<HTMLElement>}
      className="relative z-10"
      style={{ height: `${ABOUT_SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">

        {/*
          Scrim: masks whatever section sits before this one, which is
          otherwise visible through the gap while the shape is open.
          It reuses the exact same titleOpacity value as the title text, so:
          - CLOSING (scroll down): scrim fades in alongside the title,
            covering the previous section's text as the gap seals.
          - OPENING (scroll up): scrim fades out alongside the title,
            revealing the previous section's text again as the gap reopens.
          It's placed before the svg in the DOM so the green shape still
          paints on top of it at the same z-index.
          NOTE: bg-white is a guess to match the page background — swap this
          for whatever color/section actually sits behind this one if it's
          not white.
        */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 z-0 bg-white pointer-events-none"
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 pointer-events-none z-0 w-full h-full text-orange"
        >
          <motion.path d={topPath} fill="currentColor" />
          <motion.path d={bottomPath} fill="currentColor" />
        </svg>

        {/*<Container className="relative z-10 pt-8 sm:pt-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink mix-blend-difference invert">
            <Burst className="h-4 w-4" />
            About us
          </div>
        </Container>*/}

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.h2
            style={{
              opacity: titleOpacity,
              scale: titleScale,
              y: titleY
            }}
            className="text-center font-heading text-heading-hero-half leading-[0.88] tracking-tighter text-white px-4"
          >
            More strategy.<br />More connection.<br />
          </motion.h2>
        </div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex items-center pt-20"
        >
          <Container className="flex w-full flex-col lg:flex-row items-center justify-between gap-12">

            <div className="flex-1 max-w-[50.4rem]">
              <p className="font-heading text-heading-sub leading-heading-loose text-white/90 mb-12">
                Born from the belief that a great business deserves a voice as strong as its vision, we evolved into a dedicated creative partner for brands that want to lead. We are a team of strategists and creators who prioritize clarity over noise and connection over clicks.
              </p>

              <PillButton href="/about" variant="light">
                About Us
              </PillButton>
            </div>

            <div className="w-64 h-80 lg:w-80 lg:h-[450px] relative shrink-0 rounded-full overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.img
                  key={currentImageIndex}
                  src={IMAGES[currentImageIndex]}
                  alt="Team member"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

          </Container>
        </motion.div>

      </div>
    </section>
  );
}
