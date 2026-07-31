"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import { SERVICE_WORK } from "@/data/serviceWork";

/** Grid of case-study cards for a single-service page — each service shows
 *  its own distinct set of work (via SERVICE_WORK[serviceId]), not one
 *  shared global list. On hover, the project's title/tags slide up from the
 *  bottom and sit INSIDE the card, over the image — not appended below it —
 *  while every other card dims to spotlight the one being hovered. Renders
 *  nothing if that service has no work assigned yet. */
export default function OurWork({ serviceId }: { serviceId: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = SERVICE_WORK[serviceId] ?? [];

  if (items.length === 0) return null;

  return (
    <section className="bg-yellow py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight">Our Work</h2>
          <p className="mt-4 text-ink/65 text-sm md:text-base leading-relaxed">
            A look at real projects we&apos;ve delivered for our clients.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {items.map((project, index) => {
            const isHovered = hovered === index;
            return (
              <Link
                key={project.name}
                href={project.href}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-ink/5 bg-white transition-opacity duration-300 ${hovered !== null && !isHovered ? "opacity-40" : "opacity-100"
                  }`}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"
                    }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Anchored to the card's own bottom edge (not the page flow
                    below it) so the reveal reads as "inside the card". */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-white px-5 py-4 transition-all duration-300 ease-out ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                >
                  <h3 className="font-heading text-base font-semibold text-ink">{project.name}</h3>
                  <p className="mt-0.5 text-xs text-ink/60">{project.client}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} className="h-6 px-2 text-[0.6rem]">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
