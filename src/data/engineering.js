import { neutral } from '../i18n/t.js'

/* What /fejleszto says about how the work is done, rather than what it is
   built with.
   ---------------------------------------------------------------------
   The developer page used to be a stack list: six skill tiles lifted from
   skills.js, whose `detail` field was written for a client checking whether
   the supplier knows React. That answers "does he know the names". A
   recruiter, an engineering manager or another developer is asking a
   different question — how does this person decide, and what happens when
   something goes wrong — and a list of nouns cannot answer it.

   So this module holds three things the tile grid could not:

     ENGINEERING_APPROACH  how decisions get made, by area
     STACK_GROUPS          the tools, grouped, and honestly ranked
     SITE_DECISIONS        this repository read back as a case study

   Every claim here has to be checkable in this repository or in delivered
   work. That constraint is the whole point: a profile that overstates is
   worth less than one that understates, because the reader can verify the
   understatement and cannot verify anything after they catch the first
   inflation. Where a claim is about capability rather than about this repo,
   `where: 'projects'` says so out loud instead of letting the layout imply
   otherwise.

   Free of JSX and of any React import, like every other data module here, so
   scripts/ can read it in plain Node if it ever needs to. */

/* ---------------------------------------------------------------------
   Engineering approach
   ---------------------------------------------------------------------
   Five areas, because five is what the work actually splits into. Each has a
   one-sentence position and two to three specifics under it. The sentence is
   what a recruiter reads at scanning speed; the specifics are what a senior
   developer reads to decide whether the sentence is real.

   Written as positions rather than as vocabulary. "REST API-k tervezése" is a
   line on a CV; "the error response is shaped like the successful one" is a
   decision somebody either makes or does not. --------------------------- */
