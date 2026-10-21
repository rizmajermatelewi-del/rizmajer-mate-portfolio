import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FreeReview from '../sections/FreeReview'

/* The landing page the paid ads point at (Meta, local radius around Inárcs).
   The offer itself is FreeReview, which the home page also renders; this page
   is that section with no navbar, so an ad visitor has one thing to do. The
   home page is one "back" link away for anyone who wants the proof.

   Hungarian-only, like the legal pages: the ads run in Hungarian, and an /en
   twin would be a page nobody is sent to. */
export default function Atvilagitas() {
  return (
    <main className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="flex w-fit items-center gap-2 py-3 text-sm font-medium text-primary-dark lift-on-hover mb-7">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
      </div>
      <FreeReview standalone />
      <p className="max-w-7xl mx-auto text-sm text-muted leading-relaxed mt-14">
        Rizmajer Máté, webfejlesztő, Inárcs. Kérdésed van?{' '}
        <a href="tel:+36301314353" className="text-primary-dark underline underline-offset-2">+36 30 13 14 353</a>
        {' · '}
        <a href="mailto:info@rizmajerdev.com" className="text-primary-dark underline underline-offset-2">info@rizmajerdev.com</a>
      </p>
    </main>
  )
}
