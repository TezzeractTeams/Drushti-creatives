import ServiceDetailView from "@/sections/ServiceDetailView";
import { getServiceWorkItems } from "@/data/serviceWork";
import { SERVICE_CATEGORY_TO_ID } from "@/lib/content/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

// Fixed 4-value set (see SERVICE_CATEGORY_TO_ID) — statically prerendering
// these matches /portfolio/[slug] and /blog/[slug] instead of falling back
// to on-demand SSR for every first visit to a service page.
export function generateStaticParams() {
  return Object.values(SERVICE_CATEGORY_TO_ID).map((id) => ({ id }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workItems = await getServiceWorkItems(id);

  return <ServiceDetailView id={id} workItems={workItems} />;
}
