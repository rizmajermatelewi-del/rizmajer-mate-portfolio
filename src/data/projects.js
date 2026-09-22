import { neutral } from '../i18n/t.js'
import { SITE_ORIGIN } from '../site.js'
import portfolioHero from '../assets/projects/portfolio-hero.webp'

/* Case-study fields render in ProjectModal only when non-empty, so filling
   them later is a data edit rather than a code change, and a half-filled
   project degrades to a short clean panel instead of a page of empty headings.

   `image` / `imageAlt` are the card screenshots. Empty means ProjectMock
   draws a labelled empty frame instead, which is the honest state: this
   section's headline promises real work, so a fabricated preview here would
   contradict the page in the one place it can least afford to. To fill one,
   put the file in src/assets/projects, import it at the top of this file,
   and set both fields. Nothing else needs touching.

   Wanted, in priority order (still empty — do not invent URLs or screenshots):
     1. AB Masszázs        - live client site + booking calendar screenshot
     2. Időpontfoglaló demo - deployed demo URL + public repo (see docs/demo-sites-plan.md)
     3. Napi menü demo     - same
     4. Business Value Builder / WebWise Studio - only when those exist at public URLs

   `github` stays '#' until there is a real repository URL. projects.test.js
   asserts that placeholders are either '#' or https://… so dead links do not ship.

   `features` and `featured` follow the same empty-by-default rule. `featured`
   draws a "Kiemelt projekt" badge — set it only on the project that earns it
   (today: this portfolio, the only entry with a live URL, public repo, and
   real screenshot). */
/* Two entries removed on 2026-08-10, both labelled 'Ügyfélprojekt': a
   Rétes-rendelő and the AB Masszázs időpontfoglaló. Neither was delivered and
   neither was invoiced — they described work that had not happened, on the one
   page whose job is to prove that it had. A prospect asking "megnézhetem?" or
   "van referencia?" would have found nothing behind either.

   AB Masszázs is coming back once it exists: it is a real salon and a real
   brief. It belongs here the day it is live, with a screenshot and a URL, and
   not before. projects.test.js now enforces the general form of that rule —
   nothing may call itself client work without something a stranger can open. */
/* The empty case-study fields stay as '' rather than becoming { hu: '', en: '' }.
   Every render site already guards them with a truthiness check, so an empty
   string is simply not rendered and t() is never called on it — while
   untranslatedIn() would read an empty pair as missing both languages and turn
   deliberate blanks into failures.

   It also fails in the right direction later: fill one in with a bare string
   and t() throws at build time naming the field, which is the reminder to
   supply both languages. `tech` stays bare for the opposite reason — a stack
   name is self-evidently not copy, and untranslatedIn ignores non-field
   leaves. */
export const PROJECTS_FULL = [
  {
    title: { hu: 'Ez a portfólió', en: 'This portfolio' },
    text: {
      hu: 'Az oldal, amit most olvasol: nyilvános árak, őszinte üres állapotok, előrenderelt SEO. Élő URL és nyilvános repó — ellenőrizhető munka, nem állítás.',
      en: 'The page you are reading: public pricing, honest empty states, prerendered SEO. Live URL and a public repo — checkable work, not a claim.',
    },
    tech: ['React', 'Vite', 'Tailwind', 'GSAP'],
    features: [
      { hu: 'Élő URL és nyilvános GitHub', en: 'Live URL and public GitHub' },
      { hu: 'Kétnyelvű felület, fail-loud i18n', en: 'Bilingual UI, fail-loud i18n' },
      { hu: 'Előrenderelt útvonalak a keresőknek', en: 'Prerendered routes for crawlers' },
    ],
    featured: true,
    label: { hu: 'Saját projekt', en: 'Personal project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: portfolioHero,
    imageAlt: {
      hu: 'A portfólió hero nézete: navigáció, RML márka és a sötét hero vizuál.',
      en: 'The portfolio hero: navigation, RML brand, and the dark hero visual.',
    },
    year: { hu: '2026', en: '2026' },
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, development, deploy',
    },
    problem: {
      hu: 'Egy magyar KKV-tulajdonosnak bizonyíték kell, nem ügynökségi sablon: ár, folyamat, és megnyitható munka — anélkül, hogy ügyfélprojekteket találjak ki.',
      en: 'A Hungarian SME owner needs evidence, not an agency template: price, process, and work they can open — without inventing client projects.',
    },
    solution: {
      hu: 'Egyetlen forrásból tartott tartalom, szigorú CSP, Formspree űrlap, és olyan projektkártyák, amelyek üresen is őszinték maradnak. Amit állít, azt a repóban meg lehet nézni.',
      en: 'Single-source content, a strict CSP, a Formspree form, and project cards that stay honest while empty. What it claims can be checked in the repo.',
    },
    gallery: [
      {
        src: portfolioHero,
        alt: 'A portfólió hero nézete navigációval és a sötét hero vizuállal',
        width: 1200,
        height: 750,
      },
    ],
    github: 'https://github.com/rizmajermatelewi-del/rizmajer-mate-portfolio',
    live: `${SITE_ORIGIN}/`,
  },
  {
    title: neutral('Business Value Builder'),
    /* Was: "végigmentem az inárcsi vállalkozásokon, kiszűrtem, kiknek nincs
       weboldaluk, és személyesen kerestem meg őket." That outreach is planned,
       not done, so the sentence claimed a case study that does not exist yet. */
    text: {
      hu: 'Saját árazási oldal: azt modellezi, hogyan lehet egy környékbeli vállalkozásnak úgy árat mondani, hogy a végösszeg előre kiszámítható maradjon.',
      en: 'My own pricing page: it models how to quote a nearby business a price whose final total stays predictable up front.',
    },
    tech: ['React', 'TanStack Start'],
    features: [],
    featured: false,
    label: { hu: 'Saját projekt', en: 'Personal project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: '',
    imageAlt: '',
    year: '',
    role: '',
    problem: '',
    solution: '',
    gallery: [],
    github: '#',
    live: '',
  },
  {
    title: neutral('WebWise Studio'),
    text: {
      hu: 'Ügynökségi koncepció-oldal egyedi React/AI alapú webalkalmazásokra — saját kezdeményezésű prototípus.',
      en: 'An agency concept site for custom React/AI web applications — a prototype I started myself.',
    },
    tech: ['React', 'Supabase', 'Framer Motion'],
    features: [],
    featured: false,
    label: { hu: 'Saját projekt', en: 'Personal project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary-dark' },
    image: '',
    imageAlt: '',
    year: '',
    role: '',
    problem: '',
    solution: '',
    gallery: [],
    github: '#',
    live: '',
  },
]

/* Counts derived from the list so Pillars / copy cannot drift again. */
export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => Boolean(p.live)).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
