'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Layers, Sun } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const items = [
  {
    id: 'pisos-flotantes',
    icon: Layers,
    name: 'Pisos flotantes',
    description:
      'Soluciones prácticas para transformar espacios interiores con una estética cálida, moderna y de rápida instalación.',
    gradient: 'linear-gradient(135deg, #c9a877 0%, #9c7a4f 55%, #6b4f30 100%)',
    waMessage: 'Hola Cristalmat, quiero consultar opciones de pisos flotantes.',
  },
  {
    id: 'deck-pvc',
    icon: Sun,
    name: 'Deck de PVC',
    description:
      'Alternativa resistente y de bajo mantenimiento para patios, piscinas, galerías y otros espacios exteriores.',
    gradient: 'linear-gradient(135deg, #6b7269 0%, #3f453d 55%, #232821 100%)',
    waMessage: 'Hola Cristalmat, quiero consultar opciones de deck de PVC.',
  },
]

export function MoreProducts() {
  return (
    <section id="mas-productos" className="px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            (09) — Más soluciones
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
            Pisos flotantes y deck de PVC
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            Estamos incorporando modelos y fotos específicas de estas líneas. Mientras tanto,
            consultanos y te asesoramos según tu proyecto.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          {items.map((it) => (
            <StaggerItem key={it.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="relative flex h-full flex-col justify-end overflow-hidden rounded-2xl p-6 text-white sm:rounded-3xl sm:p-8 min-h-[280px] sm:min-h-[320px]"
                style={{ background: it.gradient }}
              >
                <it.icon className="absolute right-6 top-6 h-8 w-8 text-white/30 sm:right-8 sm:top-8" />
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">{it.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                  {it.description}
                </p>
                <a
                  href={buildWhatsAppUrl(it.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/90"
                >
                  Consultar opciones
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
