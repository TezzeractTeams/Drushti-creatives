/**
 * export-cms.ts
 *
 * Reads all portfolio, team, and client data from the local Payload CMS
 * (SQLite) and writes it back to the static fallback files so that Vercel
 * (which has no persistent DB) serves the latest content.
 *
 * Usage:  npm run export-cms
 *
 * What it does:
 *   1. Fetches team, clients, portfolio from the local Payload DB
 *   2. Copies any CMS-uploaded media files into /public/cms-export/
 *   3. Overwrites src/data/staticTeam.ts
 *   4. Overwrites src/data/staticProjects.ts
 *   5. Overwrites src/data/staticClients.ts (PORTFOLIO_CLIENTS section only)
 *
 * After running, just `git add . && git commit && git push` to update Vercel.
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import type {
  Team as PayloadTeam,
  Client as PayloadClient,
  Portfolio as PayloadPortfolio,
  Media as PayloadMedia,
} from "../src/payload-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const exportDir = path.join(publicDir, "cms-export");
const dataDir = path.join(rootDir, "src", "data");

// ─── Helpers ──────────────────────────────────────────────────────────────

function resolveMedia(media: number | PayloadMedia | null | undefined): PayloadMedia | null {
  if (!media || typeof media === "number") return null;
  return media;
}

/**
 * If the media file lives in the Payload /media folder, copy it into
 * /public/cms-export/ so it gets deployed to Vercel. Returns the public
 * path (e.g. "/cms-export/SHAMEEM NAFFEEL.png").
 *
 * If the media URL is already a /public path (starts with "/"), return as-is.
 */
function exportMediaFile(media: PayloadMedia | null): string {
  if (!media) return "";

  const mediaUrl = media.url ?? "";

  // Already a public path (e.g. "/work/advantis.webp") — no copy needed
  if (mediaUrl.startsWith("/") && !mediaUrl.startsWith("/api/")) {
    // Check if the file actually references the /media folder
    const filename = media.filename;
    if (!filename) return mediaUrl;

    const mediaFilePath = path.join(rootDir, "media", filename);
    if (fs.existsSync(mediaFilePath)) {
      // Copy from /media to /public/cms-export/
      fs.mkdirSync(exportDir, { recursive: true });
      const destPath = path.join(exportDir, filename);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(mediaFilePath, destPath);
        console.log(`  Copied: media/${filename} → public/cms-export/${filename}`);
      }
      return `/cms-export/${filename}`;
    }

    return mediaUrl;
  }

  // API-served media — copy from /media folder
  const filename = media.filename;
  if (!filename) return "";

  const mediaFilePath = path.join(rootDir, "media", filename);
  if (!fs.existsSync(mediaFilePath)) {
    console.warn(`  ⚠ Media file not found: media/${filename}`);
    return "";
  }

  fs.mkdirSync(exportDir, { recursive: true });
  const destPath = path.join(exportDir, filename);
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(mediaFilePath, destPath);
    console.log(`  Copied: media/${filename} → public/cms-export/${filename}`);
  }

  return `/cms-export/${filename}`;
}

