'use client'

import { motion } from 'motion/react'
import { MessageCircle, Ruler } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { gardenBlockModels } from '@/lib/data'
import { formatCurrencyARS } from '@/lib/format'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { GARDEN_BLOCK_SELECT_EVENT } from './calculator'

function BlockPattern({ shape }: { shape: string }) {
  const cells = Array.from({ length: 9 })
  return (
    <div className="grid h-full w-full grid-cols-3 gap-1.5 bg-secondary p-4 sm:gap-2 sm:p-6">
      {cells.map((_, i) => (
        <div key={i} className="relative flex items-center justify-center rounded-[3px] bg-white/60">
          {shape === 'rombo' && (
            <div className="h-[55%] w-[55%] rotate-45 rounded-[2px] bg-primary" />
          )}
          {shape === 'numeral' && (
            <div className="grid h-[70%] w-[70%] grid-cols-2 gap-0.5">
              <span className="rounded-[1px] bg-primary" />
              <span className="rounded-[1px] bg-primary/40" />
              <span className="rounded-[1px] bg-primary/40" />
              <span className="rounded-[1px] bg-primary" />
            </div>
          )}
          {shape === 'circular' && <div className="h-[60%] w-[60%] rounded-full bg-primary" />}
          {shape === 'g9' && <div className="h-[75%] w-[45%] rounded-[2px] bg-primary" />}
        </div>
      ))}
    </div>
  )
}

export function GardenBlocks() {
  return (
    <section id="garden-blocks" className="cement-grid px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (02) — Garden Blocks
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Cuatro modelos, un mismo sistema
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Elegí el modelo según el diseño que buscás para tu acceso, cochera o parque.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {gardenBlockModels.map((m) => {
            const waMessage = `Hola Cristalmat, quiero consultar por el modelo ${m.name} de Garden Blocks.`
            return (
              <StaggerItem key={m.id}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card sm:rounded-3xl"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={`Garden Block modelo ${m.name} de hormigón`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <BlockPattern shape={m.id} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground">{m.name}</h3>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Ruler className="h-3.5 w-3.5" />
                      {m.widthCm} × {m.heightCm} cm
                      {m.thicknessCm ? ` · ${m.thicknessCm} cm de espesor` : ''}
                    </div>

                    <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rendimiento</span>
                        <span className="font-medium text-foreground">{m.unitsPerM2} u./m²</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Precio</span>
                        <span className="font-display font-semibold text-primary">
                          {formatCurrencyARS(m.pricePerM2)}/m²
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {m.uses}
                    </p>

                    <div className="mt-5 flex flex-col gap-2">
                      <a
                        href="#calculadora"
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent(GARDEN_BLOCK_SELECT_EVENT, { detail: m.id }),
                          )
                        }
                        className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-colors hover:bg-primary sm:text-sm"
                      >
                        Calcular este modelo
                      </a>
                      <a
                        href={buildWhatsAppUrl(waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:text-sm"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.15} className="mt-6 sm:mt-8">
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Precios de referencia por m², sujetos a confirmación según disponibilidad y volumen del pedido.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
