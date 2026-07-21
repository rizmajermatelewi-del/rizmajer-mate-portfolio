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
      strokeWidth="2.8"
      strokeLinecap="round"
    >
      {/* Weights are deliberately heavy: this renders around 32px, where the
          48-unit viewBox scales strokes by 0.667. Anything under ~2.5 here
          lands below a physical pixel and disappears. The shinogi line the
          full artwork carries is omitted for the same reason. */}
      <path d="M31.5 5.9a20 20 0 0 1 0 36.2" />
      <path d="M16.5 42.1a20 20 0 0 1 0-36.2" />
      <path d="M24 4.5v11.2" strokeWidth="4.4" />
      <path d="M19.2 15.7h9.6" strokeWidth="3" />
      <path d="M24 17.6v25.9" strokeWidth="3.6" />
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
