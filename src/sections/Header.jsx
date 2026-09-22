import { BUSINESS } from '../data/business'
import { SERVICES } from '../data/services'

/* Quiet chrome over the full-bleed hero. Brand signal lives in the hero;
   this wordmark is navigation only. Links appear only when sections exist. */
export default function Header({ overlay = false }) {
  const brand = BUSINESS.name || 'AB Masszázs'
  const showServices = SERVICES.length > 0
  const showVisit = Boolean(
    (BUSINESS.street && BUSINESS.city) || BUSINESS.hours.length > 0 || BUSINESS.phone,
  )
  const showContact = Boolean(BUSINESS.phone || BUSINESS.email)
  const hasNav = showServices || showVisit || showContact

  return (
    <header
      className={`motion-fade z-20 px-5 ${
        overlay ? 'absolute inset-x-0 top-0 py-6 sm:py-8' : 'relative py-6'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4">
        <a
          href="/"
          className={`font-sans text-sm font-medium tracking-wide text-ink ${overlay ? 'text-ink/80' : ''}`}
          aria-label={`${brand} — főoldal`}
        >
          {brand}
        </a>
        {hasNav ? (
          <nav
            className="flex flex-wrap justify-end gap-x-7 gap-y-2 font-sans text-sm text-sage-mute"
            aria-label="Fő navigáció"
          >
            {showServices ? (
              <a href="#szolgaltatasok" className="nav-link hover:text-ink">
                Szolgáltatások
              </a>
            ) : null}
            {showVisit ? (
              <a href="#elerhetoseg" className="nav-link hover:text-ink">
                Elérhetőség
              </a>
            ) : null}
            {showContact ? (
              <a href="#kapcsolat" className="nav-link hover:text-ink">
                Kapcsolat
              </a>
            ) : null}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
