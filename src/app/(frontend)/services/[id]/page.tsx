import ServiceDetailView from "@/sections/ServiceDetailView";
import { getServiceWorkItems } from "@/data/serviceWork";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workItems = await getServiceWorkItems(id);

  return <ServiceDetailView id={id} workItems={workItems} />;
}
