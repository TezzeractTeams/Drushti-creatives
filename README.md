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

## Deploy on Vercel

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying). For production, use a hosted database (Postgres) instead of the local SQLite file and set `DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SERVER_URL` in your hosting environment.
