import { getProjectsForServiceId } from "@/lib/content/portfolio";
import { staticAdapter } from "@/lib/content/portfolio";
import type { WorkItem } from "@/sections/OurWork";

export type { WorkItem };

export async function getServiceWorkItems(serviceId: string): Promise<WorkItem[]> {
  const projects = await getProjectsForServiceId(serviceId);
  return staticAdapter.toWorkItems(projects);
}
