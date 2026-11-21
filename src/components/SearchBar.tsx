// src/components/SearchBar.tsx
import Link from 'next/link'
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
  onOpenSidebar?: () => void
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
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
  onOpenSidebar,
}: SearchBarProps) {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const pillClass = (active: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
      active
        ? 'border-slate-900 bg-slate-900 text-white'
        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
    }`

  return (
    <div className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
          <button
            onClick={onOpenSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            aria-label="Buka pustaka"
          >
            <MenuIcon />
          </button>

          <Link href="/" className="flex items-center gap-2" aria-label="Jurnal Rak, kembali ke beranda">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[8px] font-semibold tracking-wide text-white">
              JR
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Jurnal Rak
            </span>
          </Link>

          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
            aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cari jurnal, penulis, atau topik riset..."
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800
                       focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:py-3"
          />
        </div>

        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
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

        <div className="no-scrollbar -mx-4 mt-2 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
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

        <div className="mx-auto mt-2 hidden justify-end sm:flex">
          <button
            onClick={toggleTheme}
            className="text-sm text-slate-500 transition hover:text-slate-800"
          >
            {dark ? 'Mode Terang' : 'Mode Gelap'}
          </button>
        </div>
      </div>
    </div>
  )
}
