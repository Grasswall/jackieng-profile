'use client'

import { useState, useEffect } from 'react'
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

const predictions: Record<string, Prediction> = {
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
  const [isComputing, setIsComputing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentPrediction = predictions[selectedOrgan]

  const handlePredict = () => {
    setIsComputing(true)
    setShowResults(false)
    setProgress(0)

    // Simulate inference progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComputing(false)
          setShowResults(true)
          return 100
        }
        return prev + 2
      })
    }, 30)
  }

  useEffect(() => {
    // Auto-run on mount
    const timer = setTimeout(() => handlePredict(), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleOrganChange = (organ: string) => {
    setSelectedOrgan(organ)
    setShowResults(false)
  }

  return (
    <section
      id="ml-predictor"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="ml-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <h2
              id="ml-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              AI-Guided Formulation Design
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              Computational prediction of lipid composition and protein corona
              for programmable organ targeting. Demo model trained on synthetic
              biodistribution data.
            </p>
          </div>

          {/* Input Panel */}
          <div data-reveal className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-[#F8FAFC] mb-6">
                Target Organ
              </h3>
              <div className="space-y-3">
                {organs.map((organ) => (
                  <button
                    key={organ}
                    onClick={() => handleOrganChange(organ)}
                    disabled={isComputing}
                    className={`w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                      selectedOrgan === organ
                        ? 'bg-[#22D3EE]/20 border-2 border-[#22D3EE] text-[#F8FAFC]'
                        : 'bg-[#1E293B] border-2 border-transparent text-[#94A3B8] hover:border-[#334155] hover:text-[#F8FAFC]'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {organ}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePredict}
                disabled={isComputing}
                className="w-full mt-8 bg-[#F97316] hover:bg-[#22D3EE] text-[#0B0E14] font-semibold px-8 py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isComputing ? 'Computing...' : 'Predict Formulation'}
              </button>
            </div>

            {/* Computing Animation */}
            <div className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center">
              {isComputing && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <p className="text-lg font-medium text-[#22D3EE] mb-2">
                      Running inference...
                    </p>
                    <p className="text-sm text-[#94A3B8]">{progress}%</p>
                  </div>
                  <div className="w-full bg-[#1E293B] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#22D3EE] to-[#F97316] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-[#22D3EE]/20 animate-pulse"
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {!isComputing && !showResults && (
                <div className="text-center text-[#94A3B8]">
                  <p className="text-lg">Select target organ and predict</p>
                </div>
              )}
              {showResults && (
                <div className="w-full text-center">
                  <div className="inline-flex items-center gap-2 text-[#22D3EE] text-lg font-medium mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Prediction Complete
                  </div>
                  <p className="text-sm text-[#94A3B8]">
                    Scroll down to see results
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          {showResults && (
            <div
              data-reveal
              className="border border-[#22D3EE]/30 bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl p-8 space-y-8"
            >
              <h3 className="text-2xl font-semibold text-[#F8FAFC]">
                Predicted Formulation for {selectedOrgan}
              </h3>

              {/* Lipid Composition */}
              <div>
                <h4 className="text-lg font-medium text-[#22D3EE] mb-4">
                  Lipid Composition (mol%)
                </h4>
                <div className="space-y-3">
                  {Object.entries(currentPrediction.lipids).map(
                    ([lipid, value]) => (
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
                    )
                  )}
                </div>
              </div>

              {/* Predicted Corona */}
              <div>
                <h4 className="text-lg font-medium text-[#22D3EE] mb-4">
                  Predicted Protein Corona (% abundance)
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentPrediction.corona.map((item) => (
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

              {/* Biodistribution */}
              <div>
                <h4 className="text-lg font-medium text-[#22D3EE] mb-4">
                  Expected Biodistribution (% injected dose)
                </h4>
                <div className="space-y-3">
                  {currentPrediction.biodistribution.map((item) => (
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
          )}

          <div data-reveal className="text-center text-sm text-[#94A3B8] pt-8">
            <p>
              <span className="text-[#22D3EE] font-medium">Note:</span> This is
              a demonstration model trained on synthetic data. Real predictions
              require experimental validation with proteomics and in vivo
              biodistribution studies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
