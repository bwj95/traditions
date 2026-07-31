import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import TraditionPage from './pages/TraditionPage.jsx'
import TechniquePage from './pages/TechniquePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import { categories } from './data.js'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:category" element={<CategoryRoute />} />
        <Route path="/tradition/:id" element={<TraditionPage />} />
        <Route path="/technique/:id" element={<TechniquePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

// Guard the /:category route so only real categories render a CategoryPage;
// anything else falls back home.
function CategoryRoute() {
  return <CategoryPage validCategories={categories} />
}
