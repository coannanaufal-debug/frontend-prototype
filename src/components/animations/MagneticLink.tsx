"use client"

import Link from "next/link"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { ReactNode } from "react"

interface MagneticLinkProps {
  href: string
  className?: string
  children: ReactNode
}

export default function MagneticLink({ href, className, children }: MagneticLinkProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  return (
    <motion.div className="inline-flex" style={reduce ? undefined : { x: springX, y: springY }}>
      <Link
        href={href}
        className={className}
        onMouseMove={(event) => {
          if (reduce) return
          const rect = event.currentTarget.getBoundingClientRect()
          x.set((event.clientX - rect.left - rect.width / 2) * 0.18)
          y.set((event.clientY - rect.top - rect.height / 2) * 0.18)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        {children}
      </Link>
    </motion.div>
  )
}
