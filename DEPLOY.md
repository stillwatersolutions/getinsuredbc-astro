# Deploy a preview (Cloudflare Pages)

Goal: get the new Astro site (with all 240 posts rendering as static HTML) live on a free
`*.pages.dev` preview URL — **without touching your live getinsuredbc.com yet**.

## 1. Open the project in Terminal

```bash
cd ~/Documents/Claude/Projects/leads/getinsuredbc-astro
```

## 2. Clear stale locks and commit everything (one time)

The build environment left a few `.lock` files it couldn't remove, plus newer files
(quiz, product pages, legal pages) that aren't committed yet. On your Mac:

```bash
rm -f .git/HEAD.lock .git/index.lock .git/objects/maintenance.lock
rm -rf dist .astro   # leftover build folders (gitignored anyway)
git add -A
git commit -m "Add quiz island, product pages, legal pages, Supabase blog layer"
```

Quick sanity check before pushing — install and build locally:

```bash
npm install
cp .env.example .env   # fill in your Supabase URL + anon key
npm run build          # should build ~14 pages + your 240 blog posts
```

## 3. Create an empty GitHub repo

On github.com, create a new repo named **getinsuredbc-astro** (no README, no .gitignore —
keep it empty). Use the `stillwatersolutions` account.

## 4. Push

```bash
git branch -M main
git remote add origin https://github.com/stillwatersolutions/getinsuredbc-astro.git
git push -u origin main
```

## 5. Connect Cloudflare Pages

1. Go to Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `getinsuredbc-astro` repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add **Environment variables** (these make the 240 posts build):
   - `PUBLIC_SUPABASE_URL` = your Supabase URL
   - `PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/publishable key

   Find both in Supabase → your project → **Settings → API** (Project URL + the
   `anon` `public` key).
5. **Save and Deploy.**

## 6. Check the preview

Cloudflare gives you a URL like `https://getinsuredbc-astro.pages.dev`. Open it and confirm:

- The homepage, FAQ, How It Works, Contact, Blog all load
- `/blog` lists your posts; open a post — it should show full content
- **Proof of the AEO/GEO fix:** view-source on any blog post (right-click → View Page Source).
  You should see the real article text and `<script type="application/ld+json">` in the raw
  HTML — no JavaScript required. That's what AI engines and crawlers now see.

## Not yet

- **Don't** point getinsuredbc.com at this until the quiz + remaining pages are ported and
  you've reviewed the preview. The `.pages.dev` URL is safe to share/test in the meantime.

## Later: auto-rebuild on publish

In Cloudflare Pages → Settings → **Builds & deployments** → create a **Deploy hook** (a URL).
Then in Supabase → Database → **Webhooks**, fire that URL on insert/update of `blog_posts`.
After that, publishing a post triggers a fresh static build automatically.
