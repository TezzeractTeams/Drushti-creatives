import { buildFloatingImageConfigs } from "@/lib/content/floatingImages";
import { getStaticHeroFeaturedProjects } from "@/lib/content/adapters/static";

/** @deprecated Hero images are built server-side — static fallback for legacy imports. */
export const FLOATING_IMAGES = buildFloatingImageConfigs(getStaticHeroFeaturedProjects());
