import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Services from './Services.jsx'

describe('Services', () => {
  it('lists minta services with duration and price', () => {
    render(<Services />)
    expect(screen.getByText('Svédmasszázs')).toBeTruthy()
    expect(screen.getByText('60 perc')).toBeTruthy()
    expect(screen.getByText('9\u00a0000\u00a0Ft', { normalizer: (text) => text })).toBeTruthy()
  })
})
