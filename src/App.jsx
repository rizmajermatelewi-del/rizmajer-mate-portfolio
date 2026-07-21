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
import Pricing from './sections/Pricing'
import TrustSignals from './sections/TrustSignals'
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
        <About />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <Pricing />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
