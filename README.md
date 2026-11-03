# Jackie Ng — personal research site

Next.js App Router, TypeScript and static export to GitHub Pages.
The deployable application is `src/`; only `out/` is published.

## Commands

- `npm ci` — install the locked dependency versions.
- `npm run dev` — development server.
- `npm run lint` — check active source.
- `npm run build` — production build and static export to `out/`.
- `node --experimental-strip-types scripts/protein_benchmark/test-inference.mjs` — numerical parity checks.
- `python3 scripts/check_export.py` — verify built links, anchors, assets and coordinate-file exclusion.

## Source map

- `src/app/`: home, about, work, research, speaking and protein-benchmark routes.
- `src/components/Unified*.tsx`: current homepage sections; `motion/FounderLens.tsx` owns the interactive magnifier.
- `src/app/globals.css`: reset, fonts, Tailwind and reduced-motion base.
- `src/app/unified.css`: shared editorial system; `protein-benchmark.css` styles the executable study.
- `data/`: metadata, navigation and records. Some editorial copy remains in route/component files; it is not all JSON-driven.
- `public/images/gallery/`, `public/videos/structural-work/`: approved existing media.
- `public/data/protein-benchmark/`: public study exports, separate from AtomBios.
- `docs/archive/`: historical guidance and unused components, excluded from lint/typechecking and never deployed.

The governing identity is `/home/jackie/.openclaw/workspaces/brand/BRAND_IDENTITY.md`.
Current status lives in that workspace's `BRAND_STATUS.md`; do not treat archive release notes as current.
See `ARCHITECTURE.md`, `DATA.md` and `CONTRIBUTING.md` for maintenance.

## Preview and deploy

The base path is `/jackieng-profile` and routes have trailing slashes.
To preview, symlink `out/` into a scratch parent as `jackieng-profile`, then serve that parent with `python3 -m http.server`.
Do not use SPA fallback mode: it can return HTML for missing CSS or route files.

Work on a feature branch. After local checks, merge to `main` and push under Jackie's standing site authorization.
GitHub Actions publishes `out/`; verify the exact commit's successful run and read back the live site before saying deployed.
Never publish PDB/mmCIF coordinates or private evidence. Videos of structural work are allowed; third-party evidence remains attributed.
