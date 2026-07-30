import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../motion/useReducedMotion'

/* Counts up to `target` when the number scrolls into view.

   `count` starts as null, not 0, and the span falls back to `target`. That
   matters because of the prerender: renderToString runs this component with no
   IntersectionObserver and no effects, so whatever the initial state is becomes
   the number written into dist/index.html. With useState(0) the built HTML read
   "0 megépített projekt", "0 fizető ügyfél" and "0 órán belül válaszolok" —
   three zeros where the page shows 4, 2 and 24, served to every crawler and to
   anyone without JavaScript. Starting from null means the server emits the real
   figure and the browser opts into the animation afterwards.

   Under prefers-reduced-motion the effect returns before touching state, so
   count stays null and the final number is simply rendered. The rest of the site
   honours that flag — Hero, ProjectModal, the card reveals — and this was the
   one place still animating regardless. */
export default function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(null)
  const elemRef = useRef(null)
  const startedRef = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = elemRef.current
    if (!el) return

    // Client-only: drop to zero so there is something to count up from.
    setCount(0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, reduced])

  return <span ref={elemRef}>{count ?? target}</span>
}
