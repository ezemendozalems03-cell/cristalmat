'use client'

import { motion } from 'motion/react'
import { Droplets, ShieldCheck, Waves, Car, LayoutGrid, Timer } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'

const features = [
  {
    icon: Droplets,
    title: 'Drenaje natural',
    desc: 'El agua se filtra directamente al suelo, recargando la napa y evitando anegamientos.',
  },
  {
    icon: ShieldCheck,
    title: 'Mayor resistencia',
    desc: 'Hormigón vibrocomprimido de alta densidad, preparado para cargas exigentes.',
  },
  {
    icon: Waves,
    title: 'No acumula agua',
    desc: 'Superficie permeable que elimina charcos, barro y erosión del terreno.',
  },
  {
    icon: Car,
    title: 'Ideal para vehículos',
    desc: 'Soporta el tránsito diario de autos y camionetas sin deformarse ni hundirse.',
  },
  {
    icon: LayoutGrid,
    title: 'Diseño moderno',
    desc: 'Estética limpia y verde que integra la arquitectura con el paisaje.',
  },
  {
    icon: Timer,
    title: 'Rápida colocación',
    desc: 'Sistema modular que reduce tiempos de obra y costos de mano de obra.',
  },
]

export function WhyChoose() {
  return (
    <section id="beneficios" className="relative cement-grid px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (01) — Beneficios
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              ¿Por qué elegir Garden Blocks?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              No es solo un piso. Es un sistema pensado por ingenieros para durar, drenar y verse
              impecable temporada tras temporada.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(46,125,87,0.35)] sm:rounded-3xl sm:p-8"
              >
                <div className="absolute inset-x-0 -top-24 h-24 bg-[var(--green-light)]/20 blur-3xl transition-all duration-500 group-hover:top-0" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground sm:h-14 sm:w-14 sm:rounded-2xl">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold text-foreground sm:mt-7 sm:text-xl">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3">
                  {f.desc}
                </p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
