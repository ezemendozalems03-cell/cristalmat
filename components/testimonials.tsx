'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Reveal } from './reveal'

const testimonials = [
  {
    name: 'Martín Álvarez',
    location: 'Pilar, BA',
    avatar: '/images/avatar-1.png',
    text: 'El acceso de casa era un barrial cada vez que llovía. Con los Garden Blocks se terminó el problema y quedó espectacular. Trabajo impecable.',
  },
  {
    name: 'Carolina Ruiz',
    location: 'Rosario, SF',
    avatar: '/images/avatar-2.png',
    text: 'Asesoramiento de principio a fin. Se nota la calidad del material y la terminación. La terraza es ahora el lugar favorito de la familia.',
  },
  {
    name: 'Jorge Medina',
    location: 'Córdoba',
    avatar: '/images/avatar-3.png',
    text: 'Necesitábamos una explanada que soportara mucho tránsito y drenara sola. Cumplieron los plazos y el resultado superó lo esperado.',
  },
  {
    name: 'Lucía Fernández',
    location: 'Nordelta, BA',
    avatar: '/images/avatar-4.png',
    text: 'Como arquitecta valoro la precisión de las piezas. Encajan perfecto y el acabado es de primer nivel. Ya los recomendé a varios clientes.',
  },
]

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[280px] flex-none rounded-2xl border border-border bg-card p-5 sm:w-[340px] sm:rounded-3xl sm:p-7 md:w-[420px]">
      <div className="flex items-center gap-0.5 text-primary sm:gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground sm:mt-5 sm:text-base">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 sm:mt-6">
        <img
          src={t.avatar}
          alt={`Foto de ${t.name}`}
          className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
        />
        <div>
          <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.location}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const row = [...testimonials, ...testimonials]
  return (
    <section className="overflow-hidden bg-secondary py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            (13) — Testimonios
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
            Lo que dicen quienes ya confiaron
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-10 flex overflow-hidden sm:mt-14 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div
          className="flex gap-3 pr-3 sm:gap-5 sm:pr-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, ease: 'linear', duration: 40 }}
        >
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
