import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'

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
   section, and nothing points at it. */
export const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Projektek', href: '#projektek' },
  { label: 'Folyamat', href: '#folyamat' },
  { label: 'Készségek', href: '#keszsegek' },
  { label: 'AI', href: '#ai' },
  { label: 'GYIK', href: '#gyik' },
  { label: 'Árak', href: '#arak' },
]

/* Displayed exactly as written; the tel: href strips the spaces, so the
   grouping here is a presentation choice and nothing depends on it. The tile
   renders nothing if this is emptied — same convention as TESTIMONIALS. */
export const CONTACT_PHONE = '+36 30 13 14 353'

export const SOCIAL_LINKS = [
  { Icon: GithubIcon, href: 'https://github.com/rizmajermatelewi-del', label: 'GitHub' },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rizmajer-mate/', label: 'LinkedIn' },
]
