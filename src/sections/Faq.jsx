import { isPreviewMode, siteFaq } from '../data/site'

export default function Faq() {
  const faq = siteFaq()
  if (!faq.length) return null

  return (
    <section id="gyik" className="border-t border-divider bg-surface/50 px-5 py-20 sm:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-label text-muted">
          {isPreviewMode() ? 'Minta kérdések' : 'GYIK'}
        </p>
        <h2 id="faq-heading" className="brand mt-3 text-3xl font-semibold tracking-brand text-ink">
          Gyakori kérdések
        </h2>
        <dl className="mt-12 space-y-10">
          {faq.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-sans font-semibold text-ink">{q}</dt>
              <dd className="mt-2 font-sans leading-relaxed text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
