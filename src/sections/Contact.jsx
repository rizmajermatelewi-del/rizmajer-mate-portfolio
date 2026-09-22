import { BUSINESS } from '../data/business'

/* Phase 1 has no /foglalas — honest CTA is phone/email when present. */
export default function Contact() {
  if (!BUSINESS.phone && !BUSINESS.email) return null

  return (
    <section id="kapcsolat" className="px-5 py-20 sm:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="contact-heading" className="brand text-3xl font-semibold tracking-brand text-ink">
          Időpont
        </h2>
        <p className="mt-4 max-w-lg font-sans text-sage-mute leading-relaxed">
          Online foglalás még nincs. Ha szeretnél jönni, írj vagy hívj — visszajelzek.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          {BUSINESS.phone ? (
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="brand text-2xl text-ink underline decoration-line underline-offset-[0.4rem] hover:decoration-ink"
            >
              {BUSINESS.phone}
            </a>
          ) : null}
          {BUSINESS.email ? (
            <a
              href={`mailto:${BUSINESS.email}`}
              className="font-sans text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              {BUSINESS.email}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
