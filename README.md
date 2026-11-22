# Jurnal Rak — Journal Aggregator Prototype

Prototype UI untuk platform agregator jurnal dari Scopus, Sinta, DOAJ, Google Scholar, dan jurnal akses terbuka.

## Live Demo

- Landing page: https://frontend-prototype-gamma.vercel.app
- Workspace: https://frontend-prototype-gamma.vercel.app/app

## Tampilan & Motion

- Landing editorial dengan tipografi serif besar, aksen amber, hero reveal, parallax, marquee sumber, dan scroll storytelling.
- Workspace dengan filter amber, drawer melenting, pill beranimasi, toast aksi, modal/drawer motion, dan ringkasan AI mock yang “menyusun”.
- Shortcut keyboard: `Ctrl/Cmd + K` untuk fokus pencarian, `Esc` untuk menutup overlay.
- `prefers-reduced-motion` dihormati di seluruh animasi.

## Fitur Prototype

- Pencarian multi-sumber: Scopus, Sinta, DOAJ, Google Scholar.
- Filter kategori, sumber, dan Open Access.
- Folder & reading list.
- Citation tools: APA, IEEE, Chicago, Harvard, unduh `.BIB`.
- AI summary panel (mock).
- TTS mock untuk abstrak.
- 3-pane workspace dan dark mode.

## Menjalankan Lokal

```bash
cd D:\vessel2\frontend-prototype
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy

Project sudah terhubung ke Vercel. Untuk deploy ulang:

```bash
npx vercel --prod
```
