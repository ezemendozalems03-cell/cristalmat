'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'light'
  strength?: number
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = 'solid',
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform'

  const variants = {
    solid: 'bg-primary text-primary-foreground hover:bg-[var(--green-dark)]',
    outline: 'border border-foreground/20 text-foreground hover:border-foreground/60',
    light: 'bg-background text-foreground hover:bg-secondary',
  }

  const Comp = motion[href ? 'a' : 'button'] as typeof motion.a

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn(base, variants[variant], className)}
      data-cursor="magnetic"
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Comp>
  )
}
