import { PROJECTS_FULL } from '../data/projects'
import ProjectMock from '../components/ProjectMock'
import { useInView } from '../motion/useInView'

export default function Projects() {
  const [sectionRef, visible] = useInView(0.1)

  return (
    <section id="projektek" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Projektek</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Amin dolgozom.
            <span className="block font-display font-semibold text-primary-dark mt-1">Valós munka, nem mockup.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            Négy projekt, amit ténylegesen megépítettem — kettő élő ügyfélmunka, kettő saját
            kezdeményezés, amivel a saját gondolkodásomat és árazási stratégiámat teszteltem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS_FULL.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`proj-card group bg-surface border border-divider rounded-4xl overflow-hidden hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ProjectMock tone={p.tone} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink leading-tight">{p.title}</h3>
                <p className="text-muted text-[13px] mt-2.5 leading-relaxed">{p.text}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
