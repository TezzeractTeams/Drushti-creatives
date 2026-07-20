"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/data/projects";

/** Case-study page traced from the reference: a sticky left info panel
 *  (title, tags, Challenge, Strategy, Results) stays pinned while a full-
 *  bleed gallery scrolls independently on the right. */
export default function CaseStudy({ project }: { project: Project }) {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <motion.div {...fadeUp()} className="mb-10">
          <PillButton href="/#work" variant="light">
            ← Back to work
          </PillButton>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          {/* Sticky left panel */}
          <div className="lg:sticky lg:top-28">
            <motion.h1
              {...fadeUp(0.05)}
              className="font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.05] text-ink"
            >
              {project.name}
            </motion.h1>

            <motion.div {...fadeUp(0.1)} className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                The Challenge
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                {project.challenge}
              </p>
            </motion.div>

            {project.strategy && (
              <motion.div {...fadeUp(0.2)} className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                  The Strategy
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {project.strategy.intro}
                </p>
                {project.strategy.points && (
                  <ul className="mt-4 space-y-3">
                    {project.strategy.points.map((point) => (
                      <li key={point.title} className="text-sm leading-relaxed sm:text-base">
                        <span className="font-bold text-ink">{point.title}: </span>
                        <span className="text-ink/70">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}

            <motion.div {...fadeUp(0.25)} className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                The Results
              </h2>
              <ul className="mt-4 space-y-3">
                {project.results.map((result) => (
                  <li key={result.text} className="flex items-baseline gap-3">
                    {result.metric && (
                      <span className="font-heading text-2xl font-bold text-ink">
                        {result.metric}
                      </span>
                    )}
                    <span className="text-sm text-ink/70 sm:text-base">{result.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Scrolling gallery */}
          <motion.div {...fadeUp(0.1)} className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:aspect-[4/3]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
