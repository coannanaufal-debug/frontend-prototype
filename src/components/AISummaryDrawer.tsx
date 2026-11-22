// src/components/AISummaryDrawer.tsx
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
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
  const [loading, setLoading] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!isOpen || !paper || reduce) {
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 720)
    return () => clearTimeout(timer)
  }, [isOpen, paper?.id, reduce])

  if (!isOpen || !paper) return null

  const summary = AI_SUMMARIES[paper.id] || {
    background: 'Ringkasan otomatis untuk jurnal ini belum dihasilkan secara manual. Sistem akan menganalisis masalah penelitian, keterbatasan studi sebelumnya, dan novelty yang ditawarkan.',
    method: 'Analisis pendekatan kuantitatif atau kualitatif berbasis parameter riset yang diekstrak dari bagian metodologi.',
    results: 'Temuan utama dan implikasi teoretis serta praktis dari riset yang dipublikasikan.',
    keywords: ['Ringkasan', 'Academic Insights', 'Machine Generated'],
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-slate-900/30"
        onClick={onClose}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative ml-auto flex w-full max-w-xl flex-col bg-white shadow-xl"
        initial={reduce ? false : { x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        drag={reduce ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.45 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120) onClose()
        }}
      >
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

          {loading ? (
            <div className="space-y-3 pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                Menyusun ringkasan…
              </p>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.25, repeat: Infinity, delay: i * 0.16 }}
                >
                  <div className="mb-3 h-2 w-24 rounded-full bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-slate-200" />
                    <div className="h-2 w-11/12 rounded-full bg-slate-200" />
                    <div className="h-2 w-3/5 rounded-full bg-slate-200" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">Latar Belakang</h4>
                <p className="text-sm leading-relaxed text-slate-700">{summary.background}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">Metode Penelitian</h4>
                <p className="text-sm leading-relaxed text-slate-700">{summary.method}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">Hasil Penelitian</h4>
                <p className="text-sm leading-relaxed text-slate-700">{summary.results}</p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Kata Kunci</h4>
                <div className="flex flex-wrap gap-1.5">
                  {summary.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Premium</span>
                <h5 className="mt-1 text-sm font-semibold text-slate-800">Matriks Perbandingan Jurnal</h5>
                <p className="mb-3 mt-1 text-xs text-slate-500">
                  Bandingkan metodologi, sampel data, dan keterbatasan beberapa jurnal sekaligus.
                </p>
                <button className="rounded-md bg-ink px-4 py-2 text-xs font-medium text-cream transition hover:bg-slate-800">
                  Lihat Matriks
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
