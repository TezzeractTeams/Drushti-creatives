import type { Client, Project, ServiceCategory, TeamMember } from "@/lib/content/types";
import { projectHref, SERVICE_CATEGORY_TO_ID } from "@/lib/content/types";
import { STATIC_PROJECTS } from "@/data/staticProjects";
import { STATIC_CLIENTS } from "@/data/staticClients";
import { STATIC_TEAM } from "@/data/staticTeam";

export function getStaticClients(): Client[] {
  return STATIC_CLIENTS;
}

export function getStaticTeamMembers(): TeamMember[] {
  return [...STATIC_TEAM].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getStaticProjects(): Project[] {
  return STATIC_PROJECTS;
}

export function getStaticProjectBySlug(slug: string): Project | undefined {
  return STATIC_PROJECTS.find((p) => p.slug === slug);
}

export function getStaticFeaturedHomepageProjects(): Project[] {
  return STATIC_PROJECTS.filter((p) => p.featuredOnHomepage).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export function getStaticHeroFeaturedProjects(): Project[] {
  return STATIC_PROJECTS.filter((p) => p.featuredOnHero).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export function getStaticProjectsForServiceId(serviceId: string): Project[] {
  return STATIC_PROJECTS.filter(
    (p) => SERVICE_CATEGORY_TO_ID[p.serviceCategory] === serviceId,
  ).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getStaticProjectsByCategory(category: ServiceCategory): Project[] {
  return STATIC_PROJECTS.filter((p) => p.serviceCategory === category).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export function toWorkItems(projects: Project[]) {
  return projects.map((p) => ({
    name: p.name,
    client: p.client,
    image: p.featuredImage,
    tags: p.tags,
    href: p.href,
  }));
}

export { projectHref };
