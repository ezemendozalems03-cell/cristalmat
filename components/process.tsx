'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './reveal'

const steps = [
  { n: '01', title: 'Asesoramiento', desc: 'Analizamos tu terreno, uso y objetivos sin compromiso.' },
  { n: '02', title: 'Presupuesto', desc: 'Propuesta clara con materiales, plazos y costos definidos.' },
  { n: '03', title: 'Preparación', desc: 'Coordinamos y preparamos los materiales para tu proyecto.' },
  { n: '04', title: 'Entrega', desc: 'Coordinamos la logística y el envío según tu zona.' },
  { n: '05', title: 'Colocación', desc: 'Te asesoramos o coordinamos la colocación según disponibilidad.' },
  { n: '06', title: 'Resultado final', desc: 'Un espacio resistente, funcional y con una terminación impecable.' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="proceso" className="bg-[var(--green-dark)] px-5 py-16 text-white sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-[var(--green-light)]">
            (10) — Proceso
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.02] tracking-tight text-balance sm:mt-5 sm:text-4xl md:text-6xl">
            De la idea al resultado, sin sobresaltos
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-10 sm:mt-16">
          {/* Horizontal progress line — desktop only */}
          <div className="absolute left-0 top-8 hidden h-px w-full bg-white/15 md:block">
            <motion.div style={{ width: lineWidth }} className="h-full bg-[var(--green-light)]" />
          </div>

          {/* Vertical line — mobile only */}
          <div className="absolute bottom-0 left-7 top-0 w-px bg-white/15 md:hidden" />

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 md:block md:gap-0"
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-[var(--green-dark)] font-display text-base font-semibold text-[var(--green-light)] sm:h-16 sm:w-16 md:h-16 md:w-16">
                  {s.n}
                </div>
                <div className="md:mt-5">
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
