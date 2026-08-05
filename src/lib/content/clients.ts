import type { Client } from "@/lib/content/types";
import * as payloadAdapter from "@/lib/content/adapters/payload";
import * as staticAdapter from "@/lib/content/adapters/static";
import { shouldUsePayloadProvider } from "@/lib/content/provider";

export const REVALIDATE_SECONDS = 60;

async function withFallback(
  fetcher: () => Promise<Client[]>,
  fallback: () => Client[],
): Promise<Client[]> {
  if (!shouldUsePayloadProvider()) return fallback();
  try {
    const clients = await fetcher();
    return clients.length > 0 ? clients : fallback();
  } catch (error) {
    console.error("[content] Payload clients fetch failed, using static fallback:", error);
    return fallback();
  }
}

export async function getClients(): Promise<Client[]> {
  return withFallback(payloadAdapter.fetchClients, staticAdapter.getStaticClients);
}
