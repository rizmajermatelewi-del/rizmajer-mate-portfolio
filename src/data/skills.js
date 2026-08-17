import { Code, Terminal, Database, Cloud, GitBranch, Cpu } from 'lucide-react'
import { neutral } from '../i18n/t.js'

/* Two audiences read this section and they need different things. `text` is
   for the business owner deciding whether to write — it says what the item
   buys them, in words that survive without a CS degree. `detail` stays
   technical on purpose: it only opens on click, and whoever clicks is the one
   checking whether I actually know the stack. Writing both for the same
   reader lost one of them; the earlier `text` led with "Node.js és Express
   alapú API-k", which means nothing to a bakery owner. */
/* Display order for the grid. The six tiles used to sit in authoring order,
   which read as a flat list of six equal things; grouping them shows how far
   the work reaches without adding a word of copy. Four buckets, matching the
   four a client actually distinguishes between. */
/* A category is two things that used to be one string: the key the grouping
   below joins on, and a chip the visitor reads. Translating a plain string
   would have broken the join the moment the page rendered in English —
   `skill.category === 'Adatbázis'` matches nothing once the label reads
   "Database". So the id is what the data joins on and never reaches the
   screen, and the label is the part that gets translated.

   Frontend and Backend are neutral() rather than { hu, en }: the Hungarian
   page already uses the English words, so there is nothing to translate, and
   saying so beats a pair that looks like an oversight. */
export const SKILL_CATEGORIES = [
  { id: 'frontend', label: neutral('Frontend') },
  { id: 'backend', label: neutral('Backend') },
  { id: 'database', label: { hu: 'Adatbázis', en: 'Database' } },
  { id: 'tools', label: { hu: 'Eszközök', en: 'Tools' } },
]

const LABEL_BY_ID = Object.fromEntries(SKILL_CATEGORIES.map((c) => [c.id, c.label]))

/* Throws rather than returning undefined, for the same reason t() throws: an
   id that stopped matching would otherwise render a blank chip that nobody
   notices until a visitor does. */
export function categoryLabel(id) {
  const label = LABEL_BY_ID[id]
  if (!label) throw new Error(`skills.js: no category called "${id}"`)
  return label
}

/* Four of the six titles changed on 2026-08-17, and the rule they now follow is
   worth stating because the next one added will otherwise drift back.

   A tile shows three things in this order: the category chip, the title, the
   text. The chip already prints "Frontend" / "Backend" / "Eszközök", so a title
   reading "Frontend fejlesztés" spent the largest type on the tile repeating
   the smallest — and repeating it in a word the buyer does not have. A bakery
   owner scanning this grid met "Frontend fejlesztés", "Backend fejlesztés",
   "Felhő és üzemeltetés" and "Verziókezelés és átadás" before reaching a single
   sentence written for them. The `text` underneath was already good; it was
   just the fourth thing on the tile rather than the first.

   So: the chip carries the technical name for the developer checking the stack,
   the title names what the client ends up with, and `detail` — behind a click —
   stays as technical as it likes. A title must not restate its own `text`
   either, which is what ruled out the obvious "Amit az ügyfeled lát" for the
   first tile: that is the opening clause of the sentence directly below it.

   "Adatbázis tervezés" and "Teljesítmény és sebesség" were left alone. Both are
   ordinary Hungarian that a non-technical reader parses without help, and
   changing them would have been movement rather than improvement. */
