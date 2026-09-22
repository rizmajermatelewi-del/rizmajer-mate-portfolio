import { isPreviewMode, siteBusiness, sitePhoneIsPreview } from '../data/site'

export default function Contact() {
  const business = siteBusiness()
  if (!business.phone && !business.email) return null

  const phonePreview = sitePhoneIsPreview()

  return (
    <section id="kapcsolat" className="px-5 py-20 sm:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-label text-muted">
          {isPreviewMode() ? 'Minta kapcsolat' : 'Kapcsolat'}
        </p>
        <h2 id="contact-heading" className="brand mt-3 text-3xl font-semibold tracking-brand text-ink">
          Időpont
        </h2>
        <p className="mt-4 max-w-lg font-sans leading-relaxed text-muted">
          {isPreviewMode()
            ? 'Online foglalás még nincs. A telefonszám és e-mail itt csak minta — ne hívd / ne írj rá.'
            : 'Online foglalás még nincs. Ha szeretnél jönni, írj vagy hívj — visszajelzek.'}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          {business.phone ? (
            phonePreview ? (
              <p className="brand text-2xl text-ink">
                {business.phone}
                <span className="ml-3 font-sans text-sm font-normal text-muted">minta</span>
              </p>
            ) : (
              <a
                href={`tel:${business.phone.replace(/\s/g, '')}`}
                className="brand text-2xl text-ink underline decoration-divider underline-offset-[0.4rem] hover:decoration-ink"
              >
                {business.phone}
              </a>
            )
          ) : null}
          {business.email ? (
            isPreviewMode() ? (
              <p className="font-sans text-muted">
                {business.email}
                <span className="ml-2">(minta)</span>
              </p>
            ) : (
              <a
                href={`mailto:${business.email}`}
                className="font-sans text-muted underline underline-offset-4 hover:text-ink"
              >
                {business.email}
              </a>
            )
          ) : null}
        </div>
      </div>
    </section>
  )
}
