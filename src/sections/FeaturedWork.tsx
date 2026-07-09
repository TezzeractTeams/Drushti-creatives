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

const PROJECTS = [
  {
    name: "Softlogic",
    description:
      "A “Fight Against Fire” brand campaign for Softlogic's fire detection systems — brochure design, system-design diagrams, and a bold shield identity that makes safety feel approachable.",
    tags: ["Brochure Design", "Brand Identity", "Print Collateral"],
    image: "/work/softlogic.webp",
  },
  {
    name: "Ginger Fresh",
    description:
      "Can packaging design for Ginger Fresh, a beverage brand built around bold contrast and refreshment — two variants sharing one confident identity.",
    tags: ["Packaging Design", "Brand Identity", "Product Design"],
    image: "/work/ginger-fresh.webp",
  },
  {
    name: "Norlanka",
    description:
      "Ongoing social media and employer-branding content for Norlanka — hiring campaigns, award features, festival greetings, and the “HERIZON” women-in-leadership initiative.",
    tags: ["Social Media Design", "Employer Branding", "Content Creation"],
    image: "/work/norlanka.webp",
  },
  {
    name: "Fairfirst Insurance",
    description:
      "Product brochure design for Fairfirst's Smart House Insurance — translating a technical policy into a clear, homeowner-friendly story.",
    tags: ["Brochure Design", "Print Collateral", "Brand Identity"],
    image: "/work/fairfirst.webp",
  },
  {
    name: "Advantis",
    description:
      "Social content for Advantis Project Logistics — sustainability messaging, hiring campaigns, and equipment promotion for a heavy-logistics audience.",
    tags: ["Social Media Design", "Content Creation", "Digital Advertising"],
    image: "/work/advantis.webp",
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
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink"
          >
            <Burst className="h-4 w-4 text-orange" />
            Featured Work
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink"
          >
            <Burst className="h-4 w-4 text-orange" />
            Featured work
          </motion.div>

          <div>
            {PROJECTS.map((project, i) => {
              const isActive = i === active;
              return (
                <div key={project.name} className="border-b border-ink/10 py-4 first:pt-0">
                  <div className="flex items-center gap-4">
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
                        <div className="mt-4 grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:items-center">
                          <div>
                            <p className="max-w-md text-sm text-ink/70">{project.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/80"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
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
