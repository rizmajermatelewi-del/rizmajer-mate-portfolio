import { BUSINESS } from '../data/business'
import { SERVICES } from '../data/services'

/* Nav links only point at sections that actually render. An empty-facts
   scaffold must not ship dead fragment links — that is empty-state honesty. */
export default function Header() {
  const brand = BUSINESS.name || 'AB Masszázs'
  const showServices = SERVICES.length > 0
  const showVisit = Boolean(
    (BUSINESS.street && BUSINESS.city) || BUSINESS.hours.length > 0 || BUSINESS.phone,
  )
  const showContact = Boolean(BUSINESS.phone || BUSINESS.email)
  const hasNav = showServices || showVisit || showContact

  return (
    <header className="motion-fade px-5 py-6">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-4">
        <a
          href="/"
          className="brand text-lg font-semibold tracking-tight text-stone-900"
          aria-label={`${brand} — főoldal`}
        >
          {brand}
        </a>
        {hasNav ? (
          <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm text-stone-600" aria-label="Fő navigáció">
            {showServices ? (
              <a href="#szolgaltatasok" className="hover:text-stone-900">
                Szolgáltatások
              </a>
            ) : null}
            {showVisit ? (
              <a href="#elerhetoseg" className="hover:text-stone-900">
                Elérhetőség
              </a>
            ) : null}
            {showContact ? (
              <a href="#kapcsolat" className="hover:text-stone-900">
                Kapcsolat
              </a>
            ) : null}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
