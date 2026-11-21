// src/components/PaperCard.tsx
import { Paper } from '../types'

interface PaperCardProps {
  paper: Paper
  onSelect: (paper: Paper) => void
  onAddToFolder: (paperId: string) => void
  isActive: boolean
}

export default function PaperCard({ paper, onSelect, onAddToFolder, isActive }: PaperCardProps) {
  return (
    <article
      onClick={() => onSelect(paper)}
      className={`cursor-pointer rounded-xl border bg-white p-4 transition-colors sm:p-5 ${
        isActive
          ? 'border-accent'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 line-clamp-3 font-reading text-base font-bold leading-snug text-slate-900 sm:line-clamp-2 sm:text-lg">
            {paper.title}
          </h3>
          <p className="mb-3 line-clamp-1 text-xs text-slate-600 sm:text-sm">
            {paper.authors.join(', ')}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 sm:text-xs">
            <span className="font-medium text-slate-700">{paper.journal}</span>
            <span className="text-slate-300">·</span>
            <span>{paper.year}</span>
            <span className="text-slate-300">·</span>
            <span>{paper.citations} sitasi</span>
            <span className="text-slate-300">·</span>
            <span className={paper.openAccess ? 'font-medium text-accent' : 'text-amber-700'}>
              {paper.openAccess ? 'Open Access' : 'Terbatas'}
            </span>
          </div>

          {paper.sources.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {paper.sources.map((source) => (
                <span
                  key={source}
                  className="rounded-full border border-slate-200 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate-500 sm:text-[11px]"
                >
                  {source}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddToFolder(paper.id)
          }}
          className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-accent hover:text-accent"
          aria-label="Simpan ke pustaka"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </article>
  )
}
