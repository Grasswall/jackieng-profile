# Brand Page — Design & Technical Research

## Research Summary (Sept 2026)

This document captures the best practices and technical decisions for making Jackie Ng's personal brand site exceptional. Every agent working on this site should read this before making changes.

---

## 1. Animation Stack

### GSAP + ScrollTrigger (primary animation engine)
- Install: `npm install gsap @gsap/react`
- **Centralized config**: Create `src/lib/gsapConfig.ts` with `'use client'` directive
- Register plugins once: `gsap.registerPlugin(ScrollTrigger)` inside `typeof window !== 'undefined'` guard
- **Use `useGSAP` hook** from `@gsap/react` — handles cleanup automatically, prevents memory leaks
- Every animated component needs `'use client'` directive
- Pass `scope: containerRef` to `useGSAP` for efficient cleanup
- **Animate transforms only** (`x`, `y`, `rotation`, `scale`, `opacity`) — never `top`, `left`, `width`, `height`
- Use `will-change: transform` on animated elements
- Avoid `filter` and `blend-mode` animations (expensive)
- Debug with `markers: true` during development
- Don't lazy-load images inside scroll-triggered sections (causes reflow jank)

### GSAP SplitText (text reveals)
- SplitText is now free (Webflow acquired GreenSock, Oct 2024)
- Splits text into chars/words/lines for independent animation
- Use: `SplitText.create('.heading', { type: 'chars,words,lines' })`
- Common patterns: fade-up per word, stagger chars, line-by-line reveal
- Always pair with ScrollTrigger for scroll-driven reveals

### Lenis (smooth scrolling)
- Install: `npm install lenis` (NOT the deprecated `@studio-freight/lenis`)
- Create `LenisProvider` component with `'use client'` directive
- Key config: `autoRaf: true`, `duration: 1.2`, `syncTouch: false`, `anchors: true`
- Wrap content in layout.tsx: `<LenisProvider>{children}</LenisProvider>`
- Import CSS: `@import 'lenis/dist/lenis.css'`
- Use `overflow: clip` instead of `overflow: hidden` on html/body (preserves sticky positioning)
- Respect `prefers-reduced-motion` — conditionally disable

### Framer Motion (page transitions)
- Use `template.tsx` (remounts on navigation — ideal for AnimatePresence)
- Key pattern: `<AnimatePresence mode="wait"><motion.div key={pathname}>`
- Keep client boundary small — only wrap the animated template, not entire layout
- Give animated wrappers explicit `min-height` to prevent CLS
- ~45-55 kB gzipped — consider lazy-loading if bundle size matters

---

## 2. Interactive Effects

### Card Tilt (Recognition, Competitions)
- CSS `perspective` on parent container (~1000px)
- `transform-style: preserve-3d` on card
- Hover: `transform: perspective(600px) rotateX(10deg) rotateY(10deg) scale(1.05)`
- Optional: vanilla-tilt.js for mouse-responsive tilt (tracks cursor position)
- Add `transition: transform 0.6s ease` for smoothness
- Combine with `filter: drop-shadow()` for glow on hover

### Cursor Effects
- Custom cursor that reacts to hoverable elements
- Magnetic button effect (button pulls toward cursor)
- Keep lightweight — requestAnimationFrame loop, no heavy libraries

---

## 3. Hero Section

### Preloader
- CSS-based (keyframe animation) — no JS required for the animation itself
- Show brand name "JN." + loading bar + percentage counter
- Duration: 2-3 seconds max
- Respect `prefers-reduced-motion` — skip for users who opt out
- After load: reveal hero content with staggered GSAP timeline

### Hero Animation
- Background: parallax image (hero-stage.jpg) with overlay gradient
- Text: line-by-line reveal using GSAP SplitText + timeline
- Badges: staggered fade-up
- Scroll indicator: subtle pulse animation (CSS only)

