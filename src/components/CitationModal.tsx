// src/components/CitationModal.tsx
import { useState } from 'react'
import { Paper } from '../types'

interface CitationModalProps {
  paper: Paper | null
  onClose: () => void
}

type CitationFormat = 'apa' | 'ieee' | 'chicago' | 'harvard'

export default function CitationModal({ paper, onClose }: CitationModalProps) {
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<CitationFormat>('apa')

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
    navigator.clipboard.writeText(currentCitation)
    setCopied(true)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />

      <div className="relative bg-white rounded-xl max-w-lg w-full p-6 shadow-xl z-10">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <h3 className="font-semibold text-slate-900 text-base">Sitasi Jurnal</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition"
            aria-label="Tutup sitasi"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 mb-4 border-b border-slate-100 pb-2">
          {(['apa', 'ieee', 'chicago', 'harvard'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide transition ${
                format === fmt
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 leading-relaxed mb-4 break-words">
          {currentCitation}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleDownloadBib}
            className="px-4 py-2 rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Unduh .BIB
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-900 transition"
          >
            {copied ? 'Tersalin' : 'Salin ke Papan Klip'}
          </button>
        </div>
      </div>
    </div>
  )
}
