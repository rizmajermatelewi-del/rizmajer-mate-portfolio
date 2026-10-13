import { neutral } from '../i18n/t.js'
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import idopontfoglalo01 from '../assets/demos/idopontfoglalo-01.webp'
import idopontfoglalo02 from '../assets/demos/idopontfoglalo-02.webp'
import napiMenuCard from '../assets/demos/napi-menu-card.webp'
import napiMenu01 from '../assets/demos/napi-menu-01.webp'
import napiMenu02 from '../assets/demos/napi-menu-02.webp'
import napiMenu03 from '../assets/demos/napi-menu-03.webp'
import bemutatkozoCard from '../assets/demos/bemutatkozo-card.webp'
import bemutatkozo01 from '../assets/demos/bemutatkozo-01.webp'
import bemutatkozo02 from '../assets/demos/bemutatkozo-02.webp'
import autoszervizCard from '../assets/demos/autoszerviz-card.webp'
import autoszerviz01 from '../assets/demos/autoszerviz-01.webp'
import autoszerviz02 from '../assets/demos/autoszerviz-02.webp'

/* Demo apps live in a **separate** public repo (DEMOS) and each has its own
   Vercel project. This portfolio only stores screenshots + links.

   Twelve demos until 2026-10-13; trimmed to the four that back an offer on
   the page (booking, daily menu, one-page site, garage booking and quotes).
   The other eight stay live in the DEMOS repo, just not listed here. */

const DEMOS_REPO = 'https://github.com/rizmajermatelewi-del/DEMOS'
const DEMOS_REPO_READY = true

