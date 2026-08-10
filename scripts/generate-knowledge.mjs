import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { buildKnowledge } from './knowledge.mjs'

/* Writes the knowledge file into public/, which Vite copies verbatim into
   dist/. Ordering matters: that copy happens at the START of `vite build`,
   so this script runs before it, not after — see package.json. */
const out = path.resolve(process.cwd(), 'public/knowledge.json')
const knowledge = buildKnowledge()

if (!knowledge.pricing.tiers.length) {
  throw new Error('knowledge.json would ship with no price tiers — refusing to write it')
}

mkdirSync(path.dirname(out), { recursive: true })
writeFileSync(out, `${JSON.stringify(knowledge, null, 2)}\n`, 'utf8')
console.log(
  `knowledge.json: ${knowledge.pricing.tiers.length} tiers, ${knowledge.pricing.smallOffers.length} small offers, ${knowledge.faq.length} FAQ, ${knowledge.aiServices.length} AI services`,
)
