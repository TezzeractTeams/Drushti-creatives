"use client";

import { useState } from "react";
import ServicesHero from "@/sections/ServicesHero";
import PortfolioGrid from "@/sections/PortfolioGrid";
import type { Project } from "@/lib/content/types";

type PortfolioPageClientProps = {
  projects: Project[];
  heading: string;
  paragraph: string;
};

export default function PortfolioPageClient({
  projects,
  heading,
  paragraph,
}: PortfolioPageClientProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <ServicesHero
      heading={heading}
      paragraph={paragraph}
      selectedId={selectedServiceId}
      onSelectService={setSelectedServiceId}
    >
      <PortfolioGrid projects={projects} serviceFilterId={selectedServiceId} />
    </ServicesHero>
  );
}
