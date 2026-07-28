import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createElement } from 'react'
import { render, cleanup, act, renderHook } from '@testing-library/react'
import { useInView } from './useInView'

let triggerIntersect
let latest

/* The hook only observes once its ref is attached to a real element, so the
   probe component below is required — renderHook alone never attaches it and
   the observer would never be constructed. */
function Probe() {
  const [ref, visible] = useInView()
  latest = visible
  return createElement('div', { ref })
}

beforeEach(() => {
  triggerIntersect = null
  latest = undefined
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb) { triggerIntersect = cb }
    observe() {}
    disconnect() {}
    unobserve() {}
  })
})

afterEach(cleanup)

describe('useInView', () => {
  it('starts hidden', () => {
    render(createElement(Probe))
    expect(latest).toBe(false)
  })

  it('latches visible once intersecting and never unlatches', () => {
    render(createElement(Probe))
    act(() => triggerIntersect([{ isIntersecting: true }]))
    expect(latest).toBe(true)
    act(() => triggerIntersect([{ isIntersecting: false }]))
    expect(latest).toBe(true)
  })

  it('starts visible when IntersectionObserver is unavailable', () => {
    const original = globalThis.IntersectionObserver
    delete globalThis.IntersectionObserver
    try {
      const { result } = renderHook(() => useInView(0.15))
      expect(result.current[1]).toBe(true)
    } finally {
      globalThis.IntersectionObserver = original
    }
  })
})
