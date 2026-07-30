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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
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
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Testimonial />
        <About />
        <Features />
        <Pillars />
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
