import { Link } from 'react-router-dom'
import { ArrowRight, Timer } from 'lucide-react'
import {
  categories,
  categoryMeta,
  categoryCounts,
  traditions,
  quickResets,
  techniques,
} from '../data.js'
import TechniqueCard from '../components/TechniqueCard.jsx'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>
          Time-tested ways to feel <em>better</em>.
        </h1>
        <p className="hero-sub">
          {techniques.length} practices drawn from {traditions.length} of the
          world's wellness traditions — for the mind, the body, the breath, and
          the table. Browse by what you need, or by where it comes from.
        </p>
      </section>

      {/* Browse by category */}
      <section className="section">
        <h2 className="section-title">Browse by category</h2>
        <div className="cat-grid">
          {categories.map((c) => {
            const meta = categoryMeta[c]
            return (
              <Link
                key={c}
                to={`/${c}`}
                className="cat-tile"
                style={{ '--badge-hue': meta.hue }}
              >
                <span className="cat-tile-count">{categoryCounts[c]}</span>
                <h3>{meta.label}</h3>
                <p>{meta.blurb}</p>
                <span className="cat-tile-go">
                  Explore <ArrowRight size={16} aria-hidden />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 5-Minute Reset */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">
            <Timer size={20} aria-hidden /> 5-Minute Reset
          </h2>
          <p className="section-note">
            Quick practices you can finish in about five minutes.
          </p>
        </div>
        <div className="card-grid">
          {quickResets.map((t) => (
            <TechniqueCard key={t.id} technique={t} />
          ))}
        </div>
      </section>

      {/* Browse by tradition */}
      <section className="section">
        <h2 className="section-title">Browse by tradition</h2>
        <div className="trad-grid">
          {traditions.map((tr) => (
            <Link key={tr.id} to={`/tradition/${tr.id}`} className="trad-tile">
              <h3>{tr.name}</h3>
              <span className="trad-region">{tr.region}</span>
              <p>{tr.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
