import { describe, it, expect } from 'vitest'
import { isPreviewMode, siteBusiness, siteServices, siteFaq, siteAbout } from './site'

describe('site preview layer', () => {
  it('is in preview while real facts are empty', () => {
    expect(isPreviewMode()).toBe(true)
  })

  it('exposes labeled minta business, services, faq and about', () => {
    const b = siteBusiness()
    expect(b.name).toBe('AB Masszázs')
    expect(b.city).toContain('Minta')
    expect(siteServices().length).toBeGreaterThan(0)
    expect(siteFaq().length).toBeGreaterThan(0)
    expect(siteAbout().length).toBeGreaterThan(0)
  })
})
