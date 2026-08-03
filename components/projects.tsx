'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'

type Category = 'accesos' | 'cocheras' | 'estacionamientos' | 'parques' | 'piscinas' | 'interiores'

const categoryLabels: Record<Category, string> = {
  accesos: 'Accesos vehiculares',
  cocheras: 'Cocheras',
  estacionamientos: 'Estacionamientos',
  parques: 'Parques',
  piscinas: 'Piscinas y soláriums',
  interiores: 'Revestimientos interiores',
}

type Project = {
  id: string
  name: string
  category: Category
  cover: string | { gradient: string }
  span: string
  ratio: string
  description: string
  benefits: string[]
  gallery: string[]
}

const projects: Project[] = [
  {
    id: 'acceso-vehicular',
    name: 'Acceso vehicular con Garden Blocks',
    category: 'accesos',
    cover: '/images/hero-driveway.png',
    span: 'lg:row-span-2',
    ratio: 'aspect-[4/3] lg:aspect-[4/5]',
    description:
      'Acceso resuelto con Garden Blocks, combinando la resistencia necesaria para el paso de vehículos con la presencia natural del césped.',
    benefits: ['Apto para tránsito vehicular', 'Estética natural', 'Fácil instalación'],
    gallery: ['/images/hero-driveway.png', '/images/product-detail.png'],
  },
  {
    id: 'cochera-residencial',
    name: 'Cochera residencial',
    category: 'cocheras',
    cover: '/images/project-parking.png',
    span: '',
    ratio: 'aspect-[4/3]',
    description:
      'Cochera con superficie transitable y césped integrado, pensada para el uso diario sin perder diseño.',
    benefits: ['Resistencia y durabilidad', 'Diseño para exteriores'],
    gallery: ['/images/project-parking.png', '/images/hero-driveway.png'],
  },
  {
    id: 'estacionamiento-comercial',
    name: 'Estacionamiento comercial',
    category: 'estacionamientos',
    cover: '/images/project-plaza.png',
    span: '',
    ratio: 'aspect-[4/3]',
    description:
      'Superficie premoldeada para espacios de alto tránsito peatonal y vehicular, con una terminación uniforme.',
    benefits: ['Aptos para alto tránsito', 'Resistencia y durabilidad'],
    gallery: ['/images/project-plaza.png'],
  },
  {
    id: 'parque-senderos',
    name: 'Parque con senderos Garden Blocks',
    category: 'parques',
    cover: '/images/project-garden-path.png',
    span: '',
    ratio: 'aspect-[4/3]',
    description:
      'Senderos que combinan piezas premoldeadas y césped, integrando la circulación con el entorno natural.',
    benefits: ['Estética natural', 'Reducción de la erosión'],
    gallery: ['/images/project-garden-path.png'],
  },
  {
    id: 'entorno-piscina',
    name: 'Entorno de piscina con piso atérmico',
    category: 'piscinas',
    cover: '/images/project-pool.png',
    span: 'lg:row-span-2',
    ratio: 'aspect-[4/3] lg:aspect-[4/5]',
    description:
      'Perímetro de piscina y solárium resuelto con una superficie pensada para estar fresca al contacto y ser antideslizante.',
    benefits: ['Atérmicos', 'Antideslizantes', 'Ideales para piscinas y soláriums'],
    gallery: ['/images/project-pool.png', '/images/project-terrace.png'],
  },
  {
    id: 'revestimiento-interior',
    name: 'Revestimiento interior Wall Panel',
    category: 'interiores',
    cover: { gradient: 'linear-gradient(135deg, #8a6647 0%, #5f4530 55%, #3d2c1e 100%)' },
    span: '',
    ratio: 'aspect-[4/3]',
    description:
      'Ambiente interior renovado con revestimiento Wall Panel, de instalación rápida y sin mantenimiento.',
    benefits: ['Fácil limpieza', 'Instalación rápida y sencilla', 'Sin mantenimiento'],
    gallery: [],
  },
]

const filters: Array<Category | 'todos'> = ['todos', 'accesos', 'cocheras', 'estacionamientos', 'parques', 'piscinas', 'interiores']

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const [filter, setFilter] = useState<Category | 'todos'>('todos')

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="proyectos" className="px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (05) — Proyectos
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Obras que hablan por sí solas
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Una selección de accesos, exteriores e interiores realizados con nuestros sistemas.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} blur={false}>
          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  filter === f
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {f === 'todos' ? 'Todos' : categoryLabels[f]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* On mobile: single column. sm: 2 cols. lg: masonry-like 3-col with row-span */}
        <div className="mt-6 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal
              key={p.id}
              delay={(i % 3) * 0.08}
              className={p.span}
              blur={false}
            >
              <button
                onClick={() => setActive(p)}
                className={`group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl ${p.ratio}`}
                aria-label={`Ver proyecto ${p.name}`}
              >
                {typeof p.cover === 'string' ? (
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    style={{ background: p.cover.gradient }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f16]/85 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />
                {/* Always-visible label on mobile; hover-reveal on desktop */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 translate-y-0 opacity-100">
                  <div className="text-left text-white">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">{categoryLabels[p.category]}</p>
                    <h3 className="mt-0.5 font-display text-lg font-semibold sm:text-2xl">{p.name}</h3>
                  </div>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-foreground sm:h-11 sm:w-11">
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-end justify-center overflow-y-auto bg-[#0d1f16]/70 backdrop-blur-md sm:items-start sm:p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle del proyecto ${project.name}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-t-3xl bg-background sm:my-auto sm:rounded-3xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {typeof project.cover === 'string' ? (
            <img
              src={project.cover}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" style={{ background: project.cover.gradient }} />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d1f16] to-transparent p-5 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{categoryLabels[project.category]}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              {project.name}
            </h3>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:gap-8 sm:p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>
            {project.gallery.length > 1 && (
              <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
                {project.gallery.slice(1).map((g) => (
                  <img
                    key={g}
                    src={g}
                    alt={`Imagen adicional — ${project.name}`}
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl bg-secondary p-5 sm:p-6">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
              Beneficios
            </p>
            <ul className="mt-3 space-y-3 sm:mt-4">
              {project.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={onClose}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              Quiero algo así
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
