'use client'

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import styles from './ResearchDossier.module.css'
import {
  CORONA,
  IDENTITY,
  LINKS,
  MAIL,
  PRESS_LINE,
  PROOFS,
  RECOGNITION,
  SYNTH,
  img,
} from './evidence'

// Position of each record on the size ruler, as a fraction of the log axis (0 = atom, 1 = company).
const RULER = [
  { id: 'structures', at: 0.06, tick: '0.27 nm', name: 'Å resolution' },
  { id: 'pdb', at: 0.12, tick: '0.3 nm', name: 'Å resolution' },
  { id: 'jbc', at: 0.3, tick: 'protein', name: 'domain' },
  { id: 'ml', at: 0.52, tick: 'model', name: 'inputs' },
  { id: 'delivery', at: 0.72, tick: '20 nm', name: 'particle' },
  { id: 'funding', at: 0.94, tick: 'company', name: 'team' },
]

const SPEC = [
  ['Field', 'Structural biology, cryo-EM'],
  ['Applied to', 'Lipid nanoparticle (LNP) design'],
  ['Institution', 'PhD student, PolyU'],
  ['Company', 'Founder, AtomBios'],
  ['Contact', 'jackie.ng@atombios.com'],
]

// Design B. Technical record first: ledger rows with explicit role, status, evidence and boundary.
export function ResearchDossier() {
  const [open, setOpen] = useState<string>(PROOFS[0].id)
  const [hover, setHover] = useState<string | null>(null)
  const focusId = hover ?? open

  return (
    <div className={styles.root}>
      <header className={styles.head}>
        <div className={styles.headMain}>
          <p className={styles.ref}>Research record · 6 entries · checked 31 Oct 2026</p>
          <h1 className={styles.name}>Work across scales</h1>
          <p className={styles.by}>
            <strong>Jackie Ng</strong>. {IDENTITY.line}
          </p>
          <ul className={styles.ctas}>
            <li>
              <a className={styles.ctaSolid} href={MAIL.hire}>
                Discuss a role
              </a>
            </li>
            <li>
              <a className={styles.ctaLine} href={MAIL.collab}>
                Propose a collaboration
              </a>
            </li>
            <li>
              <a className={styles.ctaLine} href={MAIL.cv}>
                Request my CV
              </a>
            </li>
          </ul>
        </div>
        <aside className={styles.spec} aria-label="Profile summary">
          <img
            className={styles.specImg}
            src={img('images/gallery/headshot.jpg')}
            width={832}
            height={1035}
            alt="Portrait of Jackie Ng"
          />
          <dl className={styles.specList}>
            {SPEC.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </header>

      <section className={styles.rulerSec} aria-labelledby="b-ruler">
        <h2 id="b-ruler" className={styles.h2}>
          Scale of each record
        </h2>
        <p className={styles.rulerNote}>
          From atomic resolution to a company. Select a marker or a ledger row to cross-reference.
        </p>
        <div className={styles.ruler}>
          <div className={styles.rulerLine} aria-hidden="true" />
          <ul className={styles.markers}>
            {RULER.map((m) => {
              const p = PROOFS.find((x) => x.id === m.id)!
              const on = focusId === m.id
              return (
                <li key={m.id} style={{ left: `${m.at * 100}%` }}>
                  <button
                    type="button"
                    className={styles.marker}
                    data-on={on}
                    aria-pressed={open === m.id}
                    aria-label={`${p.code} ${p.label}`}
                    onClick={() => {
                      setOpen(m.id)
                      document.getElementById(`b-row-${m.id}`)?.scrollIntoView({ block: 'nearest' })
                    }}
                    onMouseEnter={() => setHover(m.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(m.id)}
                    onBlur={() => setHover(null)}
                  >
                    <span className={styles.markerCode}>{p.code}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className={styles.rulerEnds} aria-hidden="true">
            <span>atomic structure</span>
            <span>molecule</span>
            <span>particle</span>
            <span>company</span>
          </div>
        </div>
      </section>

      <section className={styles.ledgerSec} aria-labelledby="b-ledger">
        <h2 id="b-ledger" className={styles.h2}>
          Contribution ledger
        </h2>
        <p className={styles.rulerNote}>
          Each row states what I did, where it stands, and what it does not show.
        </p>
        <ol className={styles.ledger}>
          {PROOFS.map((p) => {
            const isOpen = open === p.id
            return (
              <li
                key={p.id}
                id={`b-row-${p.id}`}
                className={styles.row}
                data-open={isOpen}
                data-focus={focusId === p.id}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
              >
                <h3 className={styles.rowHead}>
                  <button
                    type="button"
                    className={styles.rowBtn}
                    aria-expanded={isOpen}
                    aria-controls={`b-detail-${p.id}`}
                    onClick={() => setOpen(isOpen ? '' : p.id)}
                  >
                    <span className={styles.code}>{p.code}</span>
                    <span className={styles.rowLabel}>{p.label}</span>
                    <span className={styles.rowStat}>
                      <b>{p.stat}</b>
                      <i>{p.statNote}</i>
                    </span>
                    <span className={styles.chev} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`b-detail-${p.id}`} role="region" aria-label={`${p.label} detail`} hidden={!isOpen} className={styles.detail}>
                  <p className={styles.detailHead}>{p.headline}</p>
                  <p className={styles.detailBody}>{p.body}</p>
                  <dl className={styles.facts}>
                    <div>
                      <dt>Contribution</dt>
                      <dd>{p.role}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{p.status}</dd>
                    </div>
                    <div className={styles.factWide}>
                      <dt>Does not show</dt>
                      <dd>{p.boundary}</dd>
                    </div>
                    <div className={styles.factWide}>
                      <dt>Source</dt>
                      <dd>
                        {p.links ? (
                          <span className={styles.srcLinks}>
                            {p.links.map((l) => (
                              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                                {l.label}
                                <span className="sr-only"> (opens in a new tab)</span>
                              </a>
                            ))}
                          </span>
                        ) : (
                          'Held by the author. Available on request.'
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className={styles.artSec} aria-labelledby="b-art">
        <h2 id="b-art" className={styles.h2}>
          Artifacts
        </h2>
        <div className={styles.artGrid}>
          <figure className={styles.fig}>
            <video
              className={styles.media}
              src={CORONA.video}
              poster={CORONA.poster}
              muted
              loop
              playsInline
              controls
              preload="none"
              aria-label={CORONA.videoLabel}
            />
            <figcaption>
              <span className={styles.figTag}>Cryo-EM · AtomBios LNP corona</span>
              {CORONA.caption}{' '}
              <a href={CORONA.all} target="_blank" rel="noreferrer">
                All 200 classes<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
          <figure className={styles.fig}>
            <video
              className={styles.mediaDark}
              src={SYNTH.video}
              poster={SYNTH.poster}
              muted
              loop
              playsInline
              controls
              preload="none"
              aria-label="3D decision surface from the synthetic-data demo network"
            />
            <figcaption>
              <span className={`${styles.figTag} ${styles.figTagWarn}`}>{SYNTH.label}</span>
              {SYNTH.caption}
            </figcaption>
          </figure>
        </div>
        <ul className={styles.tiles}>
          {CORONA.tiles.map((src, i) => (
            <li key={src}>
              <img src={src} width={231} height={231} loading="lazy" alt={`2D class average ${i + 1} of the LNP protein corona complex, cryo-EM`} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.recSec} aria-labelledby="b-rec">
        <h2 id="b-rec" className={styles.h2}>
          Selection and awards
        </h2>
        <table className={styles.table}>
          <caption className="sr-only">Selections and awards, with photographs</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Item</th>
              <th scope="col">Role</th>
              <th scope="col">
                <span className="sr-only">Photo</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {RECOGNITION.map((r) => (
              <tr key={r.id}>
                <td className={styles.tdYear}>{r.year}</td>
                <th scope="row" className={styles.tdItem}>
                  {r.title}
                </th>
                <td>{r.note}</td>
                <td className={styles.tdPhoto}>
                  <img src={r.photo} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.press}>{PRESS_LINE}</p>
      </section>

      <section className={styles.contact} aria-labelledby="b-contact">
        <div>
          <h2 id="b-contact" className={styles.contactHead}>
            Questions on any row?
          </h2>
          <p className={styles.contactBody}>
            Send the row code with your question. I can share more detail on the work that is not yet public.
          </p>
        </div>
        <ul className={styles.contactList}>
          <li>
            <a className={styles.ctaSolid} href={MAIL.hire}>
              Discuss a role
            </a>
          </li>
          <li>
            <a className={styles.ctaLine} href={MAIL.collab}>
              Propose a collaboration
            </a>
          </li>
          <li>
            <a className={styles.ctaLine} href={MAIL.cv}>
              Request my CV
            </a>
          </li>
          <li>
            <a className={styles.link} href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
