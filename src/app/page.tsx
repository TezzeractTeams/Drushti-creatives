import HeroLive from "@/components/Hero";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import FeaturedWork from "@/sections/FeaturedWork";
import ClientAboutCurtain from "@/sections/ClientAboutCurtain";
import ServicePillars from "@/sections/ServicePillars";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroLive />
      <ClientAboutCurtain />
      <Services />
      <WorkProcess />
      <FeaturedWork />
      <Testimonials />
    </main>
  );
}
