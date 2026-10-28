'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Prediction {
  lipids: {
    ionizable: number
    helper: number
    cholesterol: number
    peg: number
  }
  corona: Array<{ protein: string; abundance: number }>
  biodistribution: Array<{ organ: string; accumulation: number }>
}

const organs = ['Brain', 'Liver', 'Lung', 'Tumor', 'Spleen']

// Illustrative example values only — not model output, not experimental data.
const examples: Record<string, Prediction> = {
  Brain: {
    lipids: { ionizable: 42, helper: 18, cholesterol: 35, peg: 5 },
    corona: [
      { protein: 'ApoE', abundance: 38 },
      { protein: 'Clusterin', abundance: 22 },
      { protein: 'ApoA-I', abundance: 15 },
      { protein: 'Albumin', abundance: 12 },
    ],
    biodistribution: [
      { organ: 'Brain', accumulation: 24 },
      { organ: 'Liver', accumulation: 35 },
      { organ: 'Spleen', accumulation: 18 },
      { organ: 'Kidney', accumulation: 12 },
      { organ: 'Lung', accumulation: 11 },
    ],
  },
  Liver: {
    lipids: { ionizable: 50, helper: 10, cholesterol: 38.5, peg: 1.5 },
    corona: [
      { protein: 'ApoE', abundance: 45 },
      { protein: 'ApoB', abundance: 28 },
      { protein: 'Albumin', abundance: 18 },
      { protein: 'IgG', abundance: 9 },
    ],
    biodistribution: [
      { organ: 'Liver', accumulation: 68 },
      { organ: 'Spleen', accumulation: 15 },
      { organ: 'Kidney', accumulation: 9 },
      { organ: 'Lung', accumulation: 5 },
      { organ: 'Brain', accumulation: 3 },
    ],
  },
  Lung: {
    lipids: { ionizable: 38, helper: 22, cholesterol: 32, peg: 8 },
    corona: [
      { protein: 'Surfactant A', abundance: 32 },
      { protein: 'ApoA-I', abundance: 28 },
      { protein: 'Albumin', abundance: 24 },
      { protein: 'IgM', abundance: 16 },
    ],
    biodistribution: [
      { organ: 'Lung', accumulation: 42 },
      { organ: 'Liver', accumulation: 28 },
      { organ: 'Spleen', accumulation: 16 },
      { organ: 'Kidney', accumulation: 9 },
      { organ: 'Brain', accumulation: 5 },
    ],
  },
  Tumor: {
    lipids: { ionizable: 35, helper: 25, cholesterol: 30, peg: 10 },
    corona: [
      { protein: 'Fibrinogen', abundance: 35 },
      { protein: 'Albumin', abundance: 28 },
      { protein: 'IgG', abundance: 22 },
      { protein: 'Complement C3', abundance: 15 },
    ],
    biodistribution: [
      { organ: 'Tumor', accumulation: 32 },
      { organ: 'Liver', accumulation: 38 },
      { organ: 'Spleen', accumulation: 18 },
      { organ: 'Kidney', accumulation: 8 },
      { organ: 'Brain', accumulation: 4 },
    ],
  },
  Spleen: {
    lipids: { ionizable: 45, helper: 15, cholesterol: 36, peg: 4 },
    corona: [
      { protein: 'IgM', abundance: 38 },
      { protein: 'Complement C3', abundance: 28 },
      { protein: 'ApoE', abundance: 20 },
      { protein: 'Fibronectin', abundance: 14 },
    ],
    biodistribution: [
      { organ: 'Spleen', accumulation: 45 },
      { organ: 'Liver', accumulation: 35 },
      { organ: 'Kidney', accumulation: 12 },
      { organ: 'Lung', accumulation: 6 },
      { organ: 'Brain', accumulation: 2 },
    ],
  },
}

export function MLPredictor() {
  const containerRef = useScrollReveal()
  const [selectedOrgan, setSelectedOrgan] = useState('Brain')
  const current = examples[selectedOrgan]

  return (
    <section
      id="ml-predictor"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="ml-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#F97316] bg-[#F97316]/10 rounded-full border border-[#F97316]/20 mb-4">
              Concept — no model trained yet
            </span>
            <h2
              id="ml-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              AI-Guided Formulation Design
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              A mockup of the tool I want to build: pick a target organ, see
              what a formulation recommendation could look like. The numbers
              below are hand-set placeholders to illustrate the interface —
              not model output, not experimental data.
            </p>
          </div>

          <div data-reveal className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Organ selector */}
            <div className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wide mb-4">
                Target Organ
              </h3>
              <div className="space-y-2">
                {organs.map((organ) => (
                  <button
                    key={organ}
                    onClick={() => setSelectedOrgan(organ)}
                    className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedOrgan === organ
                        ? 'bg-[#22D3EE]/20 border-2 border-[#22D3EE] text-[#F8FAFC]'
                        : 'bg-[#1E293B] border-2 border-transparent text-[#94A3B8] hover:border-[#334155] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {organ}
                  </button>
                ))}
              </div>
            </div>

            {/* Example output */}
            <div className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl p-8 space-y-8">
              <h3 className="text-xl font-semibold text-[#F8FAFC]">
                Example output for {selectedOrgan}{' '}
                <span className="text-sm font-normal text-[#94A3B8]">
                  (illustrative)
                </span>
              </h3>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-4">
                  Lipid Composition (mol%)
                </h4>
                <div className="space-y-3">
                  {Object.entries(current.lipids).map(([lipid, value]) => (
                    <div key={lipid}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#F8FAFC] capitalize">
                          {lipid.replace('_', ' ')}
                        </span>
                        <span className="text-[#22D3EE] font-mono">
                          {value}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1E293B] rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#22D3EE] to-[#F97316]"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-4">
                  Example Protein Corona (% abundance)
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {current.corona.map((item) => (
                    <div
                      key={item.protein}
                      className="bg-[#1E293B] rounded-xl p-4"
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-[#F8FAFC] font-medium">
                          {item.protein}
                        </span>
                        <span className="text-[#22D3EE] font-mono text-sm">
                          {item.abundance}%
                        </span>
                      </div>
                      <div className="w-full bg-[#0B0E14] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#22D3EE]"
                          style={{ width: `${item.abundance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-4">
                  Example Biodistribution (% injected dose)
                </h4>
                <div className="space-y-3">
                  {current.biodistribution.map((item) => (
                    <div key={item.organ}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#F8FAFC]">{item.organ}</span>
                        <span className="text-[#F97316] font-mono">
                          {item.accumulation}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1E293B] rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-[#F97316]"
                          style={{ width: `${item.accumulation}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div data-reveal className="text-center text-sm text-[#94A3B8] pt-4">
            <p>
              <span className="text-[#F97316] font-medium">Honest note:</span>{' '}
              No model is trained or running here. This is a UI mockup of a
              research direction, built to show what AI-guided formulation
              design could look like once real proteomics and biodistribution
              data back it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
