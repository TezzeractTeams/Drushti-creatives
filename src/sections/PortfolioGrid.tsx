"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";
import Tag from "@/components/Tag";
import type { Project } from "@/lib/content/types";

const ALL_FILTER = "All";

function getUniqueTags(projects: Project[]): string[] {
  const tags = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filters = useMemo(
    () => [ALL_FILTER, ...getUniqueTags(projects)],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <>
      <section className="bg-blue pb-14 pt-28 md:pb-20 md:pt-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-end lg:gap-16">
            <h1 className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-white">
              Portfolio
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-white/75 lg:justify-self-end lg:text-base lg:leading-relaxed">
              Creativity isn&apos;t an end in itself for us — it&apos;s essential to
              how we work. We love what we do, and that turns every client project
              into something we truly care about.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <div className="p-2">
          <div className="mb-2 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <Tag
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={isActive ? "bg-ink text-white" : undefined}
                >
                  {filter === ALL_FILTER ? "Show all" : filter}
                </Tag>
              );
            })}
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
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
        </div>
      </section>
    </>
  );
}
