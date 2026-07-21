import { describe, it, expect } from 'vitest'
import { magnetOffset } from './magnet'

const rect = { left: 0, top: 0, width: 100, height: 40 }

describe('magnetOffset', () => {
  it('is zero at the centre', () => {
    const o = magnetOffset(rect, 50, 20, 0.35, 12)
    expect(o.x).toBeCloseTo(0)
    expect(o.y).toBeCloseTo(0)
  })

  it('pulls toward the pointer', () => {
    const o = magnetOffset(rect, 100, 20, 0.35, 12)
    expect(o.x).toBeGreaterThan(0)
  })

  it('never exceeds the cap in either direction', () => {
    const far = magnetOffset(rect, 5000, 5000, 0.35, 12)
    expect(far.x).toBeLessThanOrEqual(12)
    expect(far.y).toBeLessThanOrEqual(12)
    const near = magnetOffset(rect, -5000, -5000, 0.35, 12)
    expect(near.x).toBeGreaterThanOrEqual(-12)
    expect(near.y).toBeGreaterThanOrEqual(-12)
  })
})
