import { useCallback, useEffect, useRef, useState } from 'react'
import { durationMs } from './tokens'
import { scrambleFrame } from './scramble'
import { useInView } from './useInView'
import { useReducedMotion } from './useReducedMotion'

/* Decode-style reveal. The plain text is always present for screen readers;
   only the visual layer scrambles. */
export function ScrambleText({ text, className = '', trigger = 'inView', as: Tag = 'span' }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const seed = useRef(Math.floor(Math.random() * 100))
  const reduced = useReducedMotion()
  const [inViewRef, visible] = useInView(0.4)

  const run = useCallback(() => {
    if (reduced) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs.slow, 1)
      setDisplay(scrambleFrame(text, progress, seed.current))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [text, reduced])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  useEffect(() => {
    setDisplay(text)
  }, [text])

  useEffect(() => {
    if (trigger === 'inView' && visible) run()
  }, [trigger, visible, run])

  return (
    <Tag
      ref={trigger === 'inView' ? inViewRef : undefined}
      className={className}
      onPointerEnter={trigger === 'hover' ? run : undefined}
    >
      <span aria-hidden="true">{reduced ? text : display}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
