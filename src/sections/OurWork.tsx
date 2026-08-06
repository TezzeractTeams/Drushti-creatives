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

// Scroll distance (px) over which the deck fans out into place. Simple
// scrollY-based trigger — no longer measured against the section's own
// position in the page, since OurWork now sits right near the top of every
// service page (the hero was removed), so it's already in view on load.
// Using absolute scrollY directly means the deck reliably starts fully
// stacked at scrollY = 0 and settles by the time the user has scrolled
// PLAY_DISTANCE px, regardless of exactly where the section lands.
const PLAY_DISTANCE = 500;

type Offset = { dx: number; dy: number; rotate: number };

// Small deterministic per-card tilt/nudge on top of the measured deck-anchor
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
  header,
}: {
  serviceId: string;
  items: WorkItem[];
  /** The title block (H1 + paragraph, or whatever markup the page needs) —
   *  rendered as-is on the left of the anchor row. Passed in per-page instead
   *  of being hardcoded here, so each page controls its own heading/copy.
   *  Always rendered, even when there are no work items for this service —
   *  only the image deck itself is conditional on items.length. */
  header: React.ReactNode;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[] | null>(null);

  const hasItems = items.length > 0;

  // Measure each card's position relative to the anchor box that sits next
  // to the header — using getBoundingClientRect (viewport space) since the
  // anchor and the cards live in two different containers that don't share
  // an offsetParent. A viewport-space delta between them stays correct
  // regardless of scroll position, since both move together as the page
  // scrolls — only their relative distance matters for the "deck" target.
  useEffect(() => {
    if (!hasItems) return;
    const measure = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const anchorRect = anchor.getBoundingClientRect();
      const targetX = anchorRect.left + anchorRect.width / 2;
      const targetY = anchorRect.top + anchorRect.height / 2;

      const next: Offset[] = cardRefs.current.map((el) => {
        if (!el) return { dx: 0, dy: 0, rotate: 0 };
        const r = el.getBoundingClientRect();
        const cardCenterX = r.left + r.width / 2;
        const cardCenterY = r.top + r.height / 2;
        return { dx: targetX - cardCenterX, dy: targetY - cardCenterY, rotate: 0 };
      });
      setOffsets(next);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length, hasItems]);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) =>
    Math.min(1, Math.max(0, v / PLAY_DISTANCE))
  );

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header (passed in) + deck anchor sit in the same row on larger
            screens so the fanned stack starts right next to it, then settles
            into its grid position below as the section scrolls into view.
            The anchor itself is invisible — it only exists to give the
            measurement effect above a real position to target. Rendered
            regardless of whether this service has work items. */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {header}
          {hasItems && (
            <div
              ref={anchorRef}
              className="pointer-events-none aspect-[4/5] w-32 shrink-0 opacity-0 sm:w-40"
              aria-hidden
            />
          )}
        </div>

        {hasItems && (
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
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
        )}
      </Container>
    </section>
  );
}