# Ghofrane Soulmi — Portfolio

Personal developer portfolio (front office). Built with **Nuxt 4**, **Vue 3** (`<script setup>`),
strict **TypeScript** and **Tailwind CSS v4**. Fully prerendered (static), deployable on
Vercel with zero config.

- Single-page home: Hero, About, Skills, Experience, Featured projects, Education, Contact
- `/projects` with filters by category and technology (synced to the URL)
- `/projects/[slug]` case study pages
- Dark theme by default with a light toggle, scroll reveal animations (reduced-motion aware)
- SEO: meta tags, Open Graph image, JSON-LD, `sitemap.xml`, `robots.txt`

## Requirements

- Node.js 20+ (developed on Node 22)
- npm 10+

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload (placeholders visible)    |
| `npm run build`     | Static build (`nuxt generate`) into `.output/public` |
| `npm run preview`   | Serve the static build locally                       |
| `npm run lint`      | ESLint                                               |
| `npm run format`    | Prettier                                             |
| `npm run typecheck` | `vue-tsc` type check                                 |
| `npm run og:image`  | Re-render `public/og-image.png` (needs Chrome/Edge)  |

## Deploy on Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New… → Project → Import** the repository.
3. Keep the detected **Nuxt.js** preset and the defaults. Click **Deploy**.
4. Once you know the final domain, add an environment variable
   `NUXT_PUBLIC_SITE_URL=https://your-domain` (Project → Settings → Environment Variables)
   and redeploy. It is used for canonical URLs, Open Graph and the sitemap.

`npm run build` runs `nuxt generate`, so Vercel serves a fully static site.

## Project structure

```
app/
  components/
    layout/      SiteHeader, SiteFooter, ThemeToggle, SkipLink
    sections/    One component per home section
    project/     ProjectCard, ProjectCover (generated art), ProjectFilters
    ui/          AppButton, AppIcon, PageSection, SectionHeading, TagPill, PlaceholderText
  composables/   useProfile, useProjects, useProject, useExperience, useEducation, useSkills,
                 usePeriodFormat, usePageSeo
  repositories/  PortfolioRepository interface + local implementation
  pages/         index, projects/index, projects/[slug]
  error.vue      404 / error page
  plugins/       v-reveal directive
data/            Content: profile, projects, experience, education, skills
shared/types/    Content types (Project, Experience, Education, SkillGroup, Profile)
shared/utils/    placeholder helpers
i18n/locales/    All UI text (en.json)
public/          favicon, og-image.png, cv.pdf
scripts/         OG image source + render script
```

## Data layer

```
pages / components  →  composables  →  PortfolioRepository  →  data source
                       useProjects()     (app/repositories)      local: /data/*.ts
                                                                  later: Supabase
```

- Pages and components **never** import `/data` or repositories directly (enforced by ESLint).
- All composables are async (`useAsyncData`), so a remote backend is a drop-in change.
- **To add Supabase later:** create `app/repositories/supabase.ts` implementing
  `PortfolioRepository`, and return it from `usePortfolioRepository()` in
  `app/repositories/index.ts`. No page changes needed. If you keep static generation,
  the data is fetched at build time; trigger a Vercel redeploy (deploy hook) when content changes
  in the back office.

### Editing content

Edit the typed files in `/data`. TypeScript will flag missing or wrong fields.
Projects with `featured: true` appear on the home page. Leave `images: []` to use the generated
abstract cover.

### Placeholders

Missing content is written as `placeholder('…')`. In `npm run dev` it shows as a dashed amber
badge; in production builds it is hidden. Find them all with:

```bash
git grep -n "placeholder("
```

## Adding French later

1. Add `i18n/locales/fr.json` (same keys as `en.json`).
2. Add `{ code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' }` to `i18n.locales`
   in `nuxt.config.ts`, and choose a strategy (e.g. `prefix_except_default`).
3. Content in `/data` is English; translate it per locale (or store translations in the backend).

## CV

Place your CV at `public/cv.pdf`. The "Download CV" buttons already point to it.
