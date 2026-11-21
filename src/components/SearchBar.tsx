// src/components/SearchBar.tsx
import { useState } from 'react'
import { Category, CategoryMeta, SourceMeta } from '../types'

interface SearchBarProps {
  query: string
  onQueryChange: (q: string) => void
  activeCategory: Category
  onCategoryChange: (c: Category) => void
  categories: CategoryMeta[]
  sources: SourceMeta[]
  activeSource: SourceMeta['id']
  onSourceChange: (s: SourceMeta['id']) => void
  openAccessOnly: boolean
  onOpenAccessChange: (v: boolean) => void
}

export default function SearchBar({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  categories,
  sources,
  activeSource,
  onSourceChange,
  openAccessOnly,
  onOpenAccessChange,
}: SearchBarProps) {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const pillClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full border text-sm transition-colors ${
      active
        ? 'bg-primary text-white border-primary'
        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
    }`

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4">
      <div className="max-w-3xl mx-auto mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari jurnal, penulis, atau topik riset..."
          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={pillClass(activeCategory === cat.id)}
          >
            {cat.label}
            <span className="ml-1 text-xs opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 max-w-3xl mx-auto mt-2 items-center">
        {sources.map((src) => (
          <button
            key={src.id}
            onClick={() => onSourceChange(src.id)}
            className={pillClass(activeSource === src.id)}
          >
            {src.label}
            <span className="ml-1 text-xs opacity-70">({src.count})</span>
          </button>
        ))}

        <button
          onClick={() => onOpenAccessChange(!openAccessOnly)}
          className={`${pillClass(openAccessOnly)} flex items-center gap-2`}
        >
          <span
            className={`h-2 w-2 rounded-full ${openAccessOnly ? 'bg-teal-600' : 'bg-slate-300'}`}
          />
          Open Access
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-3 flex justify-end">
        <button
          onClick={toggleTheme}
          className="text-sm text-slate-500 hover:text-slate-800 transition"
        >
          {dark ? 'Mode Terang' : 'Mode Gelap'}
        </button>
      </div>
    </div>
  )
}
