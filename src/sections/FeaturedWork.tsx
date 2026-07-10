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

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectResult {
  metric?: string;
  text: string;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  results: ProjectResult[];
  /** Case-study page for this project */
  href: string;
}

const PROJECTS: Project[] = [
  {
    name: "Softlogic",
    description:
      "A “Fight Against Fire” brand campaign for Softlogic's fire detection systems — brochure design, system-design diagrams, and a bold shield identity that makes safety feel approachable.",
    tags: ["Brochure Design", "Brand Identity", "Print Collateral"],
    image: "/work/softlogic.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Softlogic needed its fire detection systems to feel approachable without losing technical authority across its printed collateral.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/softlogic",
  },
  {
    name: "Ginger Fresh",
    description:
      "Can packaging design for Ginger Fresh, a beverage brand built around bold contrast and refreshment — two variants sharing one confident identity.",
    tags: ["Packaging Design", "Brand Identity", "Product Design"],
    image: "/work/ginger-fresh.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Ginger Fresh needed packaging bold enough to stand out on shelf while keeping two product variants under one identity.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/ginger-fresh",
  },
  {
    name: "Norlanka",
    description:
      "Ongoing social media and employer-branding content for Norlanka — hiring campaigns, award features, festival greetings, and the “HERIZON” women-in-leadership initiative.",
    tags: ["Social Media Design", "Employer Branding", "Content Creation"],
    image: "/work/norlanka.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Norlanka needed a consistent employer-brand voice across hiring campaigns, award features, and initiatives like HERIZON.",
    results: [
      { metric: "12%", text: "Organic Follower Growth on LinkedIn." },
      { metric: "3x", text: "Engagement Rate Increase." },
      { text: "Rise in Job Inquiries, directly fulfilling the goal of attracting talent through trust and authenticity." },
    ],
    href: "/work/norlanka",
  },
  {
    name: "Fairfirst Insurance",
    description:
      "Product brochure design for Fairfirst's Smart House Insurance — translating a technical policy into a clear, homeowner-friendly story.",
    tags: ["Brochure Design", "Print Collateral", "Brand Identity"],
    image: "/work/fairfirst.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Fairfirst needed its Smart House Insurance policy translated into a story homeowners could actually understand.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/fairfirst",
  },
  {
    name: "Advantis",
    description:
      "Social content for Advantis Project Logistics — sustainability messaging, hiring campaigns, and equipment promotion for a heavy-logistics audience.",
    tags: ["Social Media Design", "Content Creation", "Digital Advertising"],
    image: "/work/advantis.webp",
    challenge:
      "Advantis Project Logistics needed to move beyond basic social media presence and strategically manage their LinkedIn and Facebook",
    results: [
      { metric: "2x", text: "Growth in Facebook page following." },
      { metric: "25%", text: "Growth in LinkedIn followers." },
      {
        text: "Established Industry Authority through consistent, trust-based organic engagement.",
      },
    ],
    href: "/work/advantis",
  },
];

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
      style={{ height: `${PROJECTS.length * 80}vh` }}
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
                        className={`font-heading text-3xl font-bold uppercase tracking-tight transition-colors duration-300 sm:text-4xl lg:text-5xl ${isActive ? "text-ink" : "text-ink/25"
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
                            <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-ink">
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
                                    <span className="font-heading text-2xl font-bold text-ink">
                                      {result.metric}
                                    </span>
                                  )}
                                  <span className="max-w-sm">{result.text}</span>
                                </li>
                              ))}
                            </ul>

                            <a
                              href={project.href}
                              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
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
