import type { Metadata } from "next";
import PortfolioGrid from "@/sections/PortfolioGrid";
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
    <main>
      <PortfolioGrid projects={projects} />
    </main>
  );
}
