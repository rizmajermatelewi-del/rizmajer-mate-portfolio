import { neutral } from '../i18n/t.js'

/* The case-study fields below are intentionally empty. ProjectModal renders
   each one only when it is non-empty, so filling them in later is a data edit
   rather than a code change, and a half-filled project degrades to a short
   clean panel instead of a page of empty headings.

   `image` / `imageAlt` are the card screenshots. Empty means ProjectMock
   draws a labelled empty frame instead, which is the honest state: this
   section's headline promises "valós munka, nem mockup", so a fabricated
   preview here would contradict the page in the one place it can least
   afford to. To fill one, put the file in src/assets, import it at the top
   of this file, and set both fields. Nothing else needs touching.

   Wanted, in priority order:
     1. Rétes-rendelő      - the live ordering screen, 1200x750 or wider
     2. AB Masszázs        - the booking calendar view
     3. Business Value Builder - the pricing page
     4. WebWise Studio     - the landing hero
   `github` stays '#' until there are real repository URLs; projects.test.js
   asserts that, so it fails loudly rather than shipping dead links.

   `features` and `featured` follow the same empty-by-default rule as the
   case-study fields above. `features` is the card's "Amit tud" list and renders
   only when non-empty; `featured` draws a "Kiemelt projekt" badge and is false
   on all four on purpose. Nothing here has a screenshot, a live URL or a repo
   yet, so there is no defensible basis for calling one of them the strongest —
   a badge handed out arbitrarily is decoration, and this section's whole claim
   is that it does not decorate. Set it on the one project that earns it once
   the demos are deployed. */
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
   four deliberate blanks into four failures.

   It also fails in the right direction later: fill one in with a bare string
   and t() throws at build time naming the field, which is the reminder to
   supply both languages. `tech` stays bare for the opposite reason — a stack
   name is self-evidently not copy, and untranslatedIn ignores non-field
   leaves. */
export const PROJECTS_FULL = [
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
