'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function WordSeparator({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2])

  return (
    <div ref={ref} className="relative flex items-center justify-center overflow-hidden py-10 sm:py-16 md:py-24">
      <motion.h2
        style={{ x, opacity }}
        className="select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none tracking-tighter text-foreground/[0.06] sm:text-[22vw] md:text-[18vw]"
        aria-hidden
      >
        {word}
      </motion.h2>
      <span className="sr-only">{word}</span>
    </div>
  )
}
