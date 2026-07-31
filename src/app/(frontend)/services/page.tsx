import type { Metadata } from "next";
import ServicesHero from "@/sections/ServicesHero";

export const metadata: Metadata = {
  title: "Services | Drushti Creatives",
  description:
    "Clear solutions for your brand's growth — explore Drushti Creatives' services.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
    </main>
  );
}