export const ENGINEERING_APPROACH = [
  {
    id: 'architecture',
    title: { hu: 'Architektúra', en: 'Architecture' },
    body: {
      hu: 'A legkisebb szerkezet, ami elbírja a feladatot. Absztrakciót akkor vezetek be, amikor a második hívó megjelenik — előtte az interfész, amit egyetlen implementáció használ, nem absztrakció, csak egy plusz fájl.',
      en: 'The smallest structure that carries the job. I add an abstraction when the second caller appears — before that, an interface with one implementation is not an abstraction, it is an extra file.',
    },
    points: [
      {
        hu: 'Egy tény egy helyen él, és minden más onnan olvassa. Ez az oldal a saját kárán tanulta meg: a projektek száma négy fájlban élt párhuzamosan, amíg az egyik hamis állítássá nem avult.',
        en: 'A fact lives in one place and everything else reads it from there. This site learned that the expensive way: the number of projects lived in four files at once, until one of them rotted into a false claim.',
      },
      {
        hu: 'A megosztott döntések — mozgási időzítések, útvonalak, színtokenek, kétnyelvű szövegek — külön modulban vannak, hogy ne tudjanak észrevétlenül szétcsúszni.',
        en: 'Shared decisions — motion timings, route paths, colour tokens, bilingual copy — live in their own modules, so they cannot quietly drift apart.',
      },
    ],
  },
  {
    id: 'frontend',
    title: { hu: 'Frontend', en: 'Frontend' },
    body: {
      hu: 'Komponens felelősségenként, a megosztott viselkedés hookban. Az állapot ott él, ahol használják, és amit ki lehet számolni, azt nem tárolom: a nyelv például az URL-ből következik, nem egy state-ből.',
      en: 'One component per responsibility, shared behaviour in hooks. State lives where it is used, and anything derivable is not stored — the language, for instance, follows from the URL rather than from state.',
    },
    points: [
      {
        hu: 'Minden aszinkron ághoz tartozik betöltési, hiba- és üres állapot, nem csak a sikeres út. Az üres állapot is szöveg, nem egy kihagyott doboz.',
        en: 'Every asynchronous path has a loading, an error and an empty state, not just the happy one. An empty state is copy too, not a gap where a box should be.',
      },
      {
        hu: 'Az akadálymentesség nem utólagos réteg: látható fókuszjelzés minden interaktív elemen, mért kontraszt a becsült helyett, és statikus oldal reduced-motion beállítás alatt.',
        en: 'Accessibility is not a layer added afterwards: a visible focus indicator on every interactive element, measured contrast rather than assumed contrast, and a static page when the visitor has asked for reduced motion.',
      },
      {
        hu: 'A reszponzív munka a telefonnál kezdődik, mert a látogatók nagyobb része onnan érkezik — nem a széles nézetnél, amit a fejlesztő lát maga előtt.',
        en: 'Responsive work starts at the phone, because that is where most visitors arrive from — not at the wide viewport the developer happens to be sitting in front of.',
      },
    ],
  },
  {
    id: 'backend',
    title: { hu: 'Backend és adat', en: 'Backend and data' },
    body: {
      hu: 'Erőforrás szerint szervezett REST végpontok, kiszámítható státuszkódokkal, és olyan hibaválaszokkal, amiknek ugyanaz az alakja, mint a sikereseknek — így a kliensnek nem kell kétféleképpen olvasnia ugyanazt a hívást.',
      en: 'REST endpoints organised by resource, with predictable status codes and error responses shaped like the successful ones — so the client does not need two ways of reading the same call.',
    },
    points: [
      {
        hu: 'A validáció a szerveren is lefut. A böngészőben végzett ellenőrzés kényelem a felhasználónak, nem védelem a rendszernek.',
        en: 'Validation runs on the server as well. Checking in the browser is a convenience for the user, not a defence for the system.',
      },
      {
        hu: 'Az authentikáció és a jogosultság két külön kérdés — ki vagy, és mihez férhetsz hozzá. Egyetlen szerepkör-mezőbe összevonva a második kérdésre soha nem lehet pontosan válaszolni.',
        en: 'Authentication and authorisation are two questions, not one: who you are, and what you may reach. Collapsed into a single role field, the second one can never be answered precisely.',
      },
      {
        hu: 'A séma megválasztása döntés, nem szokás: kötött szerkezetű adatnál relációs, változó alakúnál dokumentum-alapú. A változások migrációban mennek, hogy visszakövethetők legyenek.',
        en: 'Choosing the schema is a decision, not a habit: relational where the shape of the data is fixed, document-based where it is not. Changes go through migrations so they stay traceable.',
      },
    ],
  },
  {
    id: 'quality',
    title: { hu: 'Minőség', en: 'Quality' },
    body: {
      hu: 'A minőség nem egy fázis a végén. Lint és teszt minden változtatás után, és maga a build is kapu: ha egy állítás nem teljesül, nincs kimenet.',
      en: 'Quality is not a phase at the end. Lint and tests after every change, and the build itself is a gate: if an assertion fails, nothing is written.',
    },
    points: [
      {
        hu: 'A tesztek a viselkedést rögzítik, nem az implementációt. Különben minden refaktor teszthibaként jelentkezik, és a készlet akadállyá válik ahelyett, hogy védőháló lenne.',
        en: 'Tests describe behaviour, not implementation. Otherwise every refactor surfaces as a test failure, and the suite becomes an obstacle instead of a safety net.',
      },
      {
        hu: 'A néma hiba a drága. Ahol választani lehet a hangos leállás és a csendes visszaesés között, a leállást választom — a fordítási segédfüggvény például hibát dob a hiányzó szövegre ahelyett, hogy magyarra esne vissza egy angol oldalon.',
        en: 'The silent failure is the expensive one. Where the choice is between stopping loudly and degrading quietly, I take the stop — the translation helper throws on a missing string rather than falling back to Hungarian on an English page.',
      },
    ],
  },
  {
    id: 'production',
    title: { hu: 'Élesítés', en: 'Production' },
    body: {
      hu: 'Az élesítés nem a munka vége, hanem az a pont, ahol a korábbi döntések láthatóvá válnak. Amit nem lehet visszaállítani vagy megmérni, azt nem tekintem késznek.',
      en: 'Deployment is not the end of the work; it is where the earlier decisions become visible. If it cannot be rolled back or measured, I do not treat it as finished.',
    },
    points: [
      {
        hu: 'Security headerek és tartalombiztonsági irányelv, hogy ne csak a kód korlátozza, mi futhat az oldalon, hanem a böngésző is.',
        en: 'Security headers and a content security policy, so it is not only the code that limits what may run on the page, but the browser as well.',
      },
      {
        hu: 'A crawler kész HTML-t kap, nem egy üres elemet, amit majd a JavaScript tölt fel. A keresőoptimalizálás így szerkezeti kérdés, nem kulcsszavaké.',
        en: 'A crawler receives finished HTML, not an empty element for JavaScript to fill in later. That makes search visibility a structural question rather than a keyword one.',
      },
      {
        hu: 'A konfiguráció környezeti változóban él, nem a kódban, és a titkok soha nem kerülnek a böngészőbe.',
        en: 'Configuration lives in environment variables rather than in code, and secrets never reach the browser.',
      },
    ],
  },
]

