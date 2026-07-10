import Hero from "@/components/Hero";
import AboutUs from "@/sections/AboutUs";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import FeaturedWork from "@/sections/FeaturedWork";
import OurClients from "@/sections/OurClients";
import ServicePillars from "@/sections/ServicePillars";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Curtain reveal: OurClients pins (sticky) while AboutUs — with its
          curved green shapes and no background — slides up covering it. */}
      <div className="relative">
        <OurClients />
        <AboutUs />
      </div>
      <Services />
      <WorkProcess />
      <FeaturedWork />
      <Testimonials />
    </main>
  );
}
