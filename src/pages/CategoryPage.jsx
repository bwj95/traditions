import { useParams, Navigate, Link } from 'react-router-dom'
import {
  categoryMeta,
  techniquesByCategory,
  traditions,
} from '../data.js'
import TechniqueCard from '../components/TechniqueCard.jsx'

// Lists every technique in a category, grouped by tradition.
export default function CategoryPage({ validCategories }) {
  const { category } = useParams()

  if (!validCategories.includes(category)) {
    return <Navigate to="/" replace />
  }

  const meta = categoryMeta[category]
  const items = techniquesByCategory(category)

  // Group by tradition, preserving the tradition list order.
  const grouped = traditions
    .map((tr) => ({
      tradition: tr,
      items: items.filter((t) => t.tradition === tr.id),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="category-page" style={{ '--badge-hue': meta.hue }}>
      <header className="page-header">
        <p className="eyebrow">Category</p>
        <h1>{meta.label}</h1>
        <p className="page-lede">{meta.blurb}</p>
        <p className="count-note">{items.length} practices</p>
      </header>

      {grouped.map(({ tradition, items }) => (
        <section key={tradition.id} className="section">
          <h2 className="section-title group-title">
            <Link to={`/tradition/${tradition.id}`}>{tradition.name}</Link>
          </h2>
          <div className="card-grid">
            {items.map((t) => (
              <TechniqueCard key={t.id} technique={t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
