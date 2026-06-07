import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getSupabasePosts } from '../lib/supabase';
import { SITE } from '../consts';

export async function GET(context) {
  const md = (await getCollection('blog', ({ data }) => !data.draft)).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    link: `/blog/${post.id}/`,
  }));

  const sb = (await getSupabasePosts()).map((post) => ({
    title: post.title,
    description: post.meta_description || post.excerpt || '',
    pubDate: new Date(post.published_at),
    link: `/blog/${post.slug}/`,
  }));

  const items = [...md, ...sb].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.title} Blog`,
    description: SITE.description,
    site: context.site,
    items,
  });
}
