import { useEffect, useState } from 'react'

/* The status line names the stage, nothing more. It used to read
   "Hiba észlelve · #482. sor" and "Javítás fut · 12 mp" beside a build
   counter ticking up from 12 — a line number, a duration and a daily total
   invented to look like telemetry from a system that does not exist. The
   loop still tells the same story (run, catch, fix, ship) without claiming
   numbers nothing measured. */
/* Hoisted out of the component so the interval effect can close over a stable
   reference instead of a fresh array every render, which is what the
   exhaustive-deps warning was pointing at. */
const STATUSES = [
  { text: 'Tesztek futnak', label: 'Ellenőrzés', tone: 'primary' },
  { text: 'Hiba a futtatásban', label: 'Elakadás', tone: 'accent' },
  { text: 'Javítva, újra fut', label: 'Javítás', tone: 'primary' },
  { text: 'Mehet élesbe', label: 'Kész', tone: 'emerald' },
]

export default function CodeScan() {
  const [statusIdx, setStatusIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => (idx + 1) % STATUSES.length)
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const glyphs = ['{ }', '< >', '01', '/>', '#', ';', '==']
  const drops = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 22, glyph: glyphs[0] },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 19, glyph: glyphs[1] },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 24, glyph: glyphs[2] },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 20, glyph: glyphs[3] },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 23, glyph: glyphs[4] },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 19, glyph: glyphs[5] },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 22, glyph: glyphs[6] },
  ]

  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = STATUSES[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-400' : status.tone === 'accent' ? 'text-accent' : 'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/25"
      style={{ background: 'linear-gradient(180deg, rgb(var(--color-terminal-1)) 0%, rgb(var(--color-terminal-2)) 55%, rgb(var(--color-terminal-3)) 100%)' }}
    >
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-primary/10 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Élő build
          </span>
        </div>
      </div>

      {/* Terminal bar with commit markers */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="6" width="400" height="8" rx="4" fill="rgb(var(--color-primary))" fillOpacity="0.22" />
        <rect x="0" y="7" width="400" height="2" fill="rgb(var(--color-primary-dark))" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1.5" fill="rgb(var(--color-primary-dark))" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1.5" fill="rgb(var(--color-primary-dark))" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="2" width="6" height="6" rx="1" fill="rgb(var(--color-primary-dark))" />
            <rect x={x - 4} y="13" width="8" height="3" rx="1" fill="rgb(var(--color-primary-dark))" fillOpacity="0.7" />
          </g>
        ))}
      </svg>

      {/* Falling code glyphs */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {drops.map((d, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: d.left,
              width: `${d.size}px`,
              height: `${d.size}px`,
              animation: `code-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite`,
              filter: 'drop-shadow(0 1px 3px rgb(var(--color-primary) / 0.35))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`chip-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(var(--color-primary-light))" />
                <stop offset="50%" stopColor="rgb(var(--color-primary))" />
                <stop offset="100%" stopColor="rgb(var(--color-primary-dark))" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="22" height="22" rx="6" fill={`url(#chip-${i})`} />
            <text x="12" y="15.5" textAnchor="middle" fontFamily="'Geist Mono', ui-monospace, monospace" fontSize="8.5" fontWeight="700" fill="rgb(var(--color-deep))">
              {d.glyph}
            </text>
          </svg>
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="rgb(var(--color-primary-light))" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 0,8 Q 12.5,5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8" fill="none" stroke="rgb(var(--color-primary))" strokeOpacity="0.22" strokeWidth="0.8" />
      </svg>

      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-light/50"
            style={{ left: r.left, width: '4px', height: '4px', animation: `code-ping 2.4s ease-out ${r.delay} infinite` }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'code-fadein 0.35s ease-out' }}>
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes code-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px) rotate(8deg); opacity: 0; }
        }
        @keyframes code-ping {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes code-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
