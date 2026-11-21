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
      className={`bg-white border rounded-lg p-5 cursor-pointer transition-colors ${
        isActive
          ? 'border-accent'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-reading text-lg font-bold text-slate-900 leading-snug mb-2">
            {paper.title}
          </h3>
          <p className="text-sm text-slate-600 mb-3">{paper.authors.join(', ')}</p>

          <div className="flex flex-wrap gap-2 items-center text-xs text-slate-500">
            <span className="text-slate-700">{paper.journal}</span>
            <span className="text-slate-300">·</span>
            <span>{paper.year}</span>
            <span className="text-slate-300">·</span>
            <span>{paper.citations} sitasi</span>
            <span className="text-slate-300">·</span>
            <span className={paper.openAccess ? 'text-accent font-medium' : 'text-amber-700'}>
              {paper.openAccess ? 'Open Access' : 'Terbatas'}
            </span>
          </div>

          {paper.sources.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {paper.sources.map((source) => (
                <span
                  key={source}
                  className="px-2 py-0.5 rounded-full border border-slate-200 text-[11px] font-medium text-slate-500 uppercase tracking-wide"
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
          className="shrink-0 p-2 rounded-md border border-slate-200 text-slate-500 hover:border-accent hover:text-accent transition"
          aria-label="Simpan ke pustaka"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </article>
  )
}
