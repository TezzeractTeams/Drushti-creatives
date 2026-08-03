import { cache } from "react";
import type { Project, ServiceCategory } from "@/lib/content/types";
import * as payloadAdapter from "@/lib/content/adapters/payload";
import * as staticAdapter from "@/lib/content/adapters/static";

export const REVALIDATE_SECONDS = 60;

function shouldUsePayloadProvider(): boolean {
  return process.env.CONTENT_PROVIDER !== "static" && Boolean(process.env.DATABASE_URL);
}

async function withFallback(
  fetcher: () => Promise<Project[]>,
  fallback: () => Project[],
): Promise<Project[]> {
  if (!shouldUsePayloadProvider()) return fallback();
  try {
    const projects = await fetcher();
    return projects.length > 0 ? projects : fallback();
  } catch (error) {
    console.error("[content] Payload fetch failed, using static fallback:", error);
    return fallback();
  }
}

async function withFallbackOne(
  fetcher: () => Promise<Project | undefined>,
  fallback: () => Project | undefined,
): Promise<Project | undefined> {
  if (!shouldUsePayloadProvider()) return fallback();
  try {
    const project = await fetcher();
    return project ?? fallback();
  } catch (error) {
    console.error("[content] Payload fetch failed, using static fallback:", error);
    return fallback();
  }
}

export async function getProjects(): Promise<Project[]> {
  return withFallback(payloadAdapter.fetchProjects, staticAdapter.getStaticProjects);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return withFallbackOne(
    () => payloadAdapter.fetchProjectBySlug(slug),
    () => staticAdapter.getStaticProjectBySlug(slug),
  );
}

// React cache() dedupes this within a single request/render — if both
// getFeaturedHomepageProjects and getHeroFeaturedProjects are called (as the
// homepage does, in parallel), the underlying payload query runs once, not
// twice, even though each still resolves its own independent static fallback.
const fetchCombinedFeatured = cache(async (): Promise<Project[] | null> => {
  try {
    return await payloadAdapter.fetchHomepageAndHeroFeaturedProjects();
  } catch (error) {
    console.error("[content] Payload fetch failed, using static fallback:", error);
    return null;
  }
});

export async function getFeaturedHomepageProjects(): Promise<Project[]> {
  if (!shouldUsePayloadProvider()) return staticAdapter.getStaticFeaturedHomepageProjects();
  const combined = await fetchCombinedFeatured();
  const homepageProjects = combined?.filter((p) => p.featuredOnHomepage) ?? [];
  return homepageProjects.length > 0
    ? homepageProjects
    : staticAdapter.getStaticFeaturedHomepageProjects();
}

export async function getHeroFeaturedProjects(): Promise<Project[]> {
  if (!shouldUsePayloadProvider()) return staticAdapter.getStaticHeroFeaturedProjects();
  const combined = await fetchCombinedFeatured();
  const heroProjects = combined?.filter((p) => p.featuredOnHero) ?? [];
  return heroProjects.length > 0 ? heroProjects : staticAdapter.getStaticHeroFeaturedProjects();
}

export async function getProjectsForServiceId(serviceId: string): Promise<Project[]> {
  if (!shouldUsePayloadProvider()) return staticAdapter.getStaticProjectsForServiceId(serviceId);
  try {
    const projects = await payloadAdapter.fetchProjectsForServiceId(serviceId);
    return projects.length > 0
      ? projects
      : staticAdapter.getStaticProjectsForServiceId(serviceId);
  } catch (error) {
    console.error("[content] Payload service fetch failed:", error);
    return staticAdapter.getStaticProjectsForServiceId(serviceId);
  }
}

export async function getProjectsByCategory(category: ServiceCategory): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.serviceCategory === category);
}

export async function getPortfolioSlugs(): Promise<string[]> {
  if (!shouldUsePayloadProvider()) {
    return staticAdapter.getStaticProjects().map((p) => p.slug);
  }
  try {
    const slugs = await payloadAdapter.fetchPortfolioSlugs();
    return slugs.length > 0 ? slugs : staticAdapter.getStaticProjects().map((p) => p.slug);
  } catch {
    return staticAdapter.getStaticProjects().map((p) => p.slug);
  }
}

export { staticAdapter, payloadAdapter };
