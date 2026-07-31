import { CLIENT_LOGOS } from "@/data/clientLogos";
import { CLIENT_NAME_ALIASES } from "@/data/staticClients";
import type { Client } from "@/lib/content/types";

export function findClientByName(clients: Client[], name: string): Client | undefined {
  const aliasSlug = CLIENT_NAME_ALIASES[name];
  if (aliasSlug) {
    const aliased = clients.find((client) => client.slug === aliasSlug);
    if (aliased) return aliased;
  }

  const exact = clients.find((client) => client.name === name);
  if (exact) return exact;

  const normalized = name.toLowerCase();
  return clients.find((client) => client.name.toLowerCase() === normalized);
}

export function resolveClientLogoSquare(clients: Client[], companyName: string): string | undefined {
  return findClientByName(clients, companyName)?.logoSquare;
}

/** Marquee logos in the original CLIENT_LOGOS order. */
export function getMarqueeClientLogos(clients: Client[]): string[] {
  return CLIENT_LOGOS.map((path) => {
    const client = clients.find((entry) => entry.logoSquare === path);
    return client?.logoSquare ?? path;
  });
}
