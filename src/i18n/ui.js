/* The handful of strings that appear in more than one component.
   ---------------------------------------------------------------------
   "Kérj ajánlatot" was written out at nine separate sites: the navbar twice,
   the hero, the footer, the pricing cards, and four linkLabel values in
   pricing.js. Two comments in this repo already say those have to read
   identically — nav.js on why there is no separate Kapcsolat link, and
   Pricing.jsx on why the button does not say "Ajánlatkérés" — and both were
   enforced by nothing but the comment.

   Nine copies was survivable with one language. At eighteen it stops being:
   the failure is not that somebody rewords all of them, it is that somebody
   rewords one, and the page then offers what reads as two destinations for
   the same action.

   Only genuinely shared strings belong here. Copy that appears once lives in
   its own component's COPY block, next to the markup it belongs to — a
   central bag holding every string on the site would be worse than the
   problem it solved.

   Free of JSX and of any React import: pricing.js imports this, and
   scripts/knowledge.mjs reads pricing.js in plain Node. */
export const UI = {
  /* The primary call to action, everywhere it appears. */
  ctaQuote: { hu: 'Kérj ajánlatot', en: 'Ask for a quote' },

  /* The back link on /fejleszto, /adatvedelem and /aszf. The two legal pages
     stay Hungarian-only, so only /fejleszto ever resolves the English side —
     but the field is shared because the label is the same decision. */
  backToHome: { hu: 'Vissza a főoldalra', en: 'Back to the home page' },

  /* On a project's live-site link. */
  openLink: { hu: 'Megnyitom', en: 'Open it' },
}
