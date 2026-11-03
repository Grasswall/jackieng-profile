'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'
import { useGSAP } from '@gsap/react'

// Register useGSAP plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollReveal(options?: {
  delay?: number
  y?: number
  duration?: number
  stagger?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      // Reduced motion: leave everything in its final, visible state.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const elements = containerRef.current.querySelectorAll('[data-reveal]')
      if (elements.length === 0) return

      gsap.from(elements, {
        y: options?.y ?? 28,
        opacity: 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.12,
        delay: options?.delay ?? 0,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return containerRef
}
