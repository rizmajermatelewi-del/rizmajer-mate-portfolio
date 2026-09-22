import { isPreviewMode, siteBusiness, sitePhoneIsPreview } from '../data/site'

export default function Visit() {
  const business = siteBusiness()
  const preview = isPreviewMode()
  const hasAddress = Boolean(business.street && business.city)
  const address = hasAddress
    ? `${business.postalCode ? `${business.postalCode} ` : ''}${business.city}, ${business.street}`
    : ''
  const hasAnything = hasAddress || business.hours.length > 0 || Boolean(business.phone)

  if (!hasAnything) return null

  return (
    <section
      id="elerhetoseg"
      className="border-y border-divider bg-surface/70 px-5 py-20 sm:py-28"
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-label text-muted">
          {preview ? 'Minta elérhetőség' : 'Elérhetőség'}
        </p>
        <h2 id="visit-heading" className="brand mt-3 text-3xl font-semibold tracking-brand text-ink">
          Elérhetőség
        </h2>
        <p className="mt-4 max-w-md font-sans leading-relaxed text-muted">
          {preview
            ? 'Minta cím és órák — nem a szalon valódi adatai.'
            : 'Hol vagyok, mikor, és hogyan szólíthatsz.'}
        </p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          {hasAddress ? (
            <div>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-label text-muted">
                Cím{preview ? ' (minta)' : ''}
              </h3>
              <p className="mt-3 font-sans text-lg text-ink">{address}</p>
              {business.mapsUrl ? (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-sans text-sm text-action underline underline-offset-4 hover:text-ink"
                >
                  Megnyitás a térképen
                </a>
              ) : null}
            </div>
          ) : null}

          {business.hours.length ? (
            <div>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-label text-muted">
                Nyitvatartás{preview ? ' (minta)' : ''}
              </h3>
              <dl className="mt-3 space-y-1.5 font-sans">
                {business.hours.map(({ day, opens, closes }) => (
                  <div key={day} className="flex justify-between gap-6 text-ink">
                    <dt>{day}</dt>
                    <dd className="tabular-nums text-muted">{`${opens} – ${closes}`}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {business.phone ? (
            <div>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-label text-muted">
                Időpontért{sitePhoneIsPreview() ? ' (minta)' : ''}
              </h3>
              {sitePhoneIsPreview() ? (
                <p className="mt-3 font-sans text-lg text-ink">{business.phone}</p>
              ) : (
                <a
                  href={`tel:${business.phone.replace(/\s/g, '')}`}
                  className="mt-3 inline-block font-sans text-lg text-ink underline underline-offset-4"
                >
                  {business.phone}
                </a>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
