import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Search, Leaf } from 'lucide-react'
import { categories } from '../data.js'
import { categoryMeta } from '../data.js'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')

  // Scroll to top on route change so detail pages don't open mid-scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const submitSearch = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="brand">
            <Leaf size={20} aria-hidden />
            <span>Traditions</span>
          </Link>
          <nav className="cat-nav" aria-label="Categories">
            {categories.map((c) => (
              <NavLink key={c} to={`/${c}`} className="cat-link">
                {categoryMeta[c].label}
              </NavLink>
            ))}
          </nav>
          <form className="search-mini" onSubmit={submitSearch} role="search">
            <Search size={16} aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search practices…"
              aria-label="Search practices"
            />
          </form>
        </div>
      </header>

      <main className="wrap main">{children}</main>

      <footer className="site-footer">
        <div className="wrap">
          <p className="disclaimer">
            These practices are shared for educational and wellness purposes and
            are not a substitute for professional medical or mental health care.
          </p>
          <p className="attribution">
            Each practice carries an attribution to the tradition it comes from —
            honoring its origin is part of the point.
          </p>
        </div>
      </footer>
    </div>
  )
}
