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
    hu: 'Egyedi weboldalak és üzleti rendszerek KKV-knak | Rizmajer Máté',
    en: 'Custom websites and business systems for SMEs | Rizmajer Máté',
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
    hu: 'Rizmajer Máté — full-stack fejlesztő portfólió',
    en: 'Rizmajer Máté — full-stack developer portfolio',
  },
}

/* What <meta property="og:locale"> expects: language_TERRITORY, not a bare
   language code. index.html hardcodes hu_HU, which would otherwise be copied
   onto the English pages verbatim — the same mistake as the lang attribute,
   and invisible to the Hungarian-leak scan because "hu_HU" carries no
   diacritics.

   en_GB rather than en_US: the copy is written in British spelling, and the
   nearer market for someone working out of Hungary is Europe. */
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

  knowsAbout: [
    { hu: 'Webfejlesztés', en: 'Web development' },
    neutral('React'),
    neutral('Node.js'),
    { hu: 'Időpontfoglaló rendszerek', en: 'Appointment booking systems' },
    { hu: 'Online rendelési rendszerek', en: 'Online ordering systems' },
    { hu: 'Egyedi ügyviteli rendszerek', en: 'Custom business systems' },
  ],
}
