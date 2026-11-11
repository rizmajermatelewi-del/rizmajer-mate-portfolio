/* Copy marks its one key phrase as ==phrase==; this renders it in the accent
   (2026-11-11, Máté: colour in the text, titles stay one colour). Kept to one
   phrase per paragraph so it reads as emphasis, not decoration. */
export default function Hl({ text }) {
  return text.split(/==(.+?)==/).map((part, i) =>
    i % 2 ? <strong key={i} className="font-semibold text-primary-dark">{part}</strong> : part,
  )
}
