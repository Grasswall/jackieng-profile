# Architecture

## Active application

- Next.js 14 static export (`next.config.js`), React and strict TypeScript.
- `src/app/layout.tsx` provides navigation, footer, font variables and metadata.
- Homepage: interactive lens → structural work → GB1 benchmark → research direction → recognition → contact.
- `/about/`, `/work/`, `/research/`, `/speaking/` and `/protein-benchmark/` are distinct public routes.
- `/professional-review/` and its A/B/C routes are historical comparison pages retained pending an explicit retirement decision; they are not the homepage or current design specification.

## Styling and interaction

Cormorant Garamond + Inter; cream, navy and teal. Shared tokens and editorial styles live in `src/app/unified.css`; global resets are in `globals.css`.
Keep the existing draggable, keyboard-operable `FounderLens`. Lenis handles smooth scrolling, with reduced-motion support.
Unused prior components and CSS are preserved under `docs/archive/unused-source/`, outside active compilation.

## Data boundaries

`data/meta.json` and `data/navigation.json` feed shared chrome through `src/lib/data.ts`.
Editorial text also lives in route and section components. `DATA.md` identifies the actual owners.
The public GB1 benchmark loads its exported models and experimental dataset metadata from `public/data/protein-benchmark/`; it is not delivery validation or the private AtomBios model.
Structural videos are presentation assets, not public coordinate downloads.

## Delivery

`npm run build` exports to `out/`. Base path: `/jackieng-profile`; trailing slash enabled.
GitHub Actions builds and publishes `out/` on pushes to `main`.
Files in `docs/` are not public assets. Archived source is excluded in `tsconfig.json` and `.eslintignore`.
