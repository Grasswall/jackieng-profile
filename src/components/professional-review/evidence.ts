// Shared, sourced facts for the three professional-review previews.
// Every claim here traces to cv/source.yaml, data/meta.json, existing site components,
// or the public RCSB / Crossref records checked on 2026-10-31. Keep boundaries with the claims.

import { meta } from '@/lib/data'

export const BASE = '/jackieng-profile'
export const img = (path: string) => `${BASE}/${path}`
export const EMAIL = meta.email
export const mail = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

export const MAIL = {
  hire: mail('Role discussion'),
  collab: mail('Research collaboration'),
  cv: mail('CV request'),
}

export const LINKS = {
  linkedin: meta.socials.linkedin,
  jbc: 'https://doi.org/10.1016/j.jbc.2024.107390',
  pdbT: 'https://www.rcsb.org/structure/9X3T',
  pdbV: 'https://www.rcsb.org/structure/9X3V',
}

export const IDENTITY = {
  name: 'Jackie Ng',
  line: 'Structural biologist. PhD student at PolyU. I train machine-learning models for lipid nanoparticle (LNP) design and founded AtomBios.',
  short: ['Structural biologist', 'PhD student, PolyU', 'Trains ML for LNP design', 'Founder, AtomBios'],
}

export interface Proof {
  id: string
  code: string
  label: string
  stat: string
  statNote: string
  headline: string
  body: string
  role: string
  status: string
  boundary: string
  links?: { label: string; href: string }[]
  scale: string
}

export const PROOFS: Proof[] = [
  {
    id: 'structures',
    code: 'R-01',
    label: 'Cryo-EM structures',
    stat: '5',
    statNote: 'solved, best at 2.7 Å',
    headline: 'Five cryo-EM structures solved. The best reaches 2.7 Å.',
    body: 'I solved all five myself. The best map reaches 2.7 Å. The work is not yet published, so the targets stay unnamed here.',
    role: 'Solved the structures',
    status: 'Publication in progress',
    boundary: 'Not yet published, so there is no public record to link for the five-structure set.',
    scale: 'Å',
  },
  {
    id: 'pdb',
    code: 'R-02',
    label: 'Public PDB entries',
    stat: '2',
    statNote: 'public entries: 9X3T, 9X3V',
    headline: 'Two flagellar filament structures are public on the PDB.',
    body: '9X3T is the Vibrio parahaemolyticus VP288 flagellar filament at 2.98 Å. 9X3V is the Vibrio cholerae flagellar filament at 3.1 Å. Both were released on 14 October 2026.',
    role: 'Deposition record, linked as evidence',
    status: 'Public, RCSB',
    boundary: 'Separate evidence. These entries are not the 2.7 Å structure, and they do not mean all five structures are published.',
    links: [
      { label: 'RCSB 9X3T', href: LINKS.pdbT },
      { label: 'RCSB 9X3V', href: LINKS.pdbV },
    ],
    scale: 'Å',
  },
  {
    id: 'jbc',
    code: 'R-03',
    label: 'JBC 2024',
    stat: '2024',
    statNote: 'Journal of Biological Chemistry',
    headline: 'Coauthor on a host-factor study of the SARS-CoV-2 spike.',
    body: 'Identifications of novel host cell factors that interact with the receptor-binding domain of the SARS-CoV-2 spike protein. J Biol Chem 300, 107390. Undergraduate research at HKUST.',
    role: 'Coauthor',
    status: 'Published',
    boundary: 'One of several authors. The paper is bench work, separate from the cryo-EM and LNP work.',
    links: [{ label: 'doi:10.1016/j.jbc.2024.107390', href: LINKS.jbc }],
    scale: 'bench',
  },
  {
    id: 'ml',
    code: 'R-04',
    label: 'ML for LNP design',
    stat: '1,600',
    statNote: 'synthetic formulations in the demo',
    headline: 'I train the machine-learning models myself.',
    body: 'I train models for LNP design at AtomBios. The 3D surface on this page comes from a separate demo network trained on synthetic data: 7 inputs, 16 hidden units, 4 outputs.',
    role: 'Trains the models',
    status: 'Demo is synthetic',
    boundary: 'Architecture, data and evaluation of the AtomBios models are not disclosed. The demo is not experimental validation and not the AtomBios model.',
    scale: 'model',
  },
  {
    id: 'delivery',
    code: 'R-05',
    label: 'Brain delivery',
    stat: '8×',
    statNote: 'BBB transcytosis, 3.2× brain accumulation',
    headline: '20 nm particles, 8× BBB transcytosis, 3.2× brain accumulation.',
    body: 'Both figures compare the AtomBios 20 nm particles with conventional LNPs in team experiments. They describe preclinical delivery measurements, not patient outcomes.',
    role: 'AtomBios team result',
    status: 'Preclinical',
    boundary: 'Team experimental results against conventional LNPs. Not clinical efficacy.',
    scale: 'nm',
  },
  {
    id: 'funding',
    code: 'R-06',
    label: 'Company funding',
    stat: 'HK$7.05M',
    statNote: 'funding to AtomBios',
    headline: 'AtomBios has raised HK$7.05M in funding.',
    body: 'I founded AtomBios. The company is incubated at HKSTP and pitched at the WIN in Suzhou Global Finals in 2026.',
    role: 'Founder',
    status: 'Company funding',
    boundary: 'Funding went to the company. It is not a personal grant.',
    scale: 'company',
  },
]

