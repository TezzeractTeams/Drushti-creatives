export const SERVICE_CATEGORIES = [
  "Social Media & Digital Marketing",
  "Logo Design & Graphic Design",
  "Content Development",
  "Website & UI Designing",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const SERVICE_CATEGORY_TO_ID: Record<ServiceCategory, string> = {
  "Social Media & Digital Marketing": "marketing",
  "Logo Design & Graphic Design": "brand",
  "Content Development": "graphic",
  "Website & UI Designing": "web",
};

export interface ProjectResult {
  metric?: string;
  text: string;
}

export interface StrategyPoint {
  title: string;
  text: string;
}

export interface Client {
  slug: string;
  name: string;
  logoSquare: string;
  logoFocus: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  photo: string;
  sortOrder: number;
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  clientSlug: string;
  clientLogoSquare: string;
  clientLogoFocus: string;
  description: string;
  tags: string[];
  serviceCategory: ServiceCategory;
  createdAt: string;
  updatedAt: string;
  featuredImage: string;
  images: string[];
  featuredOnHero: boolean;
  featuredOnHomepage: boolean;
  challenge: string;
  strategy?: {
    intro: string;
    points?: StrategyPoint[];
  };
  results: ProjectResult[];
  href: string;
}

export function projectHref(slug: string): string {
  return `/portfolio/${slug}`;
}
