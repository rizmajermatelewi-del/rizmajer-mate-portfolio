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
          lands below a physical pixel and disappears.

          The earlier version was a straight vertical bar crossed by a
          symmetric horizontal one — which is the definition of a latin cross,
          and inside a circle it read as a celtic one. Three additions fix the
          silhouette rather than the details:
            - kissaki: the blade ends in an asymmetric point instead of a
              round cap. A cross terminates blunt and symmetric, so a taper
              rules the reading out on its own. Filled, so it survives small.
            - kashira: a cap closes the top of the grip. Crosses have no
              pommel; a capped end reads as a handle.
            - tsuka-ito and ha: wrap strokes on the grip and a single edge
              line down one side of the blade. These are the fine details the
              original comment rightly said turn to noise when small — at
              sub-1px they simply fade, leaving the point-and-cap silhouette
              intact, so they cost nothing at favicon size and pay off large. */}
      {/* Rotated as one group, circle included. Tilt is the single strongest
          cue: a cross is upright and orthogonal by definition, so off-axis it
          stops reading as one at every size — including 16px, where the grip
          and edge detail have already faded out. The ring rotates with the
          blade because its two arcs leave gaps at top and bottom for the sword
          to pass through; turning the sword alone would drive the point
          straight through the stroke instead of the opening. */}
      <g transform="rotate(38 24 24)">
        <path d="M31.5 5.9a20 20 0 0 1 0 36.2" />
        <path d="M16.5 42.1a20 20 0 0 1 0-36.2" />
        <path d="M21.4 5.3h5.2" strokeWidth="2.6" />
        <path d="M24 6.8v8.4" strokeWidth="4.6" />
        <path d="M21.9 10.4l4.2-1.8" strokeWidth="1.3" />
        <path d="M21.9 13.6l4.2-1.8" strokeWidth="1.3" />
        <path d="M19.4 16h9.2" strokeWidth="2.8" />
        <path d="M24 18v20.4" strokeWidth="3.6" strokeLinecap="butt" />
        <path d="M25.4 19.6v16.8" strokeWidth="0.9" />
        <path d="M22.2 38.2h3.6l-1.4 5.9z" fill="currentColor" stroke="none" />
      </g>
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
