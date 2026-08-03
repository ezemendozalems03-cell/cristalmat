'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    function move(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor], input, textarea, [role="button"]')
      setHovering(Boolean(interactive))
    }

    function leave() {
      setHidden(true)
    }

    window.addEventListener('mousemove', move)
    document.body.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          x: hovering ? -28 : -7,
          y: hovering ? -28 : -7,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </motion.div>
  )
}
