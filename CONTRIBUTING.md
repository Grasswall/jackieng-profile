# Contributing to Jackie Ng's Personal Brand Site

## For Agents

This site is maintained by OpenClaw agents. Follow these rules exactly.

### Adding Content

All content lives in `data/` as JSON files. **Never edit React components to add content.**

| To add... | Edit this file | Format |
|---|---|---|
| Competition/award | `data/achievements.json` | See existing entries |
| Gallery render | `data/gallery.json` | `{slug, image, title, caption}` |
| Speaking event | `data/speaking.json` | `{title, org, date, role, description}` |
| Site metadata | `data/meta.json` | Name, links, tagline |
| Nav link | `data/navigation.json` | `{label, href}` |

### Adding Images

1. Place images in `public/assets/`
2. Reference as `/assets/filename.jpg` in data files
3. Max dimensions: 1920px wide, compress to <300KB
4. Use descriptive filenames: `nobel-new.jpg` not `IMG_4521.jpg`

### Running Locally

```bash
cd /home/jackie/jackieng-profile
npm run dev        # Dev server at localhost:3000
npm run build      # Static export to out/
npm run preview    # Preview static build
```

### Deploying

Push to `main` branch. GitHub Actions auto-deploys to Pages.

**Never push directly to main.** Always use a feature branch + PR.

### Branch Naming

- `feature/<name>` — new sections or pages
- `content/<name>` — data/content updates
- `fix/<name>` — bug fixes
- `v2/<name>` — major rebuilds (current)

### Component Guidelines

- All components in `src/components/`
- Shared primitives in `src/components/ui/`
- Use TypeScript interfaces for all props
- Use Tailwind classes, never inline styles
- Animations: GSAP for scroll-triggered, Framer Motion for page transitions
- All text content comes from data files or props — never hardcoded in components

### Code Style

- TypeScript strict mode
- Functional components only
- Named exports (not default)
- Props interfaces named `{ComponentName}Props`

### Design Tokens (from tailwind.config.ts)

| Token | Value | Usage |
|---|---|---|
| navy | #0A1828 | Backgrounds, headers |
| gold | #BFA181 | Accents, badges, CTAs |
| offwhite | #F5F5F0 | Light backgrounds |
| charcoal | #1A1A2E | Dark sections |
| slate | #6B7280 | Body text, muted elements |
