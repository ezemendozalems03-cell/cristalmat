'use client'

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const waMessage = 'Hola Cristalmat, quiero hacer una consulta.'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setShowTop(v > 700)
  })

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            whileHover={{ y: -3 }}
            aria-label="Volver arriba"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/80 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-secondary"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={buildWhatsAppUrl(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
      </motion.a>
    </div>
  )
}
