'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Check, MousePointer2 } from 'lucide-react'
import { useRef } from 'react'
import { MagneticButton } from './magnetic-button'

const bullets = [
  'Más de 850 proyectos realizados',
  'Material de fabricación propia',
  'Envíos a todo el país',
  'Asesoramiento personalizado',
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.75])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = ['No', 'construimos', 'pisos.']
  const words2 = ['Construimos', 'espacios', 'que', 'duran', 'décadas.']

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[var(--green-dark)]">
      {/* Background image with parallax */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-10">
        <img
          src="/images/hero-driveway.png"
          alt="Vista aérea de un acceso realizado con Garden Blocks de Cristalmat"
          className="h-full w-full object-cover"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#0d1f16] via-[#0d1f16]/40 to-[#0d1f16]/50"
        />
      </motion.div>

      {/* Blurred orbs — hidden on mobile to save paint */}
      <div className="pointer-events-none absolute -left-40 top-1/3 hidden h-96 w-96 rounded-full bg-[var(--green-light)]/20 blur-[120px] md:block" />
      <div className="pointer-events-none absolute -right-32 bottom-10 hidden h-80 w-80 rounded-full bg-[var(--green-deep)]/30 blur-[120px] md:block" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 sm:px-6 md:px-10"
      >
        {/* Spacer — pushes content down past the fixed navbar */}
        <div className="shrink-0" style={{ height: 'max(88px, 14svh)' }} />

        {/* Main grid: stacked on mobile, side-by-side on lg */}
        <div className="flex flex-1 flex-col justify-end gap-6 pb-6 lg:grid lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-10 lg:pb-0">

          {/* Headline */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-light)]" />
              Soluciones para exteriores
            </motion.span>

            <h1 className="font-display text-[clamp(2.2rem,8vw,4.5rem)] font-semibold leading-[0.97] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block overflow-hidden">
                <span className="flex flex-wrap gap-x-3">
                  {words.map((w, i) => (
                    <motion.span
                      key={w}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.7 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              </span>
              <span className="block overflow-hidden text-white/85">
                <span className="flex flex-wrap gap-x-3">
                  {words2.map((w, i) => (
                    <motion.span
                      key={w}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.95 + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
            >
              Soluciones premium para exteriores con máxima resistencia, drenaje natural y diseño
              que perdura en el tiempo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
            >
              <MagneticButton href="#contacto" variant="light">
                Solicitar presupuesto
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#proyectos" variant="outline" className="text-white">
                Ver proyectos
              </MagneticButton>
            </motion.div>
          </div>

          {/* Floating glass card — inline on mobile, floating on lg */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark rounded-2xl p-5 text-white shadow-2xl sm:rounded-3xl sm:p-7 lg:mb-0"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-sm">
              Por qué Cristalmat
            </p>
            <ul className="mt-3 space-y-3 sm:mt-5 sm:space-y-4">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.12 }}
                  className="flex items-start gap-3 text-xs leading-snug text-white/90 sm:text-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--green-light)]">
                    <Check className="h-3 w-3 text-[var(--green-dark)]" strokeWidth={3} />
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mb-6 mt-6 hidden items-center gap-3 text-white/60 sm:flex"
        >
          <MousePointer2 className="h-4 w-4" />
          <div className="h-px w-16 overflow-hidden bg-white/20">
            <motion.div
              className="h-full w-1/2 bg-white"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
