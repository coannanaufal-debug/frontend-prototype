// src/components/SaveToFolderModal.tsx
import { ReadingFolder } from '../types'

interface SaveToFolderModalProps {
  folders: ReadingFolder[]
  onSave: (folderId: string) => void
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function SaveToFolderModal({ folders, onSave, onClose }: SaveToFolderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-sm w-full p-6 shadow-xl z-10">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <h3 className="font-semibold text-slate-900 text-base">Simpan ke Pustaka</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition"
            aria-label="Tutup penyimpanan"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onSave(folder.id)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm border border-slate-200 hover:border-accent hover:bg-teal-50 transition text-left"
            >
              <span className="font-medium text-slate-700">{folder.name}</span>
              <span className="text-xs text-slate-400">{folder.paperIds.length} jurnal</span>
            </button>
          ))}
        </div>

        {folders.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">
            Belum ada pustaka. Buat folder baru di sidebar.
          </p>
        )}
      </div>
    </div>
  )
}
