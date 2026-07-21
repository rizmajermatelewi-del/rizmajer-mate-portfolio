import { ArrowUpRight } from 'lucide-react'
import StackShuffler from '../components/showcases/StackShuffler'
import CodeScan from '../components/showcases/CodeScan'
import BookingScheduler from '../components/showcases/BookingScheduler'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
export default function Features() {
  const [sectionRef, visible] = useInView(0.15)

  const cards = [
    {
      eyebrow: '01 / Szakterület',
      heading: 'Modern Tech Stack',
      sub: 'Frontendtől backendig',
      text: 'React, Node.js és felhő-natív eszközök. Olyan rendszereket építek, amik gyorsak, skálázhatók és könnyen karbantarthatók.',
      Component: StackShuffler,
    },
    {
      eyebrow: '02 / Megbízhatóság',
      heading: 'Tiszta, Tesztelt Kód',
      sub: 'Build-ről build-re',
      text: 'Verziókezelés, automatizált tesztek és folyamatos integráció. A hibákat még élesítés előtt elkapom, nem utána.',
      Component: CodeScan,
    },
    {
      eyebrow: '03 / Együttműködés',
      heading: 'Egyeztetés & Indítás',
      sub: 'Az ötlettől a kódig',
      text: 'Foglalj egy rövid egyeztetést, ahol átbeszéljük az elképzelésed. Átlátható folyamat, egyértelmű mérföldkövek.',
      Component: BookingScheduler,
    },
  ]

  return (
    <section id="keszsegek" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div
          className={`feature-heading max-w-3xl mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Amiben segíthetek
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Három pillér.
            <span className="block font-display font-semibold text-primary-dark mt-1">Egy cél.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: visible ? `${idx * 150}ms` : '0ms' }}
              className={`feature-card group relative card-invert border border-divider rounded-5xl p-7 card-motion shadow-sm hover:border-primary/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* max={4}: these cards run their own demos, and the default
                  8deg tilt fights the motion already happening inside them. */}
              <TiltCard max={4}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-ink/30 group-hover:text-primary-dark group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    strokeWidth={1.8}
                  />
                </div>

                <card.Component />

                <div className="mt-6">
                  <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                  <p className="font-display font-medium text-primary-dark text-sm mt-1">{card.sub}</p>
                  <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
