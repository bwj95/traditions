/*
 * Image credits. Honoring where each photo comes from is on-brand for this site
 * (it already surfaces every technique's `origin`). Every photo below is used
 * under a license that permits commercial use AND derivatives (re-encoding /
 * cropping) — CC0, CC BY, or CC BY-SA — and is attributed on /credits.
 *
 * Key = the slug used in the filename (traditionId). Generated from Openverse
 * via scripts/source-images.mjs, then titles cleaned by hand.
 */
export interface Credit {
  title: string;
  author?: string;
  source?: string;
  sourceName?: string;
  license?: string;
  licenseUrl?: string;
}

export const credits: Record<string, Credit> = {
  shaolin: {
    title: 'Traditional Shaolin monastery martial-arts practice',
    author: 'Thuy sy',
    source: 'https://commons.wikimedia.org/w/index.php?curid=184553488',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  'chinese-taoist': {
    title: 'Wudang Mountains — Taoist temple range, China',
    author: 'gongfu_king',
    source: 'https://commons.wikimedia.org/w/index.php?curid=7607580',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
  },
  'mexican-indigenous': {
    title: 'Temazcal (sweat lodge)',
    author: 'Adam Jones, Kelowna, BC, Canada',
    source: 'https://commons.wikimedia.org/w/index.php?curid=146005018',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  buddhism: {
    title: 'Kadampa Buddhist temple interior',
    author: 'Joe Mabel',
    source: 'https://commons.wikimedia.org/w/index.php?curid=2776506',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  ayurveda: {
    title: 'Turmeric flower, Maharashtra, India',
    author: 'Sankarshansen',
    source: 'https://commons.wikimedia.org/w/index.php?curid=14974245',
    sourceName: 'Wikimedia Commons',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  'japanese-zen': {
    title: 'Ryōan-ji zen rock garden, Kyoto',
    author: 'Cquest',
    source: 'https://commons.wikimedia.org/w/index.php?curid=2085504',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY-SA 2.5',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
  },
  stoicism: {
    title: 'Roman Forum columns, Rome',
    author: 'Jon Gudorf Photography',
    source: 'https://commons.wikimedia.org/w/index.php?curid=156007636',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
  },
  'nordic-sami': {
    title: 'Aurora borealis over Norway',
    author: 'Christer Gundersen',
    source: 'https://commons.wikimedia.org/w/index.php?curid=71325760',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  'west-african-yoruba': {
    title: 'Djembe drummers',
    author: 'sookie, Vancouver, Canada',
    source: 'https://commons.wikimedia.org/w/index.php?curid=91692427',
    sourceName: 'Wikimedia Commons',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
};

export const hasCredits = () => Object.keys(credits).length > 0;
