import { BUSINESS } from '../data/business'

/* Where / when / phone — each block only if the fact exists. Map is a link, not an iframe. */
export default function Visit() {
  const hasAddress = Boolean(BUSINESS.street && BUSINESS.city)
  const address = hasAddress
    ? `${BUSINESS.postalCode ? `${BUSINESS.postalCode} ` : ''}${BUSINESS.city}, ${BUSINESS.street}`
    : ''
  const hasAnything = hasAddress || BUSINESS.hours.length > 0 || Boolean(BUSINESS.phone)

  if (!hasAnything) return null

  return (
    <section
      id="elerhetoseg"
      className="border-y border-line/70 bg-mist-deep/40 px-5 py-20 sm:py-28"
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="visit-heading" className="brand text-3xl font-semibold tracking-brand text-ink">
          Elérhetőség
        </h2>
        <p className="mt-4 max-w-md font-sans text-sage-mute leading-relaxed">
          Hol vagyok, mikor, és hogyan szólíthatsz.
        </p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          {hasAddress ? (
            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-sage-mute">
                Cím
              </h3>
              <p className="mt-3 font-sans text-lg text-ink">{address}</p>
              {BUSINESS.mapsUrl ? (
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-sans text-sm text-sage underline underline-offset-4 hover:text-ink"
                >
                  Megnyitás a térképen
                </a>
              ) : null}
            </div>
          ) : null}

          {BUSINESS.hours.length ? (
            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-sage-mute">
                Nyitvatartás
              </h3>
              <dl className="mt-3 space-y-1.5 font-sans">
                {BUSINESS.hours.map(({ day, opens, closes }) => (
                  <div key={day} className="flex justify-between gap-6 text-ink">
                    <dt>{day}</dt>
                    <dd className="tabular-nums text-ink-soft">{`${opens} – ${closes}`}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {BUSINESS.phone ? (
            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-sage-mute">
                Időpontért
              </h3>
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                className="mt-3 inline-block font-sans text-lg text-ink underline underline-offset-4"
              >
                {BUSINESS.phone}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
