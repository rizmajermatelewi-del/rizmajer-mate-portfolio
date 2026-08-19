import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Features from './sections/Features'
import Pillars from './sections/Pillars'
import Protocol from './sections/Protocol'
import ServicesGrid from './sections/ServicesGrid'
import AiServices from './sections/AiServices'
import Pricing from './sections/Pricing'
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
        <About />
        <Features />
        <Pillars />
        {/* Projects used to sit directly under the hero, which meant the second
            thing anyone saw was four empty frames reading "Képernyőkép
            hamarosan" under a headline claiming four built projects. Leading
            with the section that has the least to show is the worst available
            order while the demo screenshots do not exist.

            It lands after Pillars on purpose: that section states the count, so
            the cards now arrive as the thing the number refers to. Move it back
            up once the demos are deployed and the cards carry screenshots, live
            links and repos — at that point it is the strongest section on the
            page and belongs near the top. */}
        <Projects />
        <Protocol />
        <ServicesGrid />
        <AiServices />
        {/* Objections, then price, then the form. The price used to come
            before the FAQ, which meant the number landed while "mennyibe
            kerül", "mennyi idő" and "kié lesz a kód" were still open
            questions. Answering those first gives the figure something to
            stand on, and it pushes the price further down the page. */}
        <Faq />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
