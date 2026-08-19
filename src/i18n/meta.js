/* The home page's own title and description, in both languages.
   ---------------------------------------------------------------------
   Every other route gets these lifted from its rendered <h1> and opening
   paragraph, which is right for a subpage: the heading is the subject, and no
   new copy has to be invented or kept in step. The home page is the exception
   in both directions. Its <h1> is a slogan rather than a subject — "A website
   and a system that works, so you do not have to." is a good line and a poor
   search result — and it is the page an English visitor actually arrives on,
   through the one channel where the title is the whole of what they see
   before deciding.

   So the home meta is written, not derived. Written once, here, for both
   languages: index.html carries the Hungarian pair too, because the dev
   server and the un-prerendered template need something in the <head>, and
   prerender.mjs asserts the two agree. That assertion is the point of putting
   this in a module at all — this repo has already shipped a stale hand-written
   copy of its FAQ answers in index.html while every test stayed green, and a
   second copy of a page title is the same shape of bug with the same silence
   around it.

   Free of JSX and of any React import: scripts/prerender.mjs reads this in
   plain Node, the way it already reads locales.js and t.js. */
import { neutral } from './t.js'

/* Repositioned on 2026-08-17. All three fields led with "full-stack fejlesztő.
   React, Node.js és modern web-technológiák", which optimised for the one
   search this business does not want: a recruiter or an agency looking for a
   React developer. The buyer is an SME owner searching for the thing they need
   built, and they do not know or care what it is built with.

   The job title is not gone — it stays in the JSON-LD Person node below, which
   is where a machine looks for it. It is out of the title tag, which is where
   a human decides in one line whether this page is for them. */
export const HOME_META = {
  /* 63 characters. Google truncates a title around 60, so the name sits after
     the pipe: if anything is cut it should be the part a reader can already
     see in the URL and the result's site name, not the part that says what is
     sold. */
  title: {
    hu: 'Rizmajer Máté Levente — weboldalak és üzleti rendszerek KKV-knak',
    en: 'Rizmajer Máté Levente — websites and business systems for SMEs',
  },

  /* The <meta name="description"> — what a search result shows under the
     title. Names the four things actually built and the problem they remove,
     because that is the question a reader is answering at that moment. Under
     170 characters so it is not truncated mid-clause. */
  description: {
    hu: 'Egyedi weboldalak, időpontfoglaló, rendelési és belső rendszerek magyar vállalkozásoknak. Kevesebb kézi adminisztráció, átlátható fejlesztés, előre egyeztetett ár.',
    en: 'Custom websites, booking, ordering and internal systems for Hungarian businesses. Less admin done by hand, development you can follow, and a price agreed up front.',
  },

  /* og: and twitter: descriptions, i.e. the link preview in a chat window
     rather than a search result. Deliberately a different sentence from the
     one above: a preview card is read by someone a colleague has just sent the
     link to, who needs the pitch rather than the keywords — so this one is the
     hero's positioning line, which is the shortest true version of it. */
  social: {
    hu: 'Weboldalak, foglalási, rendelési és belső rendszerek kis- és középvállalkozásoknak — kevesebb kézi adminisztrációval.',
    en: 'Websites, booking, ordering and internal systems for small and medium businesses — with less done by hand.',
  },

  /* The alt text on the link-preview image, which index.html carries twice —
     once as og:image:alt and once as twitter:image:alt, with a comment saying
     the two must stay identical and nothing making them. Written here once
     and applied to both, on every route: the card image is the same picture
     everywhere, so its description does not vary by page, only by language. */
  imageAlt: {
    hu: 'Rizmajer Máté Levente — full-stack fejlesztő portfólió',
    en: 'Rizmajer Máté Levente — full-stack developer portfolio',
  },
}

/* Written metadata for subpages that need it, keyed by locale-free route.
   ---------------------------------------------------------------------
   Every route outside this map still derives its title from its own <h1> and
   its description from its opening paragraph, which is the right default for
   a subpage: the heading is the subject, and no copy has to be invented or
   kept in step. /fejleszto is where that default broke, in both directions at
   once.

   Its <h1> is a name, so both language versions published the identical title
   "Rizmajer Máté Levente" — two URLs, two languages, one title, which tells a
   search engine very little and tells it twice. And the first <p> on the page
   is the role line, so the description read "Full-stack fejlesztő — React és
   Node.js": a fragment rather than a sentence, and the whole of what a
   recruiter would see under the result.

   Both fields are therefore written here, per language, rather than derived.
   Not keyword-stuffed: each is one natural sentence saying who the page is
   about and what is on it. The English is written as English rather than
   translated across, for the same reason the rest of the site's English is.

   Add a route here only when derivation genuinely fails for it. /adatvedelem
   and /aszf both carry a descriptive <h1> and a real opening paragraph, so
   they derive correctly, and listing them would only create a second copy
   waiting to drift. */
