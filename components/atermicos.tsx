'use client'

import { motion } from 'motion/react'
import { MessageCircle, ShieldCheck, Sun, Waves, Footprints, Sparkles } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { atermicoBenefits, atermicoColors, atermicoModels } from '@/lib/data'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const benefitIcons = [Sun, Sparkles, Footprints, ShieldCheck, Waves]

const waMessage = 'Hola Cristalmat, quiero consultar por los bordes y pisos atérmicos para mi piscina/solárium.'

const gallery = [
  { src: '/images/atermico-pool-deck.jpg', alt: 'Piso atérmico color marfil alrededor de una piscina', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/images/atermico-pool-deck-2.jpg', alt: 'Deck atérmico junto a una piscina', span: '' },
  { src: '/images/atermico-jacuzzi.jpg', alt: 'Borde atérmico en un jacuzzi exterior', span: '' },
]

export function Atermicos() {
  return (
    <section id="atermicos" className="px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (07) — Bordes y pisos atérmicos
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Frescos al pie, seguros en el borde
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Soluciones para piscinas y soláriums que ofrecen una superficie resistente,
              antideslizante y confortable al contacto con el sol.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
          {atermicoModels.map((m) => (
            <StaggerItem key={m.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:rounded-3xl sm:p-6"
              >
                <div>
                  <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {m.type}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {m.name}
                  </h3>
                </div>
                <Waves className="mt-6 h-6 w-6 text-primary" />
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12} blur={false} className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {gallery.map((g) => (
              <div key={g.src} className={`aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl ${g.span}`}>
                <img src={g.src} alt={g.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-6 sm:mt-8">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:rounded-3xl sm:p-6">
            <span className="text-sm font-medium text-foreground">Colores disponibles:</span>
            {atermicoColors.map((c) => (
              <span key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ background: c === 'Blanco' ? '#ffffff' : '#f2e9d8' }}
                />
                {c}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">— Consultar por variantes, disponibilidad y terminaciones.</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-5">
            {atermicoBenefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length]
              return (
                <Reveal key={b} delay={i * 0.06} className="flex flex-col items-start gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium leading-snug text-foreground">{b}</span>
                </Reveal>
              )
            })}
          </div>

          <a
            href={buildWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
