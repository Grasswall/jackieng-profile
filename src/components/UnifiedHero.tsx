'use client'

import { FounderLens } from './motion/FounderLens'

export function UnifiedHero() {
  return (
    <section className="lens-hero">
      <div className="lens-hero-inner">
        <div className="lens-stage-col">
          <FounderLens />
        </div>
        <div className="lens-side-col">
          <div className="lens-intro">
            <h1>The protein side<br />of delivery.</h1>
            <p className="lens-intro-sub">
              Jackie Ng · Structural biologist
            </p>
            <p className="lens-intro-description">
              Exploring protein interactions in drug delivery through structural biology and machine learning.
            </p>
            <p className="lens-intro-status">
              PhD student at PolyU · Founder of AtomBios
            </p>
            <div className="lens-actions">
              <a href="#work">
                Explore the work
              </a>
              <a href="mailto:jackie.ng@atombios.com?subject=Research%20collaboration">
                Discuss a research collaboration
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
