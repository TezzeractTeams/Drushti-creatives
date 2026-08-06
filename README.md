This is a [Next.js](https://nextjs.org) project with [Payload CMS](https://payloadcms.com) for portfolio, clients, and team content.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Payload (database + admin users + content)

Payload stores CMS data in a local SQLite file (`payload.db`) and uploaded media in `media/`. Both are gitignored, so each developer needs to initialize them locally.

Run the setup script after cloning:

```bash
npm run setup
```

This will:

1. Copy `.env.example` → `.env` if you don't have one yet
2. Seed admin users from `data/payload/seed-users.json`
3. Seed portfolio, clients, and team content from `src/data/static*.ts`

Then start the dev server:

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Payload admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Log in with an email from `data/payload/seed-users.json` and the password from `PAYLOAD_SEED_PASSWORD` in your `.env`.

### Adding or updating admin users for the team

1. Add the email to `data/payload/seed-users.json`
2. Commit and push that file
3. Teammates run `npm run seed` (or `npm run setup` on first clone)

Passwords are **not** stored in git. Everyone uses the shared dev password from `PAYLOAD_SEED_PASSWORD` in `.env` (set your own locally; `.env.example` shows the default).

### Updating CMS content for everyone

Portfolio, client, and team seed data lives in:

- `src/data/staticProjects.ts`
- `src/data/staticClients.ts`
- `src/data/staticTeam.ts`

After editing those files, run `npm run seed` and commit the changes. Teammates pull and run `npm run seed` to sync their local database.

If you edit content directly in the Payload admin UI, those changes stay in your local `payload.db` only. To share them, update the corresponding `src/data/static*.ts` files (or ask to add an export workflow).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run setup` | First-time Payload setup (`.env` + seed) |
| `npm run seed` | Re-seed users and CMS content |
| `npm run generate:types` | Regenerate Payload TypeScript types |
| `npm run preview` | Build and preview in Cloudflare Workers runtime |
| `npm run deploy` | Migrate D1 + deploy to Cloudflare |
| `npm run migrate:create` | Create a new Payload D1 migration |

## Deploy on Cloudflare

This app deploys to **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare) with Payload backed by **D1** (database) and **R2** (media uploads).

> **Note:** Payload on Workers typically requires a **Workers Paid plan** due to bundle size limits.

### One-time Cloudflare setup

```bash
# 1. Authenticate
npx wrangler login

# 2. Create D1 database
npx wrangler d1 create drushti-creatives
# Copy the database_id into wrangler.jsonc

# 3. Create R2 bucket for media
npx wrangler r2 bucket create drushti-creatives-media

# 4. Set production secret
npx wrangler secret put PAYLOAD_SECRET

# 5. Update wrangler.jsonc vars
#    - NEXT_PUBLIC_SERVER_URL → your production URL
#    - database_id → from step 2
```

### Build & deploy commands

**Local preview** (Workers runtime, closest to production):

```bash
npm run preview
```

**Production build only:**

```bash
npx opennextjs-cloudflare build
```

**Full deploy** (migrate remote D1 schema + deploy app):

```bash
npm run deploy
```

Manual equivalent:

```bash
cross-env NODE_ENV=production PAYLOAD_SECRET=ignore npx payload migrate
npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
```

### First deploy: seed production content

After the first deploy, D1 is empty. Run migrations via `npm run deploy`, then seed admin users and content into remote D1 using Wrangler remote bindings (e.g. run `npm run seed` with Cloudflare context via `wrangler dev` or adapt the seed scripts for remote D1).

### Git-connected Cloudflare (Workers Builds)

In Cloudflare dashboard → Workers & Pages → Connect Git:

- **Build command:** `npm run deploy` (static frontend) or `npm run deploy:full` (Payload + D1)
- **Node version:** 20+
- For Payload CMS later: set `PAYLOAD_SECRET`, create D1/R2, add bindings, and use `deploy:full`

### Environment variables

| Variable | Local | Cloudflare |
| --- | --- | --- |
| `PAYLOAD_SECRET` | `.env` | Wrangler secret |
| `DATABASE_URL` | `file:./payload.db` | Not used (D1 binding) |
| `CONTENT_PROVIDER` | `payload` | `payload` (in `wrangler.jsonc` vars) |
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000` | Production URL (in `wrangler.jsonc` vars) |
