import type { Metadata } from "next";
import ServicesPageBody from "@/sections/ServicesPageBody";

export const metadata: Metadata = {
  title: "Services | Drushti Creatives",
  description:
    "Clear solutions for your brand's growth — explore Drushti Creatives' services.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesPageBody />
    </main>
  );
}
