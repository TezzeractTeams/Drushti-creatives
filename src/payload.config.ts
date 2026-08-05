import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { r2Storage } from "@payloadcms/storage-r2";
import { buildConfig } from "payload";
import type { GetPlatformProxyOptions } from "wrangler";

import { Clients } from "./collections/Clients";
import { Media } from "./collections/Media";
import { Portfolio } from "./collections/Portfolio";
import { Team } from "./collections/Team";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined);
const isCLI = process.argv.some((value) => {
  const resolved = realpath(value);
  return resolved?.endsWith(path.join("payload", "bin.js"));
});
const isProduction = process.env.NODE_ENV === "production";

async function getCloudflareEnv(): Promise<Pick<CloudflareEnv, "D1" | "R2"> | null> {
  try {
    if (isProduction && !isCLI) {
      const { getCloudflareContext } = await import("@opennextjs/cloudflare");
      const ctx = await getCloudflareContext({ async: true });
      return ctx.env as Pick<CloudflareEnv, "D1" | "R2">;
    }

    const wrangler = await import(/* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`);
    const proxy = await wrangler.getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      remoteBindings: isProduction,
    } satisfies GetPlatformProxyOptions);

    return proxy.env as Pick<CloudflareEnv, "D1" | "R2">;
  } catch {
    return null;
  }
}

const cloudflareEnv = await getCloudflareEnv();
const useCloudflare = Boolean(cloudflareEnv?.D1);

let sharp: typeof import("sharp") | undefined;
if (!useCloudflare) {
  sharp = (await import("sharp")).default;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Clients, Team, Portfolio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: useCloudflare
    ? sqliteD1Adapter({ binding: cloudflareEnv!.D1! })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URL || "file:./payload.db",
        },
      }),
  ...(sharp ? { sharp } : {}),
  ...(useCloudflare && cloudflareEnv?.R2
    ? {
        storage: [
          r2Storage({
            bucket: cloudflareEnv.R2,
            collections: { media: true },
          }),
        ],
      }
    : {}),
});
