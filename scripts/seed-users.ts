import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Payload } from "payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const seedUsersPath = path.join(rootDir, "data/payload/seed-users.json");

type SeedUser = {
  email: string;
};

function loadSeedUsers(): SeedUser[] {
  if (!fs.existsSync(seedUsersPath)) {
    console.warn("No data/payload/seed-users.json found — skipping user seed.");
    return [];
  }

  const raw = fs.readFileSync(seedUsersPath, "utf8");
  const users = JSON.parse(raw) as SeedUser[];

  if (!Array.isArray(users) || users.length === 0) {
    console.warn("data/payload/seed-users.json is empty — skipping user seed.");
    return [];
  }

  return users;
}

export async function seedUsers(payload: Payload): Promise<void> {
  const password = process.env.PAYLOAD_SEED_PASSWORD;

  if (!password) {
    console.warn(
      "PAYLOAD_SEED_PASSWORD is not set — skipping user seed. Add it to .env (see .env.example).",
    );
    return;
  }

  for (const user of loadSeedUsers()) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: user.email } },
      limit: 1,
    });

    if (existing.docs[0]) {
      console.log(`Skip existing user: ${user.email}`);
      continue;
    }

    await payload.create({
      collection: "users",
      data: {
        email: user.email,
        password,
      },
    });

    console.log(`Created user: ${user.email}`);
  }
}
