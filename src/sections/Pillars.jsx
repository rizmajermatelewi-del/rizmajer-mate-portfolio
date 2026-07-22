import { useState } from 'react'
import CountUp from '../components/CountUp'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
export default function Pillars() {
  const [ref, visible] = useInView(0.15)
  const [focused, setFocused] = useState(null)

  const pillars = [
    {
      n: '01',
      title: 'Leszállítva',
      target: 4,
      suffix: '',
      label: 'megépített projekt',
      desc: 'Négy befejezett projekt — kettő fizető ügyfélnek, kettő saját kezdeményezés. Mindegyik megnyitható és kipróbálható.',
    },
    {
      n: '02',
      title: 'Ügyfelek',
      target: 2,
      suffix: '',
      label: 'fizető ügyfél',
      desc: 'Két magyar vállalkozás, akiknek a rendszere ma is élesben fut.',
    },
    {
      n: '03',
      title: 'Válaszidő',
      target: 24,
      suffix: 'ó',
      label: 'órán belül válaszolok',
      desc: 'A leadás után sem tűnök el. Kérdésre, hibára vagy bővítésre egy munkanapon belül reagálok.',
    },
  ]

  return (
    <section id="filozofia" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div aria-hidden="true" className="section-glow" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ Számokban
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              A számok
              <span className="block font-display font-semibold text-primary-dark">mögöttem.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Nem marketingszöveg — csak amit ténylegesen leteszek az asztalra minden projektnél.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              onPointerEnter={() => setFocused(i)}
              onPointerLeave={() => setFocused(null)}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative card-invert p-9 sm:p-12 group overflow-hidden card-motion ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Wraps only the flow content, never the two absolutely
                  positioned decorations below — a transform here would make
                  this div their containing block and shift them inward. */}
              <div
                className={`transition-all duration-300 ease-out ${
                  focused !== null && focused !== i ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
                }`}
              >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>
              </div>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>

              <span className="absolute top-9 right-9 sm:top-12 sm:right-12 font-mono text-[9px] uppercase tracking-widest text-primary/30">
                {p.n}.dev
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
