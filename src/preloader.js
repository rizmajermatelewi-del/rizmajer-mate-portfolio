/* Clears the loading cover declared in index.html.
   ---------------------------------------------------------------------
   The cover exists because main.jsx uses createRoot rather than hydrateRoot:
   the prerendered markup is thrown away and re-rendered when the bundle
   arrives, and GSAP then pulls the hero lines back to opacity 0 to animate
   them in. Between the first paint and that moment the page visibly rebuilds
   itself. The note in index.html covers why the cover cannot be a React
   component — it has to exist before React does.

   It first shipped with no minimum at all: it waited on two real events and
   left, so on a fast connection it was gone within a frame or two. Máté asked
   for it to hold long enough to be read — "nyugodtan legyen több idő, tisztán
   szépen lehessen látni" — so there is now a floor, and that floor is a real
   delay in front of a page that is already finished. Worth being straight
   about, because this site sells page speed and a Lighthouse run will count
   it. It is a brand moment paid for in milliseconds, not a loading state.

   The ceiling is still honest: nothing waits past the point where the page is
   ready AND the floor has passed. A slow connection adds nothing on top of
   its own load — by the time the bundle has arrived the floor is long gone. */

/* One full sweep of the .preloader-mark sheen is 1.8s, so this is the shortest
   floor that lets the highlight travel the mark once end to end rather than
   being cut off partway. Measured from navigation start, not from the moment
   this module runs, because the cover has been on screen since the browser's
   first paint — starting the clock here would hold it for 2s on top of
   however long the bundle already took.

   Deliberately well under the 4s CSS failsafe in index.css: if this ever
   exceeded that, the failsafe would clear the cover mid-wait and the two
   mechanisms would be fighting over the same element. */
const MIN_VISIBLE_MS = 2000

/* Long enough for the 400ms fade in index.css to finish, short enough that a
   stuck node is not left in the tree. Kept a touch above the transition so a
   slow frame cannot clip the end of it. */
const REMOVE_AFTER_MS = 500

/* Two frames, not one. The first fires before the commit React has queued has
   been painted; the second is the earliest point at which what the visitor
   sees matches what React rendered. Uncovering on the first frame reveals the
   half-built state the cover exists to hide. */
function painted() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
}

/* The hero photograph is the LCP element and the largest thing on the first
   screen; uncovering before it has decoded trades one flash for another. The
   selector is the class Hero.jsx puts on the img.

   Absent on /adatvedelem, /aszf and /fejleszto, which have no hero — those
   resolve immediately rather than waiting for something that will never
   appear. decode() rejects on a broken image, and a broken image is not a
   reason to sit behind a cover, so the rejection resolves too. */
function heroDecoded(doc) {
  const hero = doc.querySelector('.hero-backdrop')
  if (!hero || typeof hero.decode !== 'function') return Promise.resolve()
  return hero.decode().catch(() => {})
}

/* Split out so the removal can be exercised without a real paint or a real
   image decode. Adding the class rather than removing the node outright is
   what makes it a fade; the node goes a beat later. */
export function hidePreloader(el) {
  el.classList.add('is-done')
  setTimeout(() => el.remove(), REMOVE_AFTER_MS)
}

/* How long the cover has already been on screen. performance.now() is
   milliseconds since navigation start, which is close enough to the first
   paint for this purpose and needs no bookkeeping of its own. Guarded because
   a bare Node context has no performance object, and this module is imported
   by tests that run there. */
const shownFor = () => (typeof performance === 'object' ? performance.now() : 0)

/* Returns false when there is nothing to clear, which is the normal state in
   any environment that did not serve index.html — the SSR render, and the
   tests.

   `minVisibleMs` is a parameter rather than a constant read inside, so the
   tests can drive both branches without sitting through a real two-second
   wait. */
export async function dismissPreloader(doc = document, minVisibleMs = MIN_VISIBLE_MS) {
  const el = doc.getElementById('preloader')
  if (!el) return false

  await painted()
  await heroDecoded(doc)

  /* Only ever pads a page that got ready early. On anything slow this is
     already negative and nothing is added. */
  const remaining = minVisibleMs - shownFor()
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining))

  hidePreloader(el)
  return true
}
