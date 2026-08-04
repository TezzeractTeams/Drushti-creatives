import { CLIENT_LOGOS } from "@/data/clientLogos";
import type { Client } from "@/lib/content/types";

function parseClientName(squarePath: string): string {
  return squarePath.replace("/clients/Drushti Client - ", "").replace(".png", "");
}

function focusPath(squarePath: string): string {
  return squarePath.replace(".png", " - focused.png");
}

export function slugifyClientName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const MARQUEE_CLIENTS: Client[] = CLIENT_LOGOS.map((logoSquare) => {
  const name = parseClientName(logoSquare);
  return {
    slug: slugifyClientName(name),
    name,
    logoSquare,
    logoFocus: focusPath(logoSquare),
  };
});

/** Portfolio-specific client names that share logo files with a marquee entry. */
const PORTFOLIO_CLIENTS: Client[] = [
  {
    slug: "uber-sri-lanka",
    name: "Uber Sri Lanka",
    logoSquare: "/clients/Drushti Client - Uber.png",
    logoFocus: "/clients/Drushti Client - Uber - focused.png",
  },
  // No dedicated logo art on file for these four yet — using their first
  // company-profile design as a stand-in for both crops so the required
  // Client.logoSquare/logoFocus fields are satisfied. Swap in real logos
  // (square + focus crop) whenever they're available.
  {
    slug: "abi",
    name: "Abi",
    logoSquare: "/Drushti Company Profile Designs/Abi/Company Profile SM Desings-01.png",
    logoFocus: "/Drushti Company Profile Designs/Abi/Company Profile SM Desings-01.png",
  },
  {
    slug: "ibh",
    name: "IBH",
    logoSquare: "/Drushti Company Profile Designs/IBH/Company Profile SM Desings-05.png",
    logoFocus: "/Drushti Company Profile Designs/IBH/Company Profile SM Desings-05.png",
  },
  {
    slug: "om-ceylon",
    name: "OM Ceylon",
    logoSquare: "/Drushti Company Profile Designs/OM Ceylon/Company Profile SM Desings-09.png",
    logoFocus: "/Drushti Company Profile Designs/OM Ceylon/Company Profile SM Desings-09.png",
  },
  {
    slug: "speak",
    name: "Speak",
    logoSquare: "/Drushti Company Profile Designs/Speak/Company Profile SM Desings-17.png",
    logoFocus: "/Drushti Company Profile Designs/Speak/Company Profile SM Desings-17.png",
  },
];

export const STATIC_CLIENTS: Client[] = [
  ...MARQUEE_CLIENTS,
  ...PORTFOLIO_CLIENTS.filter(
    (extra) => !MARQUEE_CLIENTS.some((client) => client.slug === extra.slug),
  ),
];

/** Maps testimonial / legacy display names to client slugs. */
export const CLIENT_NAME_ALIASES: Record<string, string> = {
  "Uber Sri Lanka": "uber-sri-lanka",
  "Fairfirst Insurance Limited": "fairfirst-insurance",
  "Fairfirst Insurance": "fairfirst-insurance",
  "Skill Gate - Sri Lanka": "skill-gate",
  "Skill Gate": "skill-gate",
};

export function getStaticClientBySlug(slug: string): Client | undefined {
  return STATIC_CLIENTS.find((client) => client.slug === slug);
}

export function findStaticClientByName(name: string): Client | undefined {
  const aliasSlug = CLIENT_NAME_ALIASES[name];
  if (aliasSlug) {
    const aliased = getStaticClientBySlug(aliasSlug);
    if (aliased) return aliased;
  }

  const exact = STATIC_CLIENTS.find((client) => client.name === name);
  if (exact) return exact;

  const slug = slugifyClientName(name);
  return getStaticClientBySlug(slug);
}
