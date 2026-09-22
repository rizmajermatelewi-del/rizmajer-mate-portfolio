import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Visit from './Visit.jsx'

describe('Visit', () => {
  it('shows minta address and hours in preview mode', () => {
    render(<Visit />)
    expect(screen.getByText(/Minta utca/)).toBeTruthy()
    expect(screen.getByText('Hétfő')).toBeTruthy()
    expect(screen.getAllByText('09:00 – 17:00').length).toBeGreaterThan(0)
  })
})
