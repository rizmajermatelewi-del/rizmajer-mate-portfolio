import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

/* Finds Hungarian copy still hardcoded in a component.
   ---------------------------------------------------------------------
   untranslatedIn() can only see data it is handed, so it covers the data
   modules and nothing else. The sections hold the other half of the copy, and
   there a missed string does not throw — it just renders Hungarian on the
   English page, which is exactly the failure /en was withdrawn for, and
   exactly the failure nobody notices without reading every line of 17 files.

   The heuristic is deliberately crude: after removing comments and the
   legitimate `hu:` sides of the { hu, en } fields, any remaining Hungarian
   diacritic is copy that never went through t(). It cannot catch Hungarian
   written without accents ("Projektek", "GYIK"), so it is a floor rather than
   a proof — but it is a floor that holds automatically from here on.

   ALLOWED is for text that is Hungarian by nature and stays Hungarian in both
   languages: a proper noun, or the name of a deliberately untranslated legal
   page. Each entry is a decision, the same way neutral() is. */
const ROOTS = ['src/sections', 'src/pages', 'src/components']

/* Hungarian-only on purpose, and not because nobody got to them. A translated
   ÁSZF is a second binding document that can contradict the real one, and a
   translated adatvédelmi tájékoztató makes the same problem out of a legal
   notice. They have no /en twin, routePaths.js emits no hreflang for them, and
   the English footer links to the Hungarian originals. Scanning them would
   report ninety lines that are all correct. */
const HUNGARIAN_ONLY = ['src/pages/PrivacyPolicy.jsx', 'src/pages/Terms.jsx']

/* The legal-page link labels keep their Hungarian names inside their own `en`
   values, on purpose: /adatvedelem and /aszf are Hungarian-only documents, and
   an English label over a Hungarian text promises a translation that does not
   exist. So these are the one case where Hungarian in an `en` field is right,
   and each is listed rather than the rule being loosened. */
const ALLOWED = [
  /Rizmajer Máté/, // his name, identical in both languages
  /Adatvédelmi tájékoztató/,
  /Adatkezelési tájékoztató/,
  /Adatvédelem/,
  /Általános Szerződési Feltételek/,
  /ÁSZF/,
]

const HUNGARIAN = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/

const stripped = (source) =>
  source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '') // JSX comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
    .replace(/^\s*\/\/.*$/gm, '') // line comments
    /* The Hungarian half of a translated field is the one place Hungarian is
       supposed to appear. Matches hu: '…', hu: "…" and hu: `…`. */
    .replace(/\bhu:\s*'(?:[^'\\]|\\.)*'/g, '')
    .replace(/\bhu:\s*"(?:[^"\\]|\\.)*"/g, '')
    .replace(/\bhu:\s*`(?:[^`\\]|\\.)*`/g, '')

/* Recursive, and that is not a detail. The first version listed each root
   directory one level deep, so src/components/showcases/ — three components
   whose copy was Hungarian from top to bottom — was never opened, and the
   suite passed the whole time. What caught them was the build reading the
   rendered /en page back. A scanner that quietly declines to look somewhere
   is worse than no scanner, because it answers the question anyway. */
function jsxFilesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.posix.join(dir, entry.name)
    return entry.isDirectory() ? jsxFilesIn(rel) : entry.name.endsWith('.jsx') ? [rel] : []
  })
}

function offenders() {
  const found = []
  for (const root of ROOTS) {
    for (const rel of jsxFilesIn(root)) {
      if (HUNGARIAN_ONLY.includes(rel)) continue
      const lines = stripped(readFileSync(path.resolve(process.cwd(), rel), 'utf8')).split('\n')

      lines.forEach((line, i) => {
        if (!HUNGARIAN.test(line)) return
        if (ALLOWED.some((pattern) => pattern.test(line))) return
        found.push(`${rel}:${i + 1}  ${line.trim().slice(0, 90)}`)
      })
    }
  }
  return found
}

describe('components carry no untranslated Hungarian', () => {
  it('routes every string through t() or records it as deliberate', () => {
    const found = offenders()
    expect(found, `\n${found.join('\n')}\n`).toEqual([])
  })

  /* Guards the guard. If the stripping above ever swallowed everything, the
     assertion would pass vacuously against an empty list forever. */
  it('still detects Hungarian when it is there', () => {
    expect(HUNGARIAN.test('Kérj ajánlatot')).toBe(true)
    expect(stripped("const COPY = { hu: 'Árazás', en: 'Pricing' }")).not.toMatch(/Árazás/)
    expect(stripped('<p>Kérj ajánlatot</p>')).toMatch(/Kérj/)
  })

  /* The other half of guarding the guard, and the one that was actually
     missing: the scan can be perfectly correct about the files it reads and
     still be wrong about which files those are. */
  it('descends into subdirectories', () => {
    const files = ROOTS.flatMap((root) => jsxFilesIn(root))

    expect(files).toContain('src/components/showcases/BookingScheduler.jsx')
    expect(files.every((file) => file.endsWith('.jsx'))).toBe(true)
  })
})
