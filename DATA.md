# Content ownership

- `data/meta.json`: name, email, social links, site description and headline reference.
- `data/navigation.json`: navigation entries. Use root-relative route hrefs; Next adds the base path.
- `data/achievements.json`: records available through `src/lib/data.ts`; selected recognition also has curated component copy.
- `data/speaking.json`, `data/gallery.json`: existing records; do not assume every entry is automatically rendered.
- `src/app/speaking/page.tsx`: currently owns the curated speaking/media cards and participation labels.
- `src/app/about/page.tsx`: current education and biographical copy.
- `src/components/Unified*.tsx` and `motion/FounderLens.tsx`: current section narratives and lens captions.
- `public/data/protein-benchmark/metadata.json`, `model.json` and companion exports: reproducible public benchmark. Regenerate through `scripts/protein_benchmark/`; do not manually improve metrics.
- `public/images/gallery/` and `public/videos/structural-work/`: existing approved assets; raw URLs include `/jackieng-profile` once.

Verified identity and evidence rules: brand workspace `BRAND_IDENTITY.md` and `SOURCES.md`.
No public coordinate downloads, no company-performance inference from GB1, no publication labels for in-progress projects.
