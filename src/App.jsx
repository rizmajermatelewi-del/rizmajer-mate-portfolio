import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Protocol from './sections/Protocol'
import Services from './sections/Services'
import Faq from './sections/Faq'
import Testimonial from './sections/Testimonial'
import ContactForm from './sections/ContactForm'
import Footer from './sections/Footer'
import { useLocale } from './i18n/useLocale'
import { t } from './i18n/t'
import { UI } from './i18n/ui'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const locale = useLocale()

  /* Inertia scrolling (2026-11-10, Máté: "butter smooth"). Wheel only: Lenis
     leaves touch native by default (syncTouch off), so phones scroll exactly as
     before. Not started at all under prefers-reduced-motion. Driven from the
     GSAP ticker so the hero parallax and ScrollTrigger stay in step with it. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 200)
    const t2 = setTimeout(refresh, 1000)
    document.fonts?.ready?.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <div className="relative">
      {/* First focusable element on the page, and invisible until it is
          focused. Before this, tabbing into the home page meant twelve stops
          through the navbar — logo, seven section links, the language switch,
          two social links, the CTA — before reaching any content, on every
          visit. WCAG 2.4.1.

          focus:, not focus-visible:. A skip link is only ever reached by
          keyboard, so the two resolve the same here, and focus: is the one
          every browser in the browserslist agrees on.

          Parked off-screen by position rather than hidden with sr-only, and
          two recipes were measured before this one. sr-only/not-sr-only is
          the usual advice and does not work on a styled link: not-sr-only
          resets padding to 0 and wins over focus:px-5, so the focused link
          came out 136x24 instead of 183x48 — a pill with no room in it. A
          -translate-y-[200%] with focus:translate-y-0 kept its padding and
          never moved, because an arbitrary-value utility and its focus
          variant land in the wrong order and the offset stayed applied.
          Offsetting `top` has neither problem and needs no transform. */}
      <a
        href="#fotartalom"
        className="fixed left-4 -top-24 z-[60] rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-e3 transition-[top] duration-200 focus:top-4"
      >
        {t(UI.skipToContent, locale)}
      </a>
      <Navbar />
      {/* tabIndex -1 so the browser actually moves focus here and not just the
          scroll position; a plain id moves the viewport and leaves the next
          Tab back at the top of the navbar, which is the failure mode that
          makes skip links look implemented and not be. */}
      <main id="fotartalom" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Testimonial />
        {/* Rebuilt on 2026-09-24 around one services catalogue. Pillars
            (the numbers), Features (three promises), ServicesGrid, AiServices
            and Pricing are gone: the offer and its prices live in Services,
            and the promises and the reply time are steps in Protocol.
            Projects comes before Services so the offer arrives after the
            proof, and the FAQ answers what is left before the form. */}
        <Projects />
        {/* After the proof, as a short strip (critique, 2026-11-10): the portrait
            used to stand between the hero and the work. */}
        <About />
        <Services />
        <Protocol />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
