type CtaButton = {
  label: string
  link: string
  variant?: 'default' | 'outline'
}

export type CtaBlockProps = {
  heading?: string | null
  description?: string | null
  buttons?: CtaButton[] | null
}

export function CtaBlock({ heading, description, buttons }: CtaBlockProps) {
  return (
    <div className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 paw-pattern" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-seafoam-50 to-gold-50 rounded-[2rem] p-12 lg:p-16 border border-seafoam-100 shadow-xl shadow-seafoam-200/20">
          <div className="w-16 h-16 bg-seafoam-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>

          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 mb-4">{heading}</h2>
          )}
          {description && (
            <p className="text-seafoam-700/60 text-lg mb-10 max-w-xl mx-auto">{description}</p>
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
        </div>
      </div>
    </div>
  )
}
