// src/pages/index.tsx — Travel App Landing Page
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      title: 'Agregasi Sumber',
      description:
        'Akses jurnal dari Scopus, Sinta, DOAJ, Google Scholar, dan jurnal gratis dalam satu platform agregator.',
    },
    {
      title: 'Pencarian Cepat & Filter',
      description:
        'Cari dengan kata kunci global, lalu saring menggunakan kategori ilmu, sumber jurnal, dan status Open Access.',
    },
    {
      title: 'Reading List & Folder',
      description:
        'Kelola pustaka riset Anda dengan folder per proyek, pin jurnal penting, dan riwayat bacaan yang cepat.',
    },
    {
      title: 'Citation Tools',
      description:
        'Salin sitasi dengan format APA, IEEE, Chicago, Harvard, dan unduh file .BIB langsung dari hasil pencarian.',
    },
    {
      title: 'Ringkasan AI',
      description:
        'Ringkas latar belakang, metode, hasil, dan temuan utama jurnal dalam bahasa Indonesia dengan panel AI.',
    },
    {
      title: 'Akses Praktis',
      description:
        'Jurnal Open Access tersedia langsung, dengan badge Open Access dan navigasi cepat ke detail jurnal.',
    },
  ]

  return (
    <main className="bg-[#F8F4E8] min-h-screen text-[#1C1B17]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_80%_-20%,#E5E0D5,transparent)]" />
          <div className="grid lg:grid-cols-12 gap-12 items-start p-8 md:p-12">
            <div className="lg:col-span-7 relative z-10">
              <p className="text-sm font-medium uppercase tracking-widest text-teal-700 mb-6">
                Platform Agregator Jurnal
              </p>
              <h1 className="font-reading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                Jurnal Semua dari Satu Tempat
              </h1>
              <p className="text-base md:text-lg text-[#64748B] max-w-lg leading-relaxed mb-8">
                Cari, ringkas, dan kelola jurnal ilmu dari berbagai sumber—Scopus, Sinta, DOAJ, Google Scholar—serta jurnal gratis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/app"
                  className="px-5 py-3 rounded-lg bg-[#1C1B17] text-white text-sm font-medium text-center hover:bg-slate-800 transition"
                >
                  Eksplorasi Jurnal
                </Link>
                <Link
                  href="/app"
                  className="px-5 py-3 rounded-lg bg-transparent text-[#1C1B17] text-sm font-medium text-center border border-slate-300 hover:border-slate-400 transition"
                >
                  Pelajari Fitur
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative z-10">
              <div className="bg-[#FDFBFA] border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
                <div className="text-xs font-medium uppercase tracking-widest text-[#64748B]">
                  Ringkasan Sumber
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Scopus', 'Sinta', 'DOAJ', 'Google Scholar'].map((source) => (
                    <span
                      key={source}
                      className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm"
                    >
                      {source}
                    </span>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#64748B]">
                    6 jurnal
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#64748B]">
                    1 Open Access
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#64748B]">
                    5 kategori
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#64748B]">
                    Semua sumber
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-20" />
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-700 mb-4">
            Platform Agregator Jurnal
          </p>
          <h2 className="font-reading text-3xl md:text-4xl font-bold leading-snug">
            Semua fitur riset dalam satu halaman.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
            >
              <h3 className="font-medium text-[#1C1B17] text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/app"
            className="px-5 py-3 rounded-lg bg-[#1C1B17] text-white text-sm font-medium hover:bg-slate-800 transition"
          >
            Mulai Eksplorasi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-slate-200 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748B]">Platform Agregator Jurnal</p>
          <div className="text-xs text-slate-400 uppercase tracking-wide">
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
