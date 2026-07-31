import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
/* Downloaded, not hotlinked. The CSP in vercel.json is `img-src 'self' data:`,
   so an images.unsplash.com URL is blocked in production — and blocked only
   there, because `vite preview` does not apply vercel.json headers. Importing
   the files means Vite hashes them and they load as first-party assets. */
import protocolEgyeztetes from '../assets/protocol-01-egyeztetes.jpg'
import protocolFejlesztes from '../assets/protocol-02-fejlesztes.jpg'
import protocolAtadas from '../assets/protocol-03-atadas.jpg'

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
export default function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })

      gsap.to('.progress-rail', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  /* `meta` is gone. It read "Lépés 1 / Listen" — Hungarian and English in
     one label, on a page that is otherwise entirely Hungarian.

     `image` / `imageAlt` bring back the right-hand panel. It was originally
     three stock "developer at a laptop" shots, then an empty frame after
     those were pulled, and now it is a real slot: give it a file and it
     shows the photograph, leave it empty and it draws a labelled blueprint
     frame instead of pretending. Drop files in src/assets, import them at
     the top of this file, and set the fields.

     Wanted: 01 a real meeting or notes shot, 02 the build in progress on a
     screen, 03 the handover. Anything genuinely yours beats stock here.

     TEMPORARY: those three slots currently hold Unsplash photographs, put
     back deliberately and knowing they were pulled once before. They are
     atmosphere, not evidence — nothing here is presented as a shot of a real
     project, which is why every `imageAlt` is '' and the images render as
     decorative. Replace them with your own photographs of an actual
     consultation, an actual build and an actual handover the moment you have
     any; a real one is worth more than all three of these. Deleting a file
     and blanking its two fields restores the blueprint frame. */
  const steps = [
    {
      num: '01',
      title: 'Egyeztetés',
      tagline: 'Először meghallgatlak.',
      text: 'Végigvesszük, mi az, ami ma kézzel megy, és mennyi időt visz el. Ebből írásos terjedelem és fix ár lesz: mielőtt bármit elkezdenék, tudod, mit kapsz és mennyiért.',
      image: protocolEgyeztetes,
      imageAlt: '',
    },
    {
      num: '02',
      title: 'Tervezés és fejlesztés',
      tagline: 'Menet közben látod, hol tart.',
      text: 'Kapsz egy linket, amin az épülő oldal végig megnézhető. Nem a végén szembesülsz az eredménnyel: amíg alakul, olcsó változtatni rajta.',
      image: protocolFejlesztes,
      imageAlt: '',
    },
    {
      num: '03',
      title: 'Átadás és támogatás',
      tagline: 'A leadás után sem tűnök el.',
      text: 'Élesítés előtt telefonon, tableten és több böngészőben is végigmegyek rajta. Átadom a hozzáféréseket, és megmutatom, hogyan kezeld. A domain és a kód a tiéd marad.',
      image: protocolAtadas,
      imageAlt: '',
    },
  ]

  return (
    <section id="folyamat" ref={containerRef} className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-divider">
        <div className="progress-rail h-full w-full origin-top scale-y-0 bg-primary" />
      </div>

      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight max-w-3xl">
          Három lépés, semmi <span className="text-primary-dark font-semibold">meglepetés</span>.
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl card-invert border border-divider rounded-6xl overflow-hidden shadow-e3"
          >
            {/* Text left, visual right. The panel is full-bleed to the card
                edge, so the padding lives on the text column rather than on
                the grid, and the image runs all the way into the corner
                radius instead of floating in a padded box. */}
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16">
                {/* The 6-8rem watermark numeral is gone. It was the only thing
                    keeping Lighthouse accessibility off 100, at
                    text-primary/15 — and clearing the 3:1 large-text bar would
                    have meant roughly tripling its opacity, turning a faint
                    watermark into a dominant element. Design principle 6
                    settles it rather than the contrast rule: decorative
                    numerals are the visual inflation this brand is positioned
                    against, and the order of the steps already carries the
                    sequence. */}
                <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight mt-6">
                  {step.title}
                </h3>
                <p className="font-display font-medium text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg border-t border-divider mt-8 pt-6">
                  {step.text}
                </p>
              </div>

              {/* One step lighter than the card, not the same fill. At bg-deep
                  the panel was invisible: an empty area the same colour as
                  everything around it, so the dashed frame looked like a
                  stray border rather than a slot waiting for a picture. The
                  tonal step is what makes it read as its own surface, which
                  is also how the card steps in projects.js work. */}
              <div
                className="lg:col-span-5 relative overflow-hidden min-h-[240px] lg:min-h-full"
                style={{ backgroundColor: 'rgb(var(--color-card-1))' }}
              >
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgb(var(--color-primary-light) / 0.10) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-primary-light) / 0.10) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-6 rounded-3xl border border-dashed border-primary-light/25"
                    />
                    <span className="absolute inset-0 flex items-center justify-center px-6 text-center">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-light/60">
                        Kép hamarosan
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
