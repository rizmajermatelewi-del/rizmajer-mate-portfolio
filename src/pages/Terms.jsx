import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-light lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Jogi információ</span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 mb-10 tracking-tight">
          Általános Szerződési Feltételek
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            Jelen feltételek a Rizmajer Máté Levente (a továbbiakban: Fejlesztő) által, a weboldalon
            keresztül kezdeményezett megkeresésekre és az azt követő esetleges együttműködésekre
            vonatkoznak.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Ajánlatkérés</h2>
          <p>
            A kapcsolatfelvételi űrlap kitöltése nem keletkeztet szerződéses kötelezettséget egyik
            fél számára sem. A konkrét projekt feltételeit, díjazását és határidejét minden esetben
            külön, írásban rögzítjük a munka megkezdése előtt.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Együttműködés</h2>
          <p>
            A tényleges fejlesztési munka egyedi megállapodás alapján történik, amely tartalmazza a
            projekt terjedelmét, mérföldköveit és díjazását. A jelen tájékoztató nem helyettesíti az
            egyedi szerződést.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Szellemi tulajdon</h2>
          <p>
            A leszállított munka szerzői jogai a projekt lezárását és a kikötött díjazás
            megfizetését követően száll át a megrendelőre, eltérő írásbeli megállapodás hiányában.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Kapcsolat</h2>
          <p>
            Kérdés esetén keress bizalommal az rizmajermatelewi@gmail.com e-mail címen.
          </p>
        </div>
      </div>
    </div>
  )
}