### Three.js Particle Field (differentiator)
- Lightweight molecular particle effect in hero canvas
- Use InstancedBufferGeometry (single draw call for all particles)
- Custom ShaderMaterial (GPU-accelerated)
- < 1000 particles on mobile, ~2000 on desktop
- IntersectionObserver: only animate when visible, pause when off-screen
- Fallback: navy gradient for devices that don't support WebGL
- Set `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- OffscreenCanvas + Web Worker for zero main-thread blocking (advanced)

---

## 4. Performance (Core Web Vitals)

### LCP (< 2.5s)
- Hero image: preload with `<link rel="preload">` or `next/image` with `priority`
- Use `next/image` for all images — auto WebP/AVIF, responsive srcset
- Font: `next/font` for self-hosted Inter + Cormorant Garamond with `adjustFontFallback: true`
- Avoid client-side data fetches — all data is static JSON imported at build time ✓

### INP (< 200ms)
- Defer non-critical scripts
- Dynamic import heavy components (Three.js hero, GSAP animations)
- Break long tasks > 50ms

### CLS (< 0.1)
- Explicit width/height on all images
- `sizes` attribute on responsive images
- Font fallback adjustment to prevent font-swap CLS
- `min-height` on animated sections

### Image Optimization
- All images through `next/image` component
- `priority` on hero image only
- WebP/AVIF auto-conversion
- Max: 1920px wide, compress to < 300KB
- Lazy loading for below-fold images (default behavior)

---

## 5. Section Design Rhythm

Dark/light alternation creates visual hierarchy:
1. **Hero** — dark (navy, full-bleed image)
2. **Social Proof** — dark (charcoal bar)
3. **About/Recognition** — light (offwhite)
4. **Cinematic Break** — dark (full-bleed, sticky text)
5. **Competitions** — light (offwhite)
6. **AtomBios** — dark (navy)
7. **Media/Speaking** — light (offwhite)
8. **Education** — dark (charcoal)
9. **Contact** — dark (navy)

---

## 6. Typography

### Hierarchy
- Hero name: Cormorant Garamond, 6-8rem, 300 weight
- Section headings: Cormorant Garamond, 3-4rem, 400-500 weight
- Section labels: Inter, 0.75rem, 600 weight, uppercase, tracking-widest, gold
- Body: Inter, 1rem, 400 weight, slate color
- Stats numbers: Cormorant Garamond, 3rem, 600 weight, gold

### Animation
- Headings: SplitText line-by-line reveal on scroll
- Stats: count-up animation when section enters viewport
- Body text: simple fade-up with 0.4s stagger

---

## 7. Dependencies to Add

```bash
npm install lenis @gsap/react
# Three.js only if implementing particle hero:
npm install three @types/three
```

GSAP SplitText: included in gsap package (free since Webflow acquisition).

---

## 8. Execution Order (by impact)

| Priority | Task | Impact | Complexity |
|---|---|---|---|
| P0 | GSAP ScrollTrigger on all sections (reveal animations) | Feels premium vs static | Medium |
| P0 | Lenis smooth scroll | Instant polish | Low |
| P0 | Dark/light section rhythm | Visual hierarchy | Low |
| P1 | Hero preloader + text animation timeline | First impression | Medium |
| P1 | SplitText heading reveals | Editorial feel | Medium |
| P1 | Page transitions (Framer Motion template.tsx) | Polished navigation | Medium |
| P2 | Card tilt hover effects | Interactive feel | Low |
| P2 | Counter animation (SocialProof) | Already structured, needs wiring | Low |
| P2 | next/image migration + font optimization | Performance | Medium |
| P3 | Three.js particle hero | The differentiator | High |
| P3 | Custom cursor effects | Premium touch | Medium |
| P3 | Preloader | Sets tone | Medium |

---

## 9. Design Taste — What Makes It Feel Premium

### Editorial Layout Principles
- **Asymmetrical layouts** — break the 12-column grid occasionally. Float images off-axis. Use irregular text measures.
- **Bento blocks** — modular content cells of varying sizes. Competition cards, media cards should feel like a composed magazine spread, not a uniform grid.
- **Anti-grid moments** — at least one section should deliberately break the grid (e.g., Recognition cards with a sticky left label and scrolling right column).
- **Layered depth** — elements that overlap slightly (image behind text, badge overlapping card edge) create visual richness.

### Whitespace as Structure
- **8-point spacing system** — all spacing in multiples of 8px (8, 16, 24, 32, 48, 64, 96, 128). No odd values.
- **Section padding**: `py-32` (128px) for major sections, `py-24` (96px) for minor. Never less than `py-16` between sections.
- **Hero breathing room**: minimal copy, one focal point, 100vh minimum height.
- **Golden ratio for text columns**: main content ~62%, sidebar ~38%. Or full-width with max-w-2xl for body text.
- **Line height**: 1.6-1.8 for body text. 1.1-1.2 for display headings.
- **Let sections breathe** — if it feels like enough whitespace, add 20% more.

### Typography as Design Element
- **Extreme scale contrast**: Hero name at 6-8rem, body at 1rem. The gap IS the design.
- **Serif + sans-serif pairing**: Cormorant Garamond (editorial, prestigious) for headings. Inter (clean, modern) for body. Never mix more than two typefaces.
- **Section labels**: Tiny (0.75rem), uppercase, letter-spaced, gold — whispers authority.
- **Italic for emphasis within headings**: "Where the atom meets the *brain*" — adds editorial warmth.
- **Variable font weight**: Use 300 (light) for large display text, 500-600 for smaller headings, 400 for body.

### Color Psychology (Navy + Gold)
- **Navy (#0A1828)**: stability, intellect, trust, authority. Perfect for a scientist-founder.
- **Gold (#BFA181)**: achievement, prestige, quality. Use sparingly — 5-10% of total design. Accents, badges, hover states, CTAs.
- **Dark UI = sophistication + focus**. Directs attention to content, not chrome.
- **Offwhite (#F5F5F0)**: warm, not sterile. Better than pure white for editorial feel.
- **Never use pure black (#000)** — always use navy or charcoal. Pure black is harsh on screens.
- **Gold on navy = premium signal**. Gold on white = cheap. Always pair gold with dark backgrounds.

### The Invisible Rules of Premium Feel
1. **Consistency > creativity** — same spacing, same radius, same animation timing everywhere. Inconsistency feels amateur.
2. **Restraint** — if you're unsure whether to add an effect, don't. Premium feels like less, not more.
3. **One hero moment per section** — one number, one image, one heading gets to be huge. Everything else supports it.
4. **Transitions tell stories** — ease-out (0.6s cubic-bezier) for natural deceleration. Never use linear. Never use bounce.
5. **Photography > illustration** — for a personal brand, real photos of real moments beat any graphic. Your Photo Album is gold.
6. **Border radius consistency** — pick one value (2xl = 16px) and use it everywhere. Cards, images, buttons, badges.
7. **Shadows: almost invisible** — `shadow-2xl` with very low opacity. If you can see the shadow, it's too strong.
8. **Hover states on everything interactive** — no dead-feeling links. Subtle color shift, underline animation, or lift effect.

### Section-Specific Design Notes

**Hero**: Full-bleed image or particle canvas. Text over dark overlay. Name large enough that it's the ONLY thing you read first. Badges small and horizontal. One CTA. Scroll indicator is an invitation, not a command.

**Social Proof**: Horizontal stat bar. Gold numbers, offwhite labels. Thin dividers between stats. This section should feel like a data dashboard — clean, factual, authoritative.

**Recognition**: Magazine spread layout. Large photos with institution overlays. Sticky section label on left. Cards scroll on right. Each card is a mini-story. This section sells prestige.

**Competitions**: Cards with photos. Bento-style grid — one large, three smaller, or 2x2 with varying heights. Badge overlapping card top-left. This section sells winning.

**AtomBios**: Two-column. Copy heavy on left, headshot on right. Program badges in a quiet row at bottom. This is the "what I'm building" section — it should feel serious and commercial, not playful.

**Media**: Feature cards for TV (large, with stills) + smaller cards for print/publication. Speaking list below as clean rows. This section sells public visibility.

**Education**: Dark background. Two cards side by side. Tags (Cryo-EM, Dean's List) as muted badges. This section is brief — it's credentialing, not storytelling.

**Contact**: Generous whitespace. Large heading. Email prominent. Social links as icons. No contact form (too corporate). This should feel like an invitation, not a sales page.

---

## 10. Accessibility Baseline

- Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI elements
- `prefers-reduced-motion`: disable all GSAP, Lenis, Framer Motion, Three.js animations
- All images have descriptive `alt` text
- Keyboard navigable: focus rings on all interactive elements
- Skip-to-content link
- Semantic HTML: proper heading hierarchy (one h1 per page)
- Touch targets ≥ 44px
- Animation duration < 5s for auto-playing animations, or provide pause control
