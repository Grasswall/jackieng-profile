'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import styles from './FounderNarrative.module.css'
import {
  CORONA,
  HERO_PHOTO,
  IDENTITY,
  LINKS,
  MAIL,
  PRESS_LINE,
  PROOFS,
  RECOGNITION,
  SYNTH,
  img,
} from './evidence'

const byId = (id: string) => PROOFS.find((p) => p.id === id)!

interface Chapter {
  id: string
  n: string
  word: string
  scale: string
  title: string
  lead: string
  proofs: string[]
}

const CHAPTERS: Chapter[] = [
  {
    id: 'bench',
    n: '01',
    word: 'Bench',
    scale: 'Cells and proteins',
    title: 'It started at the bench.',
    lead: 'As an undergraduate at HKUST I worked on how the SARS-CoV-2 spike protein interacts with host cell factors. It taught me how a protein behaves before I could see it.',
    proofs: ['jbc'],
  },
  {
    id: 'structure',
    n: '02',
    word: 'Structure',
    scale: 'Ångström',
    title: 'Then I learned to see molecules.',
    lead: 'Cryo-EM lets me place atoms. I have solved five structures, the best at 2.7 Å, and two flagellar filament maps are already public on the PDB.',
    proofs: ['structures', 'pdb'],
  },
  {
    id: 'model',
    n: '03',
    word: 'Model',
    scale: 'Many formulations',
    title: 'Structure became a model.',
    lead: 'One structure answers one question. Designing a particle means many formulations at once, so I train machine-learning models for LNP design.',
    proofs: ['ml'],
  },
  {
    id: 'company',
    n: '04',
    word: 'Company',
    scale: 'Nanometres to a team',
    title: 'The model needed a company.',
    lead: 'I founded AtomBios to test the designs on a real barrier, the blood-brain barrier, with 20 nm particles.',
    proofs: ['delivery', 'funding'],
  },
]

// Design C. Dark, vertical story. Sticky stage index follows scroll and also jumps on click or key.
export function FounderNarrative() {
  const [active, setActive] = useState('bench')
  const [shown, setShown] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(`c-${c.id}`)).filter(Boolean) as HTMLElement[]
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id.replace('c-', ''))
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6, 1] }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(`c-${id}`)
    if (!el) return
    // Instant jump. The global Lenis smooth scroller owns wheel easing and can swallow native smooth scrolls.
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
    el.focus({ preventScroll: true })
    setActive(id)
  }

  return (
    <div className={`${styles.root} on-dark`}>
      <header className={styles.top}>
        <div className={styles.topText}>
          <p className={styles.kicker}>Bench, structure, model, company</p>
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
        <figure className={styles.topFig}>
          <img src={HERO_PHOTO.src} width={HERO_PHOTO.w} height={HERO_PHOTO.h} alt={HERO_PHOTO.alt} fetchPriority="high" />
          <figcaption>{HERO_PHOTO.caption}</figcaption>
        </figure>
      </header>

      <div className={styles.body}>
        <nav aria-label="Story stages" className={styles.rail}>
          <ol className={styles.railList}>
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={styles.railBtn}
                  aria-current={active === c.id ? 'step' : undefined}
                  onClick={() => jump(c.id)}
                >
                  <span className={styles.railN}>{c.n}</span>
                  <span className={styles.railWord}>{c.word}</span>
                  <span className={styles.railScale}>{c.scale}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.chapters}>
          {CHAPTERS.map((c) => (
            <section
              key={c.id}
              id={`c-${c.id}`}
              tabIndex={-1}
              aria-labelledby={`c-h-${c.id}`}
              className={styles.chapter}
            >
              <p className={styles.chN} aria-hidden="true">
                {c.n}
              </p>
              <p className={styles.chScale}>{c.scale}</p>
              <h2 id={`c-h-${c.id}`} className={styles.chTitle}>
                {c.title}
              </h2>
              <p className={styles.chLead}>{c.lead}</p>

              <ul className={styles.cards}>
                {c.proofs.map((pid) => {
                  const p = byId(pid)
                  const open = !!shown[pid]
                  return (
                    <li key={pid} className={styles.card} data-open={open}>
                      <div className={styles.cardTop}>
                        <p className={styles.cardStat}>{p.stat}</p>
                        <div>
                          <p className={styles.cardNote}>{p.statNote}</p>
                          <p className={styles.cardHead}>{p.headline}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.more}
                        aria-expanded={open}
                        aria-controls={`c-d-${pid}`}
                        onClick={() => setShown((s) => ({ ...s, [pid]: !s[pid] }))}
                      >
                        {open ? 'Hide the detail' : 'Show role, status and limits'}
                      </button>
                      <div id={`c-d-${pid}`} hidden={!open} className={styles.detail}>
                        <p>{p.body}</p>
                        <dl>
                          <div>
                            <dt>My role</dt>
                            <dd>{p.role}</dd>
                          </div>
                          <div>
                            <dt>Status</dt>
                            <dd>{p.status}</dd>
                          </div>
                          <div className={styles.wide}>
                            <dt>Does not show</dt>
                            <dd>{p.boundary}</dd>
                          </div>
                        </dl>
                        {p.links ? (
                          <p className={styles.srcRow}>
                            {p.links.map((l) => (
                              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                                {l.label}
                                <span className="sr-only"> (opens in a new tab)</span>
                              </a>
                            ))}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ul>

              {c.id === 'structure' ? (
                <div className={styles.artifact}>
                  <video
                    src={CORONA.video}
                    poster={CORONA.poster}
                    muted
                    loop
                    playsInline
                    controls
                    preload="none"
                    aria-label={CORONA.videoLabel}
                  />
                  <p>
                    {CORONA.caption}{' '}
                    <a href={CORONA.all} target="_blank" rel="noreferrer">
                      All 200 classes<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              ) : null}

              {c.id === 'model' ? (
                <div className={styles.artifact}>
                  <video
                    src={SYNTH.video}
                    poster={SYNTH.poster}
                    muted
                    loop
                    playsInline
                    controls
                    preload="none"
                    aria-label="3D decision surface from the synthetic-data demo network"
                  />
                  <p>
                    <b className={styles.warn}>{SYNTH.label}.</b> {SYNTH.caption}
                  </p>
                </div>
              ) : null}

              {c.id === 'bench' ? (
                <div className={styles.artifactImg}>
                  <img
                    src={img('images/gallery/headshot.jpg')}
                    width={832}
                    height={1035}
                    alt="Portrait of Jackie Ng"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <section className={styles.along} aria-labelledby="c-along">
        <h2 id="c-along" className={styles.alongHead}>
          Along the way
        </h2>
        <ul className={styles.alongList}>
          {RECOGNITION.map((r) => (
            <li key={r.id}>
              <figure>
                <img src={r.photo} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
                <figcaption>
                  <b>{r.year}</b> {r.title}
                  <span>{r.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className={styles.press}>{PRESS_LINE}</p>
      </section>

      <section className={styles.contact} aria-labelledby="c-contact">
        <h2 id="c-contact" className={styles.contactHead}>
          If this is the work you need, write to me.
        </h2>
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
