import type { Metadata } from "next";
import ServicesHero from "@/sections/ServicesHero";
import ServicesShowcase from "@/sections/ServicesShowcase";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";

export const metadata: Metadata = {
  title: "Services | Drushti Creatives",
  description:
    "Clear solutions for your brand's growth — explore Drushti Creatives' services.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesShowcase />
      <WorkProcess />
      <Testimonials />
    </main>
  );
}
