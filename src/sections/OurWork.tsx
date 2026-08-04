"use client";

import { useState } from "react";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";

export type WorkItem = {
  name: string;
  client: string;
  image: string;
  tags: string[];
  href: string;
};

export default function OurWork({
  serviceId,
  items,
}: {
  serviceId: string;
  items: WorkItem[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {items.map((project, index) => (
            <PortfolioCard
              key={`${serviceId}-${project.name}`}
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
          ))}
        </div>
      </Container>
    </section>
  );
}
