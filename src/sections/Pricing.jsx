import { Check, ArrowRight } from 'lucide-react'
import { PRICING_TIERS, PRICING_SMALL_OFFERS, PRICING_RETAINER } from '../data/pricing'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'
import { Magnetic } from '../motion/Magnetic'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'

const COPY = {
  eyebrow: { hu: 'Árazás', en: 'Pricing' },
  headingAccent: { hu: 'Ennyiből', en: 'This is what' },
  headingTail: { hu: 'jön ki.', en: 'it comes to.' },
  intro: {
    hu: 'Ezek indulóárak. A pontosat akkor mondom meg, ha már tudom, mire van szükséged, és írásban, tételesen kapod meg. Utólag nem jön hozzá semmi.',
    en: 'These are starting prices. I give you the exact one once I know what you need, in writing and itemised. Nothing gets added to it afterwards.',
  },
}

/* ----------------------------------------------------------------
   Pricing
---------------------------------------------------------------- */
export default function Pricing() {
  const [ref, visible] = useInView(0.1)
  const locale = useLocale()

  return (
    <section id="arak" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Left-aligned like every other section header on the page. This was
            the only one centred, so it read as a change of axis mid-scroll. */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {t(COPY.eyebrow, locale)}</span>
          {/* "Egyszerű csomagok, rugalmas megoldások" said nothing. Every
              agency claims both, so neither word carried information; it was
              the kind of line that sounds like a headline without being one.
              The question the visitor actually arrived with is the headline. */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            {/* "Nagyjából" went. The section already hedges three times below —
                "indulóárak", "a pontosat akkor mondom meg", and a "-tól" on
                every figure — so a fourth apology in the headline left a
                pricing section that says the number and then flinches. */}
            <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>{' '}
            {t(COPY.headingTail, locale)}
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">
            {t(COPY.intro, locale)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <TiltCard key={i} max={5}>
            <article
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pricing-card group relative card-invert border rounded-5xl p-8 sm:p-10 card-motion ${
                visible ? 'opacity-100' : 'opacity-0 translate-y-10'
              } ${
                tier.highlight
                  ? `border-primary shadow-e3 ${visible ? 'lg:-translate-y-3' : ''}`
                  : 'border-divider hover:border-primary/60 hover:shadow-e4 hover:-translate-y-1.5'
              }`}
            >
              {/* The "Legnépszerűbb" badge is gone. It said the same thing as
                  this card's own eyebrow ("Leggyakoribb") in a second word —
                  the same duplication fixed further down for the CTA label —
                  and a superlative earned by two paying clients overclaims
                  next to a Pillars section that plainly says "2". The border,
                  the shadow and the lift still mark the card. */}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">{t(tier.eyebrow, locale)}</span>
              <h3 className="font-display font-bold text-2xl text-ink mt-3">{t(tier.name, locale)}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{t(tier.desc, locale)}</p>

              <div className="mt-6 pt-5 border-t border-divider">
                <p className="font-display font-semibold text-xl text-ink">{t(tier.priceNote, locale)}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mt-1.5">
                  {t(tier.scope, locale)}
                </p>
              </div>

              <ul className="mt-7 space-y-3">
                {tier.features.map((f, fi) => (
                  <li
                    key={fi}
                    style={{ transitionDelay: `${fi * 40}ms` }}
                    className="flex items-start gap-2.5 text-sm text-muted transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                    {t(f, locale)}
                  </li>
                ))}
              </ul>

              <Magnetic block className="mt-8">
                <a
                  href="#kapcsolat"
                  className={`magnetic-btn inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-colors duration-300 ${
                    tier.highlight
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background border border-divider text-ink hover:border-primary/60 hover:text-primary-dark'
                  }`}
                >
                  {/* Same words as the nav, hero and footer buttons. Two
                      labels for one action ("Ajánlatkérés" here, "Kérj
                      ajánlatot" everywhere else) reads as two destinations. */}
                  {t(UI.ctaQuote, locale)}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </article>
            </TiltCard>
          ))}
        </div>

        {/* Subordinate on purpose: a bordered strip on the page material, not a
            fourth inverted card. The three tiers set the scale; this catches the
            owner for whom the scale is still too big, so it has to read as a
            step down from them rather than as a competing option. */}
        <div
          style={{ transitionDelay: visible ? '480ms' : '0ms' }}
          className={`mt-10 sm:mt-12 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Two columns, not four stacked strips. At full width each of these
              read as a fourth tier competing with the grid above; in a tighter
              two-up they read as a menu of smaller things, which is what they
              are. The order is ascending price, set in pricing.js. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {PRICING_SMALL_OFFERS.map((offer) => (
              <div
                key={t(offer.name, locale)}
                className="rounded-5xl border border-divider p-6 sm:p-8 flex flex-col gap-5 hover:border-primary/60 transition-colors duration-300"
              >
                <div className="max-w-2xl">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
                    {t(offer.eyebrow, locale)}
                  </span>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display font-bold text-xl text-ink">{t(offer.name, locale)}</h3>
                    <p className="font-display font-semibold text-lg text-primary-dark">{t(offer.priceNote, locale)}</p>
                  </div>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{t(offer.desc, locale)}</p>
                </div>
                {/* mt-auto so the four cards' links line up along the bottom
                    regardless of how long each description runs. */}
                <a
                  href={offer.href}
                  className="mt-auto inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink hover:text-primary-dark transition-colors duration-300"
                >
                  {t(offer.linkLabel, locale)}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-muted text-sm mt-5 leading-relaxed max-w-3xl">{t(PRICING_RETAINER, locale)}</p>
        </div>
      </div>
    </section>
  )
}
