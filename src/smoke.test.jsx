import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

afterEach(() => cleanup())

describe('app shell', () => {
  it('renders a full preview home composition', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /Ugrás a tartalomra/ })).toBeTruthy()
    expect(screen.getAllByText(/Előnézet \/ minta/).length).toBeGreaterThan(0)
    expect(screen.getAllByText('AB Masszázs').length).toBeGreaterThan(0)
    expect(screen.getByText(/Nyugodt kezelés/)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Szolgáltatások' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Rólam' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Elérhetőség' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Gyakori kérdések' })).toBeTruthy()
    expect(screen.getByText('Svédmasszázs')).toBeTruthy()
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
