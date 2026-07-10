import HeroLive from "@/components/Hero";
import HeroLocal from "@/components/hero-local/HeroLocal";
import { ACTIVE_HERO } from "@/config/hero";

const Hero = ACTIVE_HERO === "local" ? HeroLocal : HeroLive;
import AboutUs from "@/sections/AboutUs";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import CtaBanner from "@/sections/CtaBanner";
import FeaturedWork from "@/sections/FeaturedWork";
import OurClients from "@/sections/OurClients";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Manifesto />
      <Services />
      <CtaBanner />
      <FeaturedWork />
      <OurClients />
    </main>
  );
}
