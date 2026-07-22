import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   Testimonial — renders nothing until there is a real quote.
   An empty testimonial frame reads worse than no testimonial at all,
   so the section removes itself rather than showing a placeholder.
---------------------------------------------------------------- */
export default function Testimonial() {
  const [ref, visible] = useInView(0.2)

  if (TESTIMONIALS.length === 0) return null

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
            className={`card-invert border border-divider rounded-5xl p-8 sm:p-12 card-motion shadow-e2 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Quote className="h-8 w-8 text-primary-dark mb-6" strokeWidth={1.6} />
            <blockquote className="font-display font-medium text-xl sm:text-2xl text-ink leading-snug">
              {t.quote}
            </blockquote>
            <figcaption className="mt-7 pt-6 border-t border-divider">
              <p className="font-display font-semibold text-ink">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mt-1.5">
                {t.role}
                {t.company && ` · ${t.company}`}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
