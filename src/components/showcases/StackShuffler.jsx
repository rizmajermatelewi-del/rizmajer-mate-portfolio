import { useEffect, useState } from 'react'
import { t, neutral } from '../../i18n/t'
import { useLocale } from '../../i18n/useLocale'
import { durationMs, easeCss } from '../../motion/tokens'

/* Hoisted out of the component so the shuffle is seeded once rather than from
   a fresh array on every render. */
const ITEMS = [
  { tag: neutral('Frontend'), label: { hu: 'React és Tailwind alapú felületek', en: 'React and Tailwind interfaces' } },
  { tag: neutral('Backend'), label: { hu: 'Node.js és Express API-k', en: 'Node.js and Express APIs' } },
  { tag: neutral('DevOps'), label: { hu: 'CI/CD és felhő alapú élesítés', en: 'CI/CD and cloud deployment' } },
]

/* No metric badges. These used to carry "98/100", "<100ms" and "99.9%" —
   invented figures reading as a Lighthouse score, a response time and an
   uptime SLA, none of which anything here measures. Faking engineering
   precision the work does not claim costs more trust than the badge buys. */
export default function StackShuffler() {
  const locale = useLocale()
  const [stack, setStack] = useState(ITEMS)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={t(item.tag)}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              /* A contrast sweep flags the Frontend/Backend chips on the two
                 back cards at 2.97:1, and it is wrong: bg-surface is opaque
                 (rgb(28,40,58)) and the front card sits at opacity 1, so both
                 chips are painted over entirely — elementsFromPoint at their
                 centre returns the front card, never the chip. Raising this
                 falloff would change nothing on screen and cost the stack its
                 depth. Measure what is actually painted, not what is in the
                 DOM. */
              opacity: 1 - offset * 0.25,
              /* Was a hand-written back-out curve at 0.7s, one whose second
                 control point sat above 1 so each card sprang past its
                 resting position and settled back. Overshoot is toy physics;
                 a card sliding into a stack does not bounce. Both
                 properties now run on the shared out curve, which is the
                 same ease-out-quint the reveals, the hovers and the project
                 cards already use, and on a duration from the same file
                 rather than two hand-written numbers sitting next to it. */
              transition: `transform ${durationMs.slow}ms ${easeCss.out}, opacity ${durationMs.slow}ms ${easeCss.out}`,
            }}
            className="absolute inset-0 bg-surface border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {t(item.tag)}
              </span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {t(item.label, locale)}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? 'rgb(var(--color-primary))' : 'rgb(var(--color-divider))' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
