import type { Metadata } from "next";
import PortfolioPageClient from "@/sections/PortfolioPageClient";
import { getProjects } from "@/lib/content/portfolio";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio | Drushti Creatives",
  description:
    "Explore real projects we've delivered for our clients — from brand identity and social media to digital campaigns.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="w-full overflow-x-clip">
      <PortfolioPageClient
        projects={projects}
        heading="Portfolio"
        paragraph="Creativity isn't an end in itself for us — it's essential to how we work. We love what we do, and that turns every client project into something we truly care about."
      />
    </main>
  );
}
