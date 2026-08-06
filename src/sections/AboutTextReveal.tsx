"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Container from "@/components/Container";
import HeadlinePill from "@/components/HeadlinePill";

const INTRO = [
  "For us creativity isn't just a service.",
  "It's our mindset.",
] as const;

const BODY = [
  "We believe your business objectives deserve to be translated into authentic communication that people actually want to follow.",
  "We step into your shoes to ensure every visual, strategy, and digital experience we build is rooted in your specific culture and goals.",
] as const;

const INTRO_PILLS = {
  creativity: "orange",
  mindset: "yellow",
} as const satisfies Record<string, "orange" | "yellow">;

const SNAP_EASING = (t: number) => 1 - Math.pow(1 - t, 4);

type LenisInstance = {
  velocity: number;
  scrollTo: (
    target: number,
    options?: {
      duration?: number;
      easing?: (t: number) => number;
      onComplete?: () => void;
    },
  ) => void;
  on: (event: "scroll", callback: () => void) => () => void;
};

function useLenisSectionSnap() {
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisInstance }).__lenis;
    if (!lenis) return;

    let idleTimer: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-about-snap]"));

    const getSnapTarget = (scrollY: number) => {
      const threshold = window.innerHeight * 0.14;
      let bestTarget: number | null = null;
      let bestDist = Infinity;

      for (const section of getSections()) {
        const target = section.getBoundingClientRect().top + scrollY;
        const dist = Math.abs(scrollY - target);
        if (dist < bestDist && dist <= threshold) {
          bestDist = dist;
          bestTarget = target;
        }
      }

      return bestTarget !== null && bestDist > 2 ? bestTarget : null;
    };

    const snapIfNeeded = () => {
      if (isSnapping) return;

      const target = getSnapTarget(window.scrollY);
      if (target === null) return;

      isSnapping = true;
      lenis.scrollTo(target, {
        duration: 1.85,
        easing: SNAP_EASING,
        onComplete: () => {
          isSnapping = false;
        },
      });
    };

    const unsubscribe = lenis.on("scroll", () => {
      if (isSnapping) return;

      clearTimeout(idleTimer);
      if (Math.abs(lenis.velocity) < 0.05) {
        idleTimer = setTimeout(snapIfNeeded, 140);
      }
    });

    return () => {
      clearTimeout(idleTimer);
      unsubscribe();
    };
  }, []);
}

