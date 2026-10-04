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
      const elements = containerRef.current.querySelectorAll('[data-reveal]')
      if (elements.length === 0) return

      gsap.from(elements, {
        y: options?.y ?? 60,
        opacity: 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.15,
        delay: options?.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: containerRef }
  )

  return containerRef
}
