/* The euro figures on the English pages, derived from one rate.
   ---------------------------------------------------------------------
   Every price on this site is quoted and invoiced in forint. The English
   version shows an approximate euro figure beside it because a six-digit
   number in an unnamed currency reads as alarming to someone who does not
   know the forint.

   Hardcoding "(~1 600 EUR)" into each English string would put the same fact
   in nine places, which is precisely how 450 000 Ft survived in the FAQ and
   in the structured data after the price list had moved on. One rate, one
   formatter, nine derived strings.

   THE RATE IS DELIBERATELY NOT THE SPOT RATE.
   On 2026-08-11 the ECB reference rate was 364.45 HUF/EUR (364.68 the next
   day). Across 2026 the pair ran between 349.37 and 394.23, averaging 370.48.
   350 sits just under the low end of that range on purpose, because the two
   directions are not symmetrical:

     - forint weakens (more HUF per EUR) → the shown euro figure is too high
       → an inquiry may not arrive, which costs nothing already earned.
     - forint strengthens (fewer HUF per EUR) → the shown euro figure is too
       low → a client converts it and expects to pay that, and the difference
       comes out of the invoice.

   Pricing off the strong end of the observed range keeps the shown figure at
   or above what the forint price actually converts to, without anyone having
   to watch the exchange rate. It is an approximation presented as one — never
   a quote — and the English pages say so.

   Re-check when the pair leaves the range above. The number to change is on
   the next line and nowhere else. */
export const HUF_PER_EUR = 350
export const HUF_PER_EUR_CHECKED = '2026-08-12'

/* Rounded UP, and in tiers, for two reasons at once.

   Coarse, so the result never looks computed to the euro: "1 571 EUR" reads
   as a quote somebody could hold you to, "~1 600 EUR" reads as the estimate
   it is.

   Upward, because rounding to the nearest step breaks the guarantee the rate
   above exists to give. 180 000 Ft at the strongest 2026 rate is 515 EUR;
   nearest-50 rounding of 514 shows 500, which is under. fx.test.js caught
   exactly that. Ceiling keeps every figure at or above the true conversion
   across the whole observed range, at the cost of reading 6-11% high against
   the spot rate — which is the side of the error that does not come out of
   an invoice. */
function roundEur(value) {
  const step = value < 100 ? 5 : value < 200 ? 10 : value < 500 ? 25 : value < 2000 ? 50 : 100
  return Math.ceil(value / step) * step
}

/* Space-grouped to match the forint figure beside it — "550 000 Ft
   (~1 600 EUR)" — rather than switching separator style mid-sentence. */
const group = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const forint = (huf) => `${group(huf)} Ft`

export function approxEur(huf) {
  return `~${group(roundEur(huf / HUF_PER_EUR))} EUR`
}

/* The English price string for a forint amount: the forint figure, which is
   what actually gets invoiced, with the euro approximation after it. */
export function priceEn(huf) {
  return `${forint(huf)} (${approxEur(huf)})`
}