function normalizeWord(word: string) {
  return word.replace(/[.,!?;:'"]+$/, "").toLowerCase();
}

function splitSentences(sentences: readonly string[]) {
  return sentences.map((sentence) => sentence.split(" "));
}

function countWords(sentenceWords: string[][]) {
  return sentenceWords.reduce((count, words) => count + words.length, 0);
}

/** Eased scroll gate — slow start, smooth finish within each word slot. */
function easedWordRange(start: number, end: number) {
  const span = end - start;
  return {
    fadeStart: Math.max(0, start - span * 0.12),
    mid: start + span * 0.45,
    fadeEnd: Math.min(1, end + span * 0.08),
  };
}

/** Fade in with scroll, then hold — never dims again when scrolling back. */
function useOneWayRevealAmount(progress: MotionValue<number>, start: number, end: number) {
  const { fadeStart, fadeEnd } = easedWordRange(start, end);
  const maxProgress = useRef(0);

  return useTransform(progress, (latest) => {
    maxProgress.current = Math.max(maxProgress.current, latest);

    if (maxProgress.current <= fadeStart) return 0;
    if (maxProgress.current >= fadeEnd) return 1;

    const t = (maxProgress.current - fadeStart) / (fadeEnd - fadeStart);
    return t * t * (3 - 2 * t);
  });
}

/** One word, lit from dim to full as scroll progress passes its index gate. */
function RevealWord({
  word,
  start,
  end,
  progress,
  dimColor,
  fullColor,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  dimColor: string;
  fullColor: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const revealAmount = useOneWayRevealAmount(progress, start, end);
  const color = useTransform(revealAmount, [0, 1], [dimColor, fullColor]);

  if (prefersReducedMotion) {
    return <span>{word} </span>;
  }

  return (
    <motion.span style={{ color }}>
      {word}{" "}
    </motion.span>
  );
}

/** Pill highlight — scroll-linked fade-in for reading rhythm. */
function RevealPillWord({
  word,
  variant,
  start,
  end,
  progress,
}: {
  word: string;
  variant: "orange" | "yellow";
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const revealAmount = useOneWayRevealAmount(progress, start, end);
  const opacity = useTransform(revealAmount, [0, 1], [0.28, 1]);
  const scale = useTransform(revealAmount, [0, 1], [0.965, 1]);

  if (prefersReducedMotion) {
    return (
      <>
        <HeadlinePill variant={variant}>{normalizeWord(word)}</HeadlinePill>{" "}
      </>
    );
  }

  return (
    <motion.span style={{ opacity, scale }} className="inline-block origin-center align-baseline">
      <HeadlinePill variant={variant}>{normalizeWord(word)}</HeadlinePill>{" "}
    </motion.span>
  );
}

function ScrollRevealTextSection({
  sentences,
  backgroundClassName,
  sectionClassName = "",
  textClassName,
  dimColor,
  fullColor,
  pillWords = {},
  contentClassName = "",
  useContainer = false,
}: {
  sentences: readonly string[];
  backgroundClassName: string;
  sectionClassName?: string;
  textClassName: string;
  dimColor: string;
  fullColor: string;
  pillWords?: Record<string, "orange" | "yellow">;
  contentClassName?: string;
  useContainer?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceWords = splitSentences(sentences);
  const totalWords = countWords(sentenceWords);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const text = (
    <p className={textClassName}>
      {sentenceWords.map((words, sentenceIndex) => {
        const wordOffset = sentenceWords.slice(0, sentenceIndex).reduce(
          (count, lineWords) => count + lineWords.length,
          0,
        );

        return (
          <span key={sentenceIndex} className={sentenceIndex > 0 ? "mt-6 block" : undefined}>
            {words.map((word, i) => {
              const globalIndex = wordOffset + i;
              const start = globalIndex / totalWords;
              const end = (globalIndex + 1) / totalWords;
              const pillVariant = pillWords[normalizeWord(word)];

              if (pillVariant) {
                return (
                  <RevealPillWord
                    key={`${sentenceIndex}-${i}`}
                    word={word}
                    variant={pillVariant}
                    start={start}
                    end={end}
                    progress={scrollYProgress}
                  />
                );
              }

              return (
                <RevealWord
                  key={`${sentenceIndex}-${i}`}
                  word={word}
                  start={start}
                  end={end}
                  progress={scrollYProgress}
                  dimColor={dimColor}
                  fullColor={fullColor}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );

  return (
    <section
      ref={sectionRef}
      data-about-snap
      className={`relative h-[250vh] ${backgroundClassName} ${sectionClassName}`}
    >
      <div className={`sticky top-0 flex h-svh items-center overflow-hidden py-12 md:py-20 ${contentClassName}`}>
        {useContainer ? <Container>{text}</Container> : text}
      </div>
    </section>
  );
}

export default function AboutTextReveal() {
  useLenisSectionSnap();

  return (
    <>
      <ScrollRevealTextSection
        sentences={INTRO}
        backgroundClassName="bg-green"
        textClassName="mx-auto max-w-5xl text-center font-heading text-[clamp(2.5rem,8vw,5rem)] font-bold uppercase leading-[1.1]"
        dimColor="rgba(255,255,255,0.3)"
        fullColor="rgba(255,255,255,1)"
        pillWords={INTRO_PILLS}
        contentClassName="px-6 sm:px-8 lg:px-12"
        useContainer
      />
      <ScrollRevealTextSection
        sentences={BODY}
        backgroundClassName="bg-orange"
        sectionClassName="ml-[calc(50%-50vw)] w-screen max-w-[100vw]"
        textClassName="w-full px-6 text-center font-heading text-[clamp(1.75rem,5.25vw,3rem)] font-bold uppercase leading-[1.32] sm:px-8 lg:px-12"
        dimColor="rgba(255,255,255,0.3)"
        fullColor="rgba(255,255,255,1)"
      />
    </>
  );
}
