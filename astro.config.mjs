import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: set to your real production domain — used for canonical URLs + sitemap
  site: 'https://getinsuredbc.com',
  integrations: [
    tailwind({ applyBaseStyles: false }), // we import our own global.css with @tailwind directives
    mdx(),
    sitemap(),
    react(),
  ],
});
