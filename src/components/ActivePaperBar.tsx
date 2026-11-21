// src/components/ActivePaperBar.tsx
import { Paper } from '../types'

interface ActivePaperBarProps {
  paper: Paper | null
  onOpenCitation: () => void
  onOpenSummary: () => void
  onOpenDetail: () => void
  onSaveToFolder: () => void
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export default function ActivePaperBar({
  paper,
  onOpenCitation,
  onOpenSummary,
  onOpenDetail,
  onSaveToFolder,
}: ActivePaperBarProps) {
  if (!paper) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="p-2 rounded-md border border-slate-200 text-slate-500">
            <DocumentIcon />
          </div>
          <div className="min-w-0">
            <h4
              onClick={onOpenDetail}
              className="font-reading text-sm font-bold text-slate-800 truncate cursor-pointer hover:text-primary transition"
            >
              {paper.title}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {paper.authors.join(', ')} · {paper.year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCitation}
            className="px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Salin Sitasi
          </button>

          <button
            onClick={onOpenSummary}
            className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
          >
            Ringkasan
          </button>

          <button
            onClick={() => alert(`Memutar TTS untuk abstrak: "${paper.title}" (Mock Audio)`)}
            className="px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Dengarkan
          </button>

          <button
            onClick={onSaveToFolder}
            className="px-3 py-1.5 rounded-md border border-accent text-accent text-xs font-medium hover:bg-teal-50 transition"
          >
            Simpan ke Pustaka
          </button>
        </div>
      </div>
    </div>
  )
}
