import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { duration, ease, limit } from './tokens'
import { tiltFromPointer } from './tilt'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

/* 3D tilt with a specular sheen that tracks the pointer. Writes only
   transforms via gsap.quickTo, and never reads layout inside the frame
   loop — the rect is measured once on pointer enter. */
export function TiltCard({ children, className = '', sheen = true, max = limit.tilt, ...rest }) {
  const ref = useRef(null)
  const sheenRef = useRef(null)
  const rectRef = useRef(null)
  const quick = useRef(null)

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    /* rotationX/rotationY, not rotateX/rotateY. GSAP aliases the latter, but
       only for ordinary tweens — quickTo resolves through _ptLookup, which is
       keyed on the resolved name, so the alias silently no-ops. */
    quick.current = {
      rx: gsap.quickTo(el, 'rotationX', { duration: duration.base, ease: ease.out }),
      ry: gsap.quickTo(el, 'rotationY', { duration: duration.base, ease: ease.out }),
    }

    return () => {
      gsap.set(el, { rotationX: 0, rotationY: 0, willChange: 'auto' })
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
    const t = tiltFromPointer(rect, e.clientX, e.clientY, max)
    quick.current.rx(t.rotateX)
    quick.current.ry(t.rotateY)
    if (sheenRef.current) {
      sheenRef.current.style.setProperty('--sheen-x', `${t.px}%`)
      sheenRef.current.style.setProperty('--sheen-y', `${t.py}%`)
      sheenRef.current.style.opacity = '1'
    }
  }, [max])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (quick.current) {
      quick.current.rx(0)
      quick.current.ry(0)
    }
    if (sheenRef.current) sheenRef.current.style.opacity = '0'
    el.style.willChange = 'auto'
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={active ? { transformStyle: 'preserve-3d', perspective: 900 } : undefined}
      onPointerEnter={active ? onEnter : undefined}
      onPointerMove={active ? onMove : undefined}
      onPointerLeave={active ? onLeave : undefined}
      {...rest}
    >
      {children}
      {active && sheen && (
        <span
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
          style={{
            background:
              'radial-gradient(320px circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgb(255 255 255 / 0.10), transparent 60%)',
          }}
        />
      )}
    </div>
  )
}
