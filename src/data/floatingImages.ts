import type { FloatingImageConfig } from "@/types/floatingImage";

/** Map hero card images to their case-study pages. */
const HREF_BY_SRC: Record<string, string> = {
  "/work/softlogic.webp": "/work/uber-sri-lanka",
  "/work/norlanka.webp": "/work/norlanka",
  "/work/advantis.webp": "/work/advantis",
  "/work/ginger-fresh.webp": "/work/uber-eats",
  "/work/fairfirst.webp": "/work/wild-drift",
};

function withHref(
  config: Omit<FloatingImageConfig, "href">,
): FloatingImageConfig {
  return { ...config, href: HREF_BY_SRC[config.src] ?? "#work" };
}

// 12 images total (see BackgroundLayer for positions).
// Order is row-major across the grid in the BackgroundLayer components.
export const FLOATING_IMAGES: FloatingImageConfig[] = [
  withHref({ src: "/work/softlogic.webp",    alt: "Softlogic project",          speed: 8,    phase: 0,   amplitude: 18, priority: true }),
  withHref({ src: "/work/norlanka.webp",     alt: "Norlanka project",           speed: 11,   phase: 1.2, amplitude: 12 }),
  withHref({ src: "/work/advantis.webp",     alt: "Advantis project",           speed: 9,    phase: 2.4, amplitude: 16 }),
  withHref({ src: "/work/ginger-fresh.webp", alt: "Ginger Fresh project",       speed: 7.5,  phase: 0.8, amplitude: 20 }),

  withHref({ src: "/work/fairfirst.webp",    alt: "Fairfirst Insurance project", speed: 10,   phase: 1.8, amplitude: 14 }),
  withHref({ src: "/work/norlanka.webp",     alt: "Norlanka project (variant)",  speed: 9.5,  phase: 3.0, amplitude: 13 }),
  withHref({ src: "/work/advantis.webp",     alt: "Advantis project (variant)",  speed: 8.5,  phase: 2.0, amplitude: 15 }),
  withHref({ src: "/work/ginger-fresh.webp", alt: "Ginger Fresh project (variant)", speed: 10.5, phase: 0.5, amplitude: 17 }),

  withHref({ src: "/work/softlogic.webp",    alt: "Softlogic project (variant)", speed: 9,    phase: 3.6, amplitude: 15 }),
  withHref({ src: "/work/fairfirst.webp",    alt: "Fairfirst Insurance project (variant)", speed: 10.5, phase: 0.2, amplitude: 12 }),
  withHref({ src: "/work/norlanka.webp",     alt: "Norlanka project (variant 2)", speed: 8.2,  phase: 2.2, amplitude: 11 }),
  withHref({ src: "/work/advantis.webp",     alt: "Advantis project (variant 2)", speed: 9.7,  phase: 1.1, amplitude: 14 }),
];
