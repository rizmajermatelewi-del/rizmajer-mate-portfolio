import { isPreviewMode } from '../data/site'

export default function PreviewBanner() {
  if (!isPreviewMode()) return null

  return (
    <div
      role="status"
      className="relative z-30 border-b border-divider bg-deep px-5 py-2.5 text-center font-sans text-[11px] leading-snug tracking-wide text-surface sm:text-xs"
    >
      <span className="font-semibold">Előnézet / minta</span>
      <span className="mx-2 text-surface/40" aria-hidden="true">
        ·
      </span>
      <span className="text-surface/75">
        A szövegek, árak, cím és órák nem a valódi szalon adatai — design bemutató.
      </span>
    </div>
  )
}
