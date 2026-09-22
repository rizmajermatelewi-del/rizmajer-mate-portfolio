import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  it('shows nav when preview content fills the site', async () => {
    vi.resetModules()
    const { default: Header } = await import('./Header.jsx')
    render(<Header />)
    expect(screen.getByRole('navigation', { name: 'Fő navigáció' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Szolgáltatások' }).getAttribute('href')).toBe(
      '#szolgaltatasok',
    )
    expect(screen.getByRole('link', { name: 'Kapcsolat' }).getAttribute('href')).toBe('#kapcsolat')
    expect(screen.getByRole('link', { name: 'Elérhetőség' }).getAttribute('href')).toBe(
      '#elerhetoseg',
    )
  })
})
