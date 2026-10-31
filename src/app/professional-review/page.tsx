import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/professional-review/Review.module.css'
import { ReviewBar } from '@/components/professional-review/ReviewBar'
import { HERO_PHOTO, img } from '@/components/professional-review/evidence'

export const metadata: Metadata = {
  title: 'Professional design review',
  description: 'Three design directions for the professional profile page.',
  robots: { index: false, follow: false },
}

const OPTIONS = [
  {
    key: 'A',
    href: '/professional-review/a/',
    name: 'Editorial scientist',
    recommended: true,
    thumb: HERO_PHOTO.src,
    copy: 'A full-bleed photo of me pitching, a large serif name, then a six-record evidence selector, a staggered photo record and one navy block for the model and cryo-EM artifacts.',
    decide: 'Best first impression for a recruiter or collaborator who has 30 seconds. Keeps the approved cream, serif and navy look.',
    learn: 'Curated, so each proof needs one click to open. Less technical depth above the fold than B.',
  },
  {
    key: 'B',
    href: '/professional-review/b/',
    name: 'Research dossier',
    recommended: false,
    thumb: img('images/corona/map-model-poster.jpg'),
    copy: 'No hero photo. A scale ruler and a contribution ledger put role, status, source and limits on every row. Artifacts and photo record follow as a table.',
    decide: 'Best for a technical hiring manager or PI who wants to check claims before reading anything else.',
    learn: 'Reads as a document, not a person. Weakest on personal presence. Dense on small screens.',
  },
  {
    key: 'C',
    href: '/professional-review/c/',
    name: 'Founder-scientist narrative',
    recommended: false,
    thumb: img('videos/ml-viz/decision-surface-poster.jpg'),
    copy: 'A dark, sticky four-stage path: bench, structure, model, company. Each stage carries its own proof card and artifact. Photo record sits at the end.',
    decide: 'Best for investors, accelerators and cross-disciplinary collaborators who want the arc.',
    learn: 'Long scroll. A technical reader has to pass through the story to reach the evidence. Dark mode departs from the cream homepage.',
  },
]

export default function Hub() {
  return (
    <main className={styles.hub}>
      <ReviewBar current="hub" />
      <div className={styles.hubInner}>
        <p className={styles.hubEyebrow}>Design previews · homepage unchanged</p>
        <h1 className={styles.hubTitle}>Three ways to show the work.</h1>
        <p className={styles.hubLede}>
          Each preview is a full page with the same sourced facts, the same contact links and a way to open each proof. Only the composition differs. The current homepage is unchanged. I recommend A.
        </p>

        <ul className={styles.options}>
          {OPTIONS.map((o) => (
            <li key={o.key} className={`${styles.option} ${o.recommended ? styles.optionRec : ''}`}>
              <div className={styles.thumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.thumb} alt="" loading="lazy" />
              </div>
              <div className={styles.optionBody}>
                <p className={styles.optionKey}>
                  Option {o.key}
                  {o.recommended ? <span className={styles.badge}>Recommended</span> : null}
                </p>
                <h2 className={styles.optionName}>
                  <Link href={o.href} className={styles.optionLink}>
                    {o.name}
                  </Link>
                </h2>
                <p className={styles.optionCopy}>{o.copy}</p>
                <p className={styles.optionDecide}>
                  <strong>Decide.</strong> {o.decide}
                </p>
                <p className={styles.optionDecide} style={{ marginTop: 8, paddingTop: 0, border: 0 }}>
                  <strong>Learn.</strong> {o.learn}
                </p>
                <span className={styles.optionGo} aria-hidden="true">
                  Open preview →
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.notes}>
          <section aria-labelledby="hub-held">
            <h2 id="hub-held">Held constant in all three</h2>
            <ul>
              <li>Heading: Jackie Ng in A, Work across scales in B and C. The identity line sits directly below in all three.</li>
              <li>Five cryo-EM structures solved, best 2.7 Å, publication in progress.</li>
              <li>PDB 9X3T and 9X3V shown as separate public records, not as the five.</li>
              <li>ML work stated without disclosing architecture, data or evaluation. The 3D surface is labeled synthetic.</li>
              <li>8× and 3.2× are team results against conventional LNPs, not clinical efficacy. HK$7.05M is company funding.</li>
              <li>Contact: role, collaboration and CV request by email. No file download.</li>
            </ul>
          </section>
          <section aria-labelledby="hub-open">
            <h2 id="hub-open">Open items for the author</h2>
            <ul>
              <li>Photo crops were set from image dimensions and brightness, not by eye. Check the framing on each page.</li>
                            <li>The five-structure set has no public link until it is published.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
