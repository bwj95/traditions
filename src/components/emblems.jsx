// Per-tradition line-art emblems. One cohesive style: 24x24 viewBox, no fill,
// stroke = currentColor, round caps/joins — so they inherit text color and work
// in light + dark automatically, and add ~0 network weight (inlined).

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Shaolin — a seated meditating figure (head + rounded body).
const Shaolin = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="6" r="2.5" />
    <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" />
    <path d="M5 20h14" />
  </svg>
)

// Taoist / TCM — yin-yang.
const Taoist = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 2.5a4.75 4.75 0 0 0 0 9.5 4.75 4.75 0 0 1 0 9.5" />
    <circle cx="12" cy="7.25" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="16.75" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

// Mexican / Indigenous — a radiant sun.
const MexicanSun = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </svg>
)

// Buddhism — the dharma wheel (8 spokes).
const Dharma = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2.5v19M2.5 12h19M5.1 5.1l13.8 13.8M18.9 5.1L5.1 18.9" />
  </svg>
)

// Ayurveda — a lotus flower.
const Lotus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20c-4 0-7.5-2.5-7.5-2.5S6 9 12 9s7.5 8.5 7.5 8.5S16 20 12 20Z" />
    <path d="M12 20V9" />
    <path d="M12 20c-2.5 0-4.5-1.5-5-3.5M12 20c2.5 0 4.5-1.5 5-3.5" />
  </svg>
)

// Japanese Zen — the ensō (a brush circle left open at the top).
const Enso = (p) => (
  <svg {...base} {...p} strokeWidth="1.8">
    <path d="M15 4.2A9 9 0 1 0 19 10" />
  </svg>
)

// Stoicism — a classical column.
const Column = (p) => (
  <svg {...base} {...p}>
    <path d="M5 5h14M4 20h16" />
    <path d="M7 5v15M12 5v15M17 5v15" />
  </svg>
)

// Nordic / Sámi — a snowflake (north, cold, seasonal light).
const Snowflake = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    <path d="M12 6l-2 2M12 6l2 2M12 18l-2-2M12 18l2-2" />
    <path d="M6 9l.4 2.8L4 13M18 9l-.4 2.8L20 13M6 15l.4-2.8M18 15l-.4-2.8" />
  </svg>
)

// West African / Yoruba — a djembe drum.
const Drum = (p) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6" rx="6" ry="2" />
    <path d="M6 6c0 5 1.5 9 6 14 4.5-5 6-9 6-14" />
    <path d="M9 6l1.5 12M15 6l-1.5 12" />
  </svg>
)

// Fallback — concentric ripples (used if a tradition has no bespoke emblem).
const Ripple = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="9" />
  </svg>
)

const registry = {
  shaolin: Shaolin,
  'chinese-taoist': Taoist,
  'mexican-indigenous': MexicanSun,
  buddhism: Dharma,
  ayurveda: Lotus,
  'japanese-zen': Enso,
  stoicism: Column,
  'nordic-sami': Snowflake,
  'west-african-yoruba': Drum,
}

// Renders the emblem for a tradition id, falling back to the ripple mark.
export default function TraditionEmblem({ id, size = 24, className, ...rest }) {
  const Emblem = registry[id] ?? Ripple
  return (
    <Emblem
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  )
}
