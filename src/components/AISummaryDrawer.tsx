// src/components/AISummaryDrawer.tsx
import { Paper } from '../types'
import { AI_SUMMARIES } from '../data/mockPapers'

interface AISummaryDrawerProps {
  paper: Paper | null
  isOpen: boolean
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function AISummaryDrawer({ paper, isOpen, onClose }: AISummaryDrawerProps) {
  if (!isOpen || !paper) return null

  const summary = AI_SUMMARIES[paper.id] || {
    background: 'Ringkasan otomatis untuk jurnal ini belum dihasilkan secara manual. Sistem akan menganalisis masalah penelitian, keterbatasan studi sebelumnya, dan novelty yang ditawarkan.',
    method: 'Analisis pendekatan kuantitatif atau kualitatif berbasis parameter riset yang diekstrak dari bagian metodologi.',
    results: 'Temuan utama dan implikasi teoretis serta praktis dari riset yang dipublikasikan.',
    keywords: ['Ringkasan', 'Academic Insights', 'Machine Generated'],
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />

      <div className="relative ml-auto w-full max-w-xl bg-white shadow-xl flex flex-col animate-slideIn">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-4">
          <h2 className="text-sm font-semibold text-slate-900">Ringkasan Jurnal</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Tutup ringkasan"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="reading-area flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:space-y-5 sm:px-6 sm:py-6">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jurnal yang diringkas</span>
            <h3 className="font-reading text-base font-bold text-slate-900 mt-1">{paper.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {paper.authors.join(', ')} ({paper.year})
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Latar Belakang</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{summary.background}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Metode Penelitian</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{summary.method}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Hasil Penelitian</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{summary.results}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kata Kunci</h4>
            <div className="flex flex-wrap gap-1.5">
              {summary.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Premium</span>
            <h5 className="font-semibold text-slate-800 text-sm mt-1">Matriks Perbandingan Jurnal</h5>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              Bandingkan metodologi, sampel data, dan keterbatasan beberapa jurnal sekaligus.
            </p>
            <button className="bg-slate-900 text-white text-xs px-4 py-2 rounded-md font-medium hover:bg-slate-800 transition">
              Lihat Matriks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
