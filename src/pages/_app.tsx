// src/pages/_app.tsx
import type { AppProps } from 'next/app'
import { MotionConfig } from 'motion/react'
import CustomCursor from '../components/animations/CustomCursor'
import ScrollProgress from '../components/animations/ScrollProgress'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CustomCursor />
      <Component {...pageProps} />
    </MotionConfig>
  )
}
