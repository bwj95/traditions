// Source authentic, license-clean tradition photos from Openverse.
// Filters to reusable licenses (CC0/PD/BY/BY-SA — NO NoDerivatives, NO NonCommercial),
// prefers high-res landscape images, downloads the best per tradition into
// src/assets/traditions/<id>/hero.<ext>, and writes a credits manifest.
//
// Run: node scripts/source-images.mjs [traditionId ...]   (default: all)
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const OK_LICENSES = new Set(['cc0', 'pdm', 'by', 'by-sa']); // reusable + commercial + derivatives allowed
const MIN_W = 1400;

// Multiple queries per tradition — fall through until a good landscape hit lands.
const QUERIES = {
  shaolin: ['Shaolin monastery', 'Shaolin kung fu training', 'Chinese mountain monastery'],
  'chinese-taoist': ['Wudang mountains temple', 'Taoist temple mountain', 'Chinese tea ceremony'],
  'mexican-indigenous': ['temazcal sweat lodge', 'copal incense ceremony', 'Mexican medicinal herbs'],
  buddhism: ['Buddhist temple interior', 'Buddhist monks meditation', 'Bodh Gaya temple'],
  ayurveda: ['Ayurveda herbs spices', 'Indian spices turmeric', 'Kerala backwaters herbs'],
  'japanese-zen': ['Ryoan-ji zen garden', 'Japanese rock garden', 'Kyoto zen garden'],
  stoicism: ['Roman forum columns', 'ancient Greek temple ruins', 'Parthenon Athens'],
  'nordic-sami': ['Aurora Borealis Norway', 'reindeer Sami Lapland', 'frozen lake Finland'],
  'west-african-yoruba': ['djembe drummers', 'West African drumming', 'Yoruba drum ceremony'],
};

const EXT = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

async function search(query) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license_type=commercial&page_size=20&mature=false`;
  const res = await fetch(url, { headers: { 'User-Agent': 'traditions-site/1.0' } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

function pick(results) {
  return results
    .filter((r) => OK_LICENSES.has(r.license))
    .filter((r) => (r.width || 0) >= MIN_W)
    .filter((r) => (r.width || 0) >= (r.height || 1) * 1.15) // landscape-ish for a banner
    .sort((a, b) => (b.width || 0) - (a.width || 0))[0];
}

async function download(u) {
  const res = await fetch(u, { headers: { 'User-Agent': 'traditions-site/1.0' }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type')?.split(';')[0] || '';
  const ext = EXT[type];
  if (!ext) throw new Error(`unsupported type ${type}`);
  return { buf: Buffer.from(await res.arrayBuffer()), ext };
}

const noDownload = process.argv.includes('--no-download');
const targets = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const ids = targets.length ? targets : Object.keys(QUERIES);
const credits = {};

for (const id of ids) {
  let chosen = null;
  for (const query of QUERIES[id]) {
    const hit = pick(await search(query));
    if (hit) { chosen = { hit, query }; break; }
    await new Promise((r) => setTimeout(r, 300));
  }
  if (!chosen) { console.log(`✗ ${id}: no candidate`); continue; }
  const { hit } = chosen;
  try {
    if (!noDownload) {
      const { buf, ext } = await download(hit.url);
      const path = `src/assets/traditions/${id}/hero.${ext}`;
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, buf);
      console.log(`✓ ${id}: ${(buf.length / 1024).toFixed(0)}KB  ${hit.width}x${hit.height}  ${hit.license}  "${(hit.title||'').slice(0,45)}"`);
    } else {
      console.log(`· ${id}: credit only  ${hit.license}  "${(hit.title||'').slice(0,45)}"`);
    }
    credits[id] = {
      title: hit.title || id,
      author: hit.creator || undefined,
      source: hit.foreign_landing_url || hit.url,
      sourceName: hit.source === 'wikimedia' ? 'Wikimedia Commons' : (hit.provider || hit.source),
      license: `CC ${hit.license.toUpperCase()}${hit.license_version ? ' ' + hit.license_version : ''}`.replace('CC CC0', 'CC0').replace('CC PDM', 'Public Domain'),
      licenseUrl: hit.license_url || undefined,
    };
  } catch (e) {
    console.log(`✗ ${id}: download failed (${e.message})`);
  }
}

await writeFile('scripts/credits.sourced.json', JSON.stringify(credits, null, 2));
console.log(`\nWrote ${Object.keys(credits).length} credit entries -> scripts/credits.sourced.json`);
