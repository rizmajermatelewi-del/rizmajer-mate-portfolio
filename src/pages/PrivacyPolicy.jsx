import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    /* <main>, not <div>: App.jsx has had one since it was written, and none
       of the three subpages did, so a screen-reader user landing here had no
       landmark to jump to. */
    <main className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* flex w-fit, not inline-flex — see the same note in Terms.jsx: as an
            inline box the eyebrow below shared this link's line. */}
        <Link to="/" className="flex w-fit items-center gap-2 py-3 text-sm font-medium text-primary-dark lift-on-hover mb-7">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Jogi információ</span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 mb-10 tracking-tight">
          Adatvédelmi tájékoztató
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            Ez a tájékoztató leírja, hogyan kezelem a weboldalon keresztül megadott személyes
            adataidat. Adatkezelőként Rizmajer Máté Levente (info@rizmajerdev.com) jár el.
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
                Cloudflare, Inc., its address, and the EU-U.S. Data Privacy
                  Framework certification — cloudflare.com/privacypolicy/
                  (checked 2026-09-25, after the move off Vercel)
                Web Analytics "does not collect or use your visitors' personal
                  data" — developers.cloudflare.com/web-analytics/about/

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
            Az oldal a Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, Egyesült
            Államok) tárhelyén fut, ezért minden oldalletöltéskor a látogató IP-címe és a kérés
            technikai adatai a szolgáltatóhoz kerülnek. A Cloudflare tájékoztatása szerint
            tanúsíttatta magát az EU–USA adatvédelmi keretrendszer (EU-U.S. Data Privacy
            Framework) szerint.
          </p>
          <p>
            A látogatottságot a Cloudflare Web Analytics méri, amely a Cloudflare közlése szerint
            nem gyűjti és nem használja a látogatók személyes adatait.
          </p>
          <p className="text-sm">
            A szolgáltatókról szóló fenti adatok a saját nyilvános tájékoztatóikból származnak,
            a 2026. szeptemberi állapot szerint.
          </p>
          {/* Added 2026-09-25, the day cold outreach started: GDPR Art. 14
              requires telling people whose data was not collected from them
              where it came from, why, and how to object. The outreach mail
              links nowhere in particular, so this section is the notice. */}
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Üzleti megkeresések</h2>
          <p>
            Helyi vállalkozásoknak e-mailben egyszeri üzleti ajánlatot küldök. Ehhez a vállalkozás
            nevét, települését és a saját weboldalán vagy más nyilvános forrásban (például
            OpenStreetMap) közzétett e-mail címét használom. Jogalap: jogos érdek (GDPR 6. cikk
            (1) f) pont) — egy vállalkozás megkeresése a saját nyilvános elérhetőségén, üzleti
            ajánlattal.
          </p>
          <p>
            Ha nem szeretnél több levelet, elég egy „nem” válasz: a címedet azonnal törlöm a
            listáról, és csak annyit őrzök meg belőle egy tiltólistán, amennyi ahhoz kell, hogy
            ne írjak újra. A megkeresés adatait legfeljebb 2 évig őrzöm, ha nem lesz belőle
            együttműködés.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Jogalap</h2>
          <p>
            Az űrlapon vagy e-mailben küldött megkeresést azért kezelem, hogy válaszolhassak rá és
            ajánlatot adhassak: ez a szerződés megkötését megelőző lépés (GDPR 6. cikk (1) b) pont).
            Ha szerződést kötünk, a számlázási adatokat a számviteli törvény írja elő (GDPR 6. cikk
            (1) c) pont).
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Sütik</h2>
          <p>
            Az oldal nem használ sem nyomkövető, sem hirdetési sütiket, ezért nincs süti-sáv sem.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Adatmegőrzés</h2>
          <p>
            Ha a megkeresésből nem lesz együttműködés, az adataidat az utolsó üzenetváltástól
            számított 1 év után törlöm. Ha szerződést kötünk, a szerződést és a számlákat a
            számviteli törvény (2000. évi C. törvény 169. §) szerint 8 évig őrzöm meg.
          </p>
          <h2 className="font-display font-semibold text-xl text-ink mt-8">Jogaid</h2>
          <p>
            Kérheted a rólad tárolt adatok másolatát, helyesbítését, törlését vagy kezelésük
            korlátozását, és tiltakozhatsz a jogos érdeken alapuló adatkezelés ellen. Írj az
            info@rizmajerdev.com címre; 30 napon belül válaszolok.
          </p>
          <p>
            Ha úgy érzed, megsértettem a jogaidat, panaszt tehetsz a Nemzeti Adatvédelmi és
            Információszabadság Hatóságnál (NAIH, 1055 Budapest, Falk Miksa utca 9–11.; postacím:
            1363 Budapest, Pf. 9.; ugyfelszolgalat@naih.hu; naih.hu), vagy bírósághoz fordulhatsz.
          </p>
        </div>
      </div>
    </main>
  )
}
