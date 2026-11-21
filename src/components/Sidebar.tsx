// src/components/Sidebar.tsx
import { useState } from 'react'
import { ReadingFolder } from '../types'
import { MOCK_FOLDERS } from '../data/mockFolders'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  folders: ReadingFolder[]
  activeFolder: string | null
  onSelectFolder: (id: string | null) => void
  onCreateFolder: (name: string) => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

export default function Sidebar({
  collapsed,
  onToggle,
  folders,
  activeFolder,
  onSelectFolder,
  onCreateFolder,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [showInput, setShowInput] = useState(false)
  const [newName, setNewName] = useState('')
  const showContent = !collapsed || mobileOpen

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateFolder(newName.trim())
      setNewName('')
      setShowInput(false)
    }
  }

  const handleSelectFolder = (id: string | null) => {
    onSelectFolder(id)
    onMobileClose?.()
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${collapsed ? 'lg:w-16' : 'lg:w-72'}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        {showContent && (
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
            Pustaka Riset
          </h2>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={onMobileClose}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Tutup sidebar"
          >
            <CloseIcon />
          </button>
          <button
            onClick={onToggle}
            className="hidden rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 lg:inline-flex"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft />
          </button>
        </div>
      </div>

      {showContent && (
        <div className="space-y-1 px-4 pb-2 pt-4">
          <button
            onClick={() => handleSelectFolder(null)}
            className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
              activeFolder === null
                ? 'bg-slate-100 font-medium text-slate-900'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Jurnal
          </button>
          <button className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50">
            Riwayat Bacaan
          </button>
          <button className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50">
            Disematkan
          </button>
        </div>
      )}

      {showContent && (
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Folder Proyek
            </span>
            <button
              onClick={() => setShowInput(true)}
              className="text-lg font-light leading-none text-slate-500 hover:text-slate-900"
              aria-label="Buat folder"
            >
              +
            </button>
          </div>

          {showInput && (
            <div className="mb-2 flex gap-1">
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                className="min-w-0 flex-1 rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="Nama folder..."
              />
              <button
                onClick={handleCreate}
                className="rounded-md bg-primary px-2 py-1.5 text-xs text-white hover:bg-blue-900"
              >
                OK
              </button>
            </div>
          )}

          <div className="space-y-1">
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectFolder(f.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ${
                  activeFolder === f.id
                    ? 'bg-slate-100 font-medium text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FolderIcon />
                  <span className="truncate">{f.name}</span>
                </span>
                <span className="text-xs text-slate-400">{f.paperIds.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {collapsed && !mobileOpen && (
        <div className="flex flex-col items-center gap-3 pt-4">
          <button
            onClick={() => onSelectFolder(null)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
            aria-label="Semua jurnal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => onSelectFolder(null)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
            aria-label="Riwayat bacaan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </button>
          <button
            onClick={() => onSelectFolder(null)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
            aria-label="Disematkan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 17v5" />
              <path d="M9 3h6l1 5H8l1-5z" />
              <path d="M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
            </svg>
          </button>
          <div className="w-8 h-px bg-slate-200 my-1" />
          {folders.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFolder(f.id)}
              className={`p-2 rounded-md ${
                activeFolder === f.id ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100 text-slate-500'
              }`}
              aria-label={f.name}
            >
              <FolderIcon />
            </button>
          ))}
        </div>
      )}
    </aside>
  )
}
