# Grandiose Homes Portal

Real estate investment portal for Grandiose Homes & Investment Ltd. React + Vite + TypeScript frontend with a headless WordPress backend for listings.

Built for Netnovatelabs: performance, SEO, and lead capture.

## Stack
- React 19, React Router 7, TypeScript, Vite 6
- Tailwind CSS 4, lucide-react, motion
- react-helmet-async for SEO meta
- Express + Netlify Functions (`server.ts`, `netlify/`) for API/backend
- Headless WordPress (`WP_BASE_URL`) via REST, axios + node-fetch
- better-sqlite3 for local caching

## Run locally
1. `npm install`
2. `cp .env.example .env` and fill in:
   - `WP_BASE_URL` â€” WordPress REST base, e.g. `https://dev-grandiose-homes.pantheonsite.io/wp-json/wp/v2/`
   - `WP_AUTH_USERNAME`, `WP_AUTH_APP_PASSWORD` â€” if the WP endpoint needs auth
3. `npm run dev`
4. `npm run build` / `npm run preview` for production build
5. `npm run lint` (`tsc --noEmit`)

## Deploy
- `netlify.toml` present â€” deploy as Netlify site with functions.
- No secrets committed. `.env*` is gitignored except `.env.example`.

## Repo
- Default branch: `main`
- Author: Abdulsobur Obe â€” https://www.linkedin.com/in/abdulsobur-obe-463a6729b/
