import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Mail } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Hero — typographic, on the same background as the rest of the page.
   The stock photo and its dark gradients are gone: they made the page
   open dark and turn light, which broke the single-background rule.
---------------------------------------------------------------- */
export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="kezdolap" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div aria-hidden="true" className="section-glow" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[26%] h-1 w-1 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl">
          <h1 className="font-display font-extrabold text-ink leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-3xl sm:text-4xl md:text-5xl">
              Weboldalak és rendszerek,
            </span>
            <span
              className="hero-line-2 block font-display font-semibold text-primary-dark text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2"
              style={{ lineHeight: '0.92' }}
            >
              amik teljesítenek.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-muted text-base sm:text-lg mt-8 leading-relaxed">
            Rizmajer Máté vagyok, full-stack fejlesztő. Kis- és középvállalkozásoknak
            építek weboldalakat és belső rendszereket — olyanokat, amiket utána te is
            tudsz kezelni<span className="text-ink">, az egyeztetéstől az élesítésig.</span>
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
              href="mailto:rizmajermatelewi@gmail.com"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-surface text-ink border border-divider font-medium px-7 py-4 rounded-full shadow-sm hover:border-primary/40 transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              rizmajermatelewi@gmail.com
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-muted">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Görgess</span>
          <div className="h-8 w-px bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  )
}
