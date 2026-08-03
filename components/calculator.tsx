'use client'

import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, MessageCircle, Truck } from 'lucide-react'
import { Reveal } from './reveal'
import { gardenBlockModels, getVolumeDiscount, shippingZones } from '@/lib/data'
import { formatCurrencyARS } from '@/lib/format'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const GARDEN_BLOCK_SELECT_EVENT = 'garden-blocks:select-model'

const marginOptions = [
  { id: 'none', label: 'Sin margen', pct: 0 },
  { id: '5', label: '5% adicional', pct: 5 },
  { id: '10', label: '10% adicional', pct: 10 },
] as const

type MarginId = (typeof marginOptions)[number]['id']

const fieldClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary'
const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground'

export function Calculator() {
  const [modelId, setModelId] = useState(gardenBlockModels[0].id)
  const [areaInput, setAreaInput] = useState('')
  const [marginId, setMarginId] = useState<MarginId>('none')
  const [zoneId, setZoneId] = useState('')

  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [locality, setLocality] = useState('')
  const [comment, setComment] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    function onSelect(e: Event) {
      const id = (e as CustomEvent<string>).detail
      if (gardenBlockModels.some((m) => m.id === id)) setModelId(id)
    }
    window.addEventListener(GARDEN_BLOCK_SELECT_EVENT, onSelect)
    return () => window.removeEventListener(GARDEN_BLOCK_SELECT_EVENT, onSelect)
  }, [])

  useEffect(() => {
    const zone = shippingZones.find((z) => z.id === zoneId)
    if (zone) setLocality(zone.name)
  }, [zoneId])

  const model = gardenBlockModels.find((m) => m.id === modelId) ?? gardenBlockModels[0]
  const margin = marginOptions.find((m) => m.id === marginId) ?? marginOptions[0]

  const area = Number(areaInput)
  const areaValid = areaInput.trim() !== '' && Number.isFinite(area) && area > 0
  const areaTouched = areaInput.trim() !== ''

  const calc = useMemo(() => {
    if (!areaValid) return null
    const totalArea = area * (1 + margin.pct / 100)
    const blocks = Math.ceil(totalArea * model.unitsPerM2)
    const subtotal = totalArea * model.pricePerM2
    const discount = getVolumeDiscount(totalArea)
    const discountAmount = subtotal * (discount.percentage / 100)
    const totalWithPromo = subtotal - discountAmount
    const zone = shippingZones.find((z) => z.id === zoneId) ?? null
    const shippingPrice = zone?.price ?? null
    const baseTotal = discount.percentage > 0 ? totalWithPromo : subtotal
    const grandTotal = baseTotal + (shippingPrice ?? 0)
    return {
      totalArea,
      blocks,
      subtotal,
      discount,
      discountAmount,
      totalWithPromo,
      zone,
      shippingPrice,
      baseTotal,
      grandTotal,
    }
  }, [areaValid, area, margin.pct, model, zoneId])

  function buildCalculatorMessage() {
    if (!calc) return ''
    const marginPart =
      margin.pct > 0
        ? ` (con ${margin.pct}% de margen adicional, total ${calc.totalArea.toLocaleString('es-AR', { maximumFractionDigits: 2 })} m²)`
        : ''
    const zonePart = calc.zone ? ` Mi zona es ${calc.zone.name}.` : ''
    return `Hola Cristalmat, quiero solicitar una cotización. Me interesa el modelo ${model.name} para una superficie de ${areaInput} m²${marginPart}. La calculadora estimó aproximadamente ${calc.blocks} bloques y un subtotal de ${formatCurrencyARS(calc.subtotal)}.${zonePart}`
  }

  async function handleQuoteSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting || submitted) return

    if (!areaValid) {
      setFormError('Ingresá una superficie válida en la calculadora antes de enviar.')
      return
    }
    if (!name.trim() || !whatsapp.trim()) {
      setFormError('Completá tu nombre y WhatsApp para continuar.')
      return
    }

    setFormError('')
    setSubmitting(true)

    // Hoy la consulta se envía por WhatsApp. Este es el único punto que hay que
    // tocar para integrarlo a futuro con Supabase, Resend o un CRM.
    const message = [
      buildCalculatorMessage(),
      `Nombre: ${name.trim()}.`,
      `WhatsApp de contacto: ${whatsapp.trim()}.`,
      email.trim() ? `Correo: ${email.trim()}.` : null,
      locality.trim() ? `Localidad/zona: ${locality.trim()}.` : null,
      comment.trim() ? `Comentario: ${comment.trim()}.` : null,
    ]
      .filter(Boolean)
      .join(' ')

    await new Promise((resolve) => setTimeout(resolve, 500))
    window.open(buildWhatsAppUrl(message), '_blank')
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="calculadora" className="bg-secondary px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            (04) — Calculadora
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-6xl">
            Calculá los materiales para tu proyecto
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            Elegí el modelo, ingresá la superficie y obtené una estimación de materiales al
            instante.
          </p>
        </Reveal>

        <Reveal delay={0.1} blur={false}>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-[1fr_1fr]">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:rounded-3xl sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="calc-model" className={labelClass}>
                    Modelo
                  </label>
                  <select
                    id="calc-model"
                    className={fieldClass}
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                  >
                    {gardenBlockModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-area" className={labelClass}>
                    Superficie (m²)
                  </label>
                  <input
                    id="calc-area"
                    type="number"
                    min={0.01}
                    step={0.01}
                    inputMode="decimal"
                    placeholder="Ej: 25"
                    className={fieldClass}
                    value={areaInput}
                    onChange={(e) => {
                      const v = e.target.value
                      if (v === '' || Number(v) >= 0) setAreaInput(v)
                    }}
                  />
                  {areaTouched && !areaValid && (
                    <p className="mt-1.5 text-xs text-destructive">
                      Ingresá una superficie mayor a 0.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="calc-margin" className={labelClass}>
                    Margen adicional
                  </label>
                  <select
                    id="calc-margin"
                    className={fieldClass}
                    value={marginId}
                    onChange={(e) => setMarginId(e.target.value as MarginId)}
                  >
                    {marginOptions.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Contempla cortes, desperdicios o piezas adicionales.
                  </p>
                </div>

                <div>
                  <label htmlFor="calc-zone" className={labelClass}>
                    Zona de entrega (opcional)
                  </label>
                  <select
                    id="calc-zone"
                    className={fieldClass}
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                  >
                    <option value="">Seleccionar zona</option>
                    {shippingZones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                El cálculo es estimativo. La cantidad definitiva, disponibilidad, colocación y
                costo de envío deben confirmarse con Cristalmat.
              </p>
            </div>

            {/* Results */}
            <div className="flex flex-col rounded-2xl border border-border bg-[var(--green-dark)] p-6 text-background sm:rounded-3xl sm:p-8">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-background/50">
                Estimación
              </p>

              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Modelo" value={model.name} />
                <Row label="Superficie ingresada" value={areaValid ? `${area.toLocaleString('es-AR', { maximumFractionDigits: 2 })} m²` : '—'} />
                <Row
                  label="Superficie total (con margen)"
                  value={calc ? `${calc.totalArea.toLocaleString('es-AR', { maximumFractionDigits: 2 })} m²` : '—'}
                />
                <Row label="Cantidad estimada de bloques" value={calc ? `${calc.blocks} u.` : '—'} />
                <Row label="Precio por m²" value={formatCurrencyARS(model.pricePerM2)} />
              </dl>

              <div className="mt-5 border-t border-background/15 pt-5">
                {calc && calc.discount.percentage > 0 ? (
                  <div className="space-y-2 text-sm">
                    <Row label="Subtotal original" value={formatCurrencyARS(calc.subtotal)} />
                    <Row
                      label={`Descuento (${calc.discount.percentage}%)`}
                      value={`- ${formatCurrencyARS(calc.discountAmount)}`}
                    />
                    <Row label="Total con promoción" value={formatCurrencyARS(calc.totalWithPromo)} strong />
                  </div>
                ) : (
                  <Row
                    label="Subtotal estimado de materiales"
                    value={calc ? formatCurrencyARS(calc.subtotal) : '—'}
                    strong
                  />
                )}
              </div>

              <div className="mt-5 flex items-start gap-2.5 border-t border-background/15 pt-5 text-sm">
                <Truck className="mt-0.5 h-4 w-4 flex-none text-[var(--green-light)]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-background/70">Envío</span>
                    <span className="font-medium">
                      {calc?.zone
                        ? calc.shippingPrice !== null
                          ? formatCurrencyARS(calc.shippingPrice)
                          : 'A confirmar'
                        : 'Elegí una zona'}
                    </span>
                  </div>
                  {calc?.zone && calc.shippingPrice === null && (
                    <p className="mt-1 text-xs text-background/50">
                      Envío a confirmar según ubicación y volumen del pedido.
                    </p>
                  )}
                </div>
              </div>

              {calc && (
                <div className="mt-5 flex items-center justify-between border-t border-background/15 pt-5">
                  <span className="font-display text-sm uppercase tracking-[0.15em] text-background/70">
                    Total estimado
                  </span>
                  <span className="font-display text-2xl font-semibold text-[var(--green-light)]">
                    {formatCurrencyARS(calc.grandTotal)}
                    {calc.zone && calc.shippingPrice === null && (
                      <span className="ml-1 text-sm font-normal text-background/50">+ envío</span>
                    )}
                  </span>
                </div>
              )}

              <p className="mt-5 text-xs text-background/50">
                Consultá por condiciones especiales para obras y compras por cantidad.
              </p>

              <a
                href={calc ? buildWhatsAppUrl(buildCalculatorMessage()) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!calc}
                onClick={(e) => {
                  if (!calc) e.preventDefault()
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 aria-disabled:pointer-events-none aria-disabled:opacity-40"
              >
                <MessageCircle className="h-4 w-4" />
                Solicitar cotización por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cotización preliminar */}
        <Reveal delay={0.15} blur={false}>
          <div className="mt-4 rounded-2xl border border-border bg-card p-6 sm:mt-5 sm:rounded-3xl sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
              Recibí una cotización preliminar
            </h3>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
              Dejanos tus datos y te contactamos con una estimación del proyecto. La cotización
              final se confirma con Cristalmat.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-secondary p-5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    ¡Listo! Abrimos WhatsApp con tu consulta.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Si no se abrió automáticamente, escribinos por WhatsApp para confirmar tu
                    estimación del proyecto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="q-name" className={labelClass}>
                    Nombre *
                  </label>
                  <input
                    id="q-name"
                    className={fieldClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="q-whatsapp" className={labelClass}>
                    WhatsApp *
                  </label>
                  <input
                    id="q-whatsapp"
                    type="tel"
                    className={fieldClass}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="q-email" className={labelClass}>
                    Correo electrónico (opcional)
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    className={fieldClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="q-locality" className={labelClass}>
                    Localidad o zona
                  </label>
                  <input
                    id="q-locality"
                    className={fieldClass}
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="q-comment" className={labelClass}>
                    Comentario (opcional)
                  </label>
                  <textarea
                    id="q-comment"
                    rows={3}
                    className={fieldClass}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                {formError && (
                  <p className="sm:col-span-2 text-sm text-destructive">{formError}</p>
                )}

                <div className="sm:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary disabled:pointer-events-none disabled:opacity-60"
                  >
                    {submitting ? 'Enviando…' : 'Recibir cotización'}
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-background/70">{label}</dt>
      <dd className={strong ? 'font-display font-semibold text-[var(--green-light)]' : 'font-medium'}>
        {value}
      </dd>
    </div>
  )
}
