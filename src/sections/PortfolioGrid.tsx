"use client";

import { useMemo, useState } from "react";
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
      <section className="bg-cream">
        <div className="p-2">
          <div className="my-6 flex flex-wrap gap-2 sm:my-8">
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
