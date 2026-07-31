import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { getTradition, techniquesByTradition } from '../data.js'
import TechniqueCard from '../components/TechniqueCard.jsx'

// Shows a tradition's blurb and all techniques tagged to it.
export default function TraditionPage() {
  const { id } = useParams()
  const tradition = getTradition(id)

  if (!tradition) return <Navigate to="/" replace />

  const items = techniquesByTradition(id)

  return (
    <div className="tradition-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} aria-hidden /> All traditions
      </Link>
      <header className="page-header">
        <p className="eyebrow">Tradition</p>
        <h1>{tradition.name}</h1>
        <p className="region-line">
          <MapPin size={15} aria-hidden /> {tradition.region}
        </p>
        <p className="page-lede">{tradition.blurb}</p>
        <p className="count-note">{items.length} practices</p>
      </header>

      <div className="card-grid">
        {items.map((t) => (
          <TechniqueCard key={t.id} technique={t} showTradition={false} />
        ))}
      </div>
    </div>
  )
}
