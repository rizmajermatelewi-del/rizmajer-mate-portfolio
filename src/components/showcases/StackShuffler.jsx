import { useEffect, useState } from 'react'

/* No metric badges. These used to carry "98/100", "<100ms" and "99.9%" —
   invented figures reading as a Lighthouse score, a response time and an
   uptime SLA, none of which anything here measures. Faking engineering
   precision the work does not claim costs more trust than the badge buys. */
export default function StackShuffler() {
  const items = [
    { tag: 'Frontend', label: 'React és Tailwind alapú felületek' },
    { tag: 'Backend', label: 'Node.js és Express API-k' },
    { tag: 'DevOps', label: 'CI/CD és felhő alapú élesítés' },
  ]
  const [stack, setStack] = useState(items)

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
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-surface border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
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
