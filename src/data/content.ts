import raw from './techniques.json';

// ---- Types --------------------------------------------------------------
export type CategoryId = 'mind' | 'body' | 'breath' | 'diet';

export interface Tradition {
  id: string;
  name: string;
  region: string;
  blurb: string;
}

export interface Technique {
  id: string;
  title: string;
  tradition: string;
  category: CategoryId[];
  origin: string;
  description: string;
  steps: string[];
  duration: string;
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const categories = raw.categories as CategoryId[];
export const traditions = raw.traditions as Tradition[];
export const techniques = raw.techniques as Technique[];

// Human-friendly labels + accent hues for each category (ported from data.js).
export const categoryMeta: Record<CategoryId, { label: string; hue: number; blurb: string }> = {
  mind: { label: 'Mind', hue: 258, blurb: 'Meditation, reflection, and mental discipline.' },
  body: { label: 'Body', hue: 152, blurb: 'Movement, posture, and physical practice.' },
  breath: { label: 'Breath', hue: 199, blurb: 'Breathwork and breath-led techniques.' },
  diet: { label: 'Diet', hue: 28, blurb: 'Food as medicine and eating practices.' },
};

const traditionById = new Map(traditions.map((t) => [t.id, t]));
const techniqueById = new Map(techniques.map((t) => [t.id, t]));

export const getTradition = (id: string) => traditionById.get(id);
export const getTechnique = (id: string) => techniqueById.get(id);

export const techniquesByCategory = (cat: CategoryId) =>
  techniques.filter((t) => t.category.includes(cat));

export const techniquesByTradition = (id: string) =>
  techniques.filter((t) => t.tradition === id);

// Count how many techniques touch each category — used for the home tiles.
export const categoryCounts = Object.fromEntries(
  categories.map((c) => [c, techniquesByCategory(c).length]),
) as Record<CategoryId, number>;

// Parse the lower-bound minutes from a free-text duration ("3-15 min", "5 min
// prep", "2-3 min"). Returns null when there's no minute figure.
export function lowerBoundMinutes(duration: string): number | null {
  if (!/min/i.test(duration)) return null;
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

// "5-Minute Reset": any technique doable in ~5 minutes or less.
export const quickResets = techniques
  .filter((t) => {
    const m = lowerBoundMinutes(t.duration);
    return m !== null && m <= 5;
  })
  .sort((a, b) => (lowerBoundMinutes(a.duration)! - lowerBoundMinutes(b.duration)!));

// A lightweight, serializable search index for the client-side search island.
export const searchIndex = techniques.map((t) => {
  const trad = getTradition(t.tradition);
  return {
    id: t.id,
    title: t.title,
    tradition: t.tradition,
    traditionName: trad?.name ?? '',
    region: trad?.region ?? '',
    category: t.category,
    difficulty: t.difficulty,
    duration: t.duration,
    description: t.description,
    // Precomputed haystack keeps the client script tiny.
    haystack: [t.title, t.description, t.origin, trad?.name, trad?.region, ...t.category, ...t.benefits]
      .join(' ')
      .toLowerCase(),
  };
});
