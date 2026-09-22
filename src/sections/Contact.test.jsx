import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const EMPTY = {
  name: '',
  legalName: '',
  tagline: '',
  street: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  facebook: '',
  instagram: '',
  mapsUrl: '',
  hours: [],
}

describe('Contact', () => {
  it('renders nothing while phone and email are empty', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({ BUSINESS: EMPTY, missingFacts: () => [] }))
    const { default: Contact } = await import('./Contact.jsx')
    const { container } = render(<Contact />)
    expect(container.firstChild).toBe(null)
  })

  it('shows a dialable phone when present', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({
      BUSINESS: { ...EMPTY, phone: '+36 30 123 4567' },
      missingFacts: () => [],
    }))
    const { default: Contact } = await import('./Contact.jsx')
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Időpont' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /123 4567/ }).getAttribute('href')).toBe(
      'tel:+36301234567',
    )
  })
})
