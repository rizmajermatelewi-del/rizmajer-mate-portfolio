import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'

/* Returns null rather than an empty section while the price list is unknown. */
export default function Services() {
  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-5 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-5xl">
        <h2
          id="services-heading"
          className="brand text-3xl font-semibold tracking-brand text-ink sm:text-4xl"
        >
          Szolgáltatások
        </h2>
        <p className="mt-4 max-w-md font-sans text-sage-mute leading-relaxed">
          Időtartam és ár — egy listában.
        </p>

        <ul className="mt-12 divide-y divide-line border-t border-line">
          {SERVICES.map((service) => (
            <li key={service.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-6">
              <h3 className="font-sans text-lg font-medium text-ink">{service.name}</h3>
              <span className="font-sans text-sm text-sage-mute">{formatDuration(service.minutes)}</span>
              <span className="ml-auto font-sans text-lg tabular-nums text-ink">
                {formatPrice(service.price)}
              </span>
              {service.desc ? (
                <p className="w-full font-sans text-sm leading-relaxed text-sage-mute">{service.desc}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
