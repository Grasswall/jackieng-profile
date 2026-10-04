'use client'

import { useEffect, useRef } from 'react'

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = sectionRef.current
    if (el) {
      const reveals = el.querySelectorAll('.reveal')
      reveals.forEach((reveal) => observer.observe(reveal))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="problem" className="section" ref={sectionRef}>
      <div className="section-inner">
        <div className="problem-grid">
          <div className="problem-text">
            <div className="reveal">
              <p className="section-label">01 — THE PROBLEM</p>
              <h2 className="section-heading">Drug delivery is the bottleneck.</h2>
            </div>

            <div className="reveal">
              <p className="section-paragraph">
                Over 90% of promising therapeutic molecules never reach patients. The science is proven. The payloads work. But they can&apos;t get to the right cells.
              </p>
            </div>

            <div className="reveal">
              <p className="section-paragraph">
                The current approach: trial-and-error. Pharma teams test hundreds of nanoparticle formulations&mdash;varying lipid ratios, sizes, surface coatings&mdash;hoping one works. Each iteration takes months. Most fail in animal studies.
              </p>
            </div>

            <div className="reveal">
              <p className="section-paragraph">
                The core issue isn&apos;t the payload. It&apos;s that delivery design is still empirical. We&apos;re changing that.
              </p>
            </div>
          </div>

          <div className="problem-visual reveal">
            <svg viewBox="0 0 400 300" className="problem-diagram" aria-label="Drug delivery failure visualization">
              {/* Payload */}
              <g>
                <circle cx="60" cy="150" r="20" fill="var(--accent-cyan)" opacity="0.8" />
                <text x="60" y="190" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">
                  Payload
                </text>
                <text x="60" y="208" textAnchor="middle" fill="var(--text-muted)" fontSize="12">
                  (proven)
                </text>
              </g>

              {/* Arrow */}
              <path d="M 90 150 L 130 150" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Failed formulations grid */}
              <g>
                {Array.from({ length: 48 }).map((_, i) => {
                  const row = Math.floor(i / 8)
                  const col = i % 8
                  const x = 150 + col * 20
                  const y = 90 + row * 20
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="6" fill="none" stroke="var(--text-muted)" strokeWidth="1" opacity="0.4" />
                      <path
                        d={`M ${x - 4} ${y - 4} L ${x + 4} ${y + 4} M ${x + 4} ${y - 4} L ${x - 4} ${y + 4}`}
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                    </g>
                  )
                })}
                <text x="230" y="225" textAnchor="middle" fill="var(--text-muted)" fontSize="12">
                  Hundreds of failed formulations
                </text>
              </g>

              {/* Rare success */}
              <g>
                <circle cx="340" cy="150" r="16" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                <path
                  d="M 332 150 L 338 156 L 348 144"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="340" y="190" textAnchor="middle" fill="var(--accent-cyan)" fontSize="14" fontWeight="600">
                  Rare
                </text>
                <text x="340" y="208" textAnchor="middle" fill="var(--accent-cyan)" fontSize="14" fontWeight="600">
                  Success
                </text>
              </g>

              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="var(--text-muted)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
