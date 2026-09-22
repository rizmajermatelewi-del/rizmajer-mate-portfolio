import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'

/* Skip link + chrome shared by every route so keyboard users always land
   past the nav, and /adatvedelem does not look like a different site. */
export default function Layout({ children }) {
  return (
    <>
      <a href="#tartalom" className="skip-link">
        Ugrás a tartalomra
      </a>
      <Header />
      {children}
      <Footer />
    </>
  )
}
