// src/components/PaperDetail.tsx
import { Paper } from '../types'

interface PaperDetailProps {
  paper: Paper | null
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function PaperDetail({ paper, onClose }: PaperDetailProps) {
  if (!paper) return null

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />

      <div className="relative ml-auto w-full max-w-2xl bg-white shadow-xl flex flex-col animate-slideIn">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900 sm:text-sm">Detail Jurnal</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Tutup detail"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="reading-area flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <h1 className="mb-3 font-reading text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{paper.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {paper.authors.map((author, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium"
              >
                {author}
              </span>
            ))}
          </div>

          {paper.sources.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
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

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">Jurnal</span>
              <span className="font-medium text-slate-800">{paper.journal}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">Tahun</span>
              <span className="font-medium text-slate-800">{paper.year}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">DOI</span>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {paper.doi}
              </a>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">Penerbit</span>
              <span className="font-medium text-slate-800">{paper.publisher}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">Sitasi</span>
              <span className="font-medium text-slate-800">{paper.citations}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-500">Akses</span>
              <span className={paper.openAccess ? 'text-accent font-medium' : 'text-amber-700 font-medium'}>
                {paper.openAccess ? 'Open Access' : 'Terbatas'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Abstrak</h3>
            <p className="reading-area text-[15px] leading-relaxed text-slate-700">{paper.abstract}</p>
          </div>

          <div className="border border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 rounded-full border border-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-700">Penampil PDF</p>
            <p className="text-xs text-slate-400 mt-1">Pratinjaman akan ditampilkan di sini.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
