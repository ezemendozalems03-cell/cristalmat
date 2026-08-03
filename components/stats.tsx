'use client'

import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 120000, suffix: '+', label: 'm² instalados' },
  { value: 850, suffix: '+', label: 'clientes satisfechos' },
  { value: 18, suffix: '', label: 'años de experiencia' },
  { value: 12, suffix: '', label: 'provincias con envío' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('es-AR')}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 sm:gap-y-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="border-l border-border pl-5 sm:pl-6"
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground sm:mt-3 sm:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
