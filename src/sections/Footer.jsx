import { Link } from 'react-router-dom'
import { siteBusiness, isPreviewMode } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const business = siteBusiness()
  const owner = business.legalName || business.name || 'AB Masszázs'

  return (
    <footer className="border-t border-divider bg-paper px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 font-sans text-sm text-muted">
        <p>
          {`© ${year} ${owner}`}
          {isPreviewMode() ? (
            <span className="ml-2 font-mono text-[9px] uppercase tracking-label">előnézet</span>
          ) : null}
        </p>
        <div className="flex flex-wrap gap-7">
          {business.facebook ? (
            <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="nav-link hover:text-ink">
              Facebook
            </a>
          ) : null}
          {business.instagram ? (
            <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="nav-link hover:text-ink">
              Instagram
            </a>
          ) : null}
          <Link to="/adatvedelem" className="nav-link hover:text-ink">
            Adatvédelem
          </Link>
        </div>
      </div>
    </footer>
  )
}
