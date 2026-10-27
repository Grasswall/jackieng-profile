'use client'
import { useRef } from 'react'
import { gsap } from '@/lib/gsapConfig'
import { useGSAP } from '@gsap/react'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  scrollTriggered?: boolean
  splitBy?: 'lines' | 'words'
}

export function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  scrollTriggered = true,
  splitBy = 'lines',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Split text into segments manually
  const segments = splitBy === 'words'
    ? children.split(' ')
    : children.split('\n').length > 1
      ? children.split('\n')
      : [children]

  useGSAP(() => {
    if (!containerRef.current) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spans = containerRef.current.querySelectorAll('.text-reveal-segment')

    const animConfig = {
      y: '110%',
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay,
    }

    if (scrollTriggered) {
      gsap.from(spans, {
        ...animConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    } else {
      gsap.from(spans, animConfig)
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {segments.map((segment, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', width: '100%' }}
          >
            <span className="text-reveal-segment" style={{ display: 'inline-block' }}>
              {segment}
              {splitBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
