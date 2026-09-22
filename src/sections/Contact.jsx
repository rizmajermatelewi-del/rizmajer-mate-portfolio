import { BUSINESS } from '../data/business'

/* Phase 1 has no /foglalas. Until Phase 2, the honest CTA is her telephone
   number — and if we do not have it yet, this section stays gone. */
export default function Contact() {
  if (!BUSINESS.phone && !BUSINESS.email) return null

  return (
    <section id="kapcsolat" className="px-5 py-16 sm:py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-3xl">
        <h2
          id="contact-heading"
          className="brand motion-rise text-3xl font-semibold tracking-tight text-stone-900"
        >
          Időpont
        </h2>
        <p className="mt-4 max-w-lg text-stone-600 leading-relaxed">
          Online foglalás még nincs. Ha szeretnél jönni, írj vagy hívj — visszajelzek.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          {BUSINESS.phone ? (
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="brand text-xl text-stone-900 underline underline-offset-4"
            >
              {BUSINESS.phone}
            </a>
          ) : null}
          {BUSINESS.email ? (
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-stone-700 underline underline-offset-4"
            >
              {BUSINESS.email}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
