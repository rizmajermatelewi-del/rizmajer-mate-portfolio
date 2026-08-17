import { describe, it, expect, vi, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { hidePreloader, dismissPreloader } from './preloader'

const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const indexHtml = read('../index.html')
const indexCss = read('./index.css')
const mainJsx = read('./main.jsx')

/* Returns the `{ ... }` block starting at `from`, matched by counting braces
   rather than by searching for a closing pattern. The first attempt looked for
   the literal "}\n}" and this file has CRLF line endings, so the search missed,
   indexOf returned -1, and the slice quietly ran to the end of the stylesheet —
   swallowing the very rules it was meant to exclude and failing the assertion
   for a reason that had nothing to do with the CSS. */
function braceBlockAt(css, from) {
  const open = css.indexOf('{', from)
  if (open === -1) return ''
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}' && --depth === 0) return css.slice(from, i + 1)
  }
  return css.slice(from)
}

afterEach(() => {
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('preloader element', () => {
  it('is declared outside #root, so React cannot destroy it on re-render', () => {
    /* main.jsx uses createRoot, which empties #root and rebuilds it. A cover
       inside that subtree would be wiped by the very render it exists to
       hide. */
    const bodyStart = indexHtml.indexOf('<body>')
    const preloaderAt = indexHtml.indexOf('id="preloader"')
    const rootAt = indexHtml.indexOf('<div id="root">')

    expect(preloaderAt, 'index.html no longer declares #preloader').toBeGreaterThan(bodyStart)
    expect(preloaderAt, '#preloader must come before #root, not inside it').toBeLessThan(rootAt)
  })

  /* prerender.mjs throws unless it finds this exact string to substitute the
     rendered app into. Adding markup around it is fine; reformatting it is
     not, and the failure would be at build time on every route at once. */
  it('leaves the empty #root div prerender.mjs substitutes into', () => {
    expect(indexHtml).toContain('<div id="root"></div>')
  })

  it('is hidden from assistive technology and carries no text', () => {
    const el = indexHtml.match(/<div id="preloader"[^>]*>([\s\S]*?)<\/div>/)
    expect(el, '#preloader is not a single self-contained div any more').toBeTruthy()
    expect(el[0]).toContain('aria-hidden="true"')

    /* Text here would be copy, and copy has to be translated. prerender.mjs
       scans the finished /en page for Hungarian diacritics and fails the build
       on a hit, so a Hungarian word in this element breaks every English
       route — a failure whose message would point at the page, not at here. */
    expect(el[1].replace(/<[^>]*>/g, '').trim()).toBe('')
  })
})

describe('the CSS failsafe', () => {
  /* The cover is removed by JavaScript. This is what clears it when that
     JavaScript never arrives — a 404 on the bundle, a module that throws on
     import, a reader with scripting off. Without it the site is not slow, it
     is a dark rectangle nobody can get past. */
  const block = indexCss.slice(indexCss.indexOf('#preloader {'), indexCss.indexOf('#preloader.is-done'))

  it('gives #preloader a self-clearing animation', () => {
    expect(block, 'index.css no longer styles #preloader').toContain('animation:')
    expect(block).toMatch(/animation:\s*preloader-failsafe/)
    expect(indexCss).toContain('@keyframes preloader-failsafe')
  })

  it('clears within a few seconds rather than eventually', () => {
    const delay = block.match(/animation:\s*preloader-failsafe\s+[\d.]+m?s\s+[a-z-]+\s+([\d.]+)s/)
    expect(delay, 'the failsafe delay is no longer readable from the shorthand').toBeTruthy()
    expect(Number(delay[1])).toBeLessThanOrEqual(6)
  })

  /* The reduced-motion block uses `!important` on animation-duration and
     iteration-count, which is correct and deliberately does NOT touch
     animation-delay — that is the only reason the failsafe still fires for a
     reader with the OS setting on. Adding `animation: none !important` or an
     animation-delay override there would silently strip the safety net from
     exactly the visitors least able to work around it. */
  it('is not neutralised by the global reduced-motion override', () => {
    const start = indexCss.indexOf('@media (prefers-reduced-motion: reduce)')
    const reduced = braceBlockAt(indexCss, start)

    expect(start, 'the reduced-motion block is gone').toBeGreaterThan(-1)
    expect(reduced, 'an animation shorthand here would cancel the failsafe').not.toMatch(/\banimation\s*:/)
    expect(reduced, 'overriding animation-delay would cancel the failsafe').not.toContain('animation-delay')
  })
})

describe('dismissal', () => {
  /* The failsafe is a net, not the mechanism. If main.jsx stopped calling
     this, nothing would look broken — every visitor would simply stare at the
     cover for the full failsafe delay before the page appeared. That is the
     fake loading delay this feature was specifically built not to have, and
     it would ship silently. */
  it('is actually wired up in main.jsx', () => {
    expect(mainJsx).toMatch(/from '\.\/preloader'/)
    expect(mainJsx).toMatch(/^dismissPreloader\(\)/m)
  })

  it('fades the element out and then removes it', () => {
    vi.useFakeTimers()
    const el = document.createElement('div')
    el.id = 'preloader'
    document.body.append(el)

    hidePreloader(el)
    expect(el.classList.contains('is-done'), 'the fade class is not applied').toBe(true)
    expect(el.isConnected, 'removed before the fade could run').toBe(true)

    vi.advanceTimersByTime(600)
    expect(el.isConnected, 'the element was left in the tree').toBe(false)
  })

  it('does nothing when there is no cover to clear', async () => {
    await expect(dismissPreloader(document)).resolves.toBe(false)
  })

  it('clears a cover that is present', async () => {
    const el = document.createElement('div')
    el.id = 'preloader'
    document.body.append(el)

    await expect(dismissPreloader(document, 0)).resolves.toBe(true)
    expect(el.classList.contains('is-done')).toBe(true)
  })

  /* The floor Máté asked for: a page that is ready immediately still holds the
     cover long enough to be read. Asserted against elapsed wall time rather
     than against the constant, so a change that keeps the number and drops the
     wait — awaiting the wrong thing, or dropping the await — still fails. */
  it('holds the cover for the minimum even when the page is ready at once', async () => {
    const el = document.createElement('div')
    el.id = 'preloader'
    document.body.append(el)

    const started = Date.now()
    await dismissPreloader(document, 150 + performance.now())
    expect(Date.now() - started).toBeGreaterThanOrEqual(120)
  })

  /* The other half: the floor is a floor, not an addition. A slow page has
     already outlasted it by the time the bundle runs, and must not be made to
     wait again on top of its own load. */
  it('adds nothing once the cover has already outlasted the minimum', async () => {
    const el = document.createElement('div')
    el.id = 'preloader'
    document.body.append(el)

    const started = Date.now()
    await dismissPreloader(document, 1)
    expect(Date.now() - started).toBeLessThan(100)
  })
})
