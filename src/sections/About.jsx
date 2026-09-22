import PhotoSlot from '../components/PhotoSlot.jsx'
import { isPreviewMode, siteAbout } from '../data/site'

export default function About() {
  const text = siteAbout()
  if (!text) return null

  return (
    <section className="px-5 py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[2fr_1fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-muted">
            {isPreviewMode() ? 'Minta szöveg' : 'Bemutatkozás'}
          </p>
          <h2 id="about-heading" className="brand mt-3 text-3xl font-semibold tracking-brand text-ink">
            Rólam
          </h2>
          <p className="mt-6 whitespace-pre-line font-sans leading-relaxed text-muted">{text}</p>
        </div>
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
          <PhotoSlot src="" alt="" label={isPreviewMode() ? 'Minta — portré' : 'Portré'} />
        </div>
      </div>
    </section>
  )
}
