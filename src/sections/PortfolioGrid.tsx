"use client";

import { useState } from "react";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";
import type { Project } from "@/lib/content/types";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <h1 className="font-heading text-3xl font-normal tracking-tight md:text-4xl">
            Portfolio
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/65 md:text-base">
            A look at real projects we&apos;ve delivered for our clients.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.slug}
              name={project.name}
              client={project.client}
              image={project.featuredImage}
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
