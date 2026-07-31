import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/sections/CaseStudy";
import {
  getPortfolioSlugs,
  getProjectBySlug,
} from "@/lib/content/portfolio";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Portfolio | Drushti Creatives" };
  return {
    title: `${project.name} | Drushti Creatives`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <CaseStudy project={project} />
    </main>
  );
}
