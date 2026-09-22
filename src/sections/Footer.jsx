import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()
  const owner = BUSINESS.legalName || BUSINESS.name || 'AB Masszázs'

  return (
    <footer className="border-t border-line/80 px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 font-sans text-sm text-sage-mute">
        <p>{`© ${year} ${owner}`}</p>
        <div className="flex flex-wrap gap-7">
          {BUSINESS.facebook ? (
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="nav-link hover:text-ink">
              Facebook
            </a>
          ) : null}
          {BUSINESS.instagram ? (
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="nav-link hover:text-ink">
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
