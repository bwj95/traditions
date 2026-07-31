# Wellness Guide — Content & Structure Brief

This document + `techniques.json` are meant to be handed directly to a coding agent to build the site. This file explains the data and suggests an architecture; the JSON is the actual content to import/seed.

## Files
- `techniques.json` — structured content: traditions + individual techniques, each tagged by category.
- `content-guide.md` — this file.

## Data model (already reflected in techniques.json)

**Tradition object:**
```
{ id, name, region, blurb }
```

**Technique object:**
```
{
  id,            // unique slug
  title,
  tradition,     // references a tradition id
  category,      // array, subset of ["mind","body","breath","diet"]
  origin,        // short attribution string
  description,   // 1-2 sentence summary
  steps,         // ordered array of strings, the actual how-to
  duration,      // human-readable estimate
  benefits,      // array of short benefit tags
  difficulty     // "beginner" | "intermediate" | "advanced"
}
```

## Suggested site architecture

1. **Home** — two entry points: browse by *Category* (Mind / Body / Breath / Diet) or browse by *Tradition*. A "5-Minute Reset" featured section pulling any techniques with `duration` under ~5 min is a good low-effort v1 feature (filter client-side, no new data needed).
2. **Category pages** (`/mind`, `/body`, `/breath`, `/diet`) — filter `techniques.json` by category, list as cards, group/sub-label by tradition within the page.
3. **Tradition pages** (`/tradition/:id`) — show the tradition blurb + all techniques tagged with that tradition id.
4. **Technique detail page** (`/technique/:id`) — full step-by-step, duration, benefits, origin note.
5. **Search/filter** — simple client-side filter across title, tradition, category, benefits is enough for v1; no backend search needed at this content size.

## Current coverage
9 traditions, 34 techniques: Shaolin, Chinese Taoist/TCM, Mexican/Indigenous, Buddhism, Ayurveda, Japanese Zen, Stoicism, Nordic/Sámi, and West African/Yoruba-descended practices — each with at least one entry per mind/body/breath/diet category.

## Content expansion pattern
To add more techniques later, append new objects to the `techniques` array following the same schema, and add new traditions to the `traditions` array the same way (e.g., Native American/First Nations practices, Korean Sinseon/Ki-Gong, Aboriginal Australian Dadirri — all reasonable further additions).

## Tone & disclaimer notes for the coding agent to bake into the UI
- This is educational/cultural wellness content, not medical advice. A small persistent footer disclaimer is appropriate: *"These practices are shared for educational and wellness purposes and are not a substitute for professional medical or mental health care."*
- Where a technique involves an herb, fasting-adjacent practice, or physical exertion, the `description`/`steps` already include a caution note where relevant (e.g., Hegu point + pregnancy, herbal teas + medication interactions) — keep these visible in the UI, not buried.
- Attribution matters: each technique intentionally carries an `origin` field — surface it, don't strip it out for a generic "wellness tip" feel. Part of the value here is honoring where each practice comes from.
