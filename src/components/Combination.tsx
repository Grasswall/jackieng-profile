'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// The moat: four skills in one person. Evidence lines are verified facts only.
const SKILLS = [
  { name: 'Wet lab', line: 'I run the bench work, from formulation to the 8× transcytosis result.' },
  { name: 'Structural biology', line: 'I solved five cryo-EM structures myself, best at 2.7 Å.' },
  { name: 'Machine learning', line: 'I build the models that guide particle design.' },
  { name: 'Founder', line: 'I took the result into AtomBios, funded with HK$7.05M.' },
]

export function Combination() {
  const ref = useScrollReveal({ stagger: 0.1 })
  return (
    <section id="combination" aria-labelledby="combo-heading" className="bg-[#0B0E14] py-20 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-12">
        <p data-reveal className="font-mono text-xs uppercase tracking-widest text-[#F97316] mb-5">
          Why hire or back me
        </p>
        <h2 data-reveal id="combo-heading" className="text-4xl md:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.1] max-w-[18ch]">
          Four skills, one person.
        </h2>
        <p data-reveal className="mt-6 text-lg md:text-xl text-[#94A3B8] font-light leading-[1.6] max-w-[52ch]">
          Delivery work usually splits across a bench team, a structure team, a model team and a founder. Here it sits in one head, and it produced the 20 nm particle.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => (
            <li key={s.name} data-reveal className="border-t border-[#1E293B] pt-5">
              <h3 className="text-xl font-semibold text-[#F8FAFC]">{s.name}</h3>
              <p className="mt-2 text-[15px] text-[#94A3B8] leading-[1.6]">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
