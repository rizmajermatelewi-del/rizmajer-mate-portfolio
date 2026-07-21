import { describe, it, expect } from 'vitest'
import { tiltFromPointer } from './tilt'

const rect = { left: 0, top: 0, width: 200, height: 100 }

describe('tiltFromPointer', () => {
  it('is flat at the centre', () => {
    const t = tiltFromPointer(rect, 100, 50, 8)
    expect(t.rotateX).toBeCloseTo(0)
    expect(t.rotateY).toBeCloseTo(0)
    expect(t.px).toBeCloseTo(50)
    expect(t.py).toBeCloseTo(50)
  })

  it('tilts to the cap at the corners', () => {
    const t = tiltFromPointer(rect, 200, 0, 8)
    expect(t.rotateY).toBeCloseTo(8)
    expect(t.rotateX).toBeCloseTo(8)
  })

  it('never exceeds the cap even outside the rect', () => {
    const t = tiltFromPointer(rect, 1000, -1000, 8)
    expect(Math.abs(t.rotateX)).toBeLessThanOrEqual(8)
    expect(Math.abs(t.rotateY)).toBeLessThanOrEqual(8)
  })

  it('inverts rotateX so the top edge leans away', () => {
    const top = tiltFromPointer(rect, 100, 0, 8)
    const bottom = tiltFromPointer(rect, 100, 100, 8)
    expect(top.rotateX).toBeGreaterThan(0)
    expect(bottom.rotateX).toBeLessThan(0)
  })
})
