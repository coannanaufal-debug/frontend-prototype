# Jurnal Rak — Journal Aggregator Prototype

Prototype UI untuk platform agregator jurnal dari Scopus, Sinta, DOAJ, Google Scholar, dan jurnal akses terbuka.

## Live Demo

- Landing page: https://frontend-prototype-gamma.vercel.app
- Workspace: https://frontend-prototype-gamma.vercel.app/app

## Tampilan

- **Landing page editorial** dengan tipografi serif, aksen sage, hero bergaya rak jurnal, daftar fitur bernomor, preview workspace, dan alur kerja tiga langkah.
- **Workspace mobile-friendly** dengan sidebar drawer, filter horizontal yang bisa digeser, kartu jurnal ringkas, dan action bar yang tetap nyaman di layar kecil.
- **Mode gelap** untuk area kerja.

## Fitur Prototype

- Pencarian multi-sumber: Scopus, Sinta, DOAJ, Google Scholar.
- Filter kategori, sumber, dan Open Access.
- Folder & reading list.
- Citation tools: APA, IEEE, Chicago, Harvard, unduh `.BIB`.
- AI summary panel (mock).
- TTS mock untuk abstrak.
- 3-pane workspace.

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
