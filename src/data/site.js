import { BUSINESS, missingFacts } from './business.js'
import { SERVICES } from './services.js'
import { FAQ } from './faq.js'
import {
  PREVIEW_ABOUT,
  PREVIEW_BUSINESS,
  PREVIEW_FAQ,
  PREVIEW_SERVICES,
} from './preview.js'

/* Real owner facts live in business/services/faq (empty until supplied).
   While those are incomplete, the UI shows clearly labeled minta content so
   the premium Phase 1 composition is reviewable — never as a client claim. */

export const ABOUT_TEXT_REAL = ''

function pickString(real, preview) {
  return real && real.trim() ? real : preview
}

export function isPreviewMode() {
  return missingFacts().length > 0 || SERVICES.length === 0 || !ABOUT_TEXT_REAL.trim()
}

export function siteBusiness() {
  if (!isPreviewMode()) return BUSINESS
  return {
    name: pickString(BUSINESS.name, PREVIEW_BUSINESS.name),
    legalName: pickString(BUSINESS.legalName, PREVIEW_BUSINESS.legalName),
    tagline: pickString(BUSINESS.tagline, PREVIEW_BUSINESS.tagline),
    street: pickString(BUSINESS.street, PREVIEW_BUSINESS.street),
    city: pickString(BUSINESS.city, PREVIEW_BUSINESS.city),
    postalCode: pickString(BUSINESS.postalCode, PREVIEW_BUSINESS.postalCode),
    phone: pickString(BUSINESS.phone, PREVIEW_BUSINESS.phone),
    email: pickString(BUSINESS.email, PREVIEW_BUSINESS.email),
    facebook: BUSINESS.facebook,
    instagram: BUSINESS.instagram,
    mapsUrl: BUSINESS.mapsUrl,
    hours: BUSINESS.hours.length ? BUSINESS.hours : PREVIEW_BUSINESS.hours,
  }
}

export function siteServices() {
  return SERVICES.length ? SERVICES : PREVIEW_SERVICES
}

export function siteFaq() {
  return FAQ.length ? FAQ : PREVIEW_FAQ
}

export function siteAbout() {
  return ABOUT_TEXT_REAL.trim() ? ABOUT_TEXT_REAL : PREVIEW_ABOUT
}

export function sitePhoneIsPreview() {
  return isPreviewMode() && !BUSINESS.phone.trim()
}
