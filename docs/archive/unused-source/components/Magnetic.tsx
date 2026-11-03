'use client'

import { useRef, type ReactNode } from 'react'

// Pulls its child a few pixels toward a mouse pointer. Touch and keyboard users
// get the child as-is; the child keeps its own hover and focus styles.
export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block p-3 -m-3 transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  )
}
