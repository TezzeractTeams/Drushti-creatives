import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/sections/CaseStudy";
import { PROJECTS } from "@/data/projects";

function findProject(slug: string) {
  return PROJECTS.find((p) => p.href === `/work/${slug}`);
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.href.replace("/work/", "") }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findProject(params.slug);
  if (!project) return { title: "Case Study | Drushti Creatives" };
  return {
    title: `${project.name} | Drushti Creatives`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) notFound();

  return (
    <main>
      <CaseStudy project={project} />
    </main>
  );
}
