import Hero from "@/sections/Hero";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import CtaBanner from "@/sections/CtaBanner";
import FeaturedWork from "@/sections/FeaturedWork";
import OurClients from "@/sections/OurClients";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Services />
      <CtaBanner />
      <FeaturedWork />
      <OurClients />
    </main>
  );
}
