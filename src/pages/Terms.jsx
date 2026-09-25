import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CONTACT_EMAIL } from '../data/contact'
import { PAYMENT, HOSTING } from '../data/calculator'
import { forint } from '../data/fx'

/* The full terms, rewritten 2026-09-25 when outreach started and strangers
   began landing here. Every promise below is one the site already makes
   elsewhere — fixed price, 50/50 payment, a year of free fixes for the
   developer's own mistakes, the client owning code and domain — so the
   binding text and the marketing text cannot drift apart. The numbers come
   from calculator.js for the same reason.

   Consumer-law points (45/2014. (II. 26.) Korm. rendelet, Ptk.) are stated
   the way the statute states them, without interpretation. The registry
   details (seat, tax number) do not exist until the business is registered;
   section 1 says so plainly instead of showing placeholders. Update it the
   day the registration arrives, together with ceg.json in OS/quotes.
   Have a lawyer read this before the first signed contract. */
const UPDATED = '2026. szeptember 25.'

const SECTIONS = [
  {
    title: '1. A szolgáltató',
    body: [
      `Rizmajer Máté Levente webfejlesztő (a továbbiakban: Fejlesztő). E-mail: ${CONTACT_EMAIL}, telefon: +36 30 131 4353, weboldal: rizmajerdev.com.`,
      'A vállalkozás nyilvántartási adatait (székhely, adószám, nyilvántartási szám) a nyilvántartásba vételt követően ezen az oldalon és minden ajánlaton feltüntetem.',
    ],
  },
  {
    title: '2. A feltételek hatálya',
    body: [
      'Ezek a feltételek a Fejlesztő által nyújtott weboldal-, webalkalmazás- és rendszerfejlesztési, valamint üzemeltetési szolgáltatásokra vonatkoznak (a továbbiakban: szolgáltatás), a szolgáltatást megrendelő természetes vagy jogi személlyel (a továbbiakban: Megrendelő) szemben.',
      'Ha az egyedi, írásos szerződés ezektől eltér, az egyedi szerződés az irányadó.',
    ],
  },
  {
    title: '3. Ajánlat és a szerződés létrejötte',
    body: [
      'A weboldalon feltüntetett árak és a kalkulátor eredménye tájékoztató jellegű induló ár, nem ajánlat. A kapcsolatfelvételi űrlap kitöltése egyik félnek sem keletkeztet kötelezettséget.',
      'A konkrét munkára a Fejlesztő írásos, tételes árajánlatot ad, amely a benne megjelölt ideig érvényes. A szerződés az ajánlat írásos elfogadásával (e-mail is elegendő), illetve a vállalkozási szerződés aláírásával jön létre. A szerződés nyelve magyar; a szerződést a Fejlesztő iktatja, és kérésre a Megrendelő rendelkezésére bocsátja.',
    ],
  },
  {
    title: '4. Árak és fizetés',
    body: [
      'Az elfogadott ajánlatban szereplő díj fix: amit az ajánlat nem tartalmaz, azt a Fejlesztő utólag nem számlázza ki. Ha a Megrendelő a munka közben új igényt jelez, arra a Fejlesztő külön ajánlatot ad, és azt csak elfogadás után végzi el.',
      `A díj ${PAYMENT.upfrontPercent}%-a a munka megkezdésekor, a fennmaradó ${100 - PAYMENT.upfrontPercent}% az átadáskor esedékes, számla ellenében, átutalással. Az előleg beérkezése előtt a munka nem indul.`,
      `A domain és a tárhely díját (jellemzően ${forint(HOSTING.lo)}–${forint(HOSTING.hi)} évente) a Megrendelő közvetlenül a szolgáltatónak fizeti, a saját nevén. A havidíjas üzemeltetés díja havonta előre esedékes.`,
    ],
  },
  {
    title: '5. A Megrendelő közreműködése',
    body: [
      'A Megrendelő biztosítja a munkához szükséges anyagokat (szövegek, képek, logó, hozzáférések) és döntéseket. Ha ezek késnek, a határidő a késés idejével meghosszabbodik.',
      'A Megrendelő szavatolja, hogy az általa átadott anyagok felhasználására jogosult, és azok harmadik személy jogait nem sértik.',
    ],
  },
  {
    title: '6. Teljesítés, átadás-átvétel',
    body: [
      'A Fejlesztő a kész munkát tesztelhető formában átadja. A Megrendelő az átadástól számított 8 napon belül jelzi az esetleges eltéréseket az elfogadott ajánlathoz képest; ezeket a Fejlesztő díjmentesen kijavítja.',
      'Ha a Megrendelő 8 napon belül nem jelez eltérést, vagy a munkát élesben használni kezdi, a teljesítés elfogadottnak minősül.',
    ],
  },
  {
    title: '7. Szerzői jog és hozzáférések',
    body: [
      'A teljes díj megfizetésével a leszállított munka (forráskód, grafikai elemek) korlátlan felhasználási joga a Megrendelőre száll. A domain, a tárhely és minden fiók a Megrendelő nevén van; a hozzáféréseket a Fejlesztő átadáskor átadja.',
      'A munkában felhasznált harmadik féltől származó elemek (nyílt forráskódú könyvtárak, betűtípusok, fotók) a saját licencük szerint használhatók.',
      'A Fejlesztő az elkészült munkát referenciaként bemutathatja, kivéve, ha a Megrendelő ezt írásban megtiltja.',
    ],
  },
  {
    title: '8. Hibajavítás és felelősség',
    body: [
      'Az átadástól számított 1 évig a Fejlesztő díjmentesen kijavítja azokat a hibákat, amelyek az ő munkájából erednek. Ez nem terjed ki a Megrendelő vagy harmadik fél által végzett módosításokra, a tárhely- és egyéb szolgáltatók hibáira, valamint az új igényekre. A fogyasztó Megrendelő jogszabályon alapuló szavatossági jogait ez nem korlátozza.',
      'A Fejlesztő felelőssége – a jogszabály által megengedett mértékben – az adott megrendelés díjának összegéig terjed. Nem korlátozható a felelősség a szándékosan vagy súlyos gondatlansággal okozott, illetve az életet, testi épséget vagy egészséget megsértő szerződésszegésért.',
    ],
  },
  {
    title: '9. Üzemeltetés',
    body: [
      'A havidíjas üzemeltetés határozatlan időre szól, és bármelyik fél 30 napos felmondási idővel, indoklás nélkül felmondhatja. Felmondáskor a Fejlesztő minden hozzáférést és a legutolsó biztonsági mentést átadja.',
    ],
  },
  {
    title: '10. Fogyasztónak minősülő Megrendelő elállási joga',
    body: [
      'Ha a Megrendelő fogyasztó (a szakmája, önálló foglalkozása vagy üzleti tevékenysége körén kívül eljáró természetes személy), és a szerződés távollévők között jön létre, a szerződés megkötésétől számított 14 napon belül indoklás nélkül elállhat.',
      'Ha a fogyasztó kifejezett kérésére a munka a 14 napon belül elkezdődik, és a szolgáltatás teljesen teljesül, az elállási jog a 45/2014. (II. 26.) Korm. rendelet 29. § (1) a) pontja szerint megszűnik, ha a fogyasztó ezt előzetesen tudomásul vette. Ha a fogyasztó a munka megkezdése után áll el, a már teljesített szolgáltatás arányos díját meg kell fizetnie.',
      `Az elállási szándékot bármilyen egyértelmű nyilatkozattal jelezni lehet a(z) ${CONTACT_EMAIL} címen.`,
    ],
  },
  {
    title: '11. Titoktartás és adatkezelés',
    body: [
      'A Fejlesztő a Megrendelő üzleti információit bizalmasan kezeli. A személyes adatok kezeléséről az adatkezelési tájékoztató rendelkezik. Ha a munka során a Fejlesztő a Megrendelő ügyfeleinek személyes adataihoz fér hozzá, erről a felek külön adatfeldolgozói megállapodást kötnek.',
    ],
  },
  {
    title: '12. Panaszkezelés és jogviták',
    body: [
      `Panaszt a(z) ${CONTACT_EMAIL} címen lehet tenni; a Fejlesztő 30 napon belül írásban, érdemben válaszol.`,
      'Fogyasztói jogvita esetén a fogyasztó a lakóhelye vagy tartózkodási helye szerint illetékes békéltető testülethez fordulhat; a testületek elérhetősége a bekeltetes.hu oldalon található.',
      'A szerződésre a magyar jog, különösen a Polgári Törvénykönyv (2013. évi V. törvény) rendelkezései az irányadók.',
    ],
  },
]

