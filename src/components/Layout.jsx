import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'

/* Skip link + chrome. Home passes overlay so the header floats on the hero. */
export default function Layout({ children, overlayHeader = false }) {
  return (
    <div className="site-surface relative min-h-screen">
      <a href="#tartalom" className="skip-link">
        Ugrás a tartalomra
      </a>
      <Header overlay={overlayHeader} />
      {children}
      <Footer />
    </div>
  )
}
