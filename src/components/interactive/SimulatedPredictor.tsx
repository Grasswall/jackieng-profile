'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import {
  CLASSES,
  Trainer,
  accuracy,
  generate,
  predict,
  type Dataset,
  type Formulation,
  type SortType,
} from '@/lib/formulationSim'

const TOTAL_EPOCHS = 300
const EPOCHS_PER_FRAME = 6

const presets: Array<{ name: string; f: Formulation }> = [
  { name: 'No SORT lipid', f: { sort: 'none', sortMol: 0, size: 80, apoe: 0, peg: 1.5 } },
  { name: 'Cationic 50 mol%', f: { sort: 'cationic', sortMol: 50, size: 80, apoe: 0, peg: 1.5 } },
  { name: 'Anionic 40 mol%', f: { sort: 'anionic', sortMol: 40, size: 80, apoe: 0, peg: 1.5 } },
  { name: '20 nm + ApoE', f: { sort: 'none', sortMol: 0, size: 20, apoe: 1, peg: 1.5 } },
]

const organColor: Record<string, string> = {
  Liver: '#F97316',
  Lung: '#22D3EE',
  Spleen: '#A78BFA',
  Brain: '#34D399',
}

function LossCurve({ losses }: { losses: number[] }) {
  const w = 480
  const h = 120
  if (losses.length < 2) {
    return <div className="h-[120px] rounded-xl bg-[#1E293B]" aria-hidden="true" />
  }
  const max = Math.max(...losses)
  const min = Math.min(...losses)
  const span = max - min || 1
  const pts = losses
    .map((l, i) => {
      const x = (i / (TOTAL_EPOCHS - 1)) * w
      const y = h - 8 - ((l - min) / span) * (h - 16)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-[120px] rounded-xl bg-[#1E293B]"
      role="img"
      aria-label={`Training loss falling from ${max.toFixed(2)} to ${losses[losses.length - 1].toFixed(2)}`}
    >
      <polyline points={pts} fill="none" stroke="#22D3EE" strokeWidth="2" />
    </svg>
  )
}

export function SimulatedPredictor() {
  const containerRef = useScrollReveal()
  const trainerRef = useRef<Trainer | null>(null)
  const testRef = useRef<Dataset | null>(null)
  const rafRef = useRef<number | null>(null)

  const [phase, setPhase] = useState<'idle' | 'training' | 'done'>('idle')
  const [losses, setLosses] = useState<number[]>([])
  const [stats, setStats] = useState<{ test: number; ceiling: number } | null>(null)
  const [f, setF] = useState<Formulation>(presets[3].f)
  const [probs, setProbs] = useState<number[] | null>(null)

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const train = useCallback(() => {
    if (phase === 'training') return
    const trainSet = generate(1600, 1)
    const testSet = generate(400, 2)
    testRef.current = testSet
    const trainer = new Trainer(trainSet)
    trainerRef.current = trainer
    setLosses([])
    setStats(null)
    setProbs(null)
    setPhase('training')
    const history: number[] = []

    const tick = () => {
      for (let i = 0; i < EPOCHS_PER_FRAME && trainer.epoch < TOTAL_EPOCHS; i++) {
        history.push(trainer.step())
      }
      setLosses([...history])
      if (trainer.epoch < TOTAL_EPOCHS) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setStats({ test: accuracy(trainer.net, testSet), ceiling: testSet.ceiling })
        setProbs(predict(trainer.net, f))
        setPhase('done')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [phase, f])

  const update = (patch: Partial<Formulation>) => {
    const next = { ...f, ...patch }
    if (next.sort === 'none') next.sortMol = 0
    else if (next.sortMol === 0) next.sortMol = 25
    setF(next)
    if (trainerRef.current && phase === 'done') setProbs(predict(trainerRef.current.net, next))
  }

  const top = probs ? probs.indexOf(Math.max(...probs)) : -1

  return (
    <section
      id="simulation"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="sim-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#F97316] bg-[#F97316]/10 rounded-full border border-[#F97316]/20 mb-4">
              Simulation. Synthetic data. Not experimental results.
            </span>
            <h2
              id="sim-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Train a formulation-to-organ model in your browser
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              A small neural network, trained live on 1,600 synthetic
              formulations. The training labels come from a rule set I wrote.
              The model learns my rules. It does not learn biology.
            </p>
          </div>

          <div data-reveal className="grid md:grid-cols-3 gap-4">
            {[
              {
                tag: 'From the literature',
                color: '#22D3EE',
                body: 'The directions. Cationic lipids push expression to lung, anionic lipids to spleen, ApoE on a small particle favors brain (SORT papers, ApoE/BBB review).',
              },
              {
                tag: 'My assumptions',
                color: '#F97316',
                body: 'Every magnitude. The coefficients, the size penalty, the PEG effect and the label noise are numbers I chose. None come from a paper.',
              },
              {
                tag: 'Simulated',
                color: '#A78BFA',
                body: 'Every training example. Formulations are sampled at random and labeled by sampling from my rule set. No animal or cell data is involved.',
              },
            ].map((c) => (
              <div
                key={c.tag}
                className="rounded-2xl border border-[#1E293B] bg-[#0B0E14]/60 p-6"
                style={{ borderTopColor: c.color, borderTopWidth: 3 }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: c.color }}>
                  {c.tag}
                </h3>
                <p className="text-sm text-[#94A3B8]">{c.body}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[#1E293B] bg-[#0B0E14]/60 p-8 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-[#F8FAFC]">1. Train</h3>
                <button
                  onClick={train}
                  disabled={phase === 'training'}
                  className="px-5 py-2 rounded-xl font-medium bg-[#22D3EE] text-[#0B0E14] hover:bg-[#67E8F9] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#F8FAFC]"
                >
                  {phase === 'idle' ? 'Generate data and train' : phase === 'training' ? 'Training' : 'Retrain'}
                </button>
              </div>
              <LossCurve losses={losses} />
              <p className="text-sm text-[#94A3B8]" aria-live="polite">
                {phase === 'idle' && 'Press the button. Training runs on your device and takes about a second.'}
                {phase === 'training' &&
                  `Epoch ${losses.length} of ${TOTAL_EPOCHS}. Cross-entropy loss ${losses[losses.length - 1]?.toFixed(3) ?? ''}`}
                {phase === 'done' && stats &&
                  `Held-out accuracy ${(stats.test * 100).toFixed(1)}% on 400 synthetic formulations. The label noise caps any model at about ${(stats.ceiling * 100).toFixed(1)}% on this set.`}
              </p>
              <p className="text-xs text-[#64748B]">
                Architecture: 7 inputs, 16 tanh units, 4-way softmax. Full-batch
                Adam, 300 epochs. All code runs in this page.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1E293B] bg-[#0B0E14]/60 p-8 space-y-5">
              <h3 className="text-xl font-semibold text-[#F8FAFC]">2. Query</h3>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => update(p.f)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <label className="block text-sm text-[#94A3B8]">
                SORT lipid type
                <select
                  value={f.sort}
                  onChange={(e) => update({ sort: e.target.value as SortType })}
                  className="mt-1 w-full rounded-lg bg-[#1E293B] border border-[#334155] text-[#F8FAFC] px-3 py-2"
                >
                  <option value="none">None</option>
                  <option value="ionizable">Ionizable cationic</option>
                  <option value="cationic">Permanently cationic</option>
                  <option value="anionic">Anionic</option>
                </select>
              </label>

              {([
                ['sortMol', 'SORT lipid (mol%)', 0, 50, 1, f.sortMol, f.sort === 'none'],
                ['size', 'Particle size (nm)', 20, 150, 1, f.size, false],
                ['apoe', 'ApoE ligand density (0 to 1)', 0, 1, 0.05, f.apoe, false],
                ['peg', 'PEG lipid (mol%)', 0.5, 10, 0.5, f.peg, false],
              ] as const).map(([key, label, min, max, step, value, disabled]) => (
                <label key={key} className="block text-sm text-[#94A3B8]">
                  <span className="flex justify-between">
                    <span>{label}</span>
                    <span className="font-mono text-[#F8FAFC]">{Number(value).toFixed(step < 1 ? 2 : 0)}</span>
                  </span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => update({ [key]: Number(e.target.value) } as Partial<Formulation>)}
                    className="w-full accent-[#22D3EE] disabled:opacity-40"
                  />
                </label>
              ))}
            </div>
          </div>

          <div data-reveal className="rounded-2xl border border-[#1E293B] bg-[#0B0E14]/60 p-8">
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-1">3. Simulated output</h3>
            <p className="text-sm text-[#94A3B8] mb-6">
              {probs
                ? `The trained model puts this formulation in ${CLASSES[top]} with probability ${(probs[top] * 100).toFixed(0)}%. This is a statement about my synthetic rules.`
                : 'Train the model to see its predictions.'}
            </p>
            <div className="space-y-4">
              {CLASSES.map((c, i) => {
                const p = probs ? probs[i] : 0
                return (
                  <div key={c}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#F8FAFC]">{c}</span>
                      <span className="font-mono text-[#94A3B8]">{probs ? `${(p * 100).toFixed(1)}%` : '-'}</span>
                    </div>
                    <div className="h-3 rounded-full bg-[#1E293B] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${p * 100}%`, backgroundColor: organColor[c] }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 text-xs text-[#64748B] border-l-2 border-[#F97316] pl-4">
              Brain is the rarest class in the training set (about 3% of
              examples) because my rules make it hard to reach. A real model
              needs real proteomics and biodistribution data. That is the
              dataset I want to build.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
