import { describe, it, expect } from 'vitest'
import { formatPrice, formatDuration } from './format'

describe('formatting', () => {
  it('groups thousands the Hungarian way', () => {
    expect(formatPrice(9000)).toBe('9\u00a0000\u00a0Ft')
    expect(formatPrice(12500)).toBe('12\u00a0500\u00a0Ft')
    expect(formatPrice(900)).toBe('900\u00a0Ft')
  })

  it('uses non-breaking spaces so a price never wraps mid-number', () => {
    expect(formatPrice(9000)).not.toContain(' ')
  })

  it('says durations in whole minutes', () => {
    expect(formatDuration(60)).toBe('60 perc')
    expect(formatDuration(90)).toBe('90 perc')
  })
})
