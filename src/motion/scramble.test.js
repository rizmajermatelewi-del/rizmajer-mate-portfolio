import { describe, it, expect } from 'vitest'
import { scrambleFrame } from './scramble'

describe('scrambleFrame', () => {
  it('never changes string length, so layout cannot reflow', () => {
    const target = 'Modern Tech Stack'
    for (const p of [0, 0.25, 0.5, 0.75, 1]) {
      expect(scrambleFrame(target, p, 1).length).toBe(target.length)
    }
  })

  it('returns the exact target at full progress', () => {
    expect(scrambleFrame('Projektek', 1, 1)).toBe('Projektek')
  })

  it('preserves whitespace at every progress', () => {
    expect(scrambleFrame('a b', 0.4, 7)[1]).toBe(' ')
  })

  it('resolves more characters as progress increases', () => {
    const target = 'Kapcsolat'
    const match = (s) => [...s].filter((c, i) => c === target[i]).length
    expect(match(scrambleFrame(target, 0.8, 3))).toBeGreaterThan(
      match(scrambleFrame(target, 0.2, 3))
    )
  })
})
