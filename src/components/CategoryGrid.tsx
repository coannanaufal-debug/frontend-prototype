// src/components/CategoryGrid.tsx
import { CategoryMeta } from '../types'

interface CategoryGridProps {
  categories: CategoryMeta[]
  onSelect: (id: string) => void
}

export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
  const filtered = categories.filter((c) => c.id !== 'all')

  return (
    <section className="mb-6 sm:mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-reading text-lg font-bold text-slate-900 sm:text-xl">Kategori</h2>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
          Jelajahi
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {filtered.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="group rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-slate-300 hover:shadow-sm sm:p-4"
          >
            <div className="text-xs font-medium leading-snug text-slate-600 group-hover:text-slate-900 sm:text-sm">
              {cat.label}
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <div className="font-serif text-2xl text-slate-900">{cat.count}</div>
              <span className="mb-0.5 text-[10px] text-slate-400">jurnal</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
