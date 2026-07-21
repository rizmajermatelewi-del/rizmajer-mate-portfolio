/* Shared motion vocabulary. Every animation in the app pulls from here so
   timings cannot drift apart. GSAP takes seconds, CSS takes milliseconds. */

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  reveal: 0.9,
}

export const durationMs = {
  instant: 120,
  fast: 200,
  base: 320,
  slow: 600,
  reveal: 900,
}

export const ease = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  spring: 'elastic.out(1, 0.6)',
}

export const easeCss = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
}

export const limit = {
  lift: -4,
  tilt: 8,
  magnet: 12,
}
