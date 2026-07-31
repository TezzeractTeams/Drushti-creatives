import type { TeamMember } from "@/lib/content/types";
import * as payloadAdapter from "@/lib/content/adapters/payload";
import * as staticAdapter from "@/lib/content/adapters/static";

export const REVALIDATE_SECONDS = 60;

function shouldUsePayloadProvider(): boolean {
  return process.env.CONTENT_PROVIDER !== "static" && Boolean(process.env.DATABASE_URL);
}

async function withFallback(
  fetcher: () => Promise<TeamMember[]>,
  fallback: () => TeamMember[],
): Promise<TeamMember[]> {
  if (!shouldUsePayloadProvider()) return fallback();
  try {
    const members = await fetcher();
    return members.length > 0 ? members : fallback();
  } catch (error) {
    console.error("[content] Payload team fetch failed, using static fallback:", error);
    return fallback();
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return withFallback(payloadAdapter.fetchTeamMembers, staticAdapter.getStaticTeamMembers);
}
