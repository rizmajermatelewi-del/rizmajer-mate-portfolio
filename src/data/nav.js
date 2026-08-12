import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { neutral } from '../i18n/t.js'

/* Order matches the order the sections appear in App.jsx, so clicking down the
   list always scrolls down the page. GYIK used to sit last, left over from when
   the FAQ rendered below the contact form; App.jsx now places it before Árak on
   purpose (objections, then price, then the form) and this list had not
   followed. Clicking GYIK sent you back up past two sections you had already
   scrolled past.

   If a section moves in App.jsx, move it here too — nav.test.js derives the
   page order from App.jsx and fails if this list disagrees with it.

   No Kapcsolat entry: the "Kérj ajánlatot" button points at #kapcsolat and
   sits a few pixels away in both the desktop bar and the mobile sheet, so the
   text link was the same destination twice. Dropping it leaves the call to
   action as the only thing in the navbar pointing at the form.

   Folyamat is here because the footer already linked to it while the navbar
   did not, which is the same list-disagrees-with-list problem in a different
   place. #filozofia is still deliberately unlinked — Features is a supporting
   section, and nothing points at it.

   The anchors stay Hungarian on both language versions. Each section owns its
   own id and nav.test.js derives the page order by reading those ids out of
   the section files; a second, English set would mean every section carrying
   two ids and that derivation having to choose between them. An anchor is not
   copy — nobody reads #rolam — so the cost would buy a reader nothing. */
export const NAV_LINKS = [
  { label: { hu: 'Rólam', en: 'About' }, href: '#rolam' },
  { label: { hu: 'Projektek', en: 'Projects' }, href: '#projektek' },
  { label: { hu: 'Folyamat', en: 'Process' }, href: '#folyamat' },
  { label: { hu: 'Készségek', en: 'Skills' }, href: '#keszsegek' },
  { label: neutral('AI'), href: '#ai' },
  { label: { hu: 'GYIK', en: 'FAQ' }, href: '#gyik' },
  { label: { hu: 'Árak', en: 'Pricing' }, href: '#arak' },
]

/* Re-exported so the sections that already import it from here keep working.
   It now lives in contact.js, which imports nothing: this module pulls in
   BrandIcons for the social links, and a build script running under plain
   Node cannot follow an extensionless .jsx import. The tile still renders
   nothing if the string is emptied — same convention as TESTIMONIALS. */
export { CONTACT_PHONE } from './contact.js'

/* The labels are `neutral` rather than `{ hu, en }`: they are the products'
   own names, identical in both languages, and they are used as React keys and
   as aria-labels. Marking that deliberately is the point of neutral() — an
   untranslated-looking string here would otherwise be indistinguishable from
   one nobody got round to. */
export const SOCIAL_LINKS = [
  { Icon: GithubIcon, href: 'https://github.com/rizmajermatelewi-del', label: neutral('GitHub') },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rizmajer-mate/', label: neutral('LinkedIn') },
]
