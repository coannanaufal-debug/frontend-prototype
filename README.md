# Jurnal Rak — Journal Aggregator Prototype

Prototype UI untuk platform agregator jurnal dari Scopus, Sinta, DOAJ, Google Scholar, dan jurnal akses terbuka.

## Live Demo

- Landing page: https://frontend-prototype-gamma.vercel.app
- Workspace: https://frontend-prototype-gamma.vercel.app/app

## Sumber Desain

- File FigCraft: `jurnal-rak.figcraft` (3 pages: Design System, Landing, Workspace).
- Token, aset fallback, dan preview: `figcraft-assets/` (disalin juga ke `public/figcraft-assets/` untuk dipakai runtime).
- Aksen utama: amber `#F5C542`, deep accent `#A34A07`, ink `#17150F`, cream `#F7F2E7`.
- Prototype FigCraft memakai smartAnimate + custom spring `stiffness 300, damping 20` sebagai spesifikasi Motion.

## Web3D & Motion

- Hero memakai satu canvas React Three Fiber dengan kartu jurnal 3D interaktif, pointer parallax, dan kamera yang mengikuti scroll.
- Scroll authority: GSAP ScrollTrigger menulis progress ke ref; `useFrame` hanya me-lerp objek Three.
- Fallback statis FigCraft dipakai saat `prefers-reduced-motion`, WebGL tidak tersedia, atau canvas belum siap.
- Canvas lazy-loaded, `dpr` dibatasi, tanpa shadow, dijeda saat offscreen, dan resource di-dispose saat unmount.
- Motion dipakai untuk drawer, modal, toast, pill filter, dan spring UI lainnya.
- Shortcut: `Ctrl/Cmd + K` fokus search, `Esc` tutup overlay.

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
