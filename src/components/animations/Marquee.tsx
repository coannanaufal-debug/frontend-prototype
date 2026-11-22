"use client"

import { motion, useReducedMotion } from "motion/react"
import { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  className?: string
  duration?: number
}

export default function Marquee({ children, className = "", duration = 28 }: MarqueeProps) {
  const reduce = useReducedMotion()

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
