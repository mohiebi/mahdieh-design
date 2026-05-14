# Cutie Main

Portfolio site for Mahdieh Baghoolizadeh. It presents selected brand, identity, packaging, UI, and art direction work, with a lightweight brief flow for starting a project.

## Tech Stack

- React 19 and TypeScript for the UI.
- TanStack Router and TanStack Start for file-based routing, document head metadata, loaders, and SSR.
- Vite 7 via `@lovable.dev/vite-tanstack-config`.
- Tailwind CSS 4 for styling.
- Radix UI and shadcn-style primitives for reusable UI components.
- Framer Motion for page and section animation.
- Supabase JS v2 for authentication and generated database typing.
- Cloudflare Workers configuration through `wrangler.jsonc`.

## App Structure

- `src/routes` contains TanStack file routes.
- `src/components` contains page sections and reusable UI.
- `src/data/projects.ts` is the portfolio data source used by the archive and project detail pages.
- `src/integrations/supabase` contains the Supabase client and generated database types.
- `src/assets` contains portfolio images, logo, portrait, and contact artwork.
- `supabase/migrations` contains database migrations for the project.

## Authentication

Authentication is handled with Supabase Auth using email and password.

- `src/integrations/supabase/client.ts` creates the Supabase browser client from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `src/hooks/use-session.ts` listens to `supabase.auth.onAuthStateChange()` and keeps the active user/session in React state.
- `src/routes/signup.tsx` calls `supabase.auth.signUp()` and stores `full_name` in auth metadata. If Supabase returns an active session, the user is redirected immediately. Otherwise, the app tells the user to confirm their email.
- `src/routes/login.tsx` calls `supabase.auth.signInWithPassword()`.
- `src/routes/reset-password.tsx` calls `supabase.auth.updateUser()` to set a new password after the Supabase recovery link redirects back to the app.
- `src/routes/brief.tsx` checks the current Supabase session and redirects signed-out visitors to `/signup?redirect=/brief`.

## Database and Supabase Migrations

The repository includes a Supabase migration that creates profile and project brief tables.

- `profiles` stores user profile rows linked to `auth.users`.
- `project_briefs` stores brief submissions linked to the user.
- Row Level Security is enabled.
- Policies allow users to read/update their own profile and manage their own briefs.
- A trigger creates a profile row when a new auth user is created.

The current frontend brief flow does not yet persist the brief answers to `project_briefs`; it keeps answers in local React state.

## Email Sending

The app currently uses two email paths:

- Supabase Auth sends account confirmation and password reset emails. The reset flow starts in `src/routes/login.tsx` with `supabase.auth.resetPasswordForEmail()` and redirects users to `/reset-password`.
- The contact section uses a direct `mailto:` link to `hello@nexastudio.design`.

There is no custom transactional email service, API route, Edge Function, or SMTP integration in the repository yet.

## Project Data and Portfolio Flow

Projects are defined in `src/data/projects.ts`. The archive at `/projects` renders the full project list. The root page renders a limited selected set and links to the full archive. Each project card links to `/projects/$slug`, where the detail page loads the matching project data and renders a reusable project template.

## Environment Variables

Required client-side variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

The build also emits Cloudflare/server artifacts and reads `.env` during the SSR build.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

## Current Notes

- Supabase Auth is implemented.
- Supabase database schema exists for profiles and project briefs.
- Brief submission persistence and custom notification emails are not implemented yet.
- Contact email currently uses `mailto:`.
