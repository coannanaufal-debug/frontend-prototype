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
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white px-3 py-2.5 shadow-[0_-12px_30px_-20px_rgba(15,23,42,0.35)] sm:px-6 sm:py-3">
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 md:flex-row md:items-center md:justify-between md:gap-3">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="hidden rounded-md border border-slate-200 p-2 text-slate-500 sm:block">
            <DocumentIcon />
          </div>
          <div className="min-w-0">
            <h4
              onClick={onOpenDetail}
              className="cursor-pointer truncate font-reading text-[13px] font-bold text-slate-800 transition hover:text-primary sm:text-sm"
            >
              {paper.title}
            </h4>
            <p className="truncate text-[11px] text-slate-500 sm:text-xs">
              {paper.authors.join(', ')} · {paper.year}
            </p>
          </div>
        </div>

        <div className="no-scrollbar flex shrink-0 items-center gap-2 overflow-x-auto pb-0.5">
          <button
            onClick={onOpenCitation}
            className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:py-1.5"
          >
            Salin Sitasi
          </button>

          <button
            onClick={onOpenSummary}
            className="shrink-0 rounded-full bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800 sm:py-1.5"
          >
            Ringkasan
          </button>

          <button
            onClick={() => alert(`Memutar TTS untuk abstrak: "${paper.title}" (Mock Audio)`)}
            className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:py-1.5"
          >
            Dengarkan
          </button>

          <button
            onClick={onSaveToFolder}
            className="shrink-0 rounded-full border border-accent px-3 py-2 text-xs font-medium text-accent transition hover:bg-teal-50 sm:py-1.5"
          >
            <span className="sm:hidden">Simpan</span>
            <span className="hidden sm:inline">Simpan ke Pustaka</span>
          </button>
        </div>
      </div>
    </div>
  )
}
