/* The browser's own bubble is in the visitor's browser language and, in
   Hungarian, formal ("Töltse ki ezt a mezőt") on a page that says "te"
   everywhere else (critique, 2026-11-10). Same native bubble, our words. */
const VALIDITY = {
  missing: { hu: 'Töltsd ki ezt a mezőt.', en: 'Please fill in this field.' },
  email: { hu: 'Ez nem tűnik e-mail címnek. Nézd meg még egyszer.', en: 'That does not look like an e-mail address. Please check it.' },
}

export function huValidity(e) {
  const lang = document.documentElement.lang === 'hu' ? 'hu' : 'en'
  const v = e.target.validity
  e.target.setCustomValidity(v.valueMissing ? VALIDITY.missing[lang] : v.typeMismatch ? VALIDITY.email[lang] : '')
}

export const clearValidity = (e) => e.target.setCustomValidity('')
