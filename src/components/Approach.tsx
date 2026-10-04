'use client'

import { useEffect, useRef } from 'react'

export function Approach() {
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
    <section id="approach" className="section section-dark" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">02 — THE APPROACH</p>
          <h2 className="section-heading">
            We&apos;re building a foundation model that predicts optimal delivery formulations before synthesis.
          </h2>
        </div>

        <div className="reveal">
          <p className="approach-intro">
            Train on simulation + experimental data. Predict what will work. Validate in the lab. Feed results back into the model. Compound the learning.
          </p>
        </div>

        <div className="reveal">
          <h3 className="approach-subheading">How it works</h3>
        </div>

        <div className="reveal flow-diagram">
          <div className="flow-box">
            <div className="flow-box-header">Input</div>
            <ul className="flow-box-list">
              <li>Cargo type (mRNA, siRNA, protein)</li>
              <li>Target tissue</li>
              <li>Physiological constraints</li>
            </ul>
          </div>

          <div className="flow-arrow" aria-hidden="true">→</div>

          <div className="flow-box flow-box-highlight">
            <div className="flow-box-header">Model</div>
            <ul className="flow-box-list">
              <li>Multi-modal learning</li>
              <li>MD simulations (GROMACS/OpenMM)</li>
              <li>Published datasets</li>
              <li>Partner experimental results</li>
              <li>Growing formulation-outcome dataset</li>
            </ul>
          </div>

          <div className="flow-arrow" aria-hidden="true">→</div>

          <div className="flow-box">
            <div className="flow-box-header">Output</div>
            <ul className="flow-box-list">
              <li>Optimal formulation (size, lipid composition, ligands)</li>
              <li>Predicted biodistribution</li>
              <li>Endosomal escape probability</li>
            </ul>
          </div>

          <div className="flow-arrow flow-arrow-return" aria-hidden="true">↻</div>

          <div className="flow-box flow-box-secondary">
            <div className="flow-box-header">Validation</div>
            <ul className="flow-box-list">
              <li>Lab synthesis</li>
              <li>In vitro testing</li>
              <li>In vivo validation</li>
            </ul>
          </div>
        </div>

        <div className="reveal">
          <p className="approach-detail-heading">Technical depth</p>
          <p className="section-paragraph">
            Training data: molecular dynamics simulations, published nanoparticle datasets, experimental validation from our lab and pharma partners. Architecture: multi-modal learning across simulation and experimental observables, geometric representations of lipid assemblies. Expanding training data through partner collaborations.
          </p>
        </div>

        <div className="reveal">
          <p className="approach-detail-heading">Why this is hard</p>
          <p className="section-paragraph">
            Nanoparticle behavior is multi-scale (atomic interactions → tissue-level biodistribution) and context-dependent (same particle behaves differently in blood vs. tumor microenvironment). Conventional ML fails because it treats formulation as a black box. We train on mechanistic simulations that capture the underlying physics.
          </p>
        </div>
      </div>
    </section>
  )
}
