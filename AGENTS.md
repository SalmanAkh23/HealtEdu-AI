# HealthEdu AI — Agent Guidelines

## Product Rules (non-negotiable)

- HealthEdu AI educates about health. It is NOT a diagnosis application.
- The AI assistant must never diagnose diseases or prescribe medication.
- Always display an educational disclaimer with AI responses.
- Never replace Gemini with another provider or a mock.

## Architecture

- Next.js 16 (App Router) + React 19 + TypeScript strict mode.
- Server pages in `src/app/**/page.tsx` fetch via `@/lib/supabase/server`, guard with `auth.getUser()`, and redirect to `/auth/login` when unauthenticated.
- Interactive logic lives in co-located client components (`*Client.tsx`) that use `@/lib/supabase/client`.
- Shared layout: `src/components/layout/AppShell.tsx` wraps pages with Sidebar + TopBar; theme comes from `src/components/providers/ThemeProvider`.
- Supabase clients: always import from `src/lib/supabase/{client,server}.ts`. They are already typed with `Database`. Never instantiate clients ad hoc.
- Auth flow: email/password sign-up/sign-in → `/auth/callback/route.ts` handles email redirects. Do not remove or bypass session handling.

## Database & Typing

- Source of truth for types: `src/types/database.ts`. Import row types (`Profile`, `Article`, `LearningModule`, ...) instead of redefining them.
- CRITICAL: every table in `database.ts` must include a `Relationships: []` field — supabase-js ≥2.9x resolves mutation payloads to `never` without it.
- Real column names (code has drifted before):
  - `profiles.total_xp` / `current_streak` / `longest_streak` (NOT `xp_points`)
  - habit logs live in `habit_progress` with columns `date` + `completed` (there is NO `user_habits` table)
  - `learning_modules.is_published` + `estimated_minutes` (NOT `is_active` / `duration_minutes` / `order_index`)
- Never modify the schema unless a task requires it; schema changes go in `supabase/migrations/*.sql` (numbered sequentially).
- Profiles is the primary user table (no `users` table). Handle nullable fields explicitly.

## UI/UX System

- Styling today: global CSS classes in `src/app/globals.css` (CSS variables like `--brand-400`, `--bg-default`) plus inline styles. Tailwind v4 is installed but barely used — prefer Tailwind for new UI.
- Color direction: light theme palette — primary `#7FD6D2`, secondary `#B6F1E8`, background `#F8FCFC`, surface `#FFFFFF`, text `#1F2937`, muted `#6B7280`, border `#E6F0EF`, success `#22C55E`, warning `#F59E0B`, danger `#EF4444`. Current code is dark-theme by default; migrate toward this palette when touching UI.
- Design language: premium SaaS (Apple/Linear/Stripe) — generous spacing, rounded corners, soft shadows, clean typography. Avoid Bootstrap/Material looks, heavy gradients, sharp borders.
- Every page needs loading, error, empty states and responsive behavior.

## Gemini Integration

- API route: `src/app/api/ai/route.ts`. Key: `GEMINI_API_KEY` in `.env.local`; client is instantiated inside the handler only after the key check.
- Conversation history: last 20 messages mapped to Gemini `contents` (`user`/`model` roles); system instruction enforces educational-only safety rules — preserve it.

## Commands

- Dev: `npm run dev` · Build+typecheck: `npm run build` · Lint: `npm run lint`
- No test suite exists; verification = `npm run build` then `npm run lint` (both must be clean).

## Known Issues / Pending

- `src/middleware.ts` uses the deprecated convention; Next 16 expects `proxy` (`npx @next/codemod@canary middleware-to-proxy .`).
- Several `<img>` elements should become `next/image`.

## Workflow Constraints

- Inspect before editing; make minimal changes; never rewrite working files wholesale.
- Preserve project structure — do not move/rename files without reason.
- After any change: run `npm run build` and `npm run lint`, fix errors iteratively until clean.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
