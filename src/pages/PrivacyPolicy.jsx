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
            kezelésére használom. Nem adom el és marketing célra nem használom fel. Rajtam kívül
            csak azok a technikai szolgáltatók férnek hozzá, amelyeken az üzenet keresztülhalad —
            ezeket alább egyenként megnevezem.
          </p>
          {/* "nem adom át hirdetőnek vagy más vállalkozásnak" was still here,
              one section above the part that names three other companies the
              message passes through. Same defect as the sentence this page had
              before: a blanket denial that the sections below contradict. The
              promise that matters — no selling, no marketing — is kept; the
              part that was not true is replaced with a pointer to the list. */}
          {/* This section is new because the two sentences above it were not
              true. The page said "Az adatokat harmadik félnek nem adom át" and
              the form posts to https://formspree.io/f/maqgvjbv — so every
              submission is received by a third party before it reaches any
              inbox. A privacy notice that misdescribes its own processing is
              worse than a thin one.

              Every factual claim below is taken from the providers' own
              published pages, checked 2026-08-17, and attributed to them
              in the text rather than asserted as a conclusion of mine:

                Formspree, Inc. as the operating entity, and US operation
                  — formspree.io/legal/terms-of-service/ and /legal/privacy-policy/
                AWS United States hosting, and reliance on the Standard
                  Contractual Clauses as a processor — formspree.io/security/
                Vercel Inc., its address, and the EU-U.S. Data Privacy
                  Framework certification — vercel.com/legal/privacy-policy

              No postal address is given for Formspree because none appears
              on any of their own legal pages; third-party directories list
              one, which is not the same thing.

              TODO (Máté), the one part research cannot settle: whether a
              processor agreement is in place for YOUR Formspree account.
              That is a fact about your contract, not about their product,
              so it is deliberately not claimed here either way. Ask
              team@formspree.io, and if you get one, this section can say so.
              Nothing on the page is false without it. */}
          <h2 className="font-display font-semibold text-xl text-ink mt-8">
            Ki továbbítja az űrlapot
          </h2>
          <p>
            A kapcsolatfelvételi űrlapot a Formspree nevű szolgáltatás továbbítja az e-mail
            címemre, ezért a beküldött adatok — a név, az e-mail cím, az üzenet és a csatolt
            fájlok — áthaladnak a rendszerén. Az űrlap használata nélkül is elérsz közvetlen
            e-mailben a fenti címen, ilyenkor a Formspree nem kap semmit.
          </p>
          <p>
            A szolgáltatást a Formspree, Inc. üzemelteti az Egyesült Államokból, és saját
            tájékoztatása szerint az Amazon Web Services egyesült államokbeli infrastruktúráján
            futtatja. Az űrlapon megadott adatok tehát az Európai Gazdasági Térségen kívülre
            kerülnek. A Formspree közlése szerint adatfeldolgozóként az Európai Bizottság
            általános szerződési feltételeire (Standard Contractual Clauses) támaszkodik.
          </p>
          {/* The chain does not stop at Formspree. Naming the form service and
              the host while leaving out the mailbox they deliver into would be
              the same omission in miniature — and the mailbox is where the
              message actually comes to rest. Google Ireland Limited and its
              address are quoted from policies.google.com/privacy, which names
              it as the entity responsible for EEA users; "szervereket
              világszerte üzemeltet" is their own wording too, not an inference
              of mine. */}
          <p>
            A megkeresés végül az e-mail fiókomba érkezik, amelyet a Google üzemeltet. Az Európai
            Gazdasági Térségben élő felhasználók felé a Google saját tájékoztatása szerint a Google
            Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írország) jár el, a szolgáltatás
            működtetéséhez viszont szervereket világszerte üzemeltet. Ez akkor is így van, ha nem az
            űrlapot használod, hanem közvetlenül írsz nekem.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Tárhelyszolgáltató</h2>
          <p>
            Az oldal a Vercel Inc. (440 N Barranca Avenue #4133, Covina, CA 91723, Egyesült
            Államok) tárhelyén fut, ezért minden oldalletöltéskor a látogató IP-címe és a kérés
            technikai adatai a szolgáltatóhoz kerülnek. A Vercel tájékoztatása szerint
            tanúsíttatta magát az EU–USA adatvédelmi keretrendszer (EU-U.S. Data Privacy
            Framework) szerint.
          </p>
          <p className="text-sm">
            A szolgáltatókról szóló fenti adatok a saját nyilvános tájékoztatóikból származnak,
            a 2026. augusztusi állapot szerint.
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
