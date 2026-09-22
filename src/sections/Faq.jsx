import { FAQ } from '../data/faq'

export default function Faq() {
  if (!FAQ.length) return null

  return (
    <section id="gyik" className="px-5 py-20 sm:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="faq-heading" className="brand text-3xl font-semibold tracking-brand text-ink">
          Gyakori kérdések
        </h2>
        <dl className="mt-12 space-y-10">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-sans font-medium text-ink">{q}</dt>
              <dd className="mt-2 font-sans leading-relaxed text-sage-mute">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
