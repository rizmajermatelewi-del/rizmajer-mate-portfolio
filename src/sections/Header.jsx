import { isPreviewMode, siteBusiness, siteServices } from '../data/site'

export default function Header() {
  const business = siteBusiness()
  const services = siteServices()
  const brand = business.name || 'AB Masszázs'
  const showServices = services.length > 0
  const showVisit = Boolean(
    (business.street && business.city) || business.hours.length > 0 || business.phone,
  )
  const showContact = Boolean(business.phone || business.email)

  return (
    <header className="motion-fade relative z-20 border-b border-divider/50 bg-paper/70 px-5 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4">
        <a
          href="/"
          className="brand text-[15px] font-semibold tracking-brand text-ink"
          aria-label={`${brand} — főoldal`}
        >
          {brand}
          {isPreviewMode() ? (
            <span className="ml-2 font-mono text-[9px] font-normal uppercase tracking-label text-muted">
              minta
            </span>
          ) : null}
        </a>
        <nav
          className="flex flex-wrap justify-end gap-x-7 gap-y-2 font-sans text-sm text-muted"
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
      </div>
    </header>
  )
}
