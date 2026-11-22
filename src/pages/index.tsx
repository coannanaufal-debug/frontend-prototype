// src/pages/index.tsx — Editorial journal aggregator landing page with motion
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import MagneticLink from '../components/animations/MagneticLink'
import Marquee from '../components/animations/Marquee'
import Reveal from '../components/animations/Reveal'
import { MOCK_PAPERS, SOURCES } from '../data/mockPapers'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const features = [
  {
    title: 'Agregasi multi-sumber',
    tag: 'Discovery',
    description:
      'Scopus, Sinta, DOAJ, Google Scholar, dan jurnal akses terbuka dalam satu indeks pencarian.',
  },
  {
    title: 'Pencarian yang bisa disaring',
    tag: 'Filter',
    description:
      'Saring berdasarkan kategori ilmu, sumber, dan status Open Access tanpa kehilangan konteks.',
  },
  {
    title: 'Pustaka dan folder riset',
    tag: 'Library',
    description:
      'Simpan jurnal ke folder per proyek, sematkan yang penting, dan buka kembali riwayat bacaan.',
  },
  {
    title: 'Sitasi siap tempel',
    tag: 'Output',
    description:
      'Salin format APA, IEEE, Chicago, atau Harvard, lalu unduh berkas .BIB untuk manajer referensi.',
  },
  {
    title: 'Ringkasan jurnal',
    tag: 'Insight',
    description:
      'Baca inti latar belakang, metode, dan hasil penelitian dalam bahasa Indonesia yang ringkas.',
  },
  {
    title: 'Akses terbuka lebih jelas',
    tag: 'Access',
    description:
      'Badge Open Access dan tautan DOI membantu Anda memutuskan jurnal mana yang layak dibaca lebih dulu.',
  },
]

const steps = [
  {
    title: 'Cari',
    description: 'Mulai dari kata kunci, penulis, atau topik. Satu pencarian menjangkau empat sumber.',
  },
  {
    title: 'Simpan',
    description: 'Masukkan temuan ke folder proyek agar daftar bacaan tetap rapi dan mudah ditemukan.',
  },
  {
    title: 'Ringkas',
    description: 'Buka ringkasan, salin sitasi, lalu lanjutkan penulisan tanpa berpindah aplikasi.',
  },
]

const indexedSources = SOURCES.filter((source) => source.id !== 'all')
const previewPapers = MOCK_PAPERS.slice(0, 2)

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

function BookMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4h12v17l-6-4-6 4z" />
    </svg>
  )
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from('.hero-line', {
          yPercent: 115,
          opacity: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power4.out',
        })
        .from(
          '.hero-card',
          {
            y: 54,
            opacity: 0,
            rotate: 1.5,
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.65'
        )
        .from(
          '.hero-float',
          {
            x: 30,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )

      gsap.to('.hero-visual', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('.feature-row', {
        y: 46,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        scrollTrigger: {
          trigger: '.feature-list',
          start: 'top 82%',
        },
      })

      gsap.from('.panel', {
        y: 54,
        opacity: 0,
        rotateX: -6,
        transformOrigin: 'top center',
        duration: 0.9,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.workspace-preview',
          start: 'top 78%',
        },
      })

      gsap.from('.step-card', {
        y: 40,
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.steps-grid',
          start: 'top 84%',
        },
      })

      gsap.to('.cta-ring', {
        rotation: 360,
        duration: 36,
        repeat: -1,
        ease: 'none',
      })
    },
    { scope: root }
  )

  return (
    <main ref={root} className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Jurnal Rak, kembali ke beranda">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-ink text-[10px] font-semibold tracking-[0.08em] text-cream">
            JR
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] sm:text-xs">
            Jurnal Rak
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55 md:flex">
          <a href="#fitur" className="transition hover:text-amber-700">
            Fitur
          </a>
          <a href="#sumber" className="transition hover:text-amber-700">
            Sumber
          </a>
          <a href="#cara-kerja" className="transition hover:text-amber-700">
            Cara kerja
          </a>
        </nav>

        <MagneticLink
          href="/app"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream sm:px-5 sm:text-[11px]"
        >
          Buka workspace
          <ArrowUpRight className="h-3.5 w-3.5" />
        </MagneticLink>
      </header>

      <section className="hero-section relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_2%,#F7E7AE_0,transparent_46%)]" />
        <div className="landing-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700">
              <span className="h-px w-8 bg-amber-700/45" />
              Agregator jurnal · 2026
            </div>

            <h1 className="text-balance font-display text-[3.45rem] leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-[5.9rem]">
              <span className="block overflow-hidden">
                <span className="hero-line block">Semua jurnal,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block italic text-amber-700">satu rak.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-7 text-ink/60 sm:text-base">
              Telusuri Scopus, Sinta, DOAJ, dan Google Scholar. Simpan temuan ke pustaka,
              salin sitasi, lalu baca ringkasan dalam satu alur yang tenang.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticLink
                href="/app"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(180,83,9,0.6)]"
              >
                Mulai eksplorasi
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticLink>
              <a
                href="#fitur"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-paper/60 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-paper"
              >
                Lihat fitur
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 text-[11px] leading-5 text-ink/50">
              <div>
                <div className="text-xl font-semibold tracking-tight text-ink">6</div>
                jurnal kurasi
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight text-ink">4</div>
                sumber terindeks
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight text-ink">1</div>
                alur riset
              </div>
            </div>
          </div>

          <div className="hero-visual relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -left-10 top-14 hidden h-40 w-40 rounded-full border border-amber-700/20 lg:block" />
            <div className="absolute -right-8 bottom-16 hidden h-24 w-24 rounded-full bg-amber-300/50 blur-2xl lg:block" />

            <div className="hero-card relative rounded-[2rem] border border-line bg-paper p-3 shadow-[0_30px_80px_-38px_rgba(29,27,22,0.55)] sm:p-4">
              <div className="flex items-center justify-between gap-3 border-b border-line px-2 pb-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-ink/20" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/10" />
                </div>
                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                  Pustaka / Pencarian
                </span>
                <span className="rounded border border-line px-1.5 py-0.5 text-[8px] font-medium text-ink/35">
                  Ctrl K
                </span>
              </div>

              <div className="p-2 pt-4">
                <div className="flex items-center gap-2.5 rounded-xl border border-line bg-white/80 px-3 py-2.5 text-[11px] text-ink/40">
                  <SearchIcon />
                  <span className="truncate">Cari judul, penulis, atau topik...</span>
                </div>

                <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-0.5">
                  {indexedSources.map((source, index) => (
                    <span
                      key={source.id}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                        index === 0
                          ? 'bg-ink text-cream'
                          : 'border border-line bg-white/75 text-ink/50'
                      }`}
                    >
                      {source.label}
                    </span>
                  ))}
                  <span className="shrink-0 rounded-full border border-amber-700/25 bg-amber-300/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                    Open Access
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {previewPapers.map((paper, index) => (
                    <div
                      key={paper.id}
                      className={`hero-card rounded-xl border p-3 ${
                        index === 0
                          ? 'border-amber-700/25 bg-amber-300/15'
                          : 'border-line bg-white/75'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                          {paper.journal}
                        </span>
                        {paper.openAccess && (
                          <span className="shrink-0 rounded-full bg-amber-700 px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.1em] text-cream">
                            Open access
                          </span>
                        )}
                      </div>
                      <h2 className="mt-1.5 line-clamp-2 font-display text-lg leading-tight text-ink">
                        {paper.title}
                      </h2>
                      <div className="mt-2 flex items-center justify-between gap-2 text-[9px] text-ink/40">
                        <span className="truncate">{paper.authors[0]} et al.</span>
                        <span>{paper.year}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hero-card mt-3 flex items-center justify-between rounded-xl border border-line bg-white/55 px-3 py-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-ink/55">
                    <BookMark />
                    Ringkasan jurnal
                  </div>
                  <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                    Siap dibaca
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-float absolute -bottom-5 right-4 rotate-2 rounded-2xl border border-line bg-cream px-4 py-3 shadow-sm sm:right-8">
              <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                Folder riset
              </div>
              <div className="mt-1 text-xs font-semibold text-ink">Bab 2 · Variabel X</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sumber" className="border-y border-line bg-paper/65">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-10">
          <p className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/40">
            Sumber terindeks
          </p>
          <Marquee className="min-w-0 flex-1">
            {indexedSources.map((source) => (
              <span
                key={source.id}
                className="mx-6 whitespace-nowrap text-sm font-semibold text-ink/60"
              >
                {source.label}
                <sup className="ml-1 text-[9px] font-medium text-ink/30">{source.count}</sup>
              </span>
            ))}
            <span className="mx-6 whitespace-nowrap text-sm font-semibold text-amber-700">
              + Open Access
            </span>
          </Marquee>
        </div>
      </section>

      <section id="fitur" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700">
                <span className="h-px w-8 bg-amber-700/45" />
                01 / Fitur
              </div>
              <h2 className="mt-5 text-balance font-display text-4xl leading-[0.96] sm:text-5xl lg:text-6xl">
                Alat riset yang tidak <span className="italic text-amber-700">berisik.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-ink/55">
                Setiap fitur dibuat untuk satu tujuan: mengurangi langkah antara menemukan jurnal
                dan memahaminya.
              </p>
            </Reveal>
          </div>

          <div className="feature-list border-t border-line">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="feature-row group grid grid-cols-[2.25rem_1fr] gap-3 border-b border-line py-5 hover:bg-amber-300/10 sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-7"
              >
                <span className="pt-1 text-[10px] font-semibold tracking-[0.12em] text-ink/30">
                  0{index + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-ink sm:text-xl">{feature.title}</h3>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                      {feature.tag}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-[13px] leading-6 text-ink/55 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
                <span className="hidden self-start pt-2 text-ink/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-700 sm:block">
                  <ArrowUpRight />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="workspace-preview mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-signal">
                  <span className="h-px w-8 bg-signal/50" />
                  02 / Workspace
                </div>
                <h2 className="mt-5 text-balance font-display text-4xl leading-[0.96] sm:text-5xl lg:text-6xl">
                  Satu layar untuk <span className="italic text-signal">seluruh alur.</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-cream/55">
                  Pencarian, pustaka, detail jurnal, sitasi, dan ringkasan bekerja dalam satu ruang
                  kerja. Tanpa pindah tab, tanpa kehilangan konteks.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {['Cari', 'Saring', 'Simpan', 'Sitasi', 'Ringkas'].map((step) => (
                    <span
                      key={step}
                      className="rounded-full border border-cream/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/55"
                    >
                      {step}
                    </span>
                  ))}
                </div>

                <MagneticLink
                  href="/app"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-300"
                >
                  Buka workspace
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticLink>
              </Reveal>
            </div>

            <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-2.5 sm:p-3">
              <div className="grid gap-2 sm:grid-cols-[0.8fr_1.4fr]">
                <div className="panel rounded-xl border border-cream/10 bg-cream/[0.05] p-3">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/30">
                    Pustaka
                  </div>
                  <div className="mt-3 space-y-1">
                    {['Semua jurnal', 'Riwayat bacaan', 'Disematkan'].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-2 py-1.5 text-[10px] ${
                          index === 0 ? 'bg-cream/10 text-cream/80' : 'text-cream/40'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-cream/10 pt-3">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/30">
                      Folder proyek
                    </div>
                    <div className="mt-2 space-y-1.5 text-[10px] text-cream/50">
                      <div>Bab 2 - Variabel X</div>
                      <div>Jurnal Metodologi</div>
                      <div>Referensi Telemedicine</div>
                    </div>
                  </div>
                </div>

                <div className="panel rounded-xl border border-cream/10 bg-cream/[0.05] p-3">
                  <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/30">
                    <span>Hasil pencarian</span>
                    <span>6 jurnal</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {previewPapers.map((paper) => (
                      <div
                        key={paper.id}
                        className="rounded-lg border border-cream/10 bg-cream/[0.04] p-2.5"
                      >
                        <div className="text-[8px] uppercase tracking-[0.14em] text-cream/30">
                          {paper.journal}
                        </div>
                        <div className="mt-1 line-clamp-2 font-display text-sm leading-tight text-cream/85">
                          {paper.title}
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-[8px] text-cream/35">
                          <span>{paper.authors[0]} et al.</span>
                          <span>{paper.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel mt-2 rounded-xl border border-cream/10 bg-cream/[0.05] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/30">
                    Ringkasan AI
                  </div>
                  <span className="rounded-full bg-signal px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-ink">
                    Mock
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {['Latar belakang', 'Metode', 'Hasil'].map((label) => (
                    <div key={label} className="rounded-lg bg-cream/[0.04] p-2">
                      <div className="text-[7px] font-semibold uppercase tracking-[0.12em] text-cream/30">
                        {label}
                      </div>
                      <div className="mt-1.5 h-1 w-full rounded-full bg-cream/10" />
                      <div className="mt-1 h-1 w-4/5 rounded-full bg-cream/10" />
                      <div className="mt-1 h-1 w-3/5 rounded-full bg-cream/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700">
              <span className="h-px w-8 bg-amber-700/45" />
              03 / Cara kerja
            </div>
            <h2 className="mt-5 text-balance font-display text-4xl leading-[0.96] sm:text-5xl lg:text-6xl">
              Tiga langkah, <span className="italic text-amber-700">tanpa drama.</span>
            </h2>
          </Reveal>
          <p className="max-w-xs text-sm leading-7 text-ink/55">
            Dari kata kunci pertama sampai ringkasan yang siap dibaca.
          </p>
        </div>

        <div className="steps-grid mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="step-card relative rounded-2xl border border-line bg-paper p-6">
              <span className="text-[10px] font-semibold tracking-[0.14em] text-ink/30">
                0{index + 1}
              </span>
              <h3 className="mt-8 font-display text-2xl text-ink sm:text-3xl">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-ink/55 sm:text-sm">{step.description}</p>
              {index < steps.length - 1 && (
                <span className="absolute right-5 top-5 hidden text-ink/20 md:block" aria-hidden="true">
                  <ArrowUpRight className="rotate-45" />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-sage-100 px-6 py-12 sm:px-12 sm:py-20">
          <div className="cta-ring absolute -right-20 -top-20 h-64 w-64 rounded-full border border-amber-700/20" />
          <div className="absolute -bottom-28 -right-10 h-72 w-72 rounded-full border border-amber-700/10" />
          <div className="relative max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700">
              Pustaka riset Anda
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Mulai dari satu jurnal.{' '}
              <span className="italic">Sisanya akan mengalir.</span>
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticLink
                href="/app"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream"
              >
                Masuk ke workspace
                <ArrowUpRight className="h-4 w-4" />
              </MagneticLink>
              <a
                href="#fitur"
                className="inline-flex items-center justify-center rounded-full border border-amber-700/20 bg-cream/40 px-6 py-3.5 text-sm font-semibold text-amber-700 transition hover:bg-cream/70"
              >
                Pelajari fitur
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Jurnal Rak
            </div>
            <p className="mt-2 max-w-sm text-xs leading-6 text-ink/45">
              Prototype agregator jurnal untuk eksplorasi riset yang lebih tenang.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium text-ink/50">
            <a href="#fitur" className="transition hover:text-amber-700">
              Fitur
            </a>
            <a href="#sumber" className="transition hover:text-amber-700">
              Sumber
            </a>
            <Link href="/app" className="transition hover:text-amber-700">
              Workspace
            </Link>
          </div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-ink/30">
            © 2026 Jurnal Rak
          </p>
        </div>
      </footer>
    </main>
  )
}
