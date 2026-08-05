// @ts-check
import { defineConfig } from 'astro/config';

// Deploys to GitHub Pages under a subpath, same as the React original.
// `site` + `base` keep asset URLs and the sitemap correct on the subpath.
// Change these if the site moves to its own domain.
export default defineConfig({
  site: 'https://bwj95.github.io',
  base: '/traditions/',
  trailingSlash: 'ignore',
  // Images: build-time optimization via astro:assets. We drive exact output
  // widths per <Image> (widths=[...]) rather than the global responsive `layout`
  // — layout auto-generates 2x retina variants (2240px+ banners = ~1.4MB), which
  // fights the "keep it fast" goal. Explicit widths cap the largest encode.
  build: {
    // Inline small stylesheets to cut request count on a mostly-static site.
    inlineStylesheets: 'auto',
  },
});
