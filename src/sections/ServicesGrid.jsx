import { useRef, useState, useEffect } from 'react'
import { SKILLS_FULL } from '../data/skills'

/* ----------------------------------------------------------------
   ServicesGrid
---------------------------------------------------------------- */
export default function ServicesGrid() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
              <div
                key={i}
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                className={`svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-all duration-700 ease-out relative ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
