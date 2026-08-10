import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { buildKnowledge } from '../../scripts/knowledge.mjs'

/* Runs the writer for real rather than trusting that it was wired up. The
   failure this catches is the file never reaching dist/: Vite copies public/
   at the START of `vite build`, so a generator that runs afterwards produces
   a file that exists locally and 404s in production. */
const root = process.cwd()
const outPath = path.join(root, 'public/knowledge.json')

describe('knowledge.json output', () => {
  it('is written by the generator script', () => {
    execFileSync('node', ['scripts/generate-knowledge.mjs'], { cwd: root })
    expect(existsSync(outPath)).toBe(true)
    const parsed = JSON.parse(readFileSync(outPath, 'utf8'))
    expect(parsed.pricing.tiers.length).toBe(buildKnowledge().pricing.tiers.length)
    expect(parsed.pricing.smallOffers.length).toBe(buildKnowledge().pricing.smallOffers.length)
    expect(parsed.contact.email).toBe('rizmajermatelewi@gmail.com')
  })

  it('is generated before vite copies public/', () => {
    const build = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).scripts.build
    const genAt = build.indexOf('generate-knowledge.mjs')
    const viteAt = build.indexOf('vite build')
    expect(genAt, 'generate-knowledge.mjs is not in the build script').toBeGreaterThan(-1)
    expect(genAt, 'the generator must run before `vite build` copies public/').toBeLessThan(viteAt)
  })

  it('is not tracked in git — it is a build artifact', () => {
    const ignore = readFileSync(path.join(root, '.gitignore'), 'utf8')
    expect(ignore).toContain('public/knowledge.json')
  })
})
