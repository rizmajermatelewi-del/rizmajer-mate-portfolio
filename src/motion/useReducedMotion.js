import { useEffect, useState } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE = '(pointer: fine)'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/* True when the visitor has asked the OS to reduce motion. Every motion
   primitive must consult this and degrade to a static or fade-only state. */
export function useReducedMotion() {
  return useMediaQuery(REDUCED)
}

/* True only for precise pointers (mouse, trackpad). Gates cursor, tilt and
   magnetic effects off on touch devices. */
export function useFinePointer() {
  return useMediaQuery(FINE)
}
