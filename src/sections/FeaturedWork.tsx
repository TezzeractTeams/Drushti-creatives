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
import { PROJECTS } from "@/data/projects";


/** Pinned scroll section: a client list where scroll position (not clicks)
 *  drives which project is expanded with description, tags, and image. */
export default function FeaturedWork() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, PROJECTS.length - 1]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const rounded = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(v)));
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  /** Click-to-reveal: jump to the scroll offset within the pinned range that
   *  corresponds to project i — the scroll-driven state then reveals it. */
  const scrollToProject = (i: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const target = sectionTop + (i / (PROJECTS.length - 1)) * range;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section
      id="work"
      ref={wrapperRef}
      className="relative bg-white"
      // Controls "how fast" we move through projects: smaller height => faster snapping.
      style={{ height: `${PROJECTS.length * 55}vh` }}
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
            {PROJECTS.map((project, i) => {
              const isActive = i === active;
              return (
                <div key={project.name} className="border-b border-ink/10 py-3 first:pt-0">
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="grid min-w-0 flex-1 grid-cols-1 gap-x-4 sm:grid-cols-[auto_1fr]">
                      <span
                        className={`hidden text-[2.5rem] leading-none text-ink/40 transition-transform duration-300 sm:inline-block sm:self-center ${isActive ? "-rotate-90" : ""
                          }`}
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
                          className={`font-heading text-heading-3xl leading-heading tracking-tight transition-colors duration-300 ${isActive ? "text-ink" : "text-ink/25"
                            }`}
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
                              <p className="text-sm text-ink/70">
                                {project.challenge}
                              </p>

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
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
                              <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover"
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
