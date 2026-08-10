/* The RML brush monogram, extracted from the supplied MONO (White) brand
   sheet: the sheet's luminance became the alpha channel, so the artwork is
   flat white with clean antialiased edges and composites onto any surface.
   `invert` flips it to black for light surfaces — the same pair the sheet
   ships as MONO (White) and BLACK (Mono), so no second file is needed. */
import logoRml from '../assets/logo-rml.png'

/* `alt` defaults to empty because most uses are decorative — the mark sits
   inside a link that already carries the brand as its accessible name. The
   footer is the exception: nothing there names the business in text, so it
   passes a real alt and the mark becomes the brand's only readable mention. */
export function LogoMark({ className = 'h-8 w-auto', inverted = false, alt = '' }) {
  return (
    /* The span exists to host the sheen: `.logo-sheen::after` needs a
       positioned box the size of the mark, and it needs the image as a CSS
       mask. Handing it down as a custom property keeps the hashed asset URL
       in JS, where Vite rewrites it, instead of hardcoding a path in the
       stylesheet that would break the moment the file is renamed.

       Sizing classes land here rather than on the img so the wrapper, the
       image and the sheen are all the same box. */
    <span
      className={`logo-sheen relative inline-block ${className}`}
      style={{ '--logo-src': `url(${logoRml})` }}
    >
      <img
        src={logoRml}
        alt={alt}
        width="164"
        height="83"
        /* Both branches set `filter`, otherwise there is nothing to transition
           between and the flip on scroll snaps. */
        className={`h-full w-auto transition-[filter] duration-300 ${inverted ? 'invert' : 'invert-0'}`}
        decoding="async"
      />
    </span>
  )
}
