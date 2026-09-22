import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from './Contact.jsx'

describe('Contact', () => {
  it('shows minta contact without a dialable tel link', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Időpont' })).toBeTruthy()
    expect(screen.getByText(/\+36 30 000 0000/)).toBeTruthy()
    expect(screen.queryByRole('link', { name: /\+36 30 000 0000/ })).toBe(null)
  })
})
