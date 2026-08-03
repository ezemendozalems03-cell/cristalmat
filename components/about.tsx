'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './reveal'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="nosotros" className="cement-grid px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal blur={false}>
          <div ref={ref} className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.img
              style={{ y: imgY, scale: 1.15 }}
              src="/images/team.png"
              alt="Equipo de Cristalmat en la planta de fabricación"
              className="aspect-[4/3] w-full object-cover sm:aspect-[4/5]"
            />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-2xl sm:p-5">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
                Fabricación propia
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Control total de la calidad, de la materia prima a la obra.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              (05) — Nosotros
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:mt-5 sm:text-4xl md:text-5xl">
              Ingeniería y oficio detrás de cada pieza
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:space-y-5 sm:text-base">
              <p>
                Somos una empresa dedicada a la fabricación de premoldeados de hormigón y soluciones
                drenantes para exteriores. Nacimos combinando la precisión de la ingeniería con el
                oficio de quienes trabajan la obra todos los días.
              </p>
              <p>
                Fabricamos con materia prima seleccionada y procesos controlados, para garantizar
                resistencia, durabilidad y una terminación impecable. No vendemos un producto:
                acompañamos cada proyecto de principio a fin.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-7 sm:mt-10 sm:pt-8">
              <div>
                <p className="font-display text-xl font-semibold italic text-foreground sm:text-2xl">
                  Cristalmat
                </p>
                <p className="text-sm text-muted-foreground">Precisión, calidad y compromiso.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
