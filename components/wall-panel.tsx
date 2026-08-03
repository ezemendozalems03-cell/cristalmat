'use client'

import { MessageCircle, Sparkles, Leaf, ShieldCheck, Wrench, Timer, HandMetal } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { wallPanelBenefits, wallPanelLines, wallPanelSpecs } from '@/lib/data'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const finishColors: Record<string, string> = {
  Haya: '#c9a877',
  Nogal: '#5f4530',
  Teca: '#8a6647',
  'Roble Americano': '#b8916b',
}

const benefitIcons = [Sparkles, Leaf, ShieldCheck, HandMetal, Timer, Wrench]

const specs = [
  { label: 'Alto', value: `${wallPanelSpecs.heightMm} mm` },
  { label: 'Ancho de pieza', value: `${wallPanelSpecs.pieceWidthMm} mm` },
  { label: 'Ancho útil', value: `${wallPanelSpecs.usableWidthMm} mm` },
  { label: 'Espesor', value: `${wallPanelSpecs.thicknessMm} mm` },
]

const waMessage = 'Hola Cristalmat, quiero consultar por los revestimientos Wall Panel.'

export function WallPanel() {
  return (
    <section id="wall-panel" className="bg-secondary px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (08) — Wall Panel
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
              Revestimientos con terminación cálida
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Revestimientos fabricados en MDF recubierto en PVC símil madera, para renovar
              paredes, cielorrasos, muebles y puertas con una terminación moderna.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2">
          {wallPanelLines.map((line) => (
            <StaggerItem key={line.id}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 sm:rounded-3xl sm:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {line.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {line.finishes.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 text-xs font-medium text-foreground"
                    >
                      <span
                        className="h-5 w-5 rounded-full"
                        style={{ background: finishColors[f] ?? '#8a6647' }}
                      />
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-8 border-t border-border pt-5 text-sm">
                  <div>
                    <p className="text-muted-foreground">Presentación</p>
                    <p className="mt-1 font-medium text-foreground">Caja de {line.boxUnits} unidades</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rendimiento aprox.</p>
                    <p className="mt-1 font-medium text-foreground">{line.yieldM2} m²</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-4 sm:mt-5">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4 sm:rounded-3xl sm:p-8">
            {specs.map((s) => (
              <div key={s.label}>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
                <p className="mt-1.5 font-display text-lg font-semibold text-foreground sm:text-xl">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {wallPanelBenefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length]
              return (
                <Reveal key={b} delay={i * 0.05} className="flex flex-col items-start gap-3">
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
