# Architecture

## Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** GSAP (scroll-triggered) + Framer Motion (transitions)
- **Language:** TypeScript (strict)
- **Deploy:** GitHub Pages via Actions (push to main)
- **Data:** JSON files in `data/` — single source of truth

## Directory Structure

```
jackieng-profile/
├── data/                    # Content (JSON) — agents edit here
│   ├── achievements.json    # All awards, competitions, positions
│   ├── gallery.json         # Work gallery items
│   ├── speaking.json        # Speaking engagements
│   ├── meta.json            # Site-wide config
│   └── navigation.json      # Nav structure
├── public/assets/           # Images — agents add here
├── src/
│   ├── app/                 # Next.js pages (App Router)
│   │   ├── layout.tsx       # Root layout (nav + footer + fonts)
│   │   ├── page.tsx         # Home page
│   │   ├── about/page.tsx   # About page
│   │   ├── work/page.tsx    # Work / AtomBios page
│   │   └── speaking/page.tsx # Speaking & media page
│   ├── components/          # React components
│   │   ├── ui/              # Shared primitives (Button, Card, Badge)
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── data.ts          # Typed JSON loaders
│   │   └── animations.ts    # GSAP/Framer config
│   └── styles/
│       └── globals.css      # Tailwind base + custom props
├── ARCHITECTURE.md          # This file
├── CONTRIBUTING.md          # Agent onboarding
└── DATA.md                  # Content update guide
```

## Data Flow

```
data/*.json → src/lib/data.ts → Page components → UI components
```

Pages import typed data at build time. Components receive data as props. No component reads JSON directly.

## Page Structure

| Route | Purpose | Key data source |
|---|---|---|
| `/` | Home — hero, proof, recognition preview, CTA | meta.json, achievements.json |
| `/about` | Full bio, education, timeline | achievements.json |
| `/work` | AtomBios, gallery, publications | gallery.json, meta.json |
| `/speaking` | Events, media, booking | speaking.json |

## Adding a New Page

1. Create `src/app/<route>/page.tsx`
2. Add entry to `data/navigation.json`
3. Import data via `src/lib/data.ts`
4. Build with existing components from `src/components/`

## Design System

**Typography:**
- Headings: Cormorant Garamond (serif, editorial weight)
- Body: Inter (clean, modern)

**Colors:** See `tailwind.config.ts` — navy, gold, offwhite, charcoal, slate

**Spacing:** Tailwind default scale. Sections use `py-24` or `py-32`.

**Animations:**
- Scroll reveal: GSAP ScrollTrigger with `reveal-up` / `reveal-card` classes
- Page transitions: Framer Motion `AnimatePresence`
- Counters: GSAP number animation on scroll into view

## Deployment

Push to `main` → GitHub Actions builds static export → deploys to GitHub Pages.

Build command: `npm run build` (produces `out/`)
Base path: `/jackieng-profile`
All assets referenced with base path prefix.
