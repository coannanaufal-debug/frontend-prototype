// src/pages/app.tsx — 3-Pane Academic Workspace Prototype
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'motion/react'
import Toast from '../components/animations/Toast'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import CategoryGrid from '../components/CategoryGrid'
import PaperCard from '../components/PaperCard'
import ActivePaperBar from '../components/ActivePaperBar'
import PaperDetail from '../components/PaperDetail'
import CitationModal from '../components/CitationModal'
import AISummaryDrawer from '../components/AISummaryDrawer'
import SaveToFolderModal from '../components/SaveToFolderModal'
import { MOCK_PAPERS, CATEGORIES, SOURCES } from '../data/mockPapers'
import { MOCK_FOLDERS } from '../data/mockFolders'
import { Paper, Category, Source, ReadingFolder } from '../types'

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [activeSource, setActiveSource] = useState<Source | 'all'>('all')
  const [openAccessOnly, setOpenAccessOnly] = useState(false)
  const [activePaper, setActivePaper] = useState<Paper | null>(null)
  const [folders, setFolders] = useState<ReadingFolder[]>(MOCK_FOLDERS)
  const [activeFolder, setActiveFolder] = useState<string | null>(null)

  const [detailOpen, setDetailOpen] = useState(false)
  const [citationOpen, setCitationOpen] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  // Deep link from the landing page's 3D cards: /app?paper=p1
  const router = useRouter()
  const linkedPaperId =
    typeof router.query.paper === 'string'
      ? router.query.paper
      : Array.isArray(router.query.paper)
      ? router.query.paper[0]
      : null

  useEffect(() => {
    if (!router.isReady || !linkedPaperId) return
    const paper = MOCK_PAPERS.find((item) => item.id === linkedPaperId)
    if (!paper) return
    setActivePaper(paper)
    setDetailOpen(true)
  }, [router.isReady, linkedPaperId])

  const searchInputRef = useRef<HTMLInputElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const flashToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
      if (event.key === 'Escape') {
        setCitationOpen(false)
        setSummaryOpen(false)
        setSaveModalOpen(false)
        setDetailOpen(false)
        setSidebarMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  const filteredPapers = useMemo(() => {
    let result = MOCK_PAPERS

    if (activeFolder) {
      const folder = folders.find((f) => f.id === activeFolder)
      if (folder) result = result.filter((p) => folder.paperIds.includes(p.id))
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (activeSource !== 'all') {
      result = result.filter((p) => p.sources.includes(activeSource))
    }

    if (openAccessOnly) {
      result = result.filter((p) => p.openAccess)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.abstract.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q)
      )
    }

    return result
  }, [query, activeCategory, activeSource, openAccessOnly, activeFolder, folders])

  const handleCreateFolder = (name: string) => {
    const newFolder: ReadingFolder = {
      id: `f${Date.now()}`,
      name,
      paperIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setFolders((prev) => [...prev, newFolder])
  }

  const handleSaveToFolder = (folderId: string) => {
    if (!activePaper) return
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId && !f.paperIds.includes(activePaper.id)
          ? { ...f, paperIds: [...f.paperIds, activePaper.id] }
          : f
      )
    )
    setSaveModalOpen(false)
    flashToast('Jurnal disimpan ke pustaka')
  }

  const handleCategoryFromGrid = (id: string) => {
    setActiveCategory(id as Category)
    setActiveSource('all')
    setOpenAccessOnly(false)
    setActiveFolder(null)
  }

  const isFiltered =
    Boolean(query.trim()) || activeCategory !== 'all' || activeSource !== 'all' || openAccessOnly || activeFolder !== null

  const feedTitle = activeFolder
    ? folders.find((f) => f.id === activeFolder)?.name ?? 'Pustaka Riset'
    : isFiltered
    ? 'Hasil Pencarian'
    : 'Populer Minggu Ini'

  const latestPapers = MOCK_PAPERS.filter((p) => p.year === 2026).slice(0, 3)

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50">
      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.button
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSidebarMobileOpen(false)}
            aria-label="Tutup menu pustaka"
          />
        )}
      </AnimatePresence>

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        folders={folders}
        activeFolder={activeFolder}
        onSelectFolder={setActiveFolder}
        onCreateFolder={handleCreateFolder}
        mobileOpen={sidebarMobileOpen}
        onMobileClose={() => setSidebarMobileOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={CATEGORIES}
          sources={SOURCES}
          activeSource={activeSource}
          onSourceChange={setActiveSource}
          openAccessOnly={openAccessOnly}
          onOpenAccessChange={setOpenAccessOnly}
          onOpenSidebar={() => setSidebarMobileOpen(true)}
          inputRef={searchInputRef}
        />

        <div className="flex-1 overflow-y-auto px-4 py-5 pb-32 sm:px-6 sm:py-6 md:pb-28">
          {!isFiltered && (
            <CategoryGrid categories={CATEGORIES} onSelect={handleCategoryFromGrid} />
          )}

          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="font-reading text-xl font-bold text-slate-900 sm:text-2xl">{feedTitle}</h2>
            <span className="shrink-0 text-[11px] text-slate-400 sm:text-xs">
              {filteredPapers.length} jurnal ditemukan
            </span>
          </div>

          <div className="space-y-3 max-w-4xl">
            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onSelect={setActivePaper}
                onAddToFolder={(id) => {
                  setActivePaper(MOCK_PAPERS.find((p) => p.id === id) ?? null)
                  setSaveModalOpen(true)
                }}
                isActive={activePaper?.id === paper.id}
              />
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-4xl mb-3">Tidak ada hasil</div>
              <p className="text-sm">Coba ubah kata kunci atau filter sumber.</p>
            </div>
          )}

          {!isFiltered && (
            <section className="mt-10 max-w-4xl">
              <h2 className="mb-4 font-reading text-xl font-bold text-slate-900 sm:text-2xl">Terbitan Terbaru</h2>
              <div className="grid md:grid-cols-3 gap-3">
                {latestPapers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => setActivePaper(paper)}
                    className="bg-white border border-slate-200 rounded-lg p-4 text-left hover:border-slate-300 transition"
                  >
                    <div className="text-xs text-accent font-medium mb-1">{paper.year}</div>
                    <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 truncate">{paper.journal}</p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <ActivePaperBar
        paper={activePaper}
        onOpenCitation={() => setCitationOpen(true)}
        onOpenSummary={() => setSummaryOpen(true)}
        onOpenDetail={() => setDetailOpen(true)}
        onSaveToFolder={() => setSaveModalOpen(true)}
      />

      {detailOpen && <PaperDetail paper={activePaper} onClose={() => setDetailOpen(false)} />}
      {citationOpen && (
        <CitationModal
          paper={activePaper}
          onClose={() => setCitationOpen(false)}
          onCopied={() => flashToast('Sitasi tersalin ke papan klip')}
        />
      )}
      {summaryOpen && <AISummaryDrawer paper={activePaper} isOpen={summaryOpen} onClose={() => setSummaryOpen(false)} />}
      {saveModalOpen && (
        <SaveToFolderModal folders={folders} onSave={handleSaveToFolder} onClose={() => setSaveModalOpen(false)} />
      )}
      <Toast message={toast} />
    </div>
  )
}
