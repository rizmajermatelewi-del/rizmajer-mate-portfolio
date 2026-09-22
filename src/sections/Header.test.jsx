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

describe('Header', () => {
  it('hides section nav while facts and services are empty', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({ BUSINESS: EMPTY, missingFacts: () => [] }))
    vi.doMock('../data/services', () => ({ SERVICES: [] }))
    const { default: Header } = await import('./Header.jsx')
    render(<Header />)
    expect(screen.queryByRole('navigation', { name: 'Fő navigáció' })).toBe(null)
    expect(screen.getByRole('link', { name: /főoldal/i })).toBeTruthy()
  })

  it('only links to sections that will render', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({
      BUSINESS: { ...EMPTY, phone: '+36 30 111 2222' },
      missingFacts: () => [],
    }))
    vi.doMock('../data/services', () => ({
      SERVICES: [{ id: 'a', name: 'Svéd', minutes: 60, price: 9000, desc: '' }],
    }))
    const { default: Header } = await import('./Header.jsx')
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Szolgáltatások' }).getAttribute('href')).toBe(
      '#szolgaltatasok',
    )
    expect(screen.getByRole('link', { name: 'Kapcsolat' }).getAttribute('href')).toBe('#kapcsolat')
    expect(screen.getByRole('link', { name: 'Elérhetőség' }).getAttribute('href')).toBe(
      '#elerhetoseg',
    )
  })
})
