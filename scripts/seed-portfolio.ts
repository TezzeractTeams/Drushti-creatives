import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";

import { STATIC_CLIENTS } from "../src/data/staticClients";
import { STATIC_PROJECTS } from "../src/data/staticProjects";
import { STATIC_TEAM } from "../src/data/staticTeam";
import config from "../src/payload.config";
import { seedUsers } from "./seed-users";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  alt: string,
  publicPath: string,
) {
  const filePath = path.join(rootDir, "public", publicPath.replace(/^\//, ""));

  const existing = await payload.find({
    collection: "media",
    where: { alt: { equals: alt } },
    limit: 1,
  });

  if (existing.docs[0]) return existing.docs[0].id;

  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${filePath}`);
    return null;
  }

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });

  return created.id;
}

async function ensureClient(
  payload: Awaited<ReturnType<typeof getPayload>>,
  client: (typeof STATIC_CLIENTS)[number],
) {
  const existing = await payload.find({
    collection: "clients",
    where: { slug: { equals: client.slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    console.log(`Skip existing client: ${client.slug}`);
    return existing.docs[0].id;
  }

  const logoSquareId = await ensureMedia(payload, `${client.name} logo square`, client.logoSquare);
  // Same source file used for both crops (no dedicated focus crop yet) —
  // reuse the one upload instead of uploading it a second time. Uploading
  // the identical file twice under a different alt makes Payload's
  // filename-collision handling invent an unrelated numeric suffix (e.g.
  // "-01.png" re-uploaded becomes "-2.webp"), which can then collide with
  // and shadow a *real* file of that generated name uploaded later.
  const logoFocusId =
    client.logoFocus === client.logoSquare
      ? logoSquareId
      : await ensureMedia(payload, `${client.name} logo focus`, client.logoFocus);

  if (!logoSquareId || !logoFocusId) {
    console.warn(`Could not create logos for client ${client.slug}`);
    return null;
  }

  const created = await payload.create({
    collection: "clients",
    data: {
      name: client.name,
      slug: client.slug,
      logoSquare: logoSquareId,
      logoFocus: logoFocusId,
    },
  });

  console.log(`Created client: ${client.slug}`);
  return created.id;
}

async function ensureTeamMember(
  payload: Awaited<ReturnType<typeof getPayload>>,
  member: (typeof STATIC_TEAM)[number],
) {
  const existing = await payload.find({
    collection: "team",
    where: { name: { equals: member.name } },
    limit: 1,
  });

  if (existing.docs[0]) {
    console.log(`Skip existing team member: ${member.name}`);
    return;
  }

  const photoId = await ensureMedia(payload, `${member.name} photo`, member.photo);
  if (!photoId) {
    console.warn(`Could not create photo for ${member.name}`);
    return;
  }

  await payload.create({
    collection: "team",
    data: {
      name: member.name,
      designation: member.designation,
      photo: photoId,
      sortOrder: member.sortOrder,
    },
  });

  console.log(`Created team member: ${member.name}`);
}

async function seed() {
  const payload = await getPayload({ config });

  await seedUsers(payload);

  const clientIds = new Map<string, number>();
  for (const client of STATIC_CLIENTS) {
    const id = await ensureClient(payload, client);
    if (id) clientIds.set(client.slug, id);
  }

  for (const member of STATIC_TEAM) {
    await ensureTeamMember(payload, member);
  }

  for (const project of STATIC_PROJECTS) {
    const existing = await payload.find({
      collection: "portfolio",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`Skip existing portfolio: ${project.slug}`);
      continue;
    }

    const clientId = clientIds.get(project.clientSlug);
    if (!clientId) {
      console.warn(`Missing client for portfolio ${project.slug} (${project.clientSlug})`);
      continue;
    }

    const featuredImageId = await ensureMedia(
      payload,
      `${project.client} featured`,
      project.featuredImage,
    );

    if (!featuredImageId) {
      console.warn(`Could not create featured image for ${project.slug}`);
      continue;
    }

    // Sequential, not Promise.all: concurrent media creates against the
    // SQLite-backed dev DB race each other and intermittently fail with a
    // misleading "filename" validation error (single-writer contention).
    const galleryIds: number[] = [];
    for (const [index, imagePath] of project.images.entries()) {
      const id = await ensureMedia(payload, `${project.client} gallery ${index + 1}`, imagePath);
      if (id !== null) galleryIds.push(id);
    }

    await payload.create({
      collection: "portfolio",
      data: {
        name: project.name,
        slug: project.slug,
        client: clientId,
        description: project.description,
        serviceCategory: project.serviceCategory,
        tags: project.tags.map((tag) => ({ tag })),
        featuredImage: featuredImageId,
        images: galleryIds.map((image) => ({ image })),
        featuredOnHero: project.featuredOnHero,
        featuredOnHomepage: project.featuredOnHomepage,
        challenge: project.challenge,
        strategy: project.strategy
          ? {
              intro: project.strategy.intro,
              points: project.strategy.points?.map((point) => ({
                title: point.title,
                text: point.text,
              })),
            }
          : undefined,
        results: project.results.map((result) => ({
          metric: result.metric,
          text: result.text,
        })),
      },
    });

    console.log(`Created portfolio: ${project.slug}`);
  }

  console.log("Seed complete.");
  console.log(
    "If portfolio entries existed with the old text client field, delete payload.db and re-run seed.",
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
