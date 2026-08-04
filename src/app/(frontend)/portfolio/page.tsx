import type { Metadata } from "next";
import ServicesHero from "@/sections/ServicesHero";
import PortfolioGrid from "@/sections/PortfolioGrid";
import { getProjects } from "@/lib/content/portfolio";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio | Drushti Creatives",
  description:
    "Explore real projects we've delivered for our clients — from brand identity and social media to digital campaigns.",
};

// Only the original 5 case studies are shown on this page — the later
// company-profile and social-media batches were seeded for other pages
// (e.g. service detail "Our Work" sections) but shouldn't clutter this grid.
const ORIGINAL_PORTFOLIO_SLUGS = [
  "advantis",
  "norlanka",
  "uber-sri-lanka",
  "uber-eats",
  "wild-drift",
];

export default async function PortfolioPage() {
  const allProjects = await getProjects();
  const projects = ORIGINAL_PORTFOLIO_SLUGS.map((slug) =>
    allProjects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main>
      <ServicesHero
        heading="Portfolio"
        paragraph="Creativity isn't an end in itself for us — it's essential to how we work. We love what we do, and that turns every client project into something we truly care about."
      />
      <PortfolioGrid projects={projects} />
    </main>
  );
}
