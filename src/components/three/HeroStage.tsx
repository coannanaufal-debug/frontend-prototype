// src/components/three/HeroStage.tsx
// Client wrapper for the single hero canvas. Handles lazy mounting, WebGL
// detection, reduced motion, offscreen pausing, GSAP scroll authority and the
// accessible (keyboard) alternative to the interactive 3D cards.
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Component,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MOCK_PAPERS } from '../../data/mockPapers'
import type { HeroTargets } from './HeroScene'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null })

const STAGE_PAPERS = MOCK_PAPERS.slice(0, 3)

class SceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function supportsWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

interface HeroStageProps {
  /** True once the canvas has rendered; the parent uses it to hide the 2D poster. */
  onReady: (ready: boolean) => void
}

export default function HeroStage({ onReady }: HeroStageProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const targets = useRef<HeroTargets>({
    scroll: 0,
    pointerX: 0,
    pointerY: 0,
    hover: -1,
    time: 0,
  })
  const invalidateRef = useRef<(() => void) | null>(null)

  const [reduce, setReduce] = useState(false)
  const [webgl, setWebgl] = useState(false)
  const [load, setLoad] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  // prefers-reduced-motion: never mount the scene; keep the static poster.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setWebgl(supportsWebGL())
  }, [])

  // Lazy-load: only import the scene when the stage is near the viewport.
  useEffect(() => {
    const node = hostRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Pause entirely when offscreen (frameloop becomes 'never', ticker stops).
  useEffect(() => {
    const node = hostRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // GSAP ScrollTrigger is the only scroll authority; write progress into a ref.
  useEffect(() => {
    if (reduce) {
      targets.current.scroll = 0
      return
    }
    const trigger = ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        targets.current.scroll = self.progress
        invalidateRef.current?.()
      },
    })
    return () => trigger.kill()
  }, [reduce])

  // Pointer parallax writes to the same ref, never to React state.
  useEffect(() => {
    const node = hostRef.current
    if (!node || reduce) return
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      targets.current.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      targets.current.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      invalidateRef.current?.()
    }
    const onLeave = () => {
      targets.current.pointerX = 0
      targets.current.pointerY = 0
      targets.current.hover = -1
      invalidateRef.current?.()
    }
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  // 30fps ticker, only while on screen and motion is allowed.
  useEffect(() => {
    if (!ready || !visible || reduce) return
    let raf = 0
    let last = 0
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now
        targets.current.time = now / 1000
        invalidateRef.current?.()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, visible, reduce])

  // Draw one frame when the stage re-enters the viewport.
  useEffect(() => {
    if (visible && ready) invalidateRef.current?.()
  }, [visible, ready])

  const handleReady = useCallback(() => setReady(true), [])

  const handleFailure = useCallback(() => {
    invalidateRef.current = null
    setReady(false)
  }, [])

  // Keep the poster visible whenever the scene is unavailable.
  useEffect(() => {
    if (reduce) setReady(false)
  }, [reduce])

  useEffect(() => {
    onReady(ready)
  }, [ready, onReady])

  const canRender3D = load && webgl && !reduce

  return (
    <div
      ref={hostRef}
      className="hero-3d-stage absolute inset-0"
      style={{ pointerEvents: ready ? 'auto' : 'none' }}
    >
      <picture className="pointer-events-none absolute inset-0 block">
        <source media="(max-width: 767px)" srcSet="/figcraft-assets/hero-fallback-mobile.png" />
        <img
          src="/figcraft-assets/hero-fallback.png"
          alt=""
          aria-hidden="true"
          className={`h-full w-full object-contain transition-opacity duration-500 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </picture>

      {canRender3D && (
        <div className="absolute inset-0">
          <SceneErrorBoundary onError={handleFailure}>
            <HeroScene
              targets={targets}
              invalidateRef={invalidateRef}
              active={visible && !reduce}
              onReady={handleReady}
              onContextLost={handleFailure}
            />
          </SceneErrorBoundary>
        </div>
      )}

      <p className="sr-only">
        Ilustrasi tiga kartu jurnal di atas sebuah rak tiga dimensi. Kartu dapat diklik untuk membuka
        jurnal di workspace. Jika ilustrasi tidak tersedia, gunakan tautan pilihan jurnal.
      </p>

      <nav
        aria-label="Pilih jurnal untuk dibuka di workspace"
        className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:inset-x-0 focus-within:bottom-2 focus-within:z-30 focus-within:pointer-events-auto focus-within:flex focus-within:flex-wrap focus-within:justify-center focus-within:gap-2 focus-within:rounded-xl focus-within:bg-paper focus-within:p-2 focus-within:shadow-lg"
      >
        {STAGE_PAPERS.map((paper) => (
          <Link
            key={paper.id}
            href={`/app?paper=${paper.id}`}
            className="pointer-events-auto rounded-full border border-line bg-paper px-3 py-1.5 text-[10px] font-semibold text-ink"
          >
            {paper.journal}
          </Link>
        ))}
      </nav>
    </div>
  )
}
