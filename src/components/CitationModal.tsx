// src/components/CitationModal.tsx
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Paper } from '../types'

interface CitationModalProps {
  paper: Paper | null
  onClose: () => void
  onCopied?: () => void
}

type CitationFormat = 'apa' | 'ieee' | 'chicago' | 'harvard'

export default function CitationModal({ paper, onClose, onCopied }: CitationModalProps) {
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<CitationFormat>('apa')
  const reduce = useReducedMotion()

  if (!paper) return null

  const authors = paper.authors.join(', ')
  const citations: Record<CitationFormat, string> = {
    apa: `${authors} (${paper.year}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi}`,
    ieee: `${authors}, "${paper.title}," ${paper.journal}, ${paper.year}, doi: ${paper.doi}.`,
    chicago: `${authors}. "${paper.title}." ${paper.journal} (${paper.year}). https://doi.org/${paper.doi}.`,
    harvard: `${authors}, ${paper.year}. ${paper.title}. ${paper.journal}.`,
  }

  const currentCitation = citations[format]

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCitation).catch(() => undefined)
    setCopied(true)
    onCopied?.()
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadBib = () => {
    const bib = `@article{${paper.id},\n  author = {${paper.authors.join(' and ')}},\n  title = {${paper.title}},\n  journal = {${paper.journal}},\n  year = {${paper.year}},\n  doi = {${paper.doi}}\n}`
    const blob = new Blob([bib], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${paper.id}.bib`
    a.click()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
        className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6"
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-900">Sitasi Jurnal</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Tutup sitasi"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto border-b border-slate-100 pb-2">
          {(['apa', 'ieee', 'chicago', 'harvard'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                format === fmt
                  ? 'bg-ink text-cream'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="mb-4 break-words rounded-lg border border-slate-200 bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-700 sm:text-sm">
          {currentCitation}
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={handleDownloadBib}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:py-2"
          >
            Unduh .BIB
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800 sm:py-2"
          >
            {copied ? 'Tersalin' : 'Salin ke Papan Klip'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
