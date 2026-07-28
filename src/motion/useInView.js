import { useEffect, useRef, useState } from 'react'

/* Replaces the ten hand-rolled IntersectionObserver blocks that used to
   live in each section. Latches true on first intersection and disconnects.

   Initial state is "visible" whenever IntersectionObserver is missing, so
   content can never be stranded at opacity-0 — that matters for crawlers,
   for the prerender snapshot, and for any environment where the observer
   never fires. When the observer IS available we start hidden so the
   reveal animation still plays. */
export function useInView(threshold = 0.15) {
  const supported = typeof IntersectionObserver !== 'undefined'
  const ref = useRef(null)
  const [visible, setVisible] = useState(!supported)

  useEffect(() => {
    if (!supported) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, supported])

  return [ref, visible]
}
