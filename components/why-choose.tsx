'use client'

import { motion } from 'motion/react'
import { Droplets, ShieldCheck, Sprout, Car, LayoutGrid, Timer } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'

const features = [
  {
    icon: ShieldCheck,
    title: 'Resistencia y durabilidad',
    desc: 'Fabricados en hormigón, pensados para resistir el uso diario durante años.',
  },
  {
    icon: Car,
    title: 'Aptos para alto tránsito',
    desc: 'Soportan el tránsito vehicular en accesos, cocheras y estacionamientos sin deformarse.',
  },
  {
    icon: Sprout,
    title: 'Estética natural',
    desc: 'Integran el verde del césped con una superficie transitable, sin perder presencia natural.',
  },
  {
    icon: Droplets,
    title: 'Reducción de la erosión',
    desc: 'Ayudan a estabilizar el terreno y reducir la erosión frente al paso frecuente.',
  },
  {
    icon: Timer,
    title: 'Fácil instalación',
    desc: 'Sistema modular que simplifica la colocación y reduce los tiempos de obra.',
  },
  {
    icon: LayoutGrid,
    title: 'Diseño para exteriores',
    desc: 'Ideales para accesos, cocheras, estacionamientos y parques que buscan funcionalidad y diseño.',
  },
]

export function WhyChoose() {
  return (
    <section id="beneficios" className="relative cement-grid px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (03) — Beneficios
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              ¿Por qué elegir Garden Blocks?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              No es solo un piso. Es un sistema pensado para resistir el uso diario y verse
              impecable, integrando el césped a una superficie transitable.
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
