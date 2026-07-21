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
    <section ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div aria-hidden="true" className="section-glow" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Amit tudok</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              A teljes <span className="text-primary-dark font-bold">eszköztár</span>,
              <span className="block font-display font-semibold text-primary">egy kézben.</span>
            </h2>
          </div>
          <p className="text-muted max-w-md text-base leading-relaxed">
            Önállóan viszem végig a projekteket az ötlettől az élesítésig — kis- és
            középvállalkozásoknak Magyarországon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-divider rounded-4xl overflow-hidden">
          {SKILLS_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <button
                key={i}
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                className={`svc-tile group w-full text-left card-invert p-7 sm:p-9 relative card-motion hover:bg-white/[0.04] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Uniform wash, not a pointer-origin flood — the hover state
                    should not track where the cursor happens to be. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 bg-primary/10 transition-opacity duration-300 ease-out group-hover:opacity-100"
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
