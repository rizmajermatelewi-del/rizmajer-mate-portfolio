import { neutral } from '../i18n/t.js'
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import idopontfoglalo01 from '../assets/demos/idopontfoglalo-01.webp'
import idopontfoglalo02 from '../assets/demos/idopontfoglalo-02.webp'
import idopontfoglalo03 from '../assets/demos/idopontfoglalo-03.webp'
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
import viragboltCard from '../assets/demos/viragbolt-card.webp'
import viragbolt01 from '../assets/demos/viragbolt-01.webp'
import viragbolt02 from '../assets/demos/viragbolt-02.webp'
import masszazsCard from '../assets/demos/masszazs-card.webp'
import masszazs01 from '../assets/demos/masszazs-01.webp'
import masszazs02 from '../assets/demos/masszazs-02.webp'

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
      hu: 'Szálka Fodrászat: szalonoldal foglalással',
      en: 'Szalka Hair Salon: site with booking',
    },
    text: {
      hu: 'Bemutató szalonoldal: az árak egy hajszínkártyán, a fodrászok kerek tükörben a saját legközelebbi szabad időpontjukkal, az időpontválasztó pedig egy fésű, fél óránként egy foggal. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo salon site: prices on a hair-colour swatch ring, stylists in round mirrors with their own next free time, and a comb for picking the time, one tooth per half hour. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Fésű alakú időpontválasztó', en: 'Comb-shaped time picker' },
      { hu: 'Árak hajszínkártyán', en: 'Prices on a swatch ring' },
      { hu: 'Élő következő szabad időpont fodrászonként', en: 'Live next free time per stylist' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató: nagy fekete cím piros hajszál-vonallal, mellette fotó egy hajvágásról',
      en: 'Szalka salon demo: large black headline with a red strand line, next to a photo of a haircut',
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
          hu: 'Nyitóoldal: a szalon neve, foglalás gomb, a legközelebbi szabad időpont és egy hajvágás fotója',
          en: 'Landing: the salon name, booking button, the next free time and a photo of a haircut',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: {
          hu: 'A hajszínkártya: hat tincs egy tűn, mindegyik egy kezelés árral, a kiválasztott balayage kártyája mellette',
          en: 'The swatch ring: six strands on one pin, each a treatment with its price, the chosen balayage card beside it',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo03,
        alt: {
          hu: 'A fésű: egy 90 perces festés három foga pirosra vált, a szürke fogakba a kezelés már nem fér bele',
          en: 'The comb: three teeth turn red for a 90-minute colour, the grey teeth are where it no longer fits',
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
      hu: 'Bemutató napi menü büfének: a mai menü betűtáblán, allergénszűrővel. Elvitelre előre lehet rendelni, minden rendelés egy pecsét a telefonos törzskártyán, a hét letéphető naptárlapokon. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: today\'s menu on a felt letterboard, with an allergen filter. Takeaway can be ordered ahead, every order is a stamp on a loyalty card kept on the phone, and the week sits on tear-off calendar pages. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Betűtábla allergénszűrővel', en: 'Letterboard with an allergen filter' },
      { hu: 'Elviteles rendelés, pult nézettel', en: 'Takeaway orders with a counter view' },
      { hu: 'Pecsétkártya, tizedik ebéd ingyen', en: 'Stamp card, the tenth lunch free' },
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
          hu: 'Nyitóoldal: a mai menü a betűtáblán, alatta az allergénszűrő',
          en: 'Landing: today\'s menu on the letterboard, the allergen filter below it',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: {
          hu: 'A hét letéphető naptárlapokon, alatta a nyitva tábla a tűzhely fotóján',
          en: 'The week on tear-off calendar pages, the open sign hanging on a photo of the stove below',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: {
          hu: 'Pecsétkártya: tíz kör, a tizedik ebéd ingyen, alatta a hét ételei fotón',
          en: 'Stamp card: ten circles, the tenth lunch free, with photos of the week\'s dishes below',
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
  {
    title: { hu: "Pipacs Virágkötészet: csokorkötő", en: "Pipacs Florist: bouquet builder" },
    text: {
      hu: "Bemutató virágbolt: a csokrot szálanként rakod össze a mai készletből, és élőben kötődik a kraftpapírban. A kártya szövege a masnira kötött cédulán jelenik meg. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo florist: you build the bouquet stem by stem from today's stock and it is tied live in kraft paper. The card text appears on a tag at the bow. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Élő SVG-csokor szálanként", en: "Live SVG bouquet, stem by stem" },
      { hu: "Mai készlet és ár szálanként", en: "Today's stock and price per stem" },
      { hu: "Átvételi nap, vasárnap zárva", en: "Pickup day, closed on Sundays" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: viragboltCard,
    imageAlt: {
      hu: "Pipacs Virágkötészet bemutató: zsályazöld oldal, dőlt pipacspiros cím és egy virágkötő fotója íves keretben",
      en: "Pipacs Florist demo: sage page, italic poppy-red headline and a photo of a florist in an arched frame",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Egy kis virágbolt oldalán általában fotógaléria és telefonszám van. Aki csokrot akar, felhív, és szóban próbálja elmagyarázni, mit szeretne.",
      en: "A small florist site usually has a photo gallery and a phone number. Anyone who wants a bouquet calls and tries to describe it in words.",
    },
    solution: {
      hu: "Csokorkötő a mai vödrökből: a virágok középre, a zöldek szélre kerülnek, a szálak átcsúsznak az új helyükre. Csomagolás, kártya, átvételi nap és napszak. A csokor logikája tesztelt modul.",
      en: "A bouquet builder from today's buckets: flowers go to the middle, greens to the edge, and stems glide to their new place. Wrapping, card, pickup day and time. The bouquet logic is a tested module.",
    },
    gallery: [
      {
        src: viragbolt01,
        alt: { hu: "Nyitóoldal: cím, csokor-gomb és a bolt fotója", en: "Landing: headline, bouquet button and a photo of the shop" },
        width: 1280,
        height: 800,
      },
      {
        src: viragbolt02,
        alt: { hu: "A csokorkötő: vödrök szálárral és készlettel, mellette a kraftpapíros csokor a kártyával", en: "The builder: buckets with price per stem and stock, next to the kraft-paper bouquet with its card" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/viragbolt` : '#',
    live: 'https://demo-viragbolt.vercel.app',
  },
  {
    title: { hu: "Oldó Masszázsstúdió: „Hol fáj?”", en: "Oldo Massage Studio: where does it hurt?" },
    text: {
      hu: "Bemutató masszázsstúdió: a testtérképen megjelölöd, hol fáj, és kezelést, időtartamot, árat és első szabad időpontot kapsz. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo massage studio: mark where it hurts on a body map and get a treatment, length, price and the first free slots. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Testtérkép kezelésajánlással", en: "Body map that recommends a treatment" },
      { hu: "Szabad időpontok a kezelés hosszához", en: "Free slots that fit the treatment length" },
      { hu: "Sötét, lassú, nyugodt felület", en: "Dark, slow, calm interface" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: masszazsCard,
    imageAlt: {
      hu: "Oldó Masszázsstúdió bemutató: sötét palaszürke oldal, terrakotta cím és egy masszázsfotó kavics alakú keretben",
      en: "Oldo Massage demo: dark slate page, terracotta headline and a massage photo in a pebble-shaped frame",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Aki masszázsra jelentkezik, ritkán tudja, hogy svéd, sport vagy talp kell neki. Azt tudja, hol fáj. A legtöbb szalon oldala mégis a kezelések nevével kezd.",
      en: "People booking a massage rarely know whether they need Swedish, sports or foot massage. They know where it hurts. Most salon sites still start with treatment names.",
    },
    solution: {
      hu: "A fájó zónák és az erősség alapján ajánl kezelést, egy mondat indoklással, majd a kezelés hosszához illő szabad időpontokat mutat, zárás előtt befejezve. Mindkettő tesztelt modul.",
      en: "From the sore zones and how bad it is, it recommends a treatment with a one-line reason, then shows free slots that fit its length and end before closing. Both are tested modules.",
    },
    gallery: [
      {
        src: masszazs01,
        alt: { hu: "Nyitóoldal: cím, két gomb és a masszázsfotó egy légző gyűrűben", en: "Landing: headline, two buttons and the massage photo inside a breathing ring" },
        width: 1280,
        height: 800,
      },
      {
        src: masszazs02,
        alt: { hu: "A testtérkép: a váll és a derék felmelegszik, az ajánlás hát- és derékmasszázs 45 percre", en: "The body map: shoulders and lower back warm up, the recommendation is a 45-minute back massage" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/masszazs` : '#',
    live: 'https://demo-masszazs.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
