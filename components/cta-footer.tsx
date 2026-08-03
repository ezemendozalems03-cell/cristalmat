'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, MapPin, Phone, MessageCircle } from 'lucide-react'
import { MagneticButton } from './magnetic-button'
import { Reveal } from './reveal'

const contactItems = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+54 9 000 000-0000', href: 'https://wa.me/5490000000000' },
  { icon: Phone, label: 'Teléfono', value: '+54 000 000-0000', href: 'tel:+540000000000' },
  { icon: MapPin, label: 'Dirección', value: 'Ruta 000 km 00, Buenos Aires', href: '#' },
]

export function CtaFooter() {
  return (
    <>
      <section
        id="contacto"
        className="relative flex min-h-[80svh] items-center overflow-hidden bg-[var(--green-dark)] px-5 py-16 text-white sm:px-6 sm:py-24 md:min-h-[90svh] md:px-10"
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[var(--green-light)]/20 blur-[130px] md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[var(--green-deep)]/40 blur-[140px] md:h-[28rem] md:w-[28rem]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-[var(--green-light)]">
              (08) — Empecemos
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,10vw,5rem)] font-semibold leading-[0.97] tracking-tight text-balance sm:text-6xl md:mt-6 md:text-8xl">
              Tu próximo proyecto<br className="hidden sm:block" /> empieza acá.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 md:mt-10">
              <MagneticButton href="https://wa.me/5490000000000" variant="light" className="px-7 py-4 text-sm sm:px-10 sm:py-5 sm:text-base">
                Solicitar presupuesto
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Contact grid — stacked on mobile, 3-col on sm+ */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:mt-16 sm:grid-cols-3 sm:rounded-3xl">
            {contactItems.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 bg-[var(--green-dark)] p-5 transition-colors hover:bg-[var(--green-deep)] sm:flex-col sm:items-start sm:gap-3 sm:p-7"
              >
                <c.icon className="h-5 w-5 flex-shrink-0 text-[var(--green-light)] sm:h-6 sm:w-6" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">{c.label}</span>
                  <span className="font-display text-base font-medium sm:text-lg">{c.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-foreground px-5 py-12 text-background sm:px-6 sm:py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 sm:gap-10 sm:pb-12 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground sm:h-9 sm:w-9">
                  <span className="font-display text-sm font-bold">C</span>
                </span>
                <span className="font-display text-xl font-semibold sm:text-2xl">Cristalmat</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/60">
                Fabricación propia de Garden Blocks, premoldeados y pisos drenantes para exteriores
                que duran décadas.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-x-8">
              {[
                ['Beneficios', '#beneficios'],
                ['Proyectos', '#proyectos'],
                ['Proceso', '#proceso'],
                ['Nosotros', '#nosotros'],
                ['FAQ', '#faq'],
                ['Contacto', '#contacto'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-background/70 transition-colors hover:text-background"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-background/50 sm:pt-8 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Cristalmat. Todos los derechos reservados.</p>
            <div className="flex gap-5 sm:gap-6">
              <a href="https://wa.me/5490000000000" className="hover:text-background">WhatsApp</a>
              <a href="#" className="hover:text-background">Instagram</a>
              <a href="#" className="hover:text-background">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
