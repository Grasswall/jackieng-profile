// Shared helpers for the three interactive chapters (lens, evidence layers, work map).
// Ported from the approved direction board (public/directions, now retired).

export const BASE = '/jackieng-profile'

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export const isPhone = () => typeof window !== 'undefined' && window.innerWidth <= 820
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface Tween {
  cancel: () => void
}

// Progress tween 0..1 with ease-out. Reduced motion jumps straight to the end.
export function tween(ms: number, fn: (k: number) => void, done?: () => void): Tween {
  if (prefersReducedMotion()) {
    fn(1)
    done?.()
    return { cancel() {} }
  }
  let raf = 0
  let dead = false
  const t0 = performance.now()
  const step = (now: number) => {
    if (dead) return
    const k = clamp((now - t0) / ms, 0, 1)
    fn(easeOut(k))
    if (k < 1) raf = requestAnimationFrame(step)
    else done?.()
  }
  raf = requestAnimationFrame(step)
  return {
    cancel() {
      dead = true
      cancelAnimationFrame(raf)
    },
  }
}
