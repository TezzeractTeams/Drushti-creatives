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
            className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-ink"
          >
            <Burst className="h-4 w-4 text-orange" />
            Featured work
          </motion.div>

          <div>
            {PROJECTS.map((project, i) => {
              const isActive = i === active;
              return (
                <div key={project.name} className="border-b border-ink/10 py-3 first:pt-0">
                  {/* Title row: name left; tags right while the row is inactive */}
                  <button
                    type="button"
                    onClick={() => scrollToProject(i)}
                    className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`hidden text-xl text-ink/40 transition-transform duration-300 sm:inline-block ${isActive ? "-rotate-90" : ""
                          }`}
                        aria-hidden
                      >
                        ↓
                      </span>
                      <span
                        className={`font-heading text-heading-3xl leading-heading tracking-tight transition-colors duration-300 sm:text-heading-4xl lg:text-heading-5xl ${isActive ? "text-ink" : "text-ink/25"
                          }`}
                      >
                        {project.name}
                      </span>
                    </span>

                    <span
                      className={`flex flex-wrap gap-2 transition-opacity duration-300 sm:shrink-0 sm:justify-end ${isActive ? "pointer-events-none opacity-0" : "opacity-100"
                        }`}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:items-center">
                          {/* The Challenge + results + case-study link */}
                          <div>
                            <h3 className="text-xs font-semibold tracking-[0.32em] text-ink">
                              The Challenge
                            </h3>
                            <p className="mt-3 max-w-md text-sm text-ink/70">
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
                                  <span className="max-w-sm">{result.text}</span>
                                </li>
                              ))}
                            </ul>

                            <a
                              href={project.href}
                              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-white transition-transform hover:scale-105"
                            >
                              View more
                            </a>
                          </div>

                          <div className="relative aspect-[16/10] max-h-[40vh] w-full overflow-hidden rounded-3xl">
                            <Image
                              src={project.image}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
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
