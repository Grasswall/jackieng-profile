import Link from 'next/link'
import study from '../../public/data/protein-benchmark/metadata.json'
import model from '../../public/data/protein-benchmark/model.json'

export function UnifiedBenchmark() {
  return <section id="benchmark" className="u-section u-section-cream">
    <div className="benchmark-teaser">
      <div>
        <p className="u-kicker">Public modelling study</p>
        <h2>Does a richer model travel further?</h2>
        <p>A GB1 protein-fitness study comparing additive and pairwise representations on real experimental data. Inspect the predictions, the baseline and the held-out results.</p>
        <p className="u-provenance">New AI-assisted public study using Wu et al. (2016). Sequence-only models, separate from AtomBios. This is a modelling example, not evidence of delivery performance.</p>
        <Link href="/protein-benchmark" className="benchmark-link">Explore the working benchmark ↗</Link>
      </div>
      <div className="benchmark-metrics">
        <div className="benchmark-metric"><strong>{study.records.toLocaleString('en-US')}</strong><span>Experimental variants in the source dataset</span></div>
        <div className="benchmark-metric"><strong>{model.models.pairwise.metrics.test.r2_log1p.toFixed(3).replace('-', '−')}</strong><span>Pairwise model test R² on log1p fitness. Better than the additive model, but limited extrapolation.</span></div>
        <p className="u-provenance">Four mutable sites in one protein. Train on 0–2 mutations, validate on 3, test on 4. Full methods and reproducible inference on the study page.</p>
      </div>
    </div>
  </section>
}
