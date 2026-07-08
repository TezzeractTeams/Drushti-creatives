import type { FloatingImageConfig } from "@/types/floatingImage";

// 8 images for the checkerboard grid (see BackgroundLayer for positions)
// Order: Row0-Col0, Row0-Col2, Row0-Col4, Row1-Col1, Row1-Col3,
//        Row2-Col0, Row2-Col2, Row2-Col4
export const FLOATING_IMAGES: FloatingImageConfig[] = [
  { src: "/work/softlogic.webp",    alt: "Softlogic project",          speed: 8,    phase: 0,   amplitude: 18, priority: true },
  { src: "/work/norlanka.webp",     alt: "Norlanka project",           speed: 11,   phase: 1.2, amplitude: 12 },
  { src: "/work/advantis.webp",     alt: "Advantis project",           speed: 9,    phase: 2.4, amplitude: 16 },
  { src: "/work/ginger-fresh.webp", alt: "Ginger Fresh project",       speed: 7.5,  phase: 0.8, amplitude: 20 },
  { src: "/work/fairfirst.webp",    alt: "Fairfirst Insurance project", speed: 10,   phase: 1.8, amplitude: 14 },
  { src: "/work/norlanka.webp",     alt: "Norlanka project",           speed: 9.5,  phase: 3.0, amplitude: 13 },
  { src: "/work/advantis.webp",     alt: "Advantis project",           speed: 8.5,  phase: 2.0, amplitude: 15 },
  { src: "/work/ginger-fresh.webp", alt: "Ginger Fresh project",       speed: 10.5, phase: 0.5, amplitude: 17 },
];
