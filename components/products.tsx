'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { productCategories } from '@/lib/data'

const secondaryVisuals: Record<string, { type: 'image'; src: string; alt: string } | { type: 'swatch'; gradient: string }> = {
  atermicos: {
    type: 'image',
    src: '/images/project-pool.png',
    alt: 'Entorno de piscina con piso perimetral resistente al sol',
  },
  'wall-panel': {
    type: 'swatch',
    gradient: 'linear-gradient(135deg, #8a6647 0%, #5f4530 55%, #3d2c1e 100%)',
  },
  'pisos-flotantes': {
    type: 'swatch',
    gradient: 'linear-gradient(135deg, #c9a877 0%, #9c7a4f 55%, #6b4f30 100%)',
  },
  'deck-pvc': {
    type: 'image',
    src: '/images/project-terrace.png',
    alt: 'Espacio exterior tipo galería con piso de terminación resistente',
  },
}

export function Products() {
  const featured = productCategories.find((c) => c.featured)!
  const secondary = productCategories.filter((c) => !c.featured)

  return (
    <section id="productos" className="px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (01) — Productos
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Nuestro catálogo
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Premoldeados de hormigón, pisos atérmicos y revestimientos para exteriores e
              interiores.
            </p>
          </Reveal>
        </div>

        {/* Featured: Garden Blocks */}
        <Reveal className="mt-10 sm:mt-14" blur={false}>
          <motion.a
            href={featured.href}
            whileHover="hover"
            className="group grid overflow-hidden rounded-2xl border border-border bg-card sm:rounded-3xl lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:order-2">
              <motion.img
                variants={{ hover: { scale: 1.08 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                src="/images/garden-blocks-driveway-after.jpg"
                alt="Acceso vehicular terminado con Garden Blocks de Cristalmat"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground sm:left-6 sm:top-6">
                Categoría principal
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-12">
              <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.description}
              </p>
              <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors group-hover:bg-primary">
                {featured.ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>
        </Reveal>

        {/* Secondary categories */}
        <Stagger className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.map((c) => {
            const visual = secondaryVisuals[c.id]
            return (
              <StaggerItem key={c.id}>
                <motion.a
                  href={c.href}
                  whileHover="hover"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card sm:rounded-3xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {visual?.type === 'image' ? (
                      <motion.img
                        variants={{ hover: { scale: 1.08 } }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        src={visual.src}
                        alt={visual.alt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <motion.div
                        variants={{ hover: { scale: 1.08 } }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full"
                        style={{ background: visual?.gradient }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                      {c.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {c.ctaLabel}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.a>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
