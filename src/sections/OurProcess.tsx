"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

const HEADER_HEIGHT = 72; // collapsed card bar height, px
const PANEL_HEIGHT = 520; // fixed panel height, px
const SEGMENT_VH = 55; // scroll runway per card, vh — matches FeaturedWork's pacing
// Each transition between card i and i+1 occupies this fraction of one
// segment's scroll distance, centered on the segment boundary — the rest of
// each segment is "dwell" time where the active card just sits still.
const TRANSITION_FRACTION = 0.5;

// Panel background cycles through these while each step is active.
const STEP_COLORS = [
  "rgb(var(--blue))",
  "rgb(var(--orange))",
  "rgb(var(--green))",
  "rgb(var(--sky))",
];

/** [start, end] scrollYProgress window for the transition FROM card i TO
 *  card i+1, for i in 0..n-2. */
function buildTransitions(n: number): [number, number][] {
  const segment = 1 / n;
  const half = (segment * TRANSITION_FRACTION) / 2;
  return Array.from({ length: n - 1 }, (_, i) => {
    const center = (i + 1) * segment;
    return [Math.max(0, center - half), Math.min(1, center + half)] as [number, number];
  });
}

function StackCard({
  item,
  index,
  total,
  transitions,
  scrollYProgress,
}: {
  item: ProcessStep;
  index: number;
  total: number;
  transitions: [number, number][];
  scrollYProgress: MotionValue<number>;
}) {
  const fullSpace = PANEL_HEIGHT - index * HEADER_HEIGHT;

  // Each card's height is one continuous keyframe list spanning the whole
  // scroll range: 0 (not reached yet) -> fullSpace (its own active dwell) ->
  // HEADER_HEIGHT (collapsed, once the next card takes over). Because the
  // outgoing and incoming card in any transition share the same [start, end]
  // window and move linearly, their heights always sum to a constant — so
  // cards sit in plain block flow (no absolute positioning/z-index) and
  // never leave a gap or overlap.
  let inputs: number[];
  let outputs: number[];
  if (index === 0) {
    const [tStart, tEnd] = transitions[0] ?? [1, 1];
    inputs = [0, tStart, tEnd, 1];
    outputs = [PANEL_HEIGHT, PANEL_HEIGHT, HEADER_HEIGHT, HEADER_HEIGHT];
  } else if (index === total - 1) {
    const [pStart, pEnd] = transitions[index - 1];
    inputs = [0, pStart, pEnd, 1];
    outputs = [0, 0, fullSpace, fullSpace];
  } else {
    const [pStart, pEnd] = transitions[index - 1];
    const [nStart, nEnd] = transitions[index];
    inputs = [0, pStart, pEnd, nStart, nEnd, 1];
    outputs = [0, 0, fullSpace, fullSpace, HEADER_HEIGHT, HEADER_HEIGHT];
  }

  const height = useTransform(scrollYProgress, inputs, outputs, { clamp: true });
  // Content scale (1 -> 1.05) derived straight from this card's own height,
  // so it grows in as the card expands and eases back as it collapses.
  const contentScale = useTransform(height, [HEADER_HEIGHT, fullSpace], [1, 1.05], {
    clamp: true,
  });

  return (
    <motion.div style={{ height }} className="relative w-full shrink-0 overflow-hidden">
      {/* The header bar's own position never animates — it's always drawn
          at this card's top edge; only the card's overall height changes,
          which is what makes collapsed headers read as a fixed stack. */}
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 border-b border-white/10 px-6 sm:px-8"
        style={{ height: HEADER_HEIGHT }}
      >
        <span className="font-heading text-sm font-bold uppercase tracking-wide text-white sm:text-base">
          {item.title}
        </span>
        <span className="shrink-0 font-heading text-xs text-white/60">{item.step}</span>
      </div>

      <motion.div
        style={{ top: HEADER_HEIGHT, scale: contentScale }}
        className="absolute inset-x-0 bottom-0 flex origin-top-left flex-col justify-center px-6 sm:px-8"
      >
        <span className="font-heading text-6xl font-black leading-none text-white/20 sm:text-7xl">
          {item.step}
        </span>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/** "Our Process" for a single-service page: a pinned scroll section where a
 *  stack of process steps steps through one at a time — the active step
 *  expands to fill the panel while finished ones collapse to a thin header
 *  bar stacked above it, and the panel's background crossfades to match
 *  whichever step is active. */
export default function OurProcess({ steps }: { steps: ProcessStep[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgress = useSpring(rawProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  const transitions = steps.length > 1 ? buildTransitions(steps.length) : [];
  const colors = steps.map((_, i) => STEP_COLORS[i % STEP_COLORS.length]);

  // One continuous color keyframe list spanning the whole scroll range,
  // holding each step's color flat during its dwell and crossfading during
  // the shared transition windows — same technique as the height keyframes.
  const colorInputs: number[] = [0];
  const colorOutputs: string[] = [colors[0] ?? "rgb(var(--ink))"];
  transitions.forEach(([start, end], i) => {
    colorInputs.push(start, end);
    colorOutputs.push(colors[i], colors[i + 1]);
  });
  colorInputs.push(1);
  colorOutputs.push(colors[colors.length - 1] ?? "rgb(var(--ink))");
  const panelColor = useTransform(scrollYProgress, colorInputs, colorOutputs);

  if (steps.length === 0) return null;

  return (
    <section
      ref={wrapperRef}
      className="relative bg-white/40 border-y border-ink/5"
      style={{ height: `${steps.length * SEGMENT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>

              <h2 className="mt-4 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
                Our
                <br />
                Process
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/65 sm:text-base">
                How we collaborate with you from discovery to management &amp; growth.
              </p>
            </div>

            <motion.div
              style={{ height: PANEL_HEIGHT, backgroundColor: panelColor }}
              className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-ink/10"
            >
              {steps.map((step, index) => (
                <StackCard
                  key={step.step}
                  item={step}
                  index={index}
                  total={steps.length}
                  transitions={transitions}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
