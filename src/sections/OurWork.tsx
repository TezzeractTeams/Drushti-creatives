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

// Distance scrolled before cards completely expand from stack into grid
const UNSTACK_DISTANCE = 450;

type Offset = { dx: number; dy: number; rotate: number };

// Deterministic fanned offsets for cards in the stacked state (center = index 2)
const FANNED_OFFSETS: Offset[] = [
  { rotate: -12, dx: -180, dy: 14 },
  { rotate: -6, dx: -90, dy: 6 },
  { rotate: 0, dx: 0, dy: 0 },
  { rotate: 6, dx: 90, dy: 6 },
  { rotate: 12, dx: 180, dy: 14 },
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
  const fanned = FANNED_OFFSETS[index % FANNED_OFFSETS.length];

  // Total delta from card's grid position to stack position
  const dx = (offset?.dx ?? 0) + fanned.dx;
  const dy = (offset?.dy ?? 0) + fanned.dy;
  const rot = fanned.rotate;

  // Staggered un-stacking transition: 0 (stacked under text) -> 1 (grid position)
  const start = Math.min(index * 0.04, 0.2);

  const x = useTransform(progress, [start, 1], [dx, 0]);
  const y = useTransform(progress, [start, 1], [dy, 0]);
  const rotate = useTransform(progress, [start, 1], [rot, 0]);
  const scale = useTransform(progress, [start, 1], [0.92, 1]);

  const baseZIndex = 30 - Math.abs(index - 2);

  return (
    <motion.div
      style={{ x, y, rotate, scale, zIndex: baseZIndex }}
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
  header: React.ReactNode;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[] | null>(null);

  const hasItems = items.length > 0;

  // Measure each grid card relative to the central stack anchor under text
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v * (1000 / UNSTACK_DISTANCE)))
  );

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Centered Header & Stack Anchor */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          {header}

          {/* Invisible anchor where fanned stack forms before unstacking */}
          {hasItems && (
            <div
              ref={anchorRef}
              className="pointer-events-none mt-10 h-[280px] sm:h-[340px] w-48 sm:w-64 opacity-0"
              aria-hidden
            />
          )}
        </div>

        {/* Portfolio Cards Grid — un-stacks from center pile into grid on scroll */}
        {hasItems && (
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
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