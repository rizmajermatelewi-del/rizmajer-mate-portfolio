import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

afterEach(() => cleanup())

/* Proves the toolchain works end to end — JSX compiles, jsdom renders, the
   router resolves — before any real component depends on all three. */
describe('app shell', () => {
  it('renders the home route with skip link and brand', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /Ugrás a tartalomra/ })).toBeTruthy()
    expect(screen.getAllByText('AB Masszázs').length).toBeGreaterThan(0)
    expect(screen.getByText('Egy kezelő.')).toBeTruthy()
  })

  it('renders privacy inside the shared chrome', () => {
    render(
      <MemoryRouter initialEntries={['/adatvedelem']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /Ugrás a tartalomra/ })).toBeTruthy()
    expect(screen.getByRole('heading', { name: /Adatkezelési tájékoztató/ })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Adatvédelem' })).toBeTruthy()
  })
})
