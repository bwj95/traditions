import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Quote } from 'lucide-react'
import { getTechnique, getTradition } from '../data.js'
import { CategoryBadge, DifficultyBadge } from '../components/Badges.jsx'

// Full step-by-step detail for a single technique.
export default function TechniquePage() {
  const { id } = useParams()
  const technique = getTechnique(id)

  if (!technique) return <Navigate to="/" replace />

  const trad = getTradition(technique.tradition)

  return (
    <article className="technique-page">
      <Link
        to={trad ? `/tradition/${trad.id}` : '/'}
        className="back-link"
      >
        <ArrowLeft size={16} aria-hidden /> {trad ? trad.name : 'Home'}
      </Link>

      <header className="page-header">
        <div className="badge-row">
          {technique.category.map((c) => (
            <CategoryBadge key={c} category={c} />
          ))}
          <DifficultyBadge level={technique.difficulty} />
        </div>
        <h1>{technique.title}</h1>
        <p className="page-lede">{technique.description}</p>
        <div className="tech-facts">
          <span className="meta-item">
            <Clock size={15} aria-hidden /> {technique.duration}
          </span>
          {trad && (
            <span className="meta-item">
              From{' '}
              <Link to={`/tradition/${trad.id}`} className="inline-link">
                {trad.name}
              </Link>
            </span>
          )}
        </div>
      </header>

      <section className="steps-section">
        <h2 className="section-title">How to practice</h2>
        <ol className="steps-list">
          {technique.steps.map((step, i) => (
            <li key={i}>
              <span className="step-num">{i + 1}</span>
              <span className="step-text">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="detail-cols">
        <section className="benefits-section">
          <h2 className="section-title">Benefits</h2>
          <ul className="benefit-tags">
            {technique.benefits.map((b) => (
              <li key={b} className="benefit-tag">
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="origin-section">
          <h2 className="section-title">Origin</h2>
          <blockquote className="origin-note">
            <Quote size={16} aria-hidden />
            <span>{technique.origin}</span>
          </blockquote>
        </section>
      </div>
    </article>
  )
}
