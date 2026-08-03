"use client";

import Container from "@/components/Container";

// Static two-column heading (no scroll-scatter animation, no floating
// shapes) — this is the hero design as it was before Aug 2, restored as-is.
// heading/paragraph/selectedId/onSelectService stay in the prop signature
// purely for compatibility with existing callers (Portfolio's custom
// heading/paragraph, and ServicesPageBody's click-filter wiring into
// subservices.tsx) — this design has no selectable tags, so the latter two
// are accepted but unused.
type ServicesHeroProps = {
  heading?: string;
  paragraph?: string;
  selectedId?: string | null;
  onSelectService?: (id: string | null) => void;
};

export default function ServicesIntro({
  heading = "Clear solutions for your brand's growth.",
  paragraph = "We handle everything from strategy to execution — branding, digital marketing, web, video, and graphic design — so your brand stays consistent, professional, and always moving forward.",
}: ServicesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-blue pb-14 pt-16 md:pb-20 md:pt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h1 className="font-heading text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl">
            {heading}
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-white sm:text-base lg:justify-self-end lg:text-right">
            {paragraph}
          </p>
        </div>
      </Container>
    </section>
  );
}
