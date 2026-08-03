import type { Metadata } from "next";
import ServicesHero from "@/sections/ServicesHero";
import SubServicesBands from "@/sections/subservices";

export const metadata: Metadata = {
  title: "Services | Drushti Creatives",
  description:
    "Clear solutions for your brand's growth — explore Drushti Creatives' services.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <SubServicesBands />
    </main>
  );
}