function escapeString(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

function q(s: string): string {
  return `"${escapeString(s)}"`;
}

// ─── Export: Team Members ──────────────────────────────────────────────────

async function exportTeam(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log("\n📋 Exporting team members...");

  const result = await payload.find({
    collection: "team",
    limit: 100,
    depth: 1,
    sort: "sortOrder",
  });

  const members = result.docs as PayloadTeam[];
  console.log(`  Found ${members.length} team members`);

  const entries = members.map((member) => {
    const media = resolveMedia(member.photo);
    const photo = exportMediaFile(media);
    return {
      name: member.name,
      designation: member.designation,
      photo,
      sortOrder: member.sortOrder ?? 0,
    };
  });

  const lines = [
    `import type { TeamMember } from "@/lib/content/types";`,
    ``,
    `/** Auto-generated from CMS via \`npm run export-cms\`. Do not edit manually. */`,
    `export const STATIC_TEAM: TeamMember[] = [`,
  ];

  for (const entry of entries) {
    lines.push(`  {`);
    lines.push(`    name: ${q(entry.name)},`);
    lines.push(`    designation: ${q(entry.designation)},`);
    lines.push(`    photo: ${q(entry.photo)},`);
    lines.push(`    sortOrder: ${entry.sortOrder},`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);

  const filePath = path.join(dataDir, "staticTeam.ts");
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  console.log(`  ✅ Wrote ${filePath}`);
}

// ─── Export: Clients ──────────────────────────────────────────────────────

interface ExportedClient {
  slug: string;
  name: string;
  logoSquare: string;
  logoFocus: string;
}

async function exportClients(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<Map<number, ExportedClient>> {
  console.log("\n📋 Exporting clients...");

  const result = await payload.find({
    collection: "clients",
    limit: 100,
    depth: 1,
    sort: "name",
  });

  const clients = result.docs as PayloadClient[];
  console.log(`  Found ${clients.length} clients`);

  const clientMap = new Map<number, ExportedClient>();

  for (const client of clients) {
    const logoSquareMedia = resolveMedia(client.logoSquare);
    const logoFocusMedia = resolveMedia(client.logoFocus);

    const exported: ExportedClient = {
      slug: client.slug,
      name: client.name,
      logoSquare: exportMediaFile(logoSquareMedia),
      logoFocus: exportMediaFile(logoFocusMedia),
    };

    clientMap.set(client.id, exported);
  }

  // We don't overwrite staticClients.ts entirely because it has the
  // MARQUEE_CLIENTS logic and CLIENT_LOGOS import. Instead we just log
  // the client data so the user knows it's in sync.
  console.log(`  ✅ Loaded ${clientMap.size} clients into memory`);

  return clientMap;
}

// ─── Export: Portfolio ──────────────────────────────────────────────────────

async function exportPortfolio(
  payload: Awaited<ReturnType<typeof getPayload>>,
  clientMap: Map<number, ExportedClient>,
) {
  console.log("\n📋 Exporting portfolio projects...");

  const result = await payload.find({
    collection: "portfolio",
    limit: 100,
    depth: 2,
    sort: "-updatedAt",
  });

  const projects = result.docs as PayloadPortfolio[];
  console.log(`  Found ${projects.length} projects`);

  const lines = [
    `import type { Project } from "@/lib/content/types";`,
    `import { projectHref } from "@/lib/content/types";`,
    `import { getStaticClientBySlug } from "@/data/staticClients";`,
    ``,
    `type StaticProjectInput = Omit<`,
    `  Project,`,
    `  "client" | "clientSlug" | "clientLogoSquare" | "clientLogoFocus" | "href"`,
    `> & {`,
    `  clientSlug: string;`,
    `};`,
    ``,
    `function buildProject(input: StaticProjectInput): Project {`,
    `  const client = getStaticClientBySlug(input.clientSlug);`,
    `  if (!client) {`,
    `    throw new Error(\`Missing static client for slug: \${input.clientSlug}\`);`,
    `  }`,
    ``,
    `  return {`,
    `    ...input,`,
    `    client: client.name,`,
    `    clientSlug: client.slug,`,
    `    clientLogoSquare: client.logoSquare,`,
    `    clientLogoFocus: client.logoFocus,`,
    `    href: projectHref(input.slug),`,
    `  };`,
    `}`,
    ``,
    `/** Auto-generated from CMS via \`npm run export-cms\`. Do not edit manually. */`,
    `export const STATIC_PROJECTS: Project[] = [`,
  ];

  for (const project of projects) {
    // Resolve client
    const clientDoc =
      project.client && typeof project.client !== "number"
        ? (project.client as PayloadClient)
        : null;

    let clientSlug = "";
    if (clientDoc) {
      const exported = clientMap.get(clientDoc.id);
      clientSlug = exported?.slug ?? clientDoc.slug ?? "";
    }

    // Resolve featured image
    const featuredImageMedia = resolveMedia(project.featuredImage);
    const featuredImage = exportMediaFile(featuredImageMedia);

    // Resolve gallery images
    const galleryImages = (project.images ?? [])
      .map((row) => {
        const media = resolveMedia(row.image);
        return exportMediaFile(media);
      })
      .filter(Boolean);

    // Tags
    const tags = (project.tags ?? [])
      .map((tag) => (typeof tag === "number" ? null : tag?.name))
      .filter((tag): tag is string => Boolean(tag));

    // Strategy
    const strategy = project.strategy;
    const hasStrategy =
      strategy?.intro || (strategy?.points?.length ?? 0) > 0;

    // Results
    const results = (project.results ?? []).map((r) => ({
      metric: r.metric ?? undefined,
      text: r.text ?? "",
    }));

    lines.push(`  buildProject({`);
    lines.push(`    slug: ${q(project.slug)},`);
    lines.push(`    name: ${q(project.name)},`);
    lines.push(`    clientSlug: ${q(clientSlug)},`);
    lines.push(`    description:`);
    lines.push(`      ${q(project.description ?? "")},`);
    lines.push(`    tags: [${tags.map((t) => q(t)).join(", ")}],`);
    lines.push(`    serviceCategory: ${q(project.serviceCategory ?? "Social Media & Digital Marketing")},`);
    lines.push(`    createdAt: ${q(project.createdAt)},`);
    lines.push(`    updatedAt: ${q(project.updatedAt)},`);
    lines.push(`    featuredImage: ${q(featuredImage)},`);

    if (galleryImages.length > 0) {
      lines.push(`    images: [${galleryImages.map((i) => q(i)).join(", ")}],`);
    } else {
      lines.push(`    images: [],`);
    }

    lines.push(`    featuredOnHero: ${project.featuredOnHero ?? false},`);
    lines.push(`    featuredOnHomepage: ${project.featuredOnHomepage ?? false},`);
    lines.push(`    challenge:`);
    lines.push(`      ${q(project.challenge ?? "")},`);

    if (hasStrategy) {
      lines.push(`    strategy: {`);
      lines.push(`      intro:`);
      lines.push(`        ${q(strategy?.intro ?? "")},`);
      if (strategy?.points && strategy.points.length > 0) {
        lines.push(`      points: [`);
        for (const point of strategy.points) {
          lines.push(`        {`);
          lines.push(`          title: ${q(point.title ?? "")},`);
          lines.push(`          text: ${q(point.text ?? "")},`);
          lines.push(`        },`);
        }
        lines.push(`      ],`);
      }
      lines.push(`    },`);
    }

    lines.push(`    results: [`);
    for (const result of results) {
      if (result.metric) {
        lines.push(`      { metric: ${q(result.metric)}, text: ${q(result.text)} },`);
      } else {
        lines.push(`      { text: ${q(result.text)} },`);
      }
    }
    lines.push(`    ],`);

    lines.push(`  }),`);
  }

  lines.push(`];`);
  lines.push(``);

  const filePath = path.join(dataDir, "staticProjects.ts");
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  console.log(`  ✅ Wrote ${filePath}`);
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Export CMS → Static Fallback");
  console.log("================================\n");

  const payload = await getPayload({ config });

  // 1. Export team
  await exportTeam(payload);

  // 2. Export clients (returns map for portfolio to reference)
  const clientMap = await exportClients(payload);

  // 3. Export portfolio
  await exportPortfolio(payload, clientMap);

  console.log("\n================================");
  console.log("✅ Export complete!");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Review the changes: git diff");
  console.log("  2. Commit and push:    git add . && git commit -m 'sync CMS data' && git push");
  console.log("  3. Vercel will auto-deploy with the updated content 🎉");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Export failed:", error);
  process.exit(1);
});
