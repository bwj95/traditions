import { Link } from 'react-router-dom'
import { categoryMeta } from '../data.js'

// A colored pill for a category. Links to the category page unless `static` set.
export function CategoryBadge({ category, asLink = true }) {
  const meta = categoryMeta[category]
  if (!meta) return null
  const style = {
    '--badge-hue': meta.hue,
  }
  const content = (
    <span className="badge cat-badge" style={style}>
      {meta.label}
    </span>
  )
  return asLink ? (
    <Link to={`/${category}`} className="badge-link">
      {content}
    </Link>
  ) : (
    content
  )
}

export function DifficultyBadge({ level }) {
  return <span className={`badge diff-badge diff-${level}`}>{level}</span>
}
