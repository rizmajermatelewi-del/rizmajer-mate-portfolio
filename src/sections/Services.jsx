import { isPreviewMode, siteServices } from '../data/site'
import { formatPrice, formatDuration } from '../lib/format'

export default function Services() {
  const services = siteServices()
  if (!services.length) return null

  return (
    <section id="szolgaltatasok" className="bg-surface/60 px-5 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-label text-muted">
          {isPreviewMode() ? 'Minta árlista' : 'Árlista'}
        </p>
        <h2
          id="services-heading"
          className="brand mt-3 text-3xl font-semibold tracking-brand text-ink sm:text-4xl"
        >
          Szolgáltatások
        </h2>
        <p className="mt-4 max-w-md font-sans leading-relaxed text-muted">
          {isPreviewMode()
            ? 'Előnézeti tételek — a valódi árakat a kezelő adja meg.'
            : 'Időtartam és ár — egy listában.'}
        </p>

        <ul className="mt-12 divide-y divide-divider border-t border-divider">
          {services.map((service) => (
            <li key={service.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-6">
              <h3 className="font-sans text-lg font-semibold text-ink">{service.name}</h3>
              <span className="font-sans text-sm text-muted">{formatDuration(service.minutes)}</span>
              <span className="ml-auto font-sans text-lg tabular-nums text-ink">
                {formatPrice(service.price)}
              </span>
              {service.desc ? (
                <p className="w-full font-sans text-sm leading-relaxed text-muted">{service.desc}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
