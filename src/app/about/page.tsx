import type { Metadata } from "next";
import AboutHero from "@/sections/AboutHero";
import TeamSection from "@/sections/TeamSection";
import AboutDrushti from "@/sections/AboutDrushti";
import AboutTextReveal from "@/sections/AboutTextReveal";
import WhyWeExist from "@/sections/WhyWeExist";

export const metadata: Metadata = {
  title: "About | Drushti Creatives",
  description:
    "Born from the belief that a great business deserves a voice as strong as its vision — meet the team behind Drushti Creatives.",
};

export default function AboutPage() {
  return (
    <main>
      <TeamSection />
      <AboutTextReveal />
      <AboutDrushti />
      <WhyWeExist />
    </main>
  );
}
