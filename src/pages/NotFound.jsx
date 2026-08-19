import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'
import { withLocale } from '../i18n/locales'

/* What a visitor got here before: 79 bytes of text/plain from Vercel's
   default handler, no branding and no way back. The status code was already
   correct — this was never a soft 404 — so nothing about indexing changes;
   what changes is that a mistyped or dead link now ends somewhere that looks
   like the site and offers the two pages worth offering.

   Rendered from dist/404.html, which Vercel serves for any path its static
   output does not match, keeping the 404 status. That one file is served at
   every unmatched path in both languages, so it is prerendered in Hungarian
   and swaps to English on hydration when the path starts with /en. A brief
   Hungarian flash on an English 404 is the whole cost, and it buys not having
   to guess a language from a URL that by definition means nothing. */
const COPY = {
  code: { hu: 'Hiba 404', en: 'Error 404' },
  title: { hu: 'Ez az oldal nincs meg.', en: 'This page does not exist.' },
  body: {
    hu: 'Vagy elgépelt cím, vagy egy régi link, ami már nem mutat sehova. A többi oldal a helyén van.',
    en: 'Either a mistyped address or an old link that no longer points anywhere. The rest of the site is where it was.',
  },
  profile: { hu: 'Fejlesztői profil', en: 'Developer profile' },
}

export default function NotFound() {
  const locale = useLocale()

  /* The one page on the site whose <html lang> can be wrong. Every other route
     is prerendered at its own path and ships the right attribute in the file;
     this one file answers every unmatched path in both languages, so it is
     written as hu and has to correct itself when the path says otherwise.
     Left alone, a screen reader reads English copy with Hungarian phonemes. */
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <main className="min-h-viewport flex items-center px-6 sm:px-10 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
          {t(COPY.code, locale)}
        </p>

        <h1 className="font-display font-extrabold text-ink text-4xl sm:text-5xl leading-[1.05] tracking-tight mt-5">
          {t(COPY.title, locale)}
        </h1>

        <p className="text-muted text-base sm:text-lg leading-relaxed mt-6">
          {t(COPY.body, locale)}
        </p>

        {/* Link, not a plain anchor: a full page load here would throw away
            the bundle the visitor has already paid for, on the one page where
            they are most likely to click straight through. */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to={withLocale('/', locale)}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full shadow-e3 transition-shadow duration-300 hover:shadow-e4"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            {t(UI.backToHome, locale)}
          </Link>
          <Link
            to={withLocale('/fejleszto', locale)}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-divider text-ink font-medium px-7 py-4 rounded-full transition-colors duration-300 hover:border-primary/60"
          >
            {t(COPY.profile, locale)}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
