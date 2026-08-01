import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { getTradition } from '../data.js'
import { CategoryBadge, DifficultyBadge } from './Badges.jsx'
import TraditionEmblem from './emblems.jsx'

// A card summarizing one technique. `showTradition` hides the tradition line on
// pages that are already scoped to a single tradition.
export default function TechniqueCard({ technique, showTradition = true }) {
  const trad = getTradition(technique.tradition)
  return (
    <article className="tech-card">
      <Link to={`/technique/${technique.id}`} className="tech-card-link">
        <div className="tech-card-cats">
          {technique.category.map((c) => (
            <span key={c} className="badge cat-badge" style={{ '--badge-hue': catHue(c) }}>
              {c}
            </span>
          ))}
        </div>
        <h3 className="tech-card-title">{technique.title}</h3>
        {showTradition && trad && (
          <p className="tech-card-trad">
            <TraditionEmblem id={trad.id} size={15} className="trad-inline-emblem" />
            {trad.name}
          </p>
        )}
        <p className="tech-card-desc">{technique.description}</p>
        <div className="tech-card-meta">
          <span className="meta-item">
            <Clock size={14} aria-hidden /> {technique.duration}
          </span>
          <DifficultyBadge level={technique.difficulty} />
        </div>
      </Link>
    </article>
  )
}

// Local hue lookup kept tiny to avoid importing the full meta map into cards.
function catHue(c) {
  return { mind: 258, body: 152, breath: 199, diet: 28 }[c] ?? 220
}

// Re-export so consumers can compose grids without importing the badge too.
export { CategoryBadge }
