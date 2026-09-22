import { BUSINESS } from '../data/business'

/* No hero photograph, by design. She has none, and a stock massage image is the
   fastest way to make a real salon look like a template (spec §5). Type and
   space carry it instead. Brand is the hero signal — not a marketing headline. */
export default function Hero() {
  const brand = BUSINESS.name || 'AB Masszázs'

  let support = null
  if (BUSINESS.tagline) {
    support = BUSINESS.tagline
  } else if (BUSINESS.phone) {
    support = 'Egy kezelő. Időpont telefonon.'
  } else {
    /* No invented CTA: without a number, do not promise a call. */
    support = 'Egy kezelő.'
  }

  return (
    <section className="px-5 pb-16 pt-10 sm:pb-24 sm:pt-16" aria-labelledby="hero-brand">
      <div className="mx-auto max-w-3xl">
        <p className="motion-rise font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
          Masszázs
        </p>
        <h1
          id="hero-brand"
          className="brand motion-rise motion-delay-1 mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl"
        >
          {brand}
        </h1>
        <p
          className={`motion-rise motion-delay-2 mt-6 leading-relaxed ${
            BUSINESS.tagline ? 'max-w-xl text-lg text-stone-600' : 'max-w-md text-base text-stone-500'
          }`}
        >
          {support}
        </p>
        {BUSINESS.city ? (
          <p className="motion-rise motion-delay-3 mt-5 text-sm uppercase tracking-widest text-stone-500">
            {BUSINESS.city}
          </p>
        ) : null}
      </div>
    </section>
  )
}
