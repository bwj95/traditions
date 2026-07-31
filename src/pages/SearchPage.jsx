import { useSearchParams } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { searchTechniques } from '../data.js'
import TechniqueCard from '../components/TechniqueCard.jsx'

// Client-side search across all techniques. Seeds from the ?q= param and stays
// in sync so the URL is shareable.
export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [query, setQuery] = useState(initial)

  // Keep local input in sync if the URL query changes (e.g. header search).
  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  const results = useMemo(() => searchTechniques(query), [query])

  const onChange = (e) => {
    const v = e.target.value
    setQuery(v)
    setParams(v.trim() ? { q: v.trim() } : {}, { replace: true })
  }

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Search practices</h1>
        <div className="search-box">
          <Search size={18} aria-hidden />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={onChange}
            placeholder="Try “breath”, “anxiety”, “Zen”, “sleep”…"
            aria-label="Search practices"
          />
        </div>
      </header>

      {query.trim() === '' ? (
        <p className="empty-note">
          Start typing to search across titles, traditions, categories, and
          benefits.
        </p>
      ) : results.length === 0 ? (
        <p className="empty-note">
          No practices match “{query}”. Try a broader term.
        </p>
      ) : (
        <>
          <p className="count-note">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
          <div className="card-grid">
            {results.map((t) => (
              <TechniqueCard key={t.id} technique={t} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
