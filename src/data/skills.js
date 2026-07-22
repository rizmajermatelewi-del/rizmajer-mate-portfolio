import { Code, Terminal, Database, Cloud, GitBranch, Cpu } from 'lucide-react'

/* Two audiences read this section and they need different things. `text` is
   for the business owner deciding whether to write — it says what the item
   buys them, in words that survive without a CS degree. `detail` stays
   technical on purpose: it only opens on click, and whoever clicks is the one
   checking whether I actually know the stack. Writing both for the same
   reader lost one of them; the earlier `text` led with "Node.js és Express
   alapú API-k", which means nothing to a bakery owner. */
export const SKILLS_FULL = [
  {
    icon: Code,
    title: 'Frontend Fejlesztés',
    text: 'Amit az ügyfeled lát és használ. Telefonon ugyanúgy, mint gépen — mert a látogatók nagyobb része onnan érkezik.',
    detail:
      'A gyakorlatban ez React 19-et, Vite-ot és Tailwindet jelent, komponens-alapú felépítéssel. Minden felület mobilra is optimalizált, a betöltési időt pedig méréssel ellenőrzöm, nem érzésre.',
  },
  {
    icon: Terminal,
    title: 'Backend Fejlesztés',
    text: 'Ami a felület mögött dolgozik: a foglalás tényleg lefoglal, a rendelés megérkezik, és csak az lát adatot, akinek szabad.',
    detail:
      'Node.js és Express, REST végpontokkal és JWT-alapú munkamenet-kezeléssel. A validáció a szerveren is lefut, nem csak a böngészőben, és minden hibaághoz tartozik egyértelmű válasz.',
  },
  {
    icon: Database,
    title: 'Adatbázis Tervezés',
    text: 'Az ügyfeleid, foglalásaid és rendeléseid úgy tárolva, hogy évek múlva is meg lehessen találni bennük bármit.',
    detail:
      'PostgreSQL-t vagy MongoDB-t választok aszerint, mennyire kötött az adat szerkezete. A sémát migrációkban vezetem, így minden változás visszakövethető, az indexeket pedig a tényleges lekérdezésekhez igazítom.',
  },
  {
    icon: Cloud,
    title: 'Felhő & Deployment',
    text: 'Az oldal akkor is fut, amikor én nem ülök gép előtt. Ha egy frissítés mégis elrontana valamit, percek alatt visszaáll.',
    detail:
      'A teszteket és a buildet GitHub Actions futtatja, az élesítés innen megy Vercelre vagy konténerbe. Minden verzió visszaállítható, a környezeti változók pedig sosem kerülnek be a repóba.',
  },
  {
    icon: GitBranch,
    title: 'Verziókezelés & Csapatmunka',
    text: 'Nem kerülsz függő helyzetbe. A munka dokumentálva van, így ha egyszer más viszi tovább, nem kell elölről kezdenie.',
    detail:
      'Külön ág minden funkcióhoz, kis pull requestek és beszédes commit üzenetek. A README-ben leírom, hogyan indul el a projekt, hogy egy új fejlesztő ne tőlem függjön az első napján.',
  },
  {
    icon: Cpu,
    title: 'Teljesítmény Optimalizálás',
    text: 'A lassú oldalról a látogató visszalép, mielőtt bármit látna. A sebességet ezért mérem, nem érzésre állítom be.',
    detail:
      'Lighthouse és a hálózati panel alapján dolgozom, nem tippre. Képoptimalizálás, kódfelosztás és a felesleges újrarenderelések kiszűrése — a cél, hogy a mobil betöltés is a másodperc alatti tartományban maradjon.',
  },
]