export const PROJECTS_FULL = [
  {
    title: {
      hu: 'Szálka Fodrászat: időpontfoglaló',
      en: 'Szalka Hair Salon: booking',
    },
    text: {
      hu: 'Bemutató időpontfoglaló fodrászatra: az időpontválasztó egy fésű, fél óránként egy foggal, a foglalt fog letört. Fodrászt is választhatsz, mindegyiknek saját naptára van. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo booking flow for a salon: the time picker is a comb, one tooth per half hour, with booked teeth broken off. You can pick a stylist, each with their own calendar. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Fésű alakú időpontválasztó', en: 'Comb-shaped time picker' },
      { hu: 'Dupla foglalás elleni védelem', en: 'Double-booking prevention' },
      { hu: 'Fodrászválasztó, külön naptárakkal', en: 'Pick a stylist, each with a calendar' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató: zöld-rózsaszín plakátcím és kör alakú fotó egy hajszárításról',
      en: 'Szalka salon demo: green and pink poster headline with a round photo of a blow-dry',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis fodrászatnak kell egy egyszerű, telefonról is használható foglaló, anélkül, hogy Excelben vagy üzenetben egyeztessen.',
      en: 'A small salon needs a simple booker that works on a phone, without coordinating in Excel or chat.',
    },
    solution: {
      hu: 'Szolgáltatásválasztó, szabad sávok, foglalási űrlap, megerősítő képernyő és admin lista. A demó localStorage-ben fut; élesben Supabase + e-mail jön.',
      en: 'Service picker, free slots, booking form, confirmation screen and admin list. The demo uses localStorage; production would add Supabase + email.',
    },
    gallery: [
      {
        src: idopontfoglalo01,
        alt: {
          hu: 'Nyitóoldal: a szalon neve plakátbetűkkel, foglalás gomb és fotó',
          en: 'Landing: the salon name in poster type, booking button and photo',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: {
          hu: 'A fésű: egy 90 perces festés három foga kiemelkedik, a zárás előtti fogak sötétek, mert oda már nem fér be',
          en: 'The comb: three teeth rise for a 90-minute colour, the teeth before closing are dark because it no longer fits',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/idopontfoglalo` : '#',
    live: 'https://demo-idopontfoglalo.vercel.app',
  },
  {
    title: {
      hu: 'Kispipa Büfé: napi menü',
      en: 'Kispipa Buffet: daily menu',
    },
    text: {
      hu: 'Bemutató napi menü büfének: a menü betűtáblán jelenik meg, betűnként kitűzve. Elvitelre előre lehet rendelni, a pult nézetben a konyha látja a blokkokat. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: the menu appears on a felt letterboard, pinned letter by letter. Takeaway can be ordered ahead, and the counter view shows the kitchen the slips. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Betűtábla, betűnként kitűzve', en: 'Felt letterboard, pinned letter by letter' },
      { hu: 'Szerkesztő élő tábla-előnézettel', en: 'Editor with a live board preview' },
      { hu: 'Elviteles rendelés, pult nézettel', en: 'Takeaway orders with a counter view' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-dark' },
    image: napiMenuCard,
    imageAlt: {
      hu: 'Kispipa Büfé bemutató: a menü fehér betűkkel egy tölgyfakeretes filctáblán, sárga kockás abroszon',
      en: 'Kispipa buffet demo: the menu in white letters on an oak-framed felt board, on a yellow gingham cloth',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'A kisvendéglő a napi menüt gyakran papírlapról fotózza Facebookra. A vendég nem találja, a tulaj nehezen frissíti.',
      en: 'A small eatery often posts the daily menu as a photo of a printout on Facebook: hard to find, hard to update.',
    },
    solution: {
      hu: 'Nyilvános mai menü, heti áttekintés, jelszavas szerkesztő. A demó localStorage-ben ment; élesben Supabase auth + tábla.',
      en: 'Public today board, week overview, password editor. The demo saves to localStorage; production would use Supabase auth + a table.',
    },
    gallery: [
      {
        src: napiMenu01,
        alt: {
          hu: 'Nyitóoldal: a következő nyitvatartási nap menüje a betűtáblán',
          en: 'Landing: the next open day\'s menu on the letterboard',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: {
          hu: 'Heti nézet: napválasztó fülek, a tábla minden napnál újra kirakva',
          en: 'Week view: day tabs, the board set again for each day',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: {
          hu: 'Szerkesztő: az űrlap mellett élőben látszik, hogyan kerül ki a menü a táblára',
          en: 'Editor: next to the form, a live preview of the menu on the board',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/napi-menu` : '#',
    live: 'https://demo-napi-menu.vercel.app',
  },
  {
    title: {
      hu: 'Kovács Villanyszerelés: bemutatkozó oldal',
      en: 'Kovacs Electrical: one-page site',
    },
    text: {
      hu: 'Bemutató egyoldalas oldal villanyszerelőnek: az ajánlatkérőben kismegszakítók felkapcsolásával választod ki a munkát. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo one-page site for an electrician: in the quote form you pick the job by flipping circuit breakers. My own initiative, not client work.',
    },
    tech: ['Vite', 'HTML', 'CSS'],
    features: [
      { hu: 'Ajánlatkérő kismegszakítókkal', en: 'Quote form with circuit breakers' },
      { hu: 'Élő státusz-LED a nyitvatartásból', en: 'Live status LED from the opening hours' },
      { hu: 'Lighthouse mobil: 99 / 100 / 100 / 100', en: 'Mobile Lighthouse: 99 / 100 / 100 / 100' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: bemutatkozoCard,
    imageAlt: {
      hu: 'Kovács Villanyszerelés bemutató: nagy nagybetűs cím szürke dobozszínen, státusz-LED és fotó egy mérésről',
      en: 'Kovacs Electrical demo: big uppercase headline on enclosure grey, a status LED and a photo of a measurement',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy szakiparosnak nem webshop kell, hanem egy oldal, ami telefonon azonnal betölt, megmondja, mit vállal és hol, és egy koppintással hívható.',
      en: 'A tradesperson does not need a shop, just a page that loads instantly on a phone, says what they do and where, and can be called with one tap.',
    },
    solution: {
      hu: 'Egy oldal sima HTML-lel és CSS-sel, keretrendszer nélkül, egy rövid scripttel az űrlaphoz. Helyi vállalkozás schema.org adattal. A bemutató űrlapja nem küld e-mailt; élesben egy űrlapszolgáltatás kerülne mögé.',
      en: 'One page in plain HTML and CSS, no framework, with a short script for the form. Local business schema.org data. The demo form sends no email; production would put a form service behind it.',
    },
    gallery: [
      {
        src: bemutatkozo01,
        alt: {
          hu: 'Nyitóoldal: cím, ajánlatkérés és hívás gomb, fejlécben a státusz-LED',
          en: 'Landing: headline, quote and call buttons, the status LED in the header',
        },
        width: 1280,
        height: 800,
      },
      {
        src: bemutatkozo02,
        alt: {
          hu: 'Elosztótábla az ajánlatkérőben: két kismegszakító felkapcsolva, a LED-jük és a leírásuk világít',
          en: 'Breaker panel in the quote form: two breakers on, their LEDs and descriptions lit',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/bemutatkozo` : '#',
    live: 'https://demo-bemutatkozo.vercel.app',
  },
  {
    title: {
      hu: 'Kormos Autószerviz: időpont és árajánlat',
      en: 'Kormos Garage: booking and quotes',
    },
    text: {
      hu: 'Bemutató autószerviz-oldal: műhelyidő foglalása rendszámmal, árajánlatkérés a hiba leírásával, műhely nézet. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo garage site: book a workshop slot by number plate, request a quote by describing the fault, workshop view. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Csak az a sáv látszik, amibe a munka belefér', en: 'Only slots the whole job fits into' },
      { hu: 'Rendszám-ellenőrzés (régi és új formátum)', en: 'Hungarian plate check (old and new format)' },
      { hu: 'Foglalás és ajánlatkérés egy műhelylistában', en: 'Bookings and quote requests in one workshop list' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: autoszervizCard,
    imageAlt: {
      hu: 'Kormos Autószerviz bemutató: papír munkalap munkákkal és árakkal, mellette egy szerelő fotója',
      en: 'Kormos Garage demo: a paper work order with jobs and prices, next to a photo of a mechanic',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis szervizben a telefon egész nap csörög: mikor hozhatom, mennyi lesz. A szerelő a kocsi alól veszi fel, az időpont füzetbe kerül, az ajánlat fejben marad.',
      en: 'In a small garage the phone rings all day: when can I bring it, how much will it be. The mechanic answers from under a car, the slot goes into a notebook, the quote stays in his head.',
    },
    solution: {
      hu: 'Két belépő: aki tudja, mi kell, foglal; aki csak azt tudja, hogy „kopog”, leírja, és visszahívást kér. A sávszámítás a fodrász-demóból jön, tesztekkel. A demó localStorage-ben fut; élesben adatbázis és SMS-emlékeztető jönne.',
      en: 'Two ways in: people who know what they need book a slot; people who only know it "knocks" describe it and ask for a call back. Slot logic is shared with the salon demo, with tests. The demo uses localStorage; production would add a database and SMS reminders.',
    },
    gallery: [
      {
        src: autoszerviz01,
        alt: {
          hu: 'Munkalap: elvégzendő munkák árral és időtartammal, mellette a műhely fotója',
          en: 'Work order: jobs with price and duration, next to a photo of the workshop',
        },
        width: 1280,
        height: 800,
      },
      {
        src: autoszerviz02,
        alt: {
          hu: 'Leadási nap és időpont, alatta az autó és az ügyfél adatai a munkalapon',
          en: 'Drop-off day and time, with the car and customer fields below on the work order',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/autoszerviz` : '#',
    live: 'https://demo-szerviz.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
