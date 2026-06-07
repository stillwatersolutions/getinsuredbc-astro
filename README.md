# GetInsuredBC — Astro site

Rebuild of getinsuredbc.com on Astro: static HTML on every page (readable by Google **and** AI engines), a Markdown blog, and SEO/AEO/GEO baked in.

## Run it locally

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # preview the built site
```

> Requires Node 18.20+ / 20.3+ / 22+.

## Environment variables

The blog's 240 existing posts are pulled from Supabase at build time. Set these
in `.env` locally and in your host's environment settings:

```
PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
PUBLIC_SUPABASE_ANON_KEY="your-anon-publishable-key"
```

If they're missing, the site still builds — it just renders the Markdown posts
and skips Supabase (you'll see a warning in the build log).

## What's included

- **Static rendering** — every route is real HTML, no JS needed to see content.
- **Pages** — Home, How It Works, FAQ, Blog, Contact, About.
- **Structured data** — `InsuranceAgency` (site-wide), `FAQPage` (FAQ), `Article` (blog posts).
- **SEO files** — auto `sitemap-index.xml`, `robots.txt`, `llms.txt` (for AI crawlers), Open Graph + Twitter meta, canonical URLs, RSS feed at `/rss.xml`.
- **Blog (dual source)** — your existing 240 posts build static pages straight from Supabase; new Claude-written posts live as Markdown/MDX in `src/content/blog/`. Both feed the blog index, post pages, and RSS automatically. Each post gets `Article` schema + per-post meta.

### Auto-rebuild when you publish in Supabase (optional)
Because posts are fetched at build time, publishing a new post in your admin won't appear until the next build. On Cloudflare Pages / Netlify, create a **build hook** (a URL that triggers a rebuild) and call it from a Supabase database webhook on insert/update of `blog_posts`. One-time setup; after that, publishing triggers a fresh static build.

## Add a blog post

Create `src/content/blog/your-slug.md`:

```markdown
---
title: "Your Title"
description: "One-sentence summary for search + social."
pubDate: 2026-06-10
tags: ["Life Insurance"]
---

Your content in Markdown.
```

## Where to edit common things

- Site name, contact info, nav: `src/consts.ts`
- Colors & fonts: `src/styles/global.css` (tokens ported from the live site)
- FAQ questions/answers: `src/pages/faq.astro`
- Homepage sections: `src/pages/index.astro`

## Done

- **Quiz** — full assessment as a React island (`src/components/Quiz.tsx`), wired to Supabase
  (`quiz_questions/answers/outcomes/rules`), writes leads to `quiz_submissions`, fires the
  `send-to-hubspot` + `send-quiz-pdf-email` edge functions, tracks Meta Pixel events, and shows
  the outcome + Calendly + PDF. Any button with `data-open-quiz` opens it.
- **Product pages** — `/term-life-insurance`, `/whole-life-insurance`, `/critical-illness-insurance`,
  `/disability-insurance` (data in `src/data/products.ts`, one template at `src/pages/[insurance].astro`),
  each with `Service` schema.
- **Legal** — `/privacy-policy`, `/terms-of-service`.
- **Meta Pixel** restored site-wide.

## Polish still worth doing

- **Wistia** hero video on the homepage (drop the embed into `src/pages/index.astro`).
- Replace the **placeholder phone** in `src/consts.ts`; add real `og-default.png` + `favicon.ico` to `public/`.
- Optional: tighten homepage hero/testimonials to match the old design pixel-for-pixel.

## Deploy

Works on Cloudflare Pages, Netlify, or Vercel out of the box.
Build command: `npm run build` · Output directory: `dist`
Then point `getinsuredbc.com` DNS at the host.
