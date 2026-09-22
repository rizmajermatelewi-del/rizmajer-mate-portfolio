import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

/* The section must disappear entirely rather than render an empty heading: a
   live page with a "Szolgáltatások" heading and nothing under it reads as
   broken, which is the opposite of what this site is for. */
describe('Services', () => {
  it('renders nothing while the price list is empty', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({ SERVICES: [] }))
    const { default: Services } = await import('./Services.jsx')
    const { container } = render(<Services />)
    expect(container.firstChild).toBe(null)
  })

  it('lists each service with its duration and price', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({
      SERVICES: [
        { id: 'a', name: 'Svédmasszázs', minutes: 60, price: 9000, desc: 'Leírás.' },
        { id: 'b', name: 'Frissítő', minutes: 30, price: 5500, desc: '' },
      ],
    }))
    const { default: Services } = await import('./Services.jsx')
    render(<Services />)
    expect(screen.getByText('Svédmasszázs')).toBeTruthy()
    expect(screen.getByText('60 perc')).toBeTruthy()
    /* normalizer disabled for this one: testing-library's default collapses
       every \s -- which includes U+00A0 -- in the node text but not in the
       matcher, so an NBSP matcher can otherwise never match. */
    expect(screen.getByText('9\u00a0000\u00a0Ft', { normalizer: (text) => text })).toBeTruthy()
    expect(screen.getByText('Frissítő')).toBeTruthy()
  })
})
