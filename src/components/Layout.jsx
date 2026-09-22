import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'
import PreviewBanner from './PreviewBanner.jsx'

export default function Layout({ children }) {
  return (
    <div className="site-surface relative min-h-screen">
      <a href="#tartalom" className="skip-link">
        Ugrás a tartalomra
      </a>
      <PreviewBanner />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
