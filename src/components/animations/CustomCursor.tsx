"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 34, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 500, damping: 34, mass: 0.35 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(fine.matches && !motionQuery.matches)
    update()
    fine.addEventListener("change", update)
    motionQuery.addEventListener("change", update)
    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => {
      fine.removeEventListener("change", update)
      motionQuery.removeEventListener("change", update)
      window.removeEventListener("mousemove", move)
    }
  }, [x, y])

  if (reduce || !enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute ml-[-5px] mt-[-5px] h-2.5 w-2.5 rounded-full bg-signal"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="absolute ml-[-19px] mt-[-19px] h-9 w-9 rounded-full border border-ink/35"
        style={{ x: springX, y: springY }}
      />
    </div>
  )
}
