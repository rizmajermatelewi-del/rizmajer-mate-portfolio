import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'

/* Order matches the order the sections appear in App.jsx, so clicking down the
   list always scrolls down the page. GYIK used to sit last, left over from when
   the FAQ rendered below the contact form; App.jsx now places it before Árak on
   purpose (objections, then price, then the form) and this list had not
   followed. Clicking GYIK sent you back up past two sections you had already
   scrolled past.

   If a section moves in App.jsx, move it here too. */
export const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Projektek', href: '#projektek' },
  { label: 'Készségek', href: '#keszsegek' },
  { label: 'AI', href: '#ai' },
  { label: 'GYIK', href: '#gyik' },
  { label: 'Árak', href: '#arak' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

export const SOCIAL_LINKS = [
  { Icon: GithubIcon, href: 'https://github.com/rizmajermatelewi-del', label: 'GitHub' },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rizmajer-mate/', label: 'LinkedIn' },
]
