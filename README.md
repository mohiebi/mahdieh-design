# Mahdieh Portfolio CMS

A Laravel + Inertia + React portfolio site for Mahdieh Baghoolizadeh, with a public showcase, project/service pages, a brief form, testimonials, and an authenticated admin area for managing content.

## Stack

- Laravel 13, PHP 8.3+
- Inertia.js 3
- React 19 + TypeScript
- Tailwind CSS 4
- Vite 8
- Framer Motion
- Pest / Laravel test runner

## Features

- Public homepage with hero, projects, services, testimonials, about, and contact sections
- Project archive with `popular` and `recent` scopes
- Individual project pages with media, services, and previous/next navigation
- Service pages for Brand Strategy, Visual Identity, Packaging Design, and Environmental Design
- English and Persian brief flow
- Admin dashboard for projects, brief questions, brief submissions, and recommendations
- Custom typography:
  - English display: Marcellus
  - English body: Inter
  - Persian display: Damoon
  - Persian body: Peyda

## Setup

Install PHP and JavaScript dependencies:

```bash
composer install
npm install
```

Configure `.env` for the local database and app URL, then generate the app key:

```bash
php artisan key:generate
```

Run migrations and seed the base content:

```bash
php artisan migrate --seed
```

The seeder creates an admin user from these environment variables, with fallbacks:

```env
ADMIN_NAME="Mahdieh Admin"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password"
```

## Development

Run Vite:

```bash
npm run dev
```

Run Laravel with your local PHP environment, or use the Composer helper when you want Laravel and Vite together:

```bash
composer run dev
```

Build production assets:

```bash
npm run build
```

## Quality Checks

```bash
npm run types:check
npm run lint:check
npm run format:check
composer test
```

Format or auto-fix frontend files:

```bash
npm run format
npm run lint
```

## Main Routes

- `/` - homepage
- `/projects` - project archive
- `/projects?scope=recent` - latest-added projects
- `/projects/{slug}` - project detail
- `/services/{service}` - service detail
- `/process` - process page
- `/brief` - authenticated brief form
- `/brief/fa` - authenticated Persian brief form
- `/admin` - admin dashboard

## Content Notes

- Project seed data lives in `database/seeders/PortfolioSeeder.php`.
- Project media is served from `public/project-media`.
- Recommendation/testimonial content is managed in the admin area.
- Persian font files live in `resources/fonts/fa` and are loaded from `resources/css/app.css`.
- Public React sections live in `resources/js/components/components`.
- Inertia pages live in `resources/js/pages`.

## Project Scopes

The project archive supports two public scopes:

- `popular`: curated order using `sort_order` and `id`
- `recent`: latest added order using `created_at` and `id`

The backend scopes are defined on `App\Models\Project`, and the public filtering UI is in `resources/js/components/components/Work.tsx`.
