import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 paw-pattern" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-seafoam-200/30 blob-1 blur-3xl float-slow" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold-200/20 blob-2 blur-3xl float-delayed" />

      <div className="relative max-w-lg mx-auto px-6 text-center">
        <p className="text-8xl sm:text-9xl font-display gradient-text mb-4 leading-none">
          404
        </p>

        <h1 className="font-display text-3xl sm:text-4xl text-seafoam-900 mb-4">
          This Page Wandered Off
        </h1>

        <p className="text-seafoam-700 text-lg mb-10 max-w-sm mx-auto">
          We couldn&apos;t find what you&apos;re looking for. It may have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-pill inline-flex items-center gap-3 bg-seafoam-600 hover:bg-seafoam-700 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25"
          >
            Back to Home
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
