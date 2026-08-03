'use client'

import { motion } from 'motion/react'
import { Award, BadgeCheck, Heart, Settings2, Users } from 'lucide-react'

const values = [
  { icon: BadgeCheck, label: 'Calidad de materiales' },
  { icon: Users, label: 'Asesoramiento personalizado' },
  { icon: Settings2, label: 'Soluciones funcionales' },
  { icon: Heart, label: 'Atención cercana' },
  { icon: Award, label: 'Compromiso con cada proyecto' },
]

export function Values() {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 sm:grid-cols-3 sm:gap-y-12 md:grid-cols-5">
        {values.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="border-l border-border pl-5 sm:pl-6"
          >
            <v.icon className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
              {v.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
