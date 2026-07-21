import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { duration, ease, limit } from './tokens'
import { magnetOffset } from './magnet'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

const PAD = 16

/* Pulls its child toward the pointer and springs back on leave. The
   negative-margin padded wrapper widens the hit area so the pull engages
   just before visual contact, without a document-level listener. */
/* `block` exists because the wrapper is inline-block by default, which
   shrink-wraps a w-full child down to its content width. Full-bleed CTAs
   need the wrapper to fill its column instead. */
export function Magnetic({ children, className = '', strength = 0.35, block = false }) {
  const ref = useRef(null)
  const rectRef = useRef(null)
  const quick = useRef(null)

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    quick.current = {
      x: gsap.quickTo(el, 'x', { duration: duration.base, ease: ease.out }),
      y: gsap.quickTo(el, 'y', { duration: duration.base, ease: ease.out }),
    }

    return () => {
      gsap.set(el, { x: 0, y: 0, willChange: 'auto' })
      quick.current = null
    }
  }, [active])

  const onEnter = useCallback(() => {
    const el = ref.current
    if (!el || !active) return
    rectRef.current = el.getBoundingClientRect()
    el.style.willChange = 'transform'
  }, [active])

  const onMove = useCallback((e) => {
    const rect = rectRef.current
    if (!rect || !quick.current) return
    const o = magnetOffset(rect, e.clientX, e.clientY, strength, limit.magnet)
    quick.current.x(o.x)
    quick.current.y(o.y)
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: duration.slow, ease: ease.spring })
    el.style.willChange = 'auto'
  }, [])

  const display = block ? 'block' : 'inline-block'

  if (!active) return <span className={`${display} ${className}`}>{children}</span>

  return (
    <span
      style={{ padding: PAD, margin: -PAD, display }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span ref={ref} className={`${display} ${className}`}>
        {children}
      </span>
    </span>
  )
}
