'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between transition-all duration-500',
          scrolled
            ? 'my-2 max-w-6xl rounded-full glass px-5 py-2.5 shadow-[0_8px_40px_rgba(17,17,17,0.12)] sm:my-3 sm:px-6 sm:py-3'
            : 'max-w-7xl px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-7',
        )}
      >
        <a href="#top" className="flex flex-shrink-0 items-center gap-2" aria-label="Cristalmat inicio">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--green-light)] text-[var(--green-dark)]">
            <span className="font-display text-sm font-bold">C</span>
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
            Cristalmat
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--green-light)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-[var(--green-dark)] transition-colors hover:bg-[var(--green-light)] md:inline-flex lg:px-6 lg:py-2.5"
        >
          Solicitar presupuesto
        </a>

        <button
          onClick={() => setOpen(true)}
          className="flex flex-shrink-0 items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--green-dark)] px-5 py-5 text-white md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--green-light)] text-[var(--green-dark)]">
                  <span className="font-display text-sm font-bold">C</span>
                </span>
                <span className="font-display text-base font-semibold">Cristalmat</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border-b border-white/10 py-5 font-display text-3xl font-medium tracking-tight transition-colors hover:text-[var(--green-light)]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contacto"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-auto rounded-2xl bg-white px-6 py-4 text-center text-base font-semibold text-[var(--green-dark)] transition-colors hover:bg-[var(--green-light)]"
            >
              Solicitar presupuesto
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
