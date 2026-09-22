import PhotoSlot from '../components/PhotoSlot.jsx'

export const ABOUT_TEXT = ''

export default function About() {
  if (!ABOUT_TEXT) return null

  return (
    <section className="px-5 py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[2fr_1fr]">
        <div>
          <h2 id="about-heading" className="brand text-3xl font-semibold tracking-brand text-ink">
            Rólam
          </h2>
          <p className="mt-6 whitespace-pre-line font-sans leading-relaxed text-ink-soft">{ABOUT_TEXT}</p>
        </div>
        <div className="aspect-[3/4] overflow-hidden">
          <PhotoSlot src="" alt="" label="Portré" />
        </div>
      </div>
    </section>
  )
}
