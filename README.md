# Northstar Learning

A responsive online learning frontend built with Next.js App Router, TypeScript, Tailwind CSS, and the live E-Learning Platform API.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

```env
NEXT_PUBLIC_API_URL=https://e-learning.cheat.casa
NEXT_PUBLIC_SITE_URL=https://your-public-domain.com
```

The API base URL is centralized in `src/lib/api/config.ts`. Public course and curriculum data is fetched in Server Components. Enrollment is sent through a same-origin Next.js route handler, which forwards the documented request to the backend.

`NEXT_PUBLIC_SITE_URL` must be the deployed public URL. Telegram cannot fetch a thumbnail from `localhost`; it uses this value to resolve canonical URLs and generated Open Graph images.

## Component registries

The project is configured in `components.json` with both teacher-required registries:

- `@shadcn-space` from Shadcn Space;
- `@shadcnblocks` from Shadcnblocks.

The homepage uses the installed Shadcnblocks `hero1` block and the Shadcn Space `button-06` component. Their source is copied into `src/components`, so it remains editable and committed with the project.

## Social sharing

Every public page supplies route-specific Open Graph and Twitter metadata. Course and learning routes generate their title, description, and 1200×630 thumbnail from the real course record. Static routes have their own generated share artwork. The project also provides `robots.txt` and a dynamic `sitemap.xml`.

## API capabilities

The current OpenAPI document exposes:

- course listing and course details;
- enrollment;
- course materials upload;
- lesson listing and lesson details;
- course and lesson management endpoints.

It does **not** document authentication, users, profiles, categories, ratings, prices, instructors, pagination, or progress. The frontend does not invent those APIs. Login and registration routes explain the limitation, while optional enrollment shortcuts and lesson completion are stored in the current browser and clearly labeled as device-local.

## Project structure

```text
src/
  app/              App Router pages and enrollment proxy
  components/       Layout, course, dashboard, learning, and UI components
  hooks/            Browser learning-state subscriptions
  lib/api/          Central API client and course API module
  lib/               Course helpers and device-local learning storage
  types/             API response types
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
