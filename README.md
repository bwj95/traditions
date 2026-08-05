# Traditions — Astro edition

A world wellness guide: 9 traditions and 34 techniques, tagged by Mind / Body /
Breath / Diet. This is the **Astro rebuild** of the original React/Vite site — same
content, redesigned with editorial typography and authentic documentary photography,
served as near-zero-JS static HTML.

## Why Astro (vs. the React original)

Traditions is a content catalog — mostly static reading. Astro pre-renders every page
to static HTML and ships **no framework JS**; the only client script is a tiny vanilla
search island. Photography is optimized at **build time** (`astro:assets` → responsive
WebP with `srcset` + lazy loading), so authentic imagery costs almost nothing at load.

## Stack

- **Astro 5** — static output, file-based routing, `astro:assets` image pipeline.
- **Self-hosted fonts** (Fontshare, free commercial): Sentient (display serif) +
  General Sans (UI sans), in `public/fonts`.
- **Token-driven CSS** (`src/styles/global.css`) — every color reads a custom property,
  so the whole palette re-skins from one block. Warm-paper light + earthy dark.
- **No backend** — content lives in `src/data/techniques.json`; search runs client-side.

## Images

Convention-based (`src/data/images.ts`): drop a photo at
`src/assets/traditions/<id>/hero.jpg` and it lights up automatically on the tradition
banner + home card; missing slots fall back to the original SVG emblem. Source photos
are capped at 1600px (keep the repo light); the build emits 640/960/1280 WebP.

Photos are sourced license-clean via `scripts/source-images.mjs` (Openverse → CC0/CC BY/
CC BY-SA only, no NoDerivatives/NonCommercial) and credited on `/credits`. To refresh or
add: `node scripts/source-images.mjs [traditionId ...]`.

## Develop

```bash
npm install
npm run dev      # local dev
npm run build    # -> dist/
npm run preview  # serve the build
```

## Deploy

GitHub Actions → Pages (`.github/workflows/deploy.yml`), same as the React original.
`astro.config.mjs` sets `site`/`base` for a `/traditions/` subpath — **change `base` to
match the repo name** if this deploys to a differently-named repo (e.g. `/traditions-astro/`).
