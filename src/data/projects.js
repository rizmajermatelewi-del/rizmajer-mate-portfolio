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
export const PROJECTS_FULL = [
  {
    title: 'Business Value Builder',
    /* Was: "végigmentem az inárcsi vállalkozásokon, kiszűrtem, kiknek nincs
       weboldaluk, és személyesen kerestem meg őket." That outreach is planned,
       not done, so the sentence claimed a case study that does not exist yet. */
    text: 'Saját árazási oldal: azt modellezi, hogyan lehet egy környékbeli vállalkozásnak úgy árat mondani, hogy a végösszeg előre kiszámítható maradjon.',
    tech: ['React', 'TanStack Start'],
    features: [],
    featured: false,
    label: 'Saját projekt',
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
    title: 'WebWise Studio',
    text: 'Ügynökségi koncepció-oldal egyedi React/AI alapú webalkalmazásokra — saját kezdeményezésű prototípus.',
    tech: ['React', 'Supabase', 'Framer Motion'],
    features: [],
    featured: false,
    label: 'Saját projekt',
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
