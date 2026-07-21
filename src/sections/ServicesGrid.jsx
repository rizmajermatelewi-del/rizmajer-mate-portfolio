import { useState } from 'react'
import { SKILLS_FULL } from '../data/skills'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   ServicesGrid
---------------------------------------------------------------- */
export default function ServicesGrid() {
  const [ref, visible] = useInView(0.1)
  const [expanded, setExpanded] = useState(null)

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Amit tudok</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              A teljes <span className="chrome-text font-bold">eszköztár</span>,
              <span className="block font-display font-semibold text-primary">egy kézben.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            Önállóan viszem végig a projekteket az ötlettől az élesítésig — kis- és
            középvállalkozásoknak Magyarországon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SKILLS_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <button
                key={i}
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                onPointerEnter={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--fill-x', `${((e.clientX - r.left) / r.width) * 100}%`)
                  e.currentTarget.style.setProperty('--fill-y', `${((e.clientY - r.top) / r.height) * 100}%`)
                }}
                aria-expanded={expanded === i}
                data-cursor="link"
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                className={`svc-tile group w-full text-left bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-all duration-700 ease-out relative ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Floods from wherever the pointer crossed the edge. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] scale-0 opacity-0 bg-primary/15 transition-[transform,opacity] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                  style={{ transformOrigin: 'var(--fill-x, 50%) var(--fill-y, 50%)' }}
                />

                <div className="relative flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="relative font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="relative text-white/55 text-sm leading-relaxed">{svc.text}</p>

                <div
                  className={`relative grid transition-[grid-template-rows] duration-300 ease-out ${
                    expanded === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/45 text-sm leading-relaxed pt-3">{svc.detail}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
