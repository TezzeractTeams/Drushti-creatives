"use client";

import { useRef, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";
import OurClients from "@/sections/OurClients";
import AboutUs from "@/sections/AboutUs";
import { CLIENT_FADE_END, CLIENT_FADE_START } from "@/config/clientCurtain";

/** Pins OurClients while AboutUs scrolls over it; drives client content fade-out. */
export default function ClientAboutCurtain() {
  const aboutRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });

  const contentFadeOpacity = useTransform(
    scrollYProgress,
    [CLIENT_FADE_START, CLIENT_FADE_END],
    [1, 0],
  );

  return (
    <div className="relative">
      <OurClients contentFadeOpacity={contentFadeOpacity} />
      <AboutUs scrollRef={aboutRef} />
    </div>
  );
}
