"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";

const IMAGES = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800"
];

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Top shape control points
  const topCenterY = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 50, 50]);
  const topEdgeY = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 15, 50]);

  // Bottom shape control points
  const bottomCenterY = useTransform(scrollYProgress, [0, 0.2, 0.25], [100, 50, 50]);
  const bottomEdgeY = useTransform(scrollYProgress, [0, 0.1, 0.25], [100, 85, 50]);

  const topPath = useMotionTemplate`M 0 0 L 100 0 L 100 ${topEdgeY} Q 50 ${topCenterY} 0 ${topEdgeY} Z`;
  const bottomPath = useMotionTemplate`M 0 100 L 100 100 L 100 ${bottomEdgeY} Q 50 ${bottomCenterY} 0 ${bottomEdgeY} Z`;

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.45], [0.9, 1, 1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0.35, 0.45], ["0%", "-20%"]);

  const contentY = useTransform(scrollYProgress, [0.45, 0.65], ["50px", "0px"]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 pointer-events-none z-0 w-full h-full text-[#75c16a]"
        >
          <motion.path d={topPath} fill="currentColor" />
          <motion.path d={bottomPath} fill="currentColor" />
        </svg>

        <Container className="relative z-10 pt-8 sm:pt-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ink mix-blend-difference invert">
            <Burst className="h-4 w-4" />
            About us
          </div>
        </Container>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.h2
            style={{
              opacity: titleOpacity,
              scale: titleScale,
              y: titleY
            }}
            className="text-center font-heading text-[clamp(4rem,10vw,12rem)] font-bold leading-[0.85] text-white uppercase px-4"
          >
            MORE STRATEGY.<br />MORE CONNECTION.<br />
          </motion.h2>
        </div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex items-center pt-20"
        >
          <Container className="flex w-full flex-col lg:flex-row items-center justify-between gap-12">

            <div className="flex-1 max-w-3xl">
              <p className="font-heading text-[clamp(1.5rem,3.5vw,3.5rem)] font-bold uppercase leading-[1.1] text-white/90 mb-12">
                Born from the belief that a great business deserves a voice as strong as its vision, we evolved into a dedicated creative partner for brands that want to lead. We are a team of strategists and creators who prioritize clarity over noise and connection over clicks.
              </p>

              <div className="group inline-flex items-center gap-4 cursor-pointer">
                <span className="text-sm font-semibold uppercase tracking-wider text-white border-b border-white pb-1">
                  About Us
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#75c16a] transition-transform group-hover:scale-110">
                  <span className="sr-only">Go</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-64 h-80 lg:w-80 lg:h-[450px] relative shrink-0 rounded-full overflow-hidden">
              {IMAGES.map((src, index) => (
                <motion.img
                  key={src}
                  src={src}
                  alt="Team member"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </div>

          </Container>
        </motion.div>

      </div>
    </section>
  );
}
