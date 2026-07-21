import { describe, it, expect } from 'vitest'
import { duration, durationMs, ease, easeCss, limit } from './tokens'

describe('motion tokens', () => {
  it('exposes GSAP durations in seconds', () => {
    expect(duration.fast).toBe(0.2)
    expect(duration.reveal).toBe(0.9)
  })

  it('exposes CSS durations in milliseconds matching the second values', () => {
    expect(durationMs.fast).toBe(duration.fast * 1000)
    expect(durationMs.reveal).toBe(duration.reveal * 1000)
  })

  it('exposes both GSAP and CSS easings', () => {
    expect(ease.out).toBe('power3.out')
    expect(easeCss.out).toBe('cubic-bezier(0.22, 1, 0.36, 1)')
  })

  it('caps motion distances to the agreed limits', () => {
    expect(limit.tilt).toBe(8)
    expect(limit.magnet).toBe(12)
    expect(limit.lift).toBe(-4)
  })
})
