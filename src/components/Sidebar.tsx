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
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
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
}: SidebarProps) {
  const [showInput, setShowInput] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateFolder(newName.trim())
      setNewName('')
      setShowInput(false)
    }
  }

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-72'
      } transition-all duration-300 bg-white border-r border-slate-200 flex flex-col h-full shrink-0`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
        {!collapsed && (
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Pustaka Riset
          </h2>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft />
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 pt-4 pb-2 space-y-1">
          <button
            onClick={() => onSelectFolder(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
              activeFolder === null
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Jurnal
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition">
            Riwayat Bacaan
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition">
            Disematkan
          </button>
        </div>
      )}

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Folder Proyek
            </span>
            <button
              onClick={() => setShowInput(true)}
              className="text-slate-500 hover:text-slate-900 text-lg font-light leading-none"
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
                className="flex-1 text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="Nama folder..."
              />
              <button
                onClick={handleCreate}
                className="text-xs bg-primary text-white px-2 py-1.5 rounded-md hover:bg-blue-900"
              >
                OK
              </button>
            </div>
          )}

          <div className="space-y-1">
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => onSelectFolder(f.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition ${
                  activeFolder === f.id
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <FolderIcon />
                  <span className="truncate">{f.name}</span>
                </span>
                <span className="text-xs text-slate-400">{f.paperIds.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {collapsed && (
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
