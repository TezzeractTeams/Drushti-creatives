import type { Metadata } from "next";
import TeamSection from "@/sections/TeamSection";
import AboutTextReveal from "@/sections/AboutTextReveal";
import WhyWeExist from "@/sections/WhyWeExist";
import Faq from "@/sections/Faq";
import { getTeamMembers } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About | Drushti Creatives",
  description:
    "Born from the belief that a great business deserves a voice as strong as its vision — meet the team behind Drushti Creatives.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const members = await getTeamMembers();

  return (
    <main>
      <TeamSection members={members} />
      <AboutTextReveal />
      <WhyWeExist />
      <Faq />
    </main>
  );
}
