# Traditions — A World Wellness Guide

A static React site cataloging time-tested wellness practices from 9 traditions
around the world, tagged by **Mind / Body / Breath / Diet**. Built from the
`content-guide.md` brief and `techniques.json` content in this folder.

## Stack
- Vite 8 + React 19
- React Router 7 (`HashRouter` — deep links work on GitHub Pages / any static host with zero server config)
- `lucide-react` icons
- No backend: all content ships in `src/techniques.json`, search/filter is client-side.

## Run
```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

## Routes
| Path | Page |
|------|------|
| `/` | Home — browse by category or tradition + 5-Minute Reset |
| `/:category` | `mind` / `body` / `breath` / `diet`, grouped by tradition |
| `/tradition/:id` | One tradition's blurb + all its techniques |
| `/technique/:id` | Full step-by-step, duration, benefits, origin |
| `/search?q=` | Client-side search across title, tradition, category, benefits |

## Content
`src/techniques.json` is a copy of the brief's `techniques.json` (single import
source). To expand, append objects to `traditions` / `techniques` following the
existing schema — the UI picks them up automatically, including category counts
and the 5-Minute Reset (any technique with a lower-bound duration ≤ 5 min).

## Notes baked into the UI, per the brief
- Persistent footer disclaimer: this is educational/cultural wellness content, not medical advice.
- Each technique's `origin` is surfaced on its detail page — attribution is honored, not stripped.
- Caution notes embedded in `description`/`steps` (e.g. Hegu point + pregnancy, herbal teas + medication) stay visible in the technique text.
