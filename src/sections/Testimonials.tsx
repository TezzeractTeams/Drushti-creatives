"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Container from "@/components/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    id: 1,
    name: "Venani Siriwardena",
    role: "Talent Manager - Talent Engagement & Development",
    company: "Norlanka",
    text: "We highly appreciate the professionalism, creativity, and commitment demonstrated by Drushti Creatives as our social media creative partner. Their team consistently delivers high-quality creative solutions aligned with our brand expectations and timelines. The attention to detail, responsiveness, and ability to understand and translate concepts into impactful visual content have contributed significantly to enhancing our digital presence. It has been a pleasure working with a reliable and dedicated team, and we look forward to continuing this partnership.",
  },
  {
    id: 2,
    name: "Gihan De Silva",
    role: "Business Development Manager",
    company: "Wild Drift",
    text: "We've been working with Drushti Creatives for over 2 years now, and it's been a great experience. They handle our social media and creative work, and they've always been reliable, easy to work with, and full of fresh ideas. The team understands our brand and brings it to life really well. Highly recommend them!",
  },
  {
    id: 3,
    name: "Shermi Herath",
    role: "Managing Director",
    company: "Skill Gate - Sri Lanka",
    text: "We've worked with Drushti Creatives on multiple projects at Skill Gate Pvt. Ltd., and they've been a fantastic creative partner throughout. From our Lean Six Sigma campaigns to social media content and branding materials, the team has consistently delivered fresh, thoughtful designs that align perfectly with our vision. What really stood out was how easy they were to work with—always responsive, open to feedback, and committed to getting things just right. They understood our brand deeply and helped us present it in a more professional and engaging way. Highly recommend them if you're looking for a reliable and talented creative agency.",
  },
  {
    id: 4,
    name: "Fiyaz Izzeth",
    role: "Manager - Marketing & Digital Solutions",
    company: "Fairfirst Insurance Limited",
    text: "A place full of creativity! I have worked with them on corporate projects and they consistently provide timely solutions, making it much easier to work with them. Highly recommended for getting your creative work done.",
  },
  {
    id: 5,
    name: "Amalka Ranasinghe",
    role: "Owner",
    company: "OM Ceylon",
    text: "Great service. They are very responsive, supportive and the customer service is superb. Well communicate with customers and very thoughtful in getting the right content and visual direction and creating a remarkable outcome to meet customer expectations. Thank you very much Drushti Creatives. Look forward to work with you in the future.",
  },
  {
    id: 6,
    name: "Anuradha Ekanayake",
    role: "Co Founder",
    company: "Vision Volunteers",
    text: "Great Service and best customer service I ever experienced. Thank you Drushti. Will continue to work with you guys.",
  },
];

// Card width + gap in pixels (must match the CSS below)
const CARD_WIDTH = 420;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;

export default function Testimonials() {
  const [offset, setOffset] = useState(0);

  const maxOffset = -(TESTIMONIALS.length - 1) * STEP;

  const goLeft = () => {
    setOffset((prev) => Math.min(prev + STEP, 0));
  };

  const goRight = () => {
    setOffset((prev) => Math.max(prev - STEP, maxOffset));
  };

  return (
    <section className="relative bg-[#f4f3ef] py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

          {/* Left Column */}
          <div className="lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-32 flex flex-col items-start">
              <h2 className="mb-6 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                KIND WORDS FROM<br />OUR CLIENTS
              </h2>
              <p className="mb-12 max-w-sm text-base text-ink/70">
                We won&apos;t just be executors. We&apos;ll be your partners, we promise. If you&apos;re not convinced, check out our verified testimonials from around the world about working with us.
              </p>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={goLeft}
                  disabled={offset === 0}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                  aria-label="Previous testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goRight}
                  disabled={offset === maxOffset}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                  aria-label="Next testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dot indicators */}
              <div className="mt-8 flex gap-2">
                {TESTIMONIALS.map((_, i) => {
                  const activeIndex = Math.round(-offset / STEP);
                  return (
                    <button
                      key={i}
                      onClick={() => setOffset(-i * STEP)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-orange" : "w-2 bg-ink/20"
                        }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column — clipping window */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: offset }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  style={{ width: `${CARD_WIDTH}px`, minWidth: `${CARD_WIDTH}px` }}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm min-h-[420px]"
                >
                  <div>
                    {/* Avatar initials */}
                    <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange font-bold text-lg font-heading">
                      {testimonial.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-base leading-relaxed text-ink/80">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: User Info */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange text-sm font-bold font-heading">
                      {testimonial.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-ink">{testimonial.name}</h4>
                      <p className="text-sm text-ink/60">{testimonial.role}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange mt-1">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
