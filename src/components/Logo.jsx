/* Two marks, two jobs.
   `LogoMark` is drawn here as SVG because the supplied artwork is a raster
   mockup whose wordmark and tsuka hatching turn to noise below ~80px — see
   the extraction check. This keeps the blade-through-circle silhouette, which
   is the recognisable part, and stays sharp at favicon size.
   `LogoLockup` uses the real artwork, and is only ever used large. */
import logoKatana from '../assets/logo-katana.png'

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Rizmajer"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* Circle broken top and bottom, so the blade reads as passing through. */}
      <path d="M31.5 5.9a20 20 0 0 1 0 36.2" />
      <path d="M16.5 42.1a20 20 0 0 1 0-36.2" />
      {/* Tsuka, tsuba, then the blade with its shinogi line. */}
      <path d="M24 4.5v11.2" strokeWidth="2.6" />
      <path d="M19.6 15.7h8.8" strokeWidth="1.8" />
      <path d="M24 17.6v25.9" strokeWidth="2.2" />
      <path d="M26.2 19.4v20.4" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

export function LogoLockup({ className = 'h-40 w-auto' }) {
  return (
    <img
      src={logoKatana}
      alt="Rizmajer"
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}
