"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import PillButton from "@/components/PillButton";
import Tag from "@/components/Tag";
import { EASE } from "@/lib/motion";
import type { Project } from "@/lib/content/types";
import {
  FEATURED_WORK_LOGO_MAX_HEIGHT,
  FEATURED_WORK_LOGO_MAX_WIDTH,
} from "@/data/clientLogos";

/** Pinned scroll section driven by CMS portfolio entries flagged featuredOnHomepage. */
export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Math.max(projects.length, 1);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(projects.length - 1, 0)]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    if (projects.length === 0) return;
    const rounded = Math.min(projects.length - 1, Math.max(0, Math.round(v)));
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  const scrollToProject = (i: number) => {
    const el = wrapperRef.current;
    if (!el || projects.length <= 1) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const target = sectionTop + (i / (projects.length - 1)) * range;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  if (projects.length === 0) return null;

  return (
    <section
      id="work"
      ref={wrapperRef}
      className="relative bg-white"
      style={{ height: `${count * 55}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink"
          >
            <Burst className="h-4 w-4 text-orange" />
            Featured work
          </motion.div>

          <div>
            {projects.map((project, i) => {
              const isActive = i === active;
              const logoSrc = project.clientLogoFocus || project.clientLogoSquare;
              return (
                <div key={project.slug} className="border-b border-ink/10 py-3 first:pt-0">
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="grid min-w-0 flex-1 grid-cols-1 gap-x-4 sm:grid-cols-[auto_1fr]">
                      <span
                        className={`hidden text-[2.5rem] leading-none text-ink/40 transition-transform duration-300 sm:inline-block sm:self-center ${isActive ? "-rotate-90" : ""}`}
                        aria-hidden
                      >
                        ↓
                      </span>

                      <button
                        type="button"
                        onClick={() => scrollToProject(i)}
                        className="text-left sm:col-start-2"
                      >
                        <span
                          className={`font-heading text-heading-3xl leading-heading tracking-tight transition-colors duration-300 ${isActive ? "text-ink" : "text-ink/25"}`}
                        >
                          {project.name}
                        </span>
                      </button>
                    </div>

                    <span className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid gap-6 sm:grid-cols-[3fr_2fr] sm:items-start">
                          <div className="grid min-w-0 grid-cols-1 gap-x-4 sm:grid-cols-[auto_1fr]">
                            <span className="invisible hidden text-[2.5rem] leading-none sm:inline-block" aria-hidden>
                              ↓
                            </span>
                            <div className="min-w-0 sm:col-start-2">
                              {logoSrc && (
                                <div className="mb-2 block w-fit">
                                  <Image
                                    src={logoSrc}
                                    alt={project.client}
                                    width={148}
                                    height={48}
                                    className="block h-auto w-auto object-contain object-left"
                                    style={{
                                      maxHeight: FEATURED_WORK_LOGO_MAX_HEIGHT,
                                      maxWidth: FEATURED_WORK_LOGO_MAX_WIDTH,
                                    }}
                                  />
                                </div>
                              )}
                              <p className="text-sm text-ink/70">{project.challenge}</p>

                              <ul className="mt-4 space-y-2">
                                {project.results.map((result, ri) => (
                                  <li
                                    key={ri}
                                    className="flex items-baseline gap-3 text-sm text-ink/70"
                                  >
                                    {result.metric && (
                                      <span className="font-heading text-heading-2xl leading-heading text-ink">
                                        {result.metric}
                                      </span>
                                    )}
                                    <span className="min-w-0 flex-1">{result.text}</span>
                                  </li>
                                ))}
                              </ul>

                              <PillButton href={project.href} className="mt-4 px-6 py-2.5">
                                View more
                              </PillButton>
                            </div>
                          </div>

                          <div className="my-4 flex min-w-0 w-full">
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-ink/10 bg-white">
                              <Image
                                src={project.featuredImage}
                                alt={project.name}
                                fill
                                className="object-cover object-top"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
