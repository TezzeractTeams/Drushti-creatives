"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";

export type WorkItem = {
  name: string;
  client: string;
  image: string;
  tags: string[];
  href: string;
};

const START_BEFORE_VIEWPORT_BOTTOM = 0.9;
const PLAY_DISTANCE = 500;

type Offset = { dx: number; dy: number; rotate: number };

// Small deterministic per-card tilt/nudge on top of the measured deck-center
// offset, so the pile reads as a loosely fanned stack of photos (rotated,
// corners peeking out) rather than a perfectly aligned pile — cycles every
// 6 cards, which also happens to match a 6-item / 2-row grid.
const DECK_JITTER: Offset[] = [
  { rotate: -6, dx: -14, dy: 6 },
  { rotate: 4, dx: 10, dy: -8 },
  { rotate: -3, dx: -6, dy: 10 },
  { rotate: 7, dx: 12, dy: 4 },
  { rotate: -8, dx: -10, dy: -6 },
  { rotate: 3, dx: 8, dy: 8 },
];

function StackCard({
  index,
  offset,
  progress,
  children,
}: {
  index: number;
  offset: Offset | null;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const jitter = DECK_JITTER[index % DECK_JITTER.length];

  // Until real positions are measured, fall back to 0 so there's no flash
  // of a wildly-offset card before the first layout pass completes.
  const dx = (offset?.dx ?? 0) + jitter.dx;
  const dy = (offset?.dy ?? 0) + jitter.dy;
  const rot = jitter.rotate;

  // Slight per-card stagger so the deck doesn't untangle in perfect
  // lockstep — later cards start settling a touch later.
  const start = Math.min(index * 0.05, 0.35);

  const x = useTransform(progress, [start, 1], [dx, 0]);
  const y = useTransform(progress, [start, 1], [dy, 0]);
  const rotate = useTransform(progress, [start, 1], [rot, 0]);
  const scale = useTransform(progress, [start, 1], [0.9, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, zIndex: index + 1 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export default function OurWork({
  serviceId,
  items,
}: {
  serviceId: string;
  items: WorkItem[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [startScroll, setStartScroll] = useState<number | null>(null);
  const [offsets, setOffsets] = useState<Offset[] | null>(null);

  // Measure each card's real grid-cell center relative to the grid's own
  // center (the "deck" target point), using offsetLeft/offsetTop — layout
  // positions unaffected by the transform we're already applying — so this
  // stays correct at any scroll progress and recomputes cleanly when the
  // grid switches between 1/2/3 columns on resize.
  // Target point is pinned to the TOP ROW's center (not the whole grid's
  // vertical center) so the deck sits right under the "Our Work" heading and
  // is visible immediately when the section scrolls into view, rather than
  // centered deep in a tall multi-row grid that would need extra scrolling
  // to reveal.
  useEffect(() => {
    const measure = () => {
      const grid = gridRef.current;
      const firstCard = cardRefs.current[0];
      if (!grid || !firstCard) return;

      const targetX = grid.offsetWidth / 2;
      const targetY = firstCard.offsetTop + firstCard.offsetHeight / 2;

      const next: Offset[] = cardRefs.current.map((el) => {
        if (!el) return { dx: 0, dy: 0, rotate: 0 };
        const cardCenterX = el.offsetLeft + el.offsetWidth / 2;
        const cardCenterY = el.offsetTop + el.offsetHeight / 2;
        return { dx: targetX - cardCenterX, dy: targetY - cardCenterY, rotate: 0 };
      });
      setOffsets(next);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  // Same absolute-scroll measurement approach as before for driving progress
  // via window.scrollY (Lenis-compatible, unlike framer's IO-based offset API).
  useEffect(() => {
    if (!sectionRef.current) return;
    const measure = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      setStartScroll(absoluteTop - window.innerHeight * START_BEFORE_VIEWPORT_BOTTOM);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    if (startScroll === null) return 0;
    const p = (v - startScroll) / PLAY_DISTANCE;
    return Math.min(1, Math.max(0, p));
  });

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight">Our Work</h2>
          <p className="mt-4 text-ink/65 text-sm md:text-base leading-relaxed">
            A look at real projects we&apos;ve delivered for our clients.
          </p>
        </div>

        <div ref={sectionRef}>
          <div
            ref={gridRef}
            className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
          >
            {items.map((project, index) => (
              <div
                key={`${serviceId}-${project.name}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <StackCard index={index} offset={offsets ? offsets[index] : null} progress={progress}>
                  <PortfolioCard
                    name={project.name}
                    client={project.client}
                    image={project.image}
                    tags={project.tags}
                    href={project.href}
                    isHovered={hovered === index}
                    isDimmed={hovered !== null && hovered !== index}
                    onHover={() => setHovered(index)}
                    onLeave={() => setHovered(null)}
                  />
                </StackCard>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}