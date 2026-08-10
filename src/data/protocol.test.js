import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { PROTOCOL_STEPS } from './protocol'

/* The images deliberately stay in Protocol.jsx: they are Vite asset imports,
   which resolve to hashed URLs at build time and mean nothing to a Node script
   or to the chatbot. Only the text moves. */
const protocolSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Protocol.jsx'), 'utf8')

describe('Protocol steps data', () => {
  it('carries three numbered steps with text', () => {
    expect(PROTOCOL_STEPS.length).toBe(3)
    expect(PROTOCOL_STEPS.map((s) => s.num)).toEqual(['01', '02', '03'])
    for (const step of PROTOCOL_STEPS) {
      expect(step.title.trim().length).toBeGreaterThan(0)
      expect(step.tagline.trim().length).toBeGreaterThan(0)
      expect(step.text.trim().length).toBeGreaterThan(20)
    }
  })

  it('holds no image fields — those belong to the component', () => {
    for (const step of PROTOCOL_STEPS) {
      expect(step).not.toHaveProperty('image')
      expect(step).not.toHaveProperty('imageAlt')
    }
  })

  it('leaves no second copy of the step text inside the component', () => {
    expect(protocolSource).toContain("from '../data/protocol'")
    expect(protocolSource, 'Protocol.jsx still declares its own steps array').not.toMatch(/const steps\s*=\s*\[/)
  })
})
