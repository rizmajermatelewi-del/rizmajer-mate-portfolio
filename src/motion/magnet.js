const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* Displacement toward the pointer, damped by strength and hard-capped so a
   fast pointer cannot fling the element across the layout. */
export function magnetOffset(rect, clientX, clientY, strength, cap) {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  return {
    x: clamp((clientX - cx) * strength, -cap, cap),
    y: clamp((clientY - cy) * strength, -cap, cap),
  }
}
