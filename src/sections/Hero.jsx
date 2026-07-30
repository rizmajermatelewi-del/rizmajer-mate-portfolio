import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'
import { useReducedMotion } from '../motion/useReducedMotion'
import heroBackdrop from '../assets/portrait-sunset.jpg'

/* ----------------------------------------------------------------
   Hero.

   The backdrop is an owned local photo, not a remote stock shot. It used
   to be a hotlinked stock URL of PHP on a monitor — a third-party runtime
   request in a codebase that self-hosts its fonts precisely to avoid
   those, showing a language this site does not sell. Bundling the asset
   also lets img-src drop the extra host from the CSP.
---------------------------------------------------------------- */
export default function Hero() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrance. Under reduced motion the copy is placed, not animated:
         gsap.set leaves it at its final values so nothing is ever gated
         behind a transition that will not run. */
      if (reduce) {
        gsap.set('.hero-line-1, .hero-line-2, .hero-cta, .hero-meta', { y: 0, opacity: 1 })
        return
      }

      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })

      /* Depth on scroll. The photograph drifts slower than the page and the
         copy drifts faster, so the two separate as you leave the hero and
         the frame reads as having a back and a front rather than being one
         flat plate.

         Both are transform and opacity only, so this stays on the compositor
         and costs nothing on the main thread. The image starts pre-scaled at
         1.12 in the markup, which is the headroom the translate consumes;
         without it the bottom edge would lift off the section. */
      gsap.to('.hero-backdrop', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to('.hero-copy', {
        yPercent: -8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="kezdolap" ref={heroRef} className="relative min-h-viewport w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* The hero image is the LCP element, so it loads eagerly and at high
            priority rather than waiting its turn behind the bundle. */}
        <img
          src={heroBackdrop}
          alt="Rizmajer Máté Levente naplementében, egy sziklán ülve"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-backdrop w-full h-full object-cover scale-[1.12] will-change-transform"
        />
        {/* Scrim weighted left, where the headline sits, so the photo stays
            visible on the right instead of being flattened everywhere. It
            used to be bg-deep/85 under a full-bleed gradient, which meant the
            image was downloaded and then rendered invisible: an asset paid
            for in bytes and showing nothing. */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/85 to-deep/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-deep/40" />
        {/* Fades into the light page, so the boundary is a transition
            rather than the hard seam a flat cut would leave. */}
        {/* Linear ramp, no midpoint stop. With via-background/70 the fade was
            already 70% opaque halfway up, which read as a white smear across
            the lower third rather than a transition into the page. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Left-aligned, not centred. The scrim is heaviest on the left, so the
          copy sits where it is most legible and the photograph keeps the
          right half of the frame. */}
      <div className="relative z-10 flex min-h-viewport flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="hero-copy w-full max-w-4xl will-change-transform">
          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-3xl sm:text-4xl">
              Weboldal, amit megtalálnak.
            </span>
            {/* Capped at 6xl so the line holds on one row at desktop. At 8xl
                it wrapped, which made the headline three lines tall and
                pushed the buttons toward the fold. */}
            <span
              className="hero-line-2 block font-display font-semibold text-primary-light text-4xl sm:text-5xl md:text-6xl mt-2"
              style={{ lineHeight: '0.95' }}
            >
              Rendszer, ami dolgozik.
            </span>
          </h1>

          <p className="hero-meta max-w-lg text-white/80 text-base sm:text-lg mt-7 leading-relaxed">
            Kis- és középvállalkozásoknak építek weboldalakat és belső rendszereket,
            amiket utána <span className="text-white">te is tudsz kezelni</span>.
          </p>

          {/* Two CTAs, two intents. The secondary used to be the email address
              spelled out in full: a long label pointing at the same "contact
              me" action as the primary button beside it. Sending it to the
              work instead gives the visitor who is not ready to write
              somewhere to go. */}
          <div className="hero-cta mt-9 flex flex-col sm:flex-row gap-4">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#kapcsolat"
                className="magnetic-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/30"
              >
                Kérj ajánlatot
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="#projektek"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/25 font-medium px-7 py-4 rounded-full"
            >
              Munkáim
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
