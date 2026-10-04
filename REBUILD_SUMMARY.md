# Jackie Ng Profile Site Rebuild — Conviction + Momentum Design

## Summary

Rebuilt Jackie Ng's personal site with an **investor-ready** design emphasizing conviction, momentum, and immediate credibility. The site now positions Jackie as a founder and scientist going somewhere, not someone seeking validation.

## Design Changes

### Hero Section
- **Before:** Static text + stats bar
- **After:** Three.js molecular visualization (60fps, procedurally generated protein structure) with a bold serif headline: *"I see the algorithms running inside molecules."*
- Single CTA button scrolls to AtomBios section
- Teal/crimson accent palette replaces neutral slate-blue

### Recognition Section
- **Before:** Small photos, list-style cards
- **After:** Large photography-led timeline with alternating layouts, parallax scroll effects, and GSAP ScrollTrigger animations
- Focus on visual credibility (Nobel, Shaw, CAS, HKLF photos)

### New: Story Section
- 1-2 paragraph personal narrative explaining Jackie's perspective on computational biology
- Bridges Recognition → AtomBios naturally

### AtomBios Section
- **Before:** Brief description
- **After:** Founder positioning with problem/solution/milestone structure
- Circular headshot (280px) with "Founder & CEO" title, sticky on desktop
- Emphasizes computational structural biology as the differentiator

### Competitions Section
- **Before:** Photo cards
- **After:** Compact 3-column grid with badge labels (Gold, Rising Star, etc.), no photos
- Cleaner, faster-scanning design for investor audiences

### New: Press + Speaking Sections
- **Press:** 2-column grid with outlet logos/photos (RTHK, BRTV, Ming Pao, Sing Tao)
- **Speaking:** Clean list format (Nobel Foundation, Shaw Prize, PolyU, CAS)

### Education Section
- Timeline format preserved, typography upgraded to serif headings
- Highlights: First Class, 4.0 GPA, Dean's List ×7

### Contact Section
- Positioned for investor/partner outreach: "Investor conversations, research collaborations, speaking engagements."
- Email + LinkedIn + Google Scholar + Twitter

## Technical Implementation

### Typography
- Serif headlines: Iowan Old Style / Palatino fallback stack (Cormorant Garamond unavailable)
- Body: Inter (already installed)

### Color Palette
- **Primary:** Deep teal `#0a5f5f` (light mode), lighter teal `#14b8a6` (dark mode)
- **Accent:** Crimson `#b91c1c` for CTAs
- **Backgrounds:** Off-white `#fafaf9` / near-black `#0f0f0f`

### Animation
- GSAP ScrollTrigger for scroll-driven reveals (fade-in + subtle scale)
- Three.js molecular visualization with smooth rotation + bob
- Parallax effects on Recognition photos
- Respects `prefers-reduced-motion: reduce`

### Performance
- Three.js loaded dynamically (169KB gzipped) — separate chunk, not in main bundle
- Main page: 5KB, First Load JS: 87.7KB
- Static site generation (Next.js SSG)
- Mobile-first responsive design

## File Changes

### New Components
- `MoleculeHero.tsx` — Three.js protein structure visualization
- `Story.tsx` — Personal narrative section
- `Press.tsx` — Media coverage section (split from Media.tsx)
- `Speaking.tsx` — Speaking engagements section (split from Media.tsx)

### Updated Components
- `Hero.tsx` — New structure with MoleculeHero and CTA
- `Recognition.tsx` — Photography-led timeline with GSAP parallax
- `AtomBios.tsx` — Founder positioning with problem/solution/milestone
- `Competitions.tsx` — Compact badge-led grid
- `Education.tsx` — GSAP scroll animations
- `Contact.tsx` — Investor-focused copy

### Styles
- `globals.css` — Complete rewrite with new palette, serif stack, larger spacing, photography-led layouts

### Data
- `navigation.json` — Updated to match single-page sections

## Build Status

✅ Build succeeds  
✅ TypeScript compiles  
✅ ESLint passes (warnings only for <img> instead of <Image>, acceptable for this use case)  
✅ Three.js bundle size: 169KB gzipped (under 200KB target)  
✅ Mobile-responsive

## Next Steps (if needed)

1. Replace placeholder asset paths with real photos (currently `/jackieng-profile/assets/...`)
2. Add real Google Scholar / Twitter URLs in Contact section
3. Test Three.js performance on low-end mobile devices
4. Consider lazy-loading Press/Speaking sections if scroll performance is a concern
5. Add structured data for SEO (already in layout.tsx)

---

**Result:** A site that feels like someone going somewhere — momentum, conviction, credibility.
