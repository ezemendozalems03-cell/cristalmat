'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'

const faqs = [
  {
    q: '¿Resisten tránsito pesado?',
    a: 'Sí. Nuestros Garden Blocks se fabrican en hormigón vibrocomprimido de alta densidad, preparado para soportar el paso continuo de autos, camionetas y utilitarios. Para tránsito pesado específico recomendamos una base compactada acorde, que definimos en el asesoramiento.',
  },
  {
    q: '¿Necesitan mantenimiento?',
    a: 'Prácticamente no. Al ser un sistema permeable no acumulan agua ni barro, por lo que no requieren mantenimiento anual. Basta con el corte del césped en las piezas verdes y una limpieza ocasional.',
  },
  {
    q: '¿Cómo drenan el agua?',
    a: 'El agua se filtra por las juntas y celdas del sistema directamente hacia el suelo, recargando la napa y evitando anegamientos. Es una solución sustentable que elimina la necesidad de desagües adicionales.',
  },
  {
    q: '¿Se pueden colocar sobre tierra?',
    a: 'Se colocan sobre una base preparada (generalmente arena y material granular compactado) que garantiza estabilidad y drenaje. En el asesoramiento definimos la base ideal según el uso y el tipo de suelo.',
  },
  {
    q: '¿Realizan envíos?',
    a: 'Sí, realizamos envíos a todo el país. Coordinamos la logística según el volumen del proyecto y tu ubicación, con opciones de colocación por equipo propio o guía técnica.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            (07) — Preguntas frecuentes
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-5xl">
            Todo lo que necesitás saber
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-sm sm:text-base">
            ¿Tenés otra duda? Escribinos por WhatsApp y te respondemos al instante.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-medium text-foreground sm:text-lg md:text-xl">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border text-foreground sm:h-9 sm:w-9"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground sm:pb-7 sm:pr-12 sm:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
