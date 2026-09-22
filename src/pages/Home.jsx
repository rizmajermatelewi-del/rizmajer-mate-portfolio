import Layout from '../components/Layout.jsx'
import Hero from '../sections/Hero.jsx'
import Services from '../sections/Services.jsx'
import About from '../sections/About.jsx'
import Visit from '../sections/Visit.jsx'
import Contact from '../sections/Contact.jsx'
import Faq from '../sections/Faq.jsx'

export default function Home() {
  return (
    <Layout overlayHeader>
      <main id="tartalom">
        <Hero />
        <Services />
        <About />
        <Visit />
        <Contact />
        <Faq />
      </main>
    </Layout>
  )
}
