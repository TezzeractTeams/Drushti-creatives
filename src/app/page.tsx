import HeroLive from "@/components/Hero";
import Services from "@/sections/Services";
import FeaturedWork from "@/sections/FeaturedWork";
import ClientAboutCurtain from "@/sections/ClientAboutCurtain";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";
import Faq from "@/sections/Faq";

export default function Home() {
  return (
    <main>
      <HeroLive />
      <ClientAboutCurtain />
      <Services />
      <WorkProcess />
      <FeaturedWork />
      <Testimonials />
      <Faq />
    </main>
  );
}
