import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { BUSINESS } from '../data/business'
import { isPreviewMode } from '../data/site'

export default function Privacy() {
  const owner = BUSINESS.legalName || BUSINESS.name

  return (
    <Layout>
      <main id="tartalom" className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <h1 className="brand text-3xl font-semibold tracking-brand text-ink sm:text-4xl">
          Adatkezelési tájékoztató
        </h1>
        {isPreviewMode() ? (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-muted">
            Előnézet — a szöveg a Phase 1 valós állapotát írja le
          </p>
        ) : null}

        <div className="mt-10 space-y-5 font-sans leading-relaxed text-muted">
          <p>
            Ez az oldal jelenleg <strong className="font-semibold text-ink">nem gyűjt</strong> személyes
            adatot: nincs rajta űrlap, hírlevél-feliratkozás, sem látogatottság-mérő. Saját sütit nem
            helyez el a böngésződben.
          </p>
          <p>
            Ha időpontot szeretnél, telefonon tudsz jelentkezni. A hívás során megadott adatokat
            {owner ? ` ${owner} ` : ' a szolgáltató '}
            kizárólag az időpont egyeztetésére használja.
          </p>
          <p>
            Az oldalt tárhelyszolgáltató szolgálja ki, amely üzemeltetési célból naplózhatja a
            kéréseket (például IP-cím, böngésző típusa). Ezekhez az oldal üzemeltetője azonosítható
            formában nem fér hozzá.
          </p>
          <p>
            Amint online időpontfoglalás indul, ez a tájékoztató kiegészül azzal, hogy a foglaláshoz
            megadott név, telefonszám és e-mail cím hogyan kerül kezelésre.
          </p>
          {BUSINESS.email ? (
            <p>
              Kérdés esetén:{' '}
              <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
            </p>
          ) : null}
        </div>

        <Link
          to="/"
          className="mt-12 inline-block font-sans text-sm text-action underline underline-offset-4 hover:text-ink"
        >
          Vissza a főoldalra
        </Link>
      </main>
    </Layout>
  )
}
