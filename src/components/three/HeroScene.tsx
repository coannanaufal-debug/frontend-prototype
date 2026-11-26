// src/components/three/HeroScene.tsx
// Client-only WebGL scene. Plain react-three-fiber primitives only:
// 9 meshes (~108 triangles), no drei runtime, no physics, no postprocessing,
// no instancing, no shadows. Geometry/materials are created once and disposed.
'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { MOCK_PAPERS } from '../../data/mockPapers'

export interface HeroTargets {
  /** 0..1 progress written only by GSAP ScrollTrigger */
  scroll: number
  /** -1..1 pointer position relative to the stage */
  pointerX: number
  pointerY: number
  /** index of the hovered card, -1 when none */
  hover: number
  /** seconds, advanced by the visibility-gated ticker */
  time: number
}

interface HeroSceneProps {
  targets: MutableRefObject<HeroTargets>
  invalidateRef: MutableRefObject<(() => void) | null>
  active: boolean
  onReady: () => void
  onContextLost: () => void
}

const CARD_COLORS = ['#FDFBF5', '#F7F2E7', '#E4E8D7']
const SPINE_COLORS = ['#A34A07', '#17150F', '#F5C542']
const SCENE_PAPERS = MOCK_PAPERS.slice(0, 3)

type Paper = (typeof SCENE_PAPERS)[number]

/** Textures are drawn in-browser; the scene needs no external image or font assets. */
function makeCardTexture(paper: Paper, background: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 384
  canvas.height = 540
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = background
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#A34A07'
  ctx.fillRect(0, 0, 18, canvas.height)

  ctx.fillStyle = '#17150F99'
  ctx.font = '600 19px sans-serif'
  ctx.fillText(paper.journal.toUpperCase().slice(0, 26), 44, 58)

  ctx.fillStyle = '#F5C542'
  ctx.fillRect(44, 82, 96, 6)

  ctx.fillStyle = '#17150F'
  ctx.font = '30px Georgia, serif'
  const words = paper.title.split(' ')
  let line = ''
  let y = 148
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width > 300 && line) {
      ctx.fillText(line, 44, y)
      line = word
      y += 38
      if (y > 360) break
    } else {
      line = next
    }
  }
  if (y <= 360) ctx.fillText(line, 44, y)

  ctx.fillStyle = '#17150F88'
  ctx.font = '18px sans-serif'
  ctx.fillText(`${paper.authors[0]} · ${paper.year}`, 44, 492)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 2
  return texture
}

function Rack({ targets }: { targets: MutableRefObject<HeroTargets> }) {
  const router = useRouter()
  const group = useRef<THREE.Group>(null)
  const cardRefs = useRef<Array<THREE.Group | null>>([])
  const camera = useThree((state) => state.camera)
  // Keep all three cards inside the canvas on narrow (390px) viewports.
  const viewportWidth = useThree((state) => state.viewport.width)
  const targetScale = Math.min(1, viewportWidth / 5.2)

  // All GPU resources are allocated once, never inside useFrame.
  const resources = useMemo(() => {
    const textures = SCENE_PAPERS.map((paper, index) =>
      makeCardTexture(paper, CARD_COLORS[index])
    )
    return {
      bodyGeometry: new THREE.BoxGeometry(1.46, 2.1, 0.1),
      spineGeometry: new THREE.BoxGeometry(0.09, 2.1, 0.14),
      bandGeometry: new THREE.BoxGeometry(1.46, 0.05, 0.12),
      textures,
      bodyMaterials: CARD_COLORS.map(
        (_, index) => new THREE.MeshStandardMaterial({
          color: '#ffffff',
          map: textures[index] ?? null,
          roughness: 0.95,
          metalness: 0,
        })
      ),
      spineMaterials: SPINE_COLORS.map(
        (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0 })
      ),
      bandMaterial: new THREE.MeshStandardMaterial({ color: '#F5C542', roughness: 0.8, metalness: 0 }),
    }
  }, [])

  useEffect(() => () => {
    resources.bodyGeometry.dispose()
    resources.spineGeometry.dispose()
    resources.bandGeometry.dispose()
    resources.textures.forEach((texture) => texture?.dispose())
    resources.bodyMaterials.forEach((material) => material.dispose())
    resources.spineMaterials.forEach((material) => material.dispose())
    resources.bandMaterial.dispose()
    document.body.style.cursor = ''
  }, [resources])

  // useFrame only lerps Three objects toward values written from outside.
  useFrame((_, delta) => {
    const t = targets.current
    const k = 1 - Math.pow(0.0015, Math.min(delta, 0.1))

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t.time * 0.24) * 0.34 + t.scroll * 0.55 + t.pointerX * 0.1,
        k
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -t.pointerY * 0.07,
        k
      )
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        t.scroll * -0.45,
        k
      )
      const nextScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, k)
      group.current.scale.setScalar(nextScale)
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.4 - t.scroll * 0.9, k)

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const hovered = t.hover === index
      const baseZ = index === 1 ? 0.14 : 0
      card.position.z = THREE.MathUtils.lerp(card.position.z, hovered ? baseZ + 0.36 : baseZ, k)
      card.rotation.z = THREE.MathUtils.lerp(card.rotation.z, hovered ? -(index - 1) * 0.03 : 0, k)
    })
  })

  return (
    <>
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 5, 6]} intensity={1.05} />
      <group ref={group}>
        {SCENE_PAPERS.map((paper, index) => (
          <group
            key={paper.id}
            ref={(node) => { cardRefs.current[index] = node }}
            position={[(index - 1) * 1.62, (index - 1) * 0.06, index === 1 ? 0.14 : 0]}
            rotation={[0, (index - 1) * -0.22, 0]}
            onClick={(event) => {
              event.stopPropagation()
              router.push(`/app?paper=${paper.id}`)
            }}
            onPointerOver={(event) => {
              event.stopPropagation()
              targets.current.hover = index
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              targets.current.hover = -1
              document.body.style.cursor = ''
            }}
          >
            <mesh>
              <primitive object={resources.bodyGeometry} attach="geometry" />
              <primitive object={resources.bodyMaterials[index]} attach="material" />
            </mesh>
            <mesh position={[-0.78, 0, 0.02]}>
              <primitive object={resources.spineGeometry} attach="geometry" />
              <primitive object={resources.spineMaterials[index]} attach="material" />
            </mesh>
            <mesh position={[0, 0.62, 0.06]}>
              <primitive object={resources.bandGeometry} attach="geometry" />
              <primitive object={resources.bandMaterial} attach="material" />
            </mesh>
          </group>
        ))}
      </group>
    </>
  )
}

export default function HeroScene({
  targets,
  invalidateRef,
  active,
  onReady,
  onContextLost,
}: HeroSceneProps) {
  useEffect(() => {
    onReady()
  }, [onReady])

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      frameloop={active ? 'demand' : 'never'}
      camera={{ position: [0, 0, 6.4], fov: 34, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      onCreated={({ invalidate, gl }) => {
        invalidateRef.current = invalidate
        gl.domElement.addEventListener('webglcontextlost', onContextLost, { once: true })
        invalidate()
        onReady()
      }}
    >
      <Rack targets={targets} />
    </Canvas>
  )
}
