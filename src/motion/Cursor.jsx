import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { duration, ease } from './tokens'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

/* Dot tracks the pointer exactly; ring lerps behind it. Elements opt in
   with data-cursor="link|card|text" and optional data-cursor-label, so
   adding a cursor state anywhere is a markup change, never a wiring one. */
export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('')

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    if (!active) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickSetter(dot, 'x', 'px')
    const dotY = gsap.quickSetter(dot, 'y', 'px')
    const ringX = gsap.quickTo(ring, 'x', { duration: duration.base, ease: ease.out })
    const ringY = gsap.quickTo(ring, 'y', { duration: duration.base, ease: ease.out })

    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      if (target) {
        setMode(target.dataset.cursor)
        setLabel(target.dataset.cursorLabel || '')
      } else {
        setMode('default')
        setLabel('')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [active])

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', active)
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [active])

  if (!active) return null

  const ringSize = mode === 'card' ? 'h-16 w-16' : mode === 'link' ? 'h-12 w-12' : 'h-8 w-8'

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ opacity: mode === 'text' ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 transition-[height,width,background-color] duration-200 ${ringSize} ${
          mode === 'card' ? 'bg-primary/90' : ''
        }`}
      >
        {mode === 'card' && label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-white">{label}</span>
        )}
      </div>
    </>
  )
}
