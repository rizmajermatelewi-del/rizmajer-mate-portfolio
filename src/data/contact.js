/* The two ways to reach him, in a module with no imports of its own.

   They lived in nav.js, which imports BrandIcons for the social links — a
   .jsx file referenced without its extension. Vite resolves that; plain Node
   does not, so scripts/knowledge.mjs could not read the phone number without
   dragging React into a build script. A leaf module is the whole fix: the
   page and the generated knowledge file read the same two strings.

   Displayed exactly as written; the tel: href strips the spaces. */
export const CONTACT_PHONE = '+36 30 13 14 353'
export const CONTACT_EMAIL = 'rizmajermatelewi@gmail.com'
