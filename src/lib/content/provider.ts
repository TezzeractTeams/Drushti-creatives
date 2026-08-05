export function shouldUsePayloadProvider(): boolean {
  const provider = process.env.CONTENT_PROVIDER as string | undefined;
  if (provider === "static") return false;
  // Local SQLite uses DATABASE_URL; Cloudflare D1 uses CONTENT_PROVIDER=payload without DATABASE_URL.
  return provider === "payload" || Boolean(process.env.DATABASE_URL);
}
