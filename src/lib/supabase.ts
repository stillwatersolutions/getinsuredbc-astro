import { createClient } from '@supabase/supabase-js';

// Anon key is public by design (it ships in the browser bundle). Still kept in
// env so it is not committed to the repo. Set these in .env locally and in your
// host's environment variables (Cloudflare Pages / Netlify).
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(url && key);
const client = hasSupabase ? createClient(url as string, key as string) : null;

export interface SupabasePost {
  id: string;
  title: string;
  slug: string;
  question: string | null;
  content: string; // HTML
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  target_keyword: string | null;
  published_at: string;
  reading_time_minutes: number | null;
  internal_cta_text: string | null;
  internal_cta_url: string | null;
  quiz_cta_url: string | null;
  category: { name: string; slug: string } | null;
}

/**
 * Fetch all published blog posts from Supabase at build time.
 * Returns [] (and logs a warning) if env vars are missing or the call fails,
 * so the site always builds — it just renders the Markdown posts until the
 * key is present on the host.
 */
export async function getSupabasePosts(): Promise<SupabasePost[]> {
  if (!client) {
    console.warn('[supabase] PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY not set — skipping Supabase posts.');
    return [];
  }
  const { data, error } = await client
    .from('blog_posts')
    .select(
      'id,title,slug,question,content,excerpt,meta_title,meta_description,target_keyword,published_at,reading_time_minutes,internal_cta_text,internal_cta_url,quiz_cta_url, blog_categories(name,slug)',
    )
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    console.warn('[supabase] blog fetch failed:', error.message);
    return [];
  }

  return (data ?? []).map((p: any) => ({
    ...p,
    category: Array.isArray(p.blog_categories) ? p.blog_categories[0] ?? null : p.blog_categories ?? null,
  }));
}
