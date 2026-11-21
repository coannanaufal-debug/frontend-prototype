// src/components/CategoryGrid.tsx
import { CategoryMeta } from '../types'

interface CategoryGridProps {
  categories: CategoryMeta[]
  onSelect: (id: string) => void
}

export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
  const filtered = categories.filter((c) => c.id !== 'all')

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Kategori</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition"
          >
            <div className="text-sm font-medium text-slate-700">{cat.label}</div>
            <div className="mt-2 text-2xl font-serif text-slate-900">{cat.count}</div>
            <div className="mt-1 text-xs text-slate-400">jurnal</div>
          </button>
        ))}
      </div>
    </section>
  )
}