/* ---------------------------------------------------------------------
   Stack
   ---------------------------------------------------------------------
   Grouped, and ranked by evidence rather than by confidence.

   `where` is the whole design of this block. A flat badge wall gives every
   name the same weight, which quietly claims the same depth behind each one;
   a percentage bar claims a precision nobody has. Two honest buckets do the
   job instead:

     'here'      running in this repository right now, and checkable by
                 opening package.json or the file named in the note
     'projects'  used in work delivered elsewhere, which a reader has to take
                 on trust — so it is marked, not blended in

   Nothing is listed that is not actually used. TypeScript in particular is
   absent: this codebase is JavaScript, and a profile that lists a language it
   does not write is the exact inflation the rest of this file is built to
   avoid. --------------------------------------------------------------- */
export const STACK_GROUPS = [
  {
    id: 'frontend',
    label: { hu: 'Frontend', en: 'Frontend' },
    items: [
      { name: neutral('React 19'), where: 'here', note: { hu: 'Ez az oldal', en: 'This site' } },
      { name: neutral('JavaScript (ES modules)'), where: 'here', note: { hu: 'Ez az oldal', en: 'This site' } },
      { name: neutral('Vite 8'), where: 'here', note: { hu: 'Build és fejlesztői szerver', en: 'Build and dev server' } },
      { name: neutral('Tailwind CSS'), where: 'here', note: { hu: 'Tokenekre kötött téma', en: 'Token-driven theme' } },
      { name: neutral('React Router'), where: 'here', note: { hu: 'Kétnyelvű útvonalak', en: 'Bilingual routing' } },
      { name: neutral('GSAP'), where: 'here', note: { hu: 'Görgetés- és belépő animációk', en: 'Scroll and entrance motion' } },
    ],
  },
  {
    id: 'backend',
    label: { hu: 'Backend', en: 'Backend' },
    items: [
      { name: neutral('Node.js'), where: 'here', note: { hu: 'A build és a prerender sima Node-ban fut', en: 'The build and prerender run in plain Node' } },
      { name: neutral('Express'), where: 'projects', note: { hu: 'REST végpontok', en: 'REST endpoints' } },
      { name: neutral('REST API'), where: 'projects', note: { hu: 'Erőforrás szerinti felépítés', en: 'Organised by resource' } },
      { name: neutral('JWT'), where: 'projects', note: { hu: 'Munkamenet-kezelés', en: 'Session handling' } },
    ],
  },
  {
    id: 'data',
    label: { hu: 'Adat', en: 'Data' },
    items: [
      { name: neutral('PostgreSQL'), where: 'projects', note: { hu: 'Kötött szerkezetű adat, migrációkkal', en: 'Fixed-shape data, with migrations' } },
      { name: neutral('MongoDB'), where: 'projects', note: { hu: 'Változó alakú dokumentumok', en: 'Documents whose shape varies' } },
      { name: neutral('Supabase'), where: 'projects', note: { hu: 'WebWise Studio', en: 'WebWise Studio' } },
    ],
  },
  {
    id: 'quality',
    label: { hu: 'Tesztelés és minőség', en: 'Testing and quality' },
    items: [
      /* The only number in this module, and engineering.test.js counts the
         suite and fails if it stops matching. Adding a test file therefore
         breaks the build until this line is updated — which is the whole
         argument this page makes, applied to the page itself. */
      { name: neutral('Vitest'), where: 'here', note: { hu: '138 teszt, 21 fájlban', en: '138 tests across 21 files' } },
      { name: neutral('Testing Library'), where: 'here', note: { hu: 'Komponensek viselkedése', en: 'Component behaviour' } },
      { name: neutral('oxlint'), where: 'here', note: { hu: 'Minden commit előtt', en: 'Before every commit' } },
    ],
  },
  {
    id: 'infra',
    label: { hu: 'Infrastruktúra és munkamenet', en: 'Infrastructure and workflow' },
    items: [
      { name: neutral('Git'), where: 'here', note: { hu: 'Ág funkciónként, kis commitok', en: 'A branch per feature, small commits' } },
      { name: neutral('GitHub'), where: 'here', note: { hu: 'Nyilvános forrás', en: 'Public source' } },
      { name: neutral('Vercel'), where: 'here', note: { hu: 'Élesítés a main ágról', en: 'Deploys from the main branch' } },
      { name: neutral('npm'), where: 'here', note: { hu: 'Build pipeline', en: 'Build pipeline' } },
    ],
  },
]

