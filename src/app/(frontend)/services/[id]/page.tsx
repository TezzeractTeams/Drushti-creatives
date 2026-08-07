import { SERVICE_DETAIL_IDS } from "@/data/serviceDetails";
import ServiceDetailView from "@/sections/ServiceDetailView";
import { getServiceWorkItems } from "@/data/serviceWork";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

// One shared layout (ServiceDetailView) for every sub-service route —
// marketing, brand, web, graphic, video, etc.
export function generateStaticParams() {
  return SERVICE_DETAIL_IDS.map((id) => ({ id }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workItems = await getServiceWorkItems(id);

  return <ServiceDetailView id={id} workItems={workItems} />;
}
