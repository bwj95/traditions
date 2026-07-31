import raw from './techniques.json'

export const categories = raw.categories // ["mind","body","breath","diet"]
export const traditions = raw.traditions
export const techniques = raw.techniques

// Human-friendly labels + accent hues for each category.
export const categoryMeta = {
  mind: { label: 'Mind', hue: 258, blurb: 'Meditation, reflection, and mental discipline.' },
  body: { label: 'Body', hue: 152, blurb: 'Movement, posture, and physical practice.' },
  breath: { label: 'Breath', hue: 199, blurb: 'Breathwork and breath-led techniques.' },
  diet: { label: 'Diet', hue: 28, blurb: 'Food as medicine and eating practices.' },
}

const traditionById = new Map(traditions.map((t) => [t.id, t]))
const techniqueById = new Map(techniques.map((t) => [t.id, t]))

export const getTradition = (id) => traditionById.get(id)
export const getTechnique = (id) => techniqueById.get(id)

export const techniquesByCategory = (cat) =>
  techniques.filter((t) => t.category.includes(cat))

export const techniquesByTradition = (id) =>
  techniques.filter((t) => t.tradition === id)

// Count how many techniques touch each category — used for the home tiles.
export const categoryCounts = Object.fromEntries(
  categories.map((c) => [c, techniquesByCategory(c).length]),
)

// Parse the lower-bound minutes from a free-text duration like "3-15 min",
// "5 min prep", or "2-3 min". Returns null when there's no minute figure
// (e.g. "ongoing/daily", "per meal").
export function lowerBoundMinutes(duration) {
  if (!/min/i.test(duration)) return null
  const match = duration.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

// "5-Minute Reset": any technique that can be done in ~5 minutes or less.
export const quickResets = techniques
  .filter((t) => {
    const m = lowerBoundMinutes(t.duration)
    return m !== null && m <= 5
  })
  .sort((a, b) => lowerBoundMinutes(a.duration) - lowerBoundMinutes(b.duration))

// Simple client-side search across title, tradition name, category, benefits,
// and description. Returns matching techniques.
export function searchTechniques(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return techniques.filter((t) => {
    const trad = getTradition(t.tradition)
    const haystack = [
      t.title,
      t.description,
      t.origin,
      trad?.name,
      ...t.category,
      ...t.benefits,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}
