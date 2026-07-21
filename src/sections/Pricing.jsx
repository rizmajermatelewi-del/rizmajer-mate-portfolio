import { Check, ArrowRight } from 'lucide-react'
import { PRICING_TIERS } from '../data/pricing'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Pricing
---------------------------------------------------------------- */
export default function Pricing() {
  const [ref, visible] = useInView(0.1)

  return (
    <section id="arak" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-20 text-center mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Árazás</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Egyszerű csomagok.
            <span className="block font-display font-semibold text-primary-dark mt-1">Rugalmas megoldások.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">
            Az árak tájékoztató jellegűek és a projekt egyedi igényeitől függenek. Kérj
            személyre szabott ajánlatot — nincsenek rejtett költségek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <TiltCard key={i} max={5}>
            <article
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pricing-card group relative card-invert border rounded-5xl p-8 sm:p-10 transition-all duration-700 ease-out ${
                visible ? 'opacity-100' : 'opacity-0 translate-y-10'
              } ${
                tier.highlight
                  ? `border-primary shadow-xl shadow-primary/15 ${visible ? 'lg:-translate-y-3' : ''}`
                  : 'border-divider hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full shadow-md">
                  Legnépszerűbb
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">{tier.eyebrow}</span>
              <h3 className="font-display font-bold text-2xl text-ink mt-3">{tier.name}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{tier.desc}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                  {tier.price}
                </span>
                {tier.priceSuffix && (
                  <span className="font-display font-medium text-primary-dark text-lg">{tier.priceSuffix}</span>
                )}
              </div>

              <ul className="mt-7 space-y-3">
                {tier.features.map((f, fi) => (
                  <li
                    key={fi}
                    style={{ transitionDelay: `${fi * 40}ms` }}
                    className="flex items-start gap-2.5 text-sm text-muted transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <Magnetic block className="mt-8">
                <a
                  href="#kapcsolat"
                  className={`magnetic-btn inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-colors duration-300 ${
                    tier.highlight
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background border border-divider text-ink hover:border-primary/40 hover:text-primary-dark'
                  }`}
                >
                  Ajánlatkérés
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
