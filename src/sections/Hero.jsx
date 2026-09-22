import { BUSINESS } from '../data/business'

/* Full-bleed first composition: atmosphere + brand + one sentence (+ honest CTA
   only when a phone exists). No stock massage imagery, no hero cards/badges. */
export default function Hero() {
  const brand = BUSINESS.name || 'AB Masszázs'

  let support = null
  if (BUSINESS.tagline) {
    support = BUSINESS.tagline
  } else if (BUSINESS.phone) {
    support = 'Egy kezelő. Időpont telefonon.'
  } else {
    support = 'Egy kezelő.'
  }

  return (
    <section className="hero-shell" aria-labelledby="hero-brand">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <div className="mx-auto w-full max-w-5xl">
          <p className="motion-rise font-mono text-[10px] uppercase tracking-[0.28em] text-sage-mute">
            Masszázs
          </p>
          <h1
            id="hero-brand"
            className="brand motion-rise motion-delay-1 mt-5 max-w-[14ch] text-[clamp(2.75rem,12vw,7.25rem)] font-semibold leading-[0.92] tracking-brand text-ink"
          >
            {brand}
          </h1>
          <p
            className={`motion-rise motion-delay-2 mt-8 max-w-md font-sans leading-relaxed ${
              BUSINESS.tagline ? 'text-lg text-ink-soft' : 'text-base text-sage-mute'
            }`}
          >
            {support}
          </p>
          {BUSINESS.phone ? (
            <div className="motion-rise motion-delay-3 mt-10">
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                className="font-sans text-sm font-medium tracking-wide text-sage underline decoration-line underline-offset-[0.35rem] hover:text-ink"
              >
                Időpont: {BUSINESS.phone}
              </a>
            </div>
          ) : BUSINESS.city ? (
            <p className="motion-rise motion-delay-3 mt-8 font-sans text-sm uppercase tracking-[0.2em] text-sage-mute">
              {BUSINESS.city}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