export const SKILLS_FULL = [
  {
    icon: Code,
    category: 'frontend',
    title: { hu: 'Weboldal és felület', en: 'The website itself' },
    text: {
      hu: 'Amit az ügyfeled lát és használ. Telefonon ugyanúgy, mint gépen — mert a látogatók nagyobb része onnan érkezik.',
      en: 'What your customer sees and uses. On a phone just as much as on a computer — because that is where most visitors arrive from.',
    },
    detail: {
      hu: 'A gyakorlatban ez React 19-et, Vite-ot és Tailwindet jelent, komponens-alapú felépítéssel. Minden felület mobilra is optimalizált, a betöltési időt pedig méréssel ellenőrzöm, nem érzésre.',
      en: 'In practice that means React 19, Vite and Tailwind, built out of components. Every screen is built for mobile as well, and I check load time by measuring it rather than by feel.',
    },
  },
  {
    icon: Terminal,
    category: 'backend',
    title: { hu: 'Ami a háttérben fut', en: 'What runs behind it' },
    text: {
      hu: 'Ami a felület mögött dolgozik: a foglalás tényleg lefoglal, a rendelés megérkezik, és csak az lát adatot, akinek szabad.',
      en: 'What works behind the screen: the booking actually reserves, the order actually arrives, and only the people who should can see the data.',
    },
    detail: {
      hu: 'Node.js és Express, REST végpontokkal és JWT-alapú munkamenet-kezeléssel. A validáció a szerveren is lefut, nem csak a böngészőben, és minden hibaághoz tartozik egyértelmű válasz.',
      en: 'Node.js and Express, with REST endpoints and JWT-based sessions. Validation runs on the server as well, not only in the browser, and every error path has a clear response.',
    },
  },
  {
    icon: Database,
    category: 'database',
    title: { hu: 'Adatbázis tervezés', en: 'Database design' },
    text: {
      hu: 'Az ügyfeleid, foglalásaid és rendeléseid úgy tárolva, hogy évek múlva is meg lehessen találni bennük bármit.',
      en: 'Your customers, bookings and orders stored so that years from now anything in them can still be found.',
    },
    detail: {
      hu: 'PostgreSQL-t vagy MongoDB-t választok aszerint, mennyire kötött az adat szerkezete. A sémát migrációkban vezetem, így minden változás visszakövethető, az indexeket pedig a tényleges lekérdezésekhez igazítom.',
      en: 'I choose PostgreSQL or MongoDB depending on how fixed the shape of the data is. The schema is kept in migrations, so every change is traceable, and the indexes follow the queries that actually run.',
    },
  },
  {
    icon: Cloud,
    category: 'tools',
    title: { hu: 'Folyamatos működés', en: 'Staying online' },
    text: {
      hu: 'Az oldal akkor is fut, amikor én nem ülök gép előtt. Ha egy frissítés mégis elrontana valamit, percek alatt visszaáll.',
      en: 'The site keeps running when I am not sitting at a computer. And if an update does break something, it is back within minutes.',
    },
    detail: {
      hu: 'A teszteket és a buildet GitHub Actions futtatja, az élesítés innen megy Vercelre vagy konténerbe. Minden verzió visszaállítható, a környezeti változók pedig sosem kerülnek be a repóba.',
      en: 'GitHub Actions runs the tests and the build, and deploys from there to Vercel or to a container. Every version can be rolled back, and environment variables never make it into the repository.',
    },
  },
  {
    icon: GitBranch,
    category: 'tools',
    title: { hu: 'Átadható munka', en: 'Work you can hand on' },
    text: {
      hu: 'Nem kerülsz függő helyzetbe. A munka dokumentálva van, így ha egyszer más viszi tovább, nem kell elölről kezdenie.',
      en: 'You are not left dependent on me. The work is documented, so if somebody else takes it over one day, they are not starting from nothing.',
    },
    detail: {
      hu: 'Külön ág minden funkcióhoz, kis pull requestek és beszédes commit üzenetek. A README-ben leírom, hogyan indul el a projekt, hogy egy új fejlesztő ne tőlem függjön az első napján.',
      en: 'A separate branch per feature, small pull requests and commit messages that say something. The README explains how to get the project running, so a new developer is not dependent on me on their first day.',
    },
  },
  {
    icon: Cpu,
    category: 'frontend',
    title: { hu: 'Teljesítmény és sebesség', en: 'Performance and speed' },
    text: {
      hu: 'A lassú oldalról a látogató visszalép, mielőtt bármit látna. A sebességet ezért mérem, nem érzésre állítom be.',
      en: 'Visitors back out of a slow page before they have seen anything on it. So I measure speed rather than setting it by feel.',
    },
    detail: {
      hu: 'Lighthouse és a hálózati panel alapján dolgozom, nem tippre. Képoptimalizálás, kódfelosztás és a felesleges újrarenderelések kiszűrése — a cél, hogy a mobil betöltés is a másodperc alatti tartományban maradjon.',
      en: 'I work from Lighthouse and the network panel, not from guesswork. Image optimisation, code splitting and cutting out needless re-renders — the goal is for even the mobile load to stay under a second.',
    },
  },
]

/* Display order, derived once and exported, because two places render it:
   ServicesGrid draws the full grid and Footer lists the first four. Those two
   read the same list in different orders as long as each derives its own, so a
   visitor comparing the footer against the section sees them disagree. */
export const ORDERED_SKILLS = SKILL_CATEGORIES.flatMap((category) =>
  SKILLS_FULL.filter((skill) => skill.category === category.id),
)
