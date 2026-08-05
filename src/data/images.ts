import type { ImageMetadata } from 'astro';

/*
 * Convention-based image resolver.
 *
 * Drop a photo into src/assets and it lights up automatically — no wiring:
 *   src/assets/traditions/<traditionId>/hero.jpg   -> big banner on the tradition page
 *   src/assets/traditions/<traditionId>/tile.jpg   -> card thumbnail (falls back to hero)
 *   src/assets/techniques/<techniqueId>.jpg        -> illustration on a technique page
 *
 * Any web format works (jpg/jpeg/png/webp/avif). astro:assets re-encodes to
 * modern formats at responsive widths at build time, so source quality is what
 * matters — the pipeline handles the payload. When a slot is empty, callers get
 * null and render the SVG emblem instead.
 */

type Glob = Record<string, { default: ImageMetadata }>;

const traditionGlob = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/traditions/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
) as Glob;

const techniqueGlob = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/techniques/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
) as Glob;

/** Find the first glob entry whose path contains `needle` (e.g. "/shaolin/hero."). */
function find(glob: Glob, needle: string): ImageMetadata | null {
  const key = Object.keys(glob).find((k) => k.includes(needle));
  return key ? glob[key].default : null;
}

/** Big banner image for a tradition, or null. */
export function traditionHero(id: string): ImageMetadata | null {
  return find(traditionGlob, `/traditions/${id}/hero.`);
}

/** Card thumbnail for a tradition — its own tile, else the hero, else null. */
export function traditionTile(id: string): ImageMetadata | null {
  return find(traditionGlob, `/traditions/${id}/tile.`) ?? traditionHero(id);
}

/** Optional illustration for a single technique, or null. */
export function techniqueImage(id: string): ImageMetadata | null {
  return find(techniqueGlob, `/techniques/${id}.`);
}

export const hasTraditionImage = (id: string) => traditionTile(id) !== null;
