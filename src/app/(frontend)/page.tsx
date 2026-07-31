import HeroLive from "@/components/Hero";
import Services from "@/sections/Services";
import FeaturedWork from "@/sections/FeaturedWork";
import ClientAboutCurtain from "@/sections/ClientAboutCurtain";
import WorkProcess from "@/sections/WorkProcess";
import Testimonials from "@/sections/Testimonials";
import {
  getFeaturedHomepageProjects,
  getHeroFeaturedProjects,
} from "@/lib/content/portfolio";
import { getClients } from "@/lib/content/clients";
import { getMarqueeClientLogos } from "@/lib/content/client-utils";
import { buildFloatingImageConfigs } from "@/lib/content/floatingImages";

export const revalidate = 60;

export default async function Home() {
  const [featuredProjects, heroProjects, clients] = await Promise.all([
    getFeaturedHomepageProjects(),
    getHeroFeaturedProjects(),
    getClients(),
  ]);
  const floatingImages = buildFloatingImageConfigs(heroProjects);
  const clientLogos = getMarqueeClientLogos(clients);

  return (
    <main>
      <HeroLive floatingImages={floatingImages} />
      <ClientAboutCurtain clientLogos={clientLogos} />
      <Services />
      <WorkProcess />
      <FeaturedWork projects={featuredProjects} />
      <Testimonials clients={clients} />
    </main>
  );
}
