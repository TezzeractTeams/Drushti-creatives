import Hero from "@/components/Hero";
import AboutUs from "@/sections/AboutUs";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import CtaBanner from "@/sections/CtaBanner";
import FeaturedWork from "@/sections/FeaturedWork";
import OurClients from "@/sections/OurClients";
import ServicePillars from "@/sections/ServicePillars";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <OurClients />
      <AboutUs />
      <Services />
      <CtaBanner />
      <WorkProcess />
      <FeaturedWork />
      <Testimonials />
    </main>
  );
}