export interface Recognition {
  id: string
  title: string
  year: string
  note: string
  photo: string
  w: number
  h: number
  alt: string
  caption: string
}

export const RECOGNITION: Recognition[] = [
  {
    id: 'lindau',
    title: 'Lindau Nobel Laureate Meeting',
    year: '2025',
    note: 'Selected participant',
    photo: img('images/gallery/lindau-1.jpg'),
    w: 1200,
    h: 1600,
    alt: 'Jackie Ng at the Lindau Nobel Laureate Meeting, 2025',
    caption: 'Lindau Nobel Laureate Meeting, 2025.',
  },
  {
    id: 'shaw',
    title: 'Shaw Prize Forum',
    year: '2025',
    note: 'Academic representative',
    photo: img('images/gallery/shaw-1.jpg'),
    w: 2000,
    h: 1125,
    alt: 'Jackie Ng at the Laureates Roundtable, Shaw Prize Forum, 2025',
    caption: 'Laureates Roundtable at the Shaw Prize Forum, academic representative, 2025.',
  },
  {
    id: 'techathon',
    title: 'Techathon+ 10th Anniversary',
    year: '2026',
    note: 'Gold Medal',
    photo: img('images/gallery/techathon-1.jpg'),
    w: 2000,
    h: 1333,
    alt: 'Jackie Ng at Techathon+ 10th Anniversary, 2026',
    caption: 'Techathon+ 10th Anniversary, Gold Medal, 2026.',
  },
  {
    id: 'pku',
    title: 'PKU–Cambridge Hong Kong Station',
    year: '2026',
    note: 'Champion',
    photo: img('images/gallery/champion-1.jpg'),
    w: 2000,
    h: 1333,
    alt: 'Jackie Ng at the pitch competition final round, 2026',
    caption: 'Pitch competition final round, 2026.',
  },
]

export const HERO_PHOTO = {
  src: img('images/gallery/suzhou-pitch.jpg'),
  w: 2000,
  h: 1356,
  alt: 'Jackie Ng pitching AtomBios on stage at the WIN in Suzhou Global Entrepreneurship Competition finals',
  caption: 'Pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals, 2026.',
}

export const PRESS_LINE = 'Also featured by RTHK, BRTV, Ming Pao and Sing Tao. Press coverage, not technical proof.'

export const SYNTH = {
  poster: img('videos/ml-viz/decision-surface-poster.jpg'),
  video: img('videos/ml-viz/decision-surface.mp4'),
  label: 'Synthetic-data demonstration',
  caption:
    'Output of the 7-input, 16-hidden-unit, 4-output demo network trained on 1,600 synthetic formulations. A two-input slice: particle size and ApoE density against predicted brain-targeting probability. Not experimental validation. Not the AtomBios model.',
}

export const CORONA = {
  tiles: [1, 2, 3, 4, 5].map((n) => img(`images/corona/class-0${n}.png`)),
  poster: img('images/corona/map-model-poster.jpg'),
  video: img('images/corona/map-model.mp4'),
  all: img('images/corona/j160-all-classes.jpg'),
  caption:
    'The protein complex forming the AtomBios LNP protein corona, by cryo-EM. Top 5 of 200 2D classes by particle count (cryoSPARC job J160, iteration 20). 200 Å scale bar on the first tile.',
  videoLabel: 'Rotating cryo-EM density map with fitted atomic model',
}

export const ROLES_ORDER = ['hire', 'collab', 'cv'] as const
