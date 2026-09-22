import { neutral } from '../i18n/t.js'
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import idopontfoglalo01 from '../assets/demos/idopontfoglalo-01.webp'
import idopontfoglalo02 from '../assets/demos/idopontfoglalo-02.webp'
import napiMenuCard from '../assets/demos/napi-menu-card.webp'
import napiMenu01 from '../assets/demos/napi-menu-01.webp'
import napiMenu02 from '../assets/demos/napi-menu-02.webp'
import napiMenu03 from '../assets/demos/napi-menu-03.webp'

/* Demo apps live in a **separate** public repo (portfolio-demos) and each has
   its own Vercel project. This portfolio only stores screenshots + links.

   `github` stays '#' until rizmajermatelewi-del/portfolio-demos exists and is
   pushed — the agent token cannot create repositories. Do not invent a URL. */

const DEMOS_REPO = 'https://github.com/rizmajermatelewi-del/portfolio-demos'
/* Set to true in the same PR that fills github after the demos repo is public. */
const DEMOS_REPO_READY = false

export const PROJECTS_FULL = [
  {
    title: {
      hu: 'Időpontfoglaló — Szálka Fodrászat',
      en: 'Booking — Szalka Hair Salon',
    },
    text: {
      hu: 'Bemutató időpontfoglaló fodrászatra: szolgáltatás, naptár, foglalás, admin lista. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo booking flow for a salon: services, calendar, booking, admin list. My own initiative, not client work.',
    },
    tech: ['React', 'Vite', 'Tailwind'],
    features: [
      { hu: 'Dupla foglalás elleni védelem', en: 'Double-booking prevention' },
      { hu: 'Admin lista PIN-nel', en: 'Admin list with a PIN' },
      { hu: 'Magyar mintaadatok', en: 'Hungarian sample data' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató foglaló: szolgáltatások, napválasztó és időpontok',
      en: 'Szalka salon demo booker: services, day picker and time slots',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis fodrászatnak kell egy egyszerű, telefonról is használható foglaló — anélkül, hogy Excelben vagy üzenetben egyeztessen.',
      en: 'A small salon needs a simple booker that works on a phone — without coordinating in Excel or chat.',
    },
    solution: {
      hu: 'Szolgáltatásválasztó, szabad sávok, foglalási űrlap, megerősítő képernyő és admin lista. A demó localStorage-ben fut; élesben Supabase + e-mail jön.',
      en: 'Service picker, free slots, booking form, confirmation screen and admin list. The demo uses localStorage; production would add Supabase + email.',
    },
    gallery: [
      {
        src: idopontfoglalo01,
        alt: 'Foglalási felület: szolgáltatások és időpontválasztó',
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: 'Admin lista a bemutató foglalásokkal',
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/idopontfoglalo` : '#',
    live: 'https://demo-idopontfoglalo.vercel.app',
  },
  {
    title: {
      hu: 'Napi menü — Kispipa Büfé',
      en: 'Daily menu — Kispipa Buffet',
    },
    text: {
      hu: 'Bemutató napi menü büfének: mai lap, heti nézet, egyszerű szerkesztő. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: today\'s board, week view, simple editor. My own initiative, not client work.',
    },
    tech: ['React', 'Vite', 'Tailwind'],
    features: [
      { hu: 'Mai menü + hét', en: 'Today + week view' },
      { hu: 'Tulaj-szerkesztő', en: 'Owner editor' },
      { hu: 'Magyar mintaadatok', en: 'Hungarian sample data' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-dark' },
    image: napiMenuCard,
    imageAlt: {
      hu: 'Kispipa Büfé bemutató napi menü: leves, főételek, desszert Ft-ban',
      en: 'Kispipa buffet demo daily menu: soup, mains, dessert in HUF',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'A kisvendéglő a napi menüt gyakran papírlapról fotózza Facebookra — a vendég nem találja, a tulaj nehezen frissíti.',
      en: 'A small eatery often posts the daily menu as a photo of a printout on Facebook — hard to find, hard to update.',
    },
    solution: {
      hu: 'Nyilvános mai menü, heti áttekintés, jelszavas szerkesztő. A demó localStorage-ben ment; élesben Supabase auth + tábla.',
      en: 'Public today board, week overview, password editor. The demo saves to localStorage; production would use Supabase auth + a table.',
    },
    gallery: [
      {
        src: napiMenu01,
        alt: 'Mai menü képernyő a Kispipa Büfé bemutatóban',
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: 'Heti áttekintés a napi menükről',
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: 'Menüszerkesztő admin felület',
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/napi-menu` : '#',
    live: 'https://demo-napi-menu.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
