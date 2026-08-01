import { Brain, PersonStanding, Wind, Utensils } from 'lucide-react'

// One lucide icon per category. Kept here (not in data.js) so the data layer
// stays JSX-free.
const icons = {
  mind: Brain,
  body: PersonStanding,
  breath: Wind,
  diet: Utensils,
}

export default function CategoryIcon({ category, size = 20, ...rest }) {
  const Icon = icons[category]
  if (!Icon) return null
  return <Icon size={size} aria-hidden focusable="false" {...rest} />
}
