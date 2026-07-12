"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Container from "@/components/Container";

import { EASE } from "@/lib/motion";
import { TESTIMONIALS } from "@/data/testimonials";


// Cards are min(420px, 85vw) wide so they never exceed the phone viewport;
// the slide step is measured from the first card at runtime.
const CARD_WIDTH = "min(420px, 85vw)";
const CARD_GAP = 24;
const FALLBACK_STEP = 420 + CARD_GAP;

function Initials({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-orange/10 font-heading text-orange ${className}`}
    >
      {name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-label="LinkedIn">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Testimonials carousel traced from the reference: static left column with
 *  Clutch rating; click-driven card track on the right that clips at the
 *  screen edge; circular prev/next buttons beneath the cards. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(FALLBACK_STEP);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxIndex = TESTIMONIALS.length - 1;

  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.children[0] as HTMLElement | undefined;
      if (first) setStep(first.offsetWidth + CARD_GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left column — heading, promise, Clutch rating */}
          <div className="shrink-0 lg:w-[340px]">
            <div className="flex flex-col items-start lg:sticky lg:top-32">
              <h2 className="mb-6 font-heading text-heading-4xl leading-heading text-ink sm:text-heading-5xl">
                Kind words from
                <br />
                our clients
              </h2>
              <p className="mb-12 max-w-sm text-sm text-ink/70 sm:text-base">
                We won&apos;t just be executors. We&apos;ll be your partners, we
                promise. If you&apos;re not convinced, check out our verified
                testimonials from around the world about working with us.
              </p>


            </div>
          </div>

          {/* Right column — card track clipping at the screen's right edge */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden lg:[margin-right:calc(50%-50vw)]">
              <motion.div
                ref={trackRef}
                className="flex gap-6"
                animate={{ x: -index * step }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
                    className="flex min-h-[440px] flex-col rounded-3xl bg-white p-8 shadow-sm"
                  >
                    {/* Header: avatar left, company wordmark right */}
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <Initials name={t.name} className="h-12 w-12 text-heading-base" />
                      <p className="pt-2 text-right font-heading text-heading-sm tracking-wide text-ink">
                        {t.company}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-ink/80 sm:text-base">
                      {t.text}
                    </p>

                    {/* Footer pinned to the card bottom */}
                    <div className="mt-auto pt-8">
                      <p className="flex items-center gap-2 font-bold text-ink">
                        {t.name}
                        <LinkedInIcon />
                      </p>
                      <p className="mt-1 text-sm text-ink/50">
                        {t.role} at {t.company}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Prev / next under the cards */}
            <div className="mt-10 flex gap-3">
              <button
                onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                disabled={index === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
                disabled={index === maxIndex}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
