import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* flex w-fit, not inline-flex — see the same note in Terms.jsx: as an
            inline box the eyebrow below shared this link's line. */}
        <Link to="/" className="flex w-fit items-center gap-2 text-sm font-medium text-primary-dark lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Jogi információ</span>
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
            kezelésére használom. Nem adom el, nem adom át hirdetőnek vagy más vállalkozásnak, és
            marketing célra nem használom fel.
          </p>
          {/* This section is new because the two sentences above it were not
              true. The page said "Az adatokat harmadik félnek nem adom át" and
              the form posts to https://formspree.io/f/maqgvjbv — so every
              submission is received by a third party before it reaches any
              inbox. A privacy notice that misdescribes its own processing is
              worse than a thin one.

              TODO (Máté): this states the mechanism, which is checkable from
              the code. It deliberately does not name Formspree's legal entity,
              its place of establishment, the basis for any transfer outside
              the EEA, or whether a processor agreement is in place — those are
              facts I cannot verify from here and legal conclusions I am not
              qualified to draw. Have them checked, and complete this section,
              before treating the notice as final. The same applies to the
              hosting provider, which also receives the request. */}
          <h2 className="font-display font-semibold text-xl text-ink mt-8">
            Ki továbbítja az űrlapot
          </h2>
          <p>
            A kapcsolatfelvételi űrlapot a Formspree nevű szolgáltatás továbbítja az e-mail
            címemre, ezért a beküldött adatok — a név, az e-mail cím, az üzenet és a csatolt
            fájlok — áthaladnak a rendszerén. Az űrlap használata nélkül is elérsz közvetlen
            e-mailben a fenti címen, ilyenkor a Formspree nem kap semmit.
          </p>
          <p className="text-sm">
            Ez a szakasz a technikai működést írja le. A szolgáltató jogi adatai és az
            adattovábbítás részletei még kiegészítésre várnak — a tájékoztató ezen része
            felülvizsgálat alatt áll.
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
