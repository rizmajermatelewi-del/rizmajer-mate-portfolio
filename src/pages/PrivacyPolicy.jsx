import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-light lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Jogi információ</span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 mb-10 tracking-tight">
          Adatvédelmi tájékoztató
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            Ez a tájékoztató leírja, hogyan kezelem a weboldalon keresztül megadott személyes
            adataidat. Adatkezelőként Rizmajer Máté Levente (rizmajermatelewi@gmail.com) jár el.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Milyen adatokat gyűjtök</h2>
          <p>
            A kapcsolatfelvételi űrlap kitöltésekor megadott nevet, e-mail címet, valamint az
            általad opcionálisan megadott cégnevet, projektleírást és mellékelt fájlokat tárolom
            kizárólag a megkeresésed megválaszolása céljából.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Az adatok felhasználása</h2>
          <p>
            A megadott adatokat kizárólag a veled történő kapcsolatfelvételre és a megkeresésed
            kezelésére használom. Az adatokat harmadik félnek nem adom át, és marketing célra nem
            használom fel.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Adatmegőrzés</h2>
          <p>
            Az adataidat addig őrzöm meg, amíg az a kapcsolatfelvétel és az esetleges együttműködés
            szempontjából szükséges, ezt követően törlöm őket.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Jogaid</h2>
          <p>
            Bármikor kérheted a rólad tárolt adatok betekintését, helyesbítését vagy törlését az
            rizmajermatelewi@gmail.com e-mail címen keresztül.
          </p>
        </div>
      </div>
    </div>
  )
}
