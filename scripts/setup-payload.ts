import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env");
const envExamplePath = path.join(rootDir, ".env.example");

function ensureEnvFile() {
  if (fs.existsSync(envPath)) {
    console.log(".env already exists — skipping copy from .env.example.");
    return;
  }

  if (!fs.existsSync(envExamplePath)) {
    console.error("Missing .env.example — cannot create .env automatically.");
    process.exit(1);
  }

  fs.copyFileSync(envExamplePath, envPath);
  console.log("Created .env from .env.example.");
  console.log("Review PAYLOAD_SEED_PASSWORD in .env before sharing credentials.");
}

function runSeed() {
  const result = spawnSync(
    "npx",
    ["tsx", "scripts/seed-portfolio.ts"],
    {
      cwd: rootDir,
      stdio: "inherit",
      env: process.env,
      shell: true,
    },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

ensureEnvFile();
runSeed();