export default function Terms() {
  return (
    /* <main>, not <div>: App.jsx has had one since it was written, and none
       of the three subpages did, so a screen-reader user landing here had no
       landmark to jump to. */
    <main className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* flex w-fit, not inline-flex: as an inline box the eyebrow below sat
            on the same line as this link, so the page opened with "Vissza a
            főoldalra╱ Jogi információ" run together. */}
        <Link to="/" className="flex w-fit items-center gap-2 py-3 text-sm font-medium text-primary-dark lift-on-hover mb-7">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Jogi információ</span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 mb-4 tracking-tight">
          Általános Szerződési Feltételek
        </h1>
        {/* The first <p> becomes the meta description (see i18n/meta.js), so
            it has to be a sentence about the page, not the date. */}
        <p className="text-muted leading-relaxed mb-3">
          A weboldal-, rendszerfejlesztési és üzemeltetési munkák feltételei: ajánlat, fizetés,
          átadás, szerzői jog, hibajavítás, felelősség és panaszkezelés.
        </p>
        <div className="text-sm text-muted mb-10">Hatályos: {UPDATED}</div>
        <div className="space-y-4 text-muted leading-relaxed">
          {SECTIONS.map((s) => (
            <section key={s.title} className="space-y-3">
              <h2 className="font-display font-semibold text-xl text-ink mt-8">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
          <p className="pt-6">
            Lásd még: <Link to="/adatvedelem" className="underline text-primary-dark">adatkezelési tájékoztató</Link>.
          </p>
        </div>
      </div>
    </main>
  )
}
