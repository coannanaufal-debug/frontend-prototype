"use client"

import { AnimatePresence, motion } from "motion/react"

export default function Toast({ message }: { message: string | null }) {
  return (
    <div className="pointer-events-none fixed bottom-28 left-1/2 z-[80] -translate-x-1/2 md:bottom-8">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-cream shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
