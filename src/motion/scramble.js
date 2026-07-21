const GLYPHS = '!<>-_\\/[]{}—=+*^?#'

/* One frame of a decode reveal. Characters resolve left to right as
   progress runs 0 -> 1. Output length always equals target length and
   whitespace is never scrambled, so the line cannot reflow mid-animation. */
export function scrambleFrame(target, progress, seed = 1) {
  const resolved = Math.floor(target.length * progress)

  return [...target]
    .map((char, i) => {
      if (char === ' ' || i < resolved) return char
      const n = (i * 31 + seed * 17 + Math.floor(progress * 100)) % GLYPHS.length
      return GLYPHS[n]
    })
    .join('')
}
