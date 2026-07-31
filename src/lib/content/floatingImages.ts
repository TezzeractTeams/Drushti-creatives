import type { FloatingImageConfig } from "@/types/floatingImage";
import type { Project } from "@/lib/content/types";

const FLOAT_PARAMS: Pick<
  FloatingImageConfig,
  "speed" | "phase" | "amplitude" | "priority"
>[] = [
  { speed: 8, phase: 0, amplitude: 18, priority: true },
  { speed: 11, phase: 1.2, amplitude: 12 },
  { speed: 9, phase: 2.4, amplitude: 16 },
  { speed: 7.5, phase: 0.8, amplitude: 20 },
  { speed: 10, phase: 1.8, amplitude: 14 },
  { speed: 9.5, phase: 3.0, amplitude: 13 },
  { speed: 8.5, phase: 2.0, amplitude: 15 },
  { speed: 10.5, phase: 0.5, amplitude: 17 },
  { speed: 9, phase: 3.6, amplitude: 15 },
  { speed: 10.5, phase: 0.2, amplitude: 12 },
  { speed: 8.2, phase: 2.2, amplitude: 11 },
  { speed: 9.7, phase: 1.1, amplitude: 14 },
];

const DECORATIVE_HERO_IMAGES = [
  { src: "/work/pxbee_2026-07-31_12-35-44.jpeg", alt: "Creative project", href: "/portfolio" },
  { src: "/work/pxbee_2026-07-31_12-41-27.jpeg", alt: "Branding project", href: "/portfolio" },
  { src: "/work/pxbee_2026-07-31_12-42-20.jpeg", alt: "Strategy project", href: "/portfolio" },
  { src: "/work/pxbee_2026-07-31_12-43-15.jpeg", alt: "Design project", href: "/portfolio" },
];

type HeroImageSource = { src: string; alt: string; href: string };

function buildHeroImageSources(projects: Project[]): HeroImageSource[] {
  const sources: HeroImageSource[] = [];

  for (const project of projects) {
    if (project.featuredImage) {
      sources.push({
        src: project.featuredImage,
        alt: project.name,
        href: project.href,
      });
    }
    for (const src of project.images) {
      sources.push({ src, alt: project.name, href: project.href });
    }
  }

  sources.push(...DECORATIVE_HERO_IMAGES);

  const seen = new Set<string>();
  return sources.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

export function buildFloatingImageConfigs(projects: Project[]): FloatingImageConfig[] {
  const sources = buildHeroImageSources(projects);
  const slotCount = FLOAT_PARAMS.length;

  return Array.from({ length: slotCount }, (_, i) => {
    const source = sources[i % Math.max(sources.length, 1)] ?? {
      src: "/work/advantis.webp",
      alt: "Portfolio",
      href: "/portfolio",
    };
    return {
      src: source.src,
      alt: source.alt,
      href: source.href,
      ...FLOAT_PARAMS[i],
    };
  });
}
