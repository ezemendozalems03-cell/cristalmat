'use client'

import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { Reveal } from './reveal'

export function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }, [])

  return (
    <section className="bg-secondary px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (06) — Transformación
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Antes y después
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Deslizá para ver la transformación de un terreno de tierra a un acceso premium con Garden Blocks.
            </p>
          </Reveal>
        </div>

        <Reveal blur={false}>
          <div
            ref={containerRef}
            onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX) }}
            onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
            onTouchMove={(e) => { e.preventDefault(); setFromClientX(e.touches[0].clientX) }}
            className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl sm:aspect-[16/10] sm:rounded-3xl md:aspect-[21/9]"
            style={{ touchAction: 'none' }}
          >
            <img
              src="/images/garden-blocks-driveway-after.jpg"
              alt="Acceso terminado con Garden Blocks de Cristalmat"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <span className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur sm:right-5 sm:top-5 sm:px-4 sm:py-1.5 sm:text-xs">
              Después
            </span>

            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src="/images/garden-blocks-driveway-before.jpg"
                alt="Acceso de tierra antes de la obra con Garden Blocks"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ width: containerRef.current?.offsetWidth ?? '100%', maxWidth: 'none' }}
                draggable={false}
              />
              <span className="absolute left-3 top-3 rounded-full bg-foreground/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-background backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:py-1.5 sm:text-xs">
                Antes
              </span>
            </div>

            <div className="absolute inset-y-0 z-10" style={{ left: `calc(${pos}% - 1px)` }}>
              <div className="h-full w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-xl sm:h-12 sm:w-12">
                <MoveHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
