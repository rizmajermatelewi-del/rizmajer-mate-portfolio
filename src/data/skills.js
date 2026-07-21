import { Code, Terminal, Database, Cloud, GitBranch, Cpu } from 'lucide-react'

export const SKILLS_FULL = [
  {
    icon: Code,
    title: 'Frontend Fejlesztés',
    text: 'React és modern CSS-eszközök segítségével gyors, reszponzív és vizuálisan igényes felhasználói felületeket építek.',
    detail:
      'A gyakorlatban ez React 19-et, Vite-ot és Tailwindet jelent, komponens-alapú felépítéssel. Minden felület mobilra is optimalizált, a betöltési időt pedig méréssel ellenőrzöm, nem érzésre.',
  },
  {
    icon: Terminal,
    title: 'Backend Fejlesztés',
    text: 'Node.js és Express alapú API-k, üzleti logika és biztonságos autentikáció — a felület mögötti motor.',
    detail:
      'Node.js és Express, REST végpontokkal és JWT-alapú munkamenet-kezeléssel. A validáció a szerveren is lefut, nem csak a böngészőben, és minden hibaághoz tartozik egyértelmű válasz.',
  },
  {
    icon: Database,
    title: 'Adatbázis Tervezés',
    text: 'SQL és NoSQL adatbázisok tervezése és optimalizálása, hogy az alkalmazásod jól skálázódjon.',
    detail:
      'PostgreSQL-t vagy MongoDB-t választok aszerint, mennyire kötött az adat szerkezete. A sémát migrációkban vezetem, így minden változás visszakövethető, az indexeket pedig a tényleges lekérdezésekhez igazítom.',
  },
  {
    icon: Cloud,
    title: 'Felhő & Deployment',
    text: 'CI/CD folyamatok és felhő alapú hosting a zökkenőmentes, megbízható élesítésért.',
    detail:
      'A teszteket és a buildet GitHub Actions futtatja, az élesítés innen megy Vercelre vagy konténerbe. Minden verzió visszaállítható, a környezeti változók pedig sosem kerülnek be a repóba.',
  },
  {
    icon: GitBranch,
    title: 'Verziókezelés & Csapatmunka',
    text: 'Git-alapú workflow, code review és dokumentáció, hogy a kód átlátható és karbantartható maradjon.',
    detail:
      'Külön ág minden funkcióhoz, kis pull requestek és beszédes commit üzenetek. A README-ben leírom, hogyan indul el a projekt, hogy egy új fejlesztő ne tőlem függjön az első napján.',
  },
  {
    icon: Cpu,
    title: 'Teljesítmény Optimalizálás',
    text: 'Gyors betöltési idő, hatékony renderelés és jól optimalizált build — minden projektnél alapkövetelmény.',
    detail:
      'Lighthouse és a hálózati panel alapján dolgozom, nem tippre. Képoptimalizálás, kódfelosztás és a felesleges újrarenderelések kiszűrése — a cél, hogy a mobil betöltés is a másodperc alatti tartományban maradjon.',
  },
]
