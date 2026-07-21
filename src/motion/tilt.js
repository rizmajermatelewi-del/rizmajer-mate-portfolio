const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* Maps a pointer position inside a rect to card rotation and sheen
   position. Pure, so it can be tested without a DOM. */
export function tiltFromPointer(rect, clientX, clientY, maxDeg) {
  const nx = clamp((clientX - rect.left) / rect.width, 0, 1)
  const ny = clamp((clientY - rect.top) / rect.height, 0, 1)

  return {
    rotateY: (nx - 0.5) * 2 * maxDeg,
    rotateX: (0.5 - ny) * 2 * maxDeg,
    px: nx * 100,
    py: ny * 100,
  }
}
