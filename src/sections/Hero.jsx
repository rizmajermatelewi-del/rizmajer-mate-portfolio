import { isPreviewMode, siteBusiness, sitePhoneIsPreview } from '../data/site'

export default function Hero() {
  const business = siteBusiness()
  const brand = business.name || 'AB Masszázs'
  const preview = isPreviewMode()
  const phonePreview = sitePhoneIsPreview()
  const support = business.tagline || 'Egy kezelő.'

  return (
    <section className="hero-shell" aria-labelledby="hero-brand">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <div className="mx-auto w-full max-w-5xl">
          <p className="motion-rise font-mono text-[11px] uppercase tracking-label text-muted">
            {preview ? 'Előnézet · Masszázs' : 'Masszázs'}
          </p>
          <h1
            id="hero-brand"
            className="brand motion-rise motion-delay-1 mt-5 max-w-[12ch] text-[clamp(2.75rem,11vw,6.5rem)] font-semibold leading-[0.95] tracking-brand text-ink"
          >
            {brand}
          </h1>
          <p className="motion-rise motion-delay-2 mt-7 max-w-lg font-sans text-lg leading-relaxed text-muted">
            {support}
          </p>
          <div className="motion-rise motion-delay-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#szolgaltatasok"
              className="inline-flex items-center rounded-full bg-deep px-5 py-2.5 font-sans text-sm font-semibold text-surface transition-colors hover:bg-action"
            >
              Szolgáltatások
            </a>
            {business.phone ? (
              phonePreview ? (
                <span className="font-sans text-sm text-muted">
                  Időpont (minta): {business.phone}
                </span>
              ) : (
                <a
                  href={`tel:${business.phone.replace(/\s/g, '')}`}
                  className="font-sans text-sm font-medium text-action underline decoration-divider underline-offset-[0.35rem] hover:text-ink"
                >
                  Időpont: {business.phone}
                </a>
              )
            ) : null}
          </div>
          {business.city ? (
            <p className="motion-rise motion-delay-3 mt-8 font-mono text-[11px] uppercase tracking-label text-muted">
              {business.city}
              {preview ? ' · minta' : ''}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
