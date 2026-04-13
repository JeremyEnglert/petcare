import type { ClinicInfo } from '@/payload-types'

type CtaButton = {
  label: string
  link: string
  variant?: 'default' | 'outline'
}

export type CtaBlockProps = {
  heading?: string | null
  description?: string | null
  showSocialIcons?: boolean | null
  buttons?: CtaButton[] | null
  clinicInfo?: ClinicInfo | null
}

export function CtaBlock({ heading, description, showSocialIcons, buttons, clinicInfo }: CtaBlockProps) {
  return (
    <div className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 paw-pattern" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-seafoam-50 to-gold-50 rounded-[2rem] px-6 py-12 sm:p-12 lg:p-16 border border-seafoam-100 shadow-xl shadow-seafoam-200/20">
          <div className="w-16 h-16 bg-seafoam-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>

          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 mb-4">{heading}</h2>
          )}
          {description && (
            <p className="text-seafoam-700 text-lg mb-10 max-w-xl mx-auto">{description}</p>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link}
                  className={
                    btn.variant === 'outline'
                      ? 'btn-pill inline-flex items-center gap-3 bg-white hover:bg-cream text-seafoam-700 px-8 py-4 rounded-full text-base font-semibold border-2 border-seafoam-200'
                      : 'btn-pill inline-flex items-center gap-3 bg-seafoam-600 hover:bg-seafoam-700 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25'
                  }
                >
                  {btn.label}
                  {btn.variant !== 'outline' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}

          {showSocialIcons && clinicInfo?.socialMedia && (
            <div className="flex justify-center gap-5 mt-8">
              {clinicInfo.socialMedia.facebook && (
                <a href={clinicInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-seafoam-100 rounded-2xl flex items-center justify-center hover:bg-seafoam-200 transition-colors" aria-label="Facebook">
                  <svg className="w-7 h-7 text-seafoam-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}
              {clinicInfo.socialMedia.instagram && (
                <a href={clinicInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-seafoam-100 rounded-2xl flex items-center justify-center hover:bg-seafoam-200 transition-colors" aria-label="Instagram">
                  <svg className="w-7 h-7 text-seafoam-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {clinicInfo.socialMedia.tiktok && (
                <a href={clinicInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-seafoam-100 rounded-2xl flex items-center justify-center hover:bg-seafoam-200 transition-colors" aria-label="TikTok">
                  <svg className="w-7 h-7 text-seafoam-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48c1.7-1.71 2.65-4.01 2.65-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1.83-.84z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