export const PAGE_META = {
  '/fejleszto': {
    /* 44 characters, so nothing is truncated. Role first, name second: a
       recruiter searching finds the role, and the name is what confirms the
       result once they have. The home page's title leads with what is sold
       instead, because its reader is buying rather than hiring. */
    title: {
      hu: 'Full-stack fejlesztő — Rizmajer Máté Levente',
      en: 'Full-stack developer — Rizmajer Máté Levente',
    },
    description: {
      hu: 'React és Node.js alapú webalkalmazások: mérnöki döntések, tesztelt kód és élesítési szemlélet. Az oldal a saját forrásából mutatja meg, hogyan épült.',
      en: 'Full-stack web applications in React and Node.js: how the decisions get made, how quality is enforced, and how this site itself was built and shipped.',
    },
  },
}

/* What <meta property="og:locale"> expects: language_TERRITORY, not a bare
   language code. index.html hardcodes hu_HU, which would otherwise be copied
   onto the English pages verbatim — the same mistake as the lang attribute,
   and invisible to the Hungarian-leak scan because "hu_HU" carries no
   diacritics.

   en_GB rather than en_US: the copy is written in British spelling, and the
   nearer market for someone working out of Hungary is Europe. */
/* dist/404.html. Kept out of PAGE_META deliberately: that map is keyed by
   route and guarded against keys that are not routes, and /404 is not a route
   — it is the file Vercel falls back to when nothing matched. The page also
   carries noindex and no canonical, which no real route does. */
export const NOT_FOUND_META = {
  title: { hu: 'Ez az oldal nincs meg', en: 'This page does not exist' },
  description: {
    hu: 'A keresett oldal nem található. Vissza a főoldalra vagy a fejlesztői profilhoz.',
    en: 'The page you asked for is not here. Head back to the home page or the developer profile.',
  },
}

/* Breadcrumb labels. Short on purpose and separate from PAGE_META: a
   breadcrumb replaces the URL line in a search result, so it wants the name of
   the page rather than its title. /fejleszto's title is a role plus a person
   and its h1 is a name; neither is what belongs in a trail.

   Both languages on every entry even though two of these routes are Hungarian
   only, because untranslatedIn() walks this structure and a one-sided field is
   the shape it exists to catch. */
export const CRUMB_HOME = { hu: 'Kezdőlap', en: 'Home' }

export const PAGE_CRUMB = {
  '/fejleszto': { hu: 'Fejlesztői profil', en: 'Developer profile' },
  '/adatvedelem': { hu: 'Adatvédelmi tájékoztató', en: 'Privacy notice' },
  '/aszf': { hu: 'Általános szerződési feltételek', en: 'Terms and conditions' },
}

export const OG_LOCALE = { hu: 'hu_HU', en: 'en_GB' }

/* The parts of the JSON-LD graph that are prose rather than identifiers.
   ---------------------------------------------------------------------
   index.html writes the graph once, in Hungarian, and prerender.mjs copies it
   onto every page. On /en that shipped a Person whose jobTitle read
   "Full-stack fejlesztő" and who knowsAbout "Időpontfoglaló rendszerek" —
   Hungarian facts attached to an English page, declaring inLanguage hu-HU
   while <html lang> said en. Structured data is the copy a search engine
   reproduces rather than reads past, so it is the worst place on the page for
   this, and it is the third time in one week this repo has been caught with a
   second copy of something inside that same <script> tag.

   Everything else in the graph stays where it is: an e-mail address, a
   telephone number, a URL and a country code are identifiers, not copy, and
   moving them here would buy nothing. Only the fields a reader would notice
   were in the wrong language are listed. WebSite.name is not here either —
   it is HOME_META.title, and prerender takes it from there. */
export const SCHEMA = {
  jobTitle: { hu: 'Full-stack fejlesztő', en: 'Full-stack developer' },

  /* schema.org wants the language as an IETF tag with a region, which is a
     different spelling of the same fact as OG_LOCALE — hyphen rather than
     underscore. Two formats, one decision, so if the site ever serves en_US
     both change together. */
  inLanguage: { hu: 'hu-HU', en: 'en-GB' },

  /* The one country name in the structured data, and it has to be a pair.
     index.html writes the Hungarian side because it is the Hungarian
     template, and the prerender's leak scan reads the whole finished page —
     JSON-LD included — so a hardcoded "Magyarorszag" with its real diacritics
     would fail the build on /en, correctly. */
  areaServed: { hu: 'Magyarország', en: 'Hungary' },

  knowsAbout: [
    { hu: 'Webfejlesztés', en: 'Web development' },
    neutral('React'),
    neutral('Node.js'),
    { hu: 'Időpontfoglaló rendszerek', en: 'Appointment booking systems' },
    { hu: 'Online rendelési rendszerek', en: 'Online ordering systems' },
    { hu: 'Egyedi ügyviteli rendszerek', en: 'Custom business systems' },
  ],
}