/* Reader-facing explanation of the two buckets. Kept next to the data rather
   than in the page, because the honesty of the block depends on the legend
   being present — a reader who misses it sees a flat list again. */
export const STACK_LEGEND = {
  here: { hu: 'Ebben a repóban fut', en: 'Runs in this repository' },
  projects: { hu: 'Projektekben használtam', en: 'Used in delivered projects' },
}

/* ---------------------------------------------------------------------
   This site as a case study
   ---------------------------------------------------------------------
   The strongest engineering evidence available today is the page the reader
   is already on, and until now none of it was visible. Each entry names a
   decision, the reason behind it, and the file where it can be checked —
   because a decision without its reason is a feature list, and a reason
   without a file is a claim.

   Deliberately weighted towards decisions that were made *against* the
   obvious option. "Uses React" is not a decision. "Renders in Node rather
   than in a headless browser, because Node has no IntersectionObserver" is.
   --------------------------------------------------------------------- */
export const SITE_DECISIONS = [
  {
    id: 'prerender',
    title: { hu: 'Prerendering Node-ban, nem headless böngészőben', en: 'Prerendered in Node, not in a headless browser' },
    why: {
      hu: 'A szekciók addig maradnak átlátszók, amíg egy IntersectionObserver be nem kapcsolja őket. Node-ban nincs IntersectionObserver, tehát minden szekció teljes láthatósággal renderelődik — headless Chrome-ban viszont van, így a pillanatkép a hajtás alatti tartalmat üresen rögzítené. Ráadásul így nem kell Chromiumot letölteni minden élesítéshez.',
      en: 'Sections stay transparent until an IntersectionObserver switches them on. Node has no IntersectionObserver, so every section renders fully visible — headless Chrome does have one, so a snapshot would capture everything below the fold as blank. It also keeps a Chromium download out of every deploy.',
    },
    source: 'scripts/prerender.mjs',
  },
  {
    id: 'locale',
    title: { hu: 'A nyelv az URL-ből következik, nem állapotból', en: 'Language follows from the URL, not from state' },
    why: {
      hu: 'Állapotban tartott nyelvvel a szerver magyart renderel a HTML-be, a hidratálás pedig átvált — ez látható villanás az olvasónak, és a kereső azt indexeli, amit a szerver tippelt. Az útvonal tiszta függvényeként nincs mit szinkronizálni, és mindkét nyelvnek valódi, megosztható URL-je van.',
      en: 'With the language held in state the server renders Hungarian into the HTML and hydration then flips it — a visible flash for the reader, and the crawler indexes whatever the server guessed. As a pure function of the path there is nothing to synchronise, and each language gets a real URL that can be linked to.',
    },
    source: 'src/i18n/locales.js',
  },
  {
    id: 'hreflang',
    title: { hu: 'hreflang csak oda, ahol tényleg van párja', en: 'hreflang only where a twin actually exists' },
    why: {
      hu: 'A két jogi oldal szándékosan magyar marad, mert egy kötelező érvényű dokumentum fordítása nem második változat, hanem második dokumentum. Egy 404-re mutató hreflang miatt viszont a kereső az egész nyelvi klasztert eldobja — ezért a generálás előbb ellenőrzi, hogy a párja létezik-e, és csak akkor ír ki tagot.',
      en: 'The two legal pages stay Hungarian on purpose: translating a binding document does not produce a second version of it, it produces a second document. But an hreflang pointing at a 404 makes a search engine drop the whole language cluster — so the generator checks that the twin exists before writing the tag.',
    },
    source: 'scripts/prerender.mjs',
  },
  {
    id: 'generated-seo',
    title: { hu: 'sitemap, robots és llms.txt generálva, nem kézzel írva', en: 'sitemap, robots and llms.txt generated, not hand-written' },
    why: {
      hu: 'Kézzel karbantartva elavultak: az llms.txt olyan árat hirdetett, amit az árazás már nem tartalmazott. A kézzel írt segédfájl mindig azzal a verzióval marad le, amit senki nem néz meg élesítéskor. Egy forrásból generálva nincs mit elfelejteni.',
      en: 'Maintained by hand, they went stale: llms.txt was publishing a price the pricing module no longer contained. A hand-written side file always lags behind the one thing nobody opens at deploy time. Generated from a single source, there is nothing left to forget.',
    },
    source: 'scripts/generate-static.mjs',
  },
  {
    id: 'schema',
    title: { hu: 'Strukturált adat a forrásból, nem másolatból', en: 'Structured data derived, not duplicated' },
    why: {
      hu: 'A JSON-LD nyolc GYIK-választ tartalmazott kézzel bemásolva, és elcsúszott: a látható oldal már az új árat mutatta, a strukturált adat még a régit. Pont ezt a szöveget idézi a kereső, tehát a régi volt a valószínűbben olvasott. A blokk most a forrásból épül, így nincs második példány, amit elfelejteni lehetne.',
      en: 'The JSON-LD carried eight FAQ answers copied in by hand, and they drifted: the visible page had the new price while the structured data still had the old one. That is precisely the text a search engine quotes, so the stale copy was the likelier one to be read. The block is now built from the source, leaving no second copy to forget.',
    },
    source: 'scripts/prerender.mjs',
  },
  {
    id: 'build-gates',
    title: { hu: 'A build leáll a néma hibákon', en: 'The build stops on the silent failures' },
    why: {
      hu: 'Minden ellenőrzés azzal jelez, hogy nem talál semmit, tehát a hibás ellenőrző és a tiszta oldal ugyanúgy néz ki. A build ezért kimondottan azokat a hibákat keresi, amiket senki nem venne észre: átlátszón maradt szekció, magyar szöveg az angol oldalon, üresen maradt strukturált adat, két helyen tartott oldalcím. Van olyan ellenőrzés is, ami magát az ellenőrzőt ellenőrzi.',
      en: 'Every check reports by finding nothing, so a broken checker and a clean page look identical. The build therefore hunts specifically for the failures nobody would notice: a section left transparent, Hungarian text on the English page, structured data left empty, a page title kept in two places. One of the checks exists to verify the checker itself.',
    },
    source: 'scripts/prerender.mjs',
  },
  {
    id: 'csp',
    title: { hu: 'Tartalombiztonsági irányelv inline script nélkül', en: 'A content security policy with no inline script' },
    why: {
      hu: 'A script-src csak a saját forrást engedi, unsafe-inline nélkül — így nincs hova beszúrni egy hidratációs adatblokkot, és a prerender szándékosan nem is állít elő egyet. A megkötés alakította a megoldást, nem utólag került rá.',
      en: 'The script-src allows only same-origin scripts, with no unsafe-inline — so there is nowhere to put a hydration data blob, and the prerender deliberately does not produce one. The constraint shaped the solution rather than being bolted on afterwards.',
    },
    source: 'vercel.json',
  },
  {
    id: 'fonts',
    title: { hu: 'Saját hostolt betűtípusok, latin-ext karakterkészlettel', en: 'Self-hosted fonts with a latin-ext subset' },
    why: {
      hu: 'Egy betűtípus-CDN egyszer 200-as válasszal, de CSS helyett egy „ideiglenesen korlátozva" megjegyzéssel felelt — a szöveg tartalék betűtípusra esett vissza, hibaüzenet nélkül, mindenhol. A helyi fájlok ezt megszüntetik, a latin-ext készlet pedig azt, hogy az ő és az ű szó közben más betűtípusra váltson.',
      /* The obvious sentence here names the two characters. It cannot: the
         build scans every English page for Hungarian and keys on diacritics,
         so quoting them as examples failed the build on this very entry. The
         guard is right to be blunt — weakening it so one sentence can keep
         two glyphs would trade a real check for a flourish — so the copy
         describes them instead. */
      en: 'A font CDN once answered with a 200 that contained a "temporarily restricted" comment instead of CSS — body text fell back to a system face, with no error anywhere. Local files remove that, and the latin-ext subset removes the other half: the accented Hungarian characters no longer switch to a different face mid-word.',
    },
    source: 'src/fonts.css',
  },
]
