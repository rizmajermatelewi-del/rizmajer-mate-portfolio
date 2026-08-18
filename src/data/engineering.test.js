import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ENGINEERING_APPROACH, STACK_GROUPS, STACK_LEGEND, SITE_DECISIONS } from './engineering'
import { untranslatedIn, t } from '../i18n/t'

const here = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(here, '..')
const repoRoot = path.resolve(here, '..', '..')

const WHERE_VALUES = ['here', 'projects']

describe('ENGINEERING_APPROACH', () => {
  it('is fully translated', () => {
    expect(untranslatedIn(ENGINEERING_APPROACH)).toEqual([])
  })

  it('gives every area an id, a position and at least two specifics', () => {
    const ids = ENGINEERING_APPROACH.map((area) => area.id)
    expect(new Set(ids).size, `duplicate area id in ${ids.join(', ')}`).toBe(ids.length)

    for (const area of ENGINEERING_APPROACH) {
      expect(area.id, 'every area needs an id').toBeTruthy()
      expect(t(area.body).length, `${area.id} body is too short to be a position`).toBeGreaterThan(60)
      expect(
        area.points.length,
        `${area.id} states a position with nothing under it`,
      ).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('STACK_GROUPS', () => {
  it('is fully translated', () => {
    expect(untranslatedIn(STACK_GROUPS)).toEqual([])
    expect(untranslatedIn(STACK_LEGEND)).toEqual([])
  })

  /* The honesty of the whole block rests on this field. 'here' means a reader
     can open the repository and check; 'projects' means they cannot, and are
     being asked to take it on trust. A third value, or a typo, silently
     collapses the two into one undifferentiated list — which is the badge
     wall this replaced. */
  it('marks every tool as either checkable here or claimed from other work', () => {
    for (const group of STACK_GROUPS) {
      for (const item of group.items) {
        expect(WHERE_VALUES, `${t(item.name)} in ${group.id} has where="${item.where}"`).toContain(
          item.where,
        )
      }
    }
  })

  it('has a legend entry for every bucket in use', () => {
    const used = new Set(STACK_GROUPS.flatMap((g) => g.items.map((i) => i.where)))
    for (const where of used) {
      expect(STACK_LEGEND, `no legend text for "${where}"`).toHaveProperty(where)
    }
  })

  it('never lists the same tool in two groups', () => {
    const names = STACK_GROUPS.flatMap((g) => g.items.map((i) => t(i.name)))
    expect(new Set(names).size, `duplicate entry in ${names.join(', ')}`).toBe(names.length)
  })

  /* Guards the instruction directly rather than the symptom. A percentage, a
     five-star rating and a 0-10 score are the same claim — that competence was
     measured — and none of it was. Worth a test rather than a comment because
     this is exactly the field somebody adds back later because a template they
     were looking at had one. */
  it('carries no numeric skill level anywhere', () => {
    expect(JSON.stringify(STACK_GROUPS), 'a percentage reached the stack data').not.toMatch(/\d\s*%/)

    for (const group of STACK_GROUPS) {
      for (const item of group.items) {
        for (const banned of ['level', 'score', 'rating', 'percent', 'proficiency']) {
          expect(item, `${t(item.name)} gained a "${banned}" field`).not.toHaveProperty(banned)
        }
      }
    }
  })

  /* The one number in this module that can rot. It is the strongest single
     piece of evidence on the page, so it stays — but it stays checked, which
     is the rule the rest of this repository already follows for a fact that
     appears in more than one place. Adding a test file now fails here until
     the note is updated, and that failure is the reminder. */
  it('states a test count that matches the suite actually in the repository', () => {
    let files = 0
    let cases = 0

    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (entry.name.endsWith('.test.js')) {
          files += 1
          cases += (readFileSync(full, 'utf8').match(/(^|[^.\w])it\s*\(/g) ?? []).length
        }
      }
    }
    walk(srcDir)

    const note = STACK_GROUPS.find((g) => g.id === 'quality')?.items.find(
      (item) => t(item.name) === 'Vitest',
    )?.note

    expect(note, 'the Vitest entry lost its note').toBeTruthy()
    expect(t(note, 'hu')).toBe(`${cases} teszt, ${files} fájlban`)
    expect(t(note, 'en')).toBe(`${cases} tests across ${files} files`)
  })
})

describe('SITE_DECISIONS', () => {
  it('is fully translated', () => {
    expect(untranslatedIn(SITE_DECISIONS)).toEqual([])
  })

  it('gives every decision a unique id', () => {
    const ids = SITE_DECISIONS.map((d) => d.id)
    expect(new Set(ids).size, `duplicate id in ${ids.join(', ')}`).toBe(ids.length)
  })

  /* What turns the case study from a list of claims into something a reader
     can check. Each entry names the file its decision lives in, and the page
     prints that path — so a path that stops resolving publishes an invitation
     to go and look at something that is not there. Renaming a script is
     exactly when that happens, and exactly when nobody thinks to re-read the
     profile page. */
  it('names a source file that still exists for every decision', () => {
    for (const decision of SITE_DECISIONS) {
      expect(decision.source, `${decision.id} has no source path`).toBeTruthy()
      expect(
        existsSync(path.join(repoRoot, decision.source)),
        `${decision.id} points at ${decision.source}, which is not in the repository`,
      ).toBe(true)
    }
  })

  it('explains each decision rather than only naming it', () => {
    for (const decision of SITE_DECISIONS) {
      expect(
        t(decision.why).length,
        `${decision.id} states a decision without a reason long enough to be one`,
      ).toBeGreaterThan(80)
    }
  })
})
