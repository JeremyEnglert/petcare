import type { ClinicInfo } from '@/payload-types'

export type PromotionBlockProps = {
  variant?: 'banner' | 'card' | 'minimal' | null
  badge?: string | null
  heading?: string | null
  description?: string | null
  price?: string | null
  priceLabel?: string | null
  originalPrice?: string | null
  ctaLabel?: string | null
  footnote?: string | null
  clinicInfo?: ClinicInfo | null
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="7.5" cy="5" rx="2.5" ry="3" />
      <ellipse cx="16.5" cy="5" rx="2.5" ry="3" />
      <ellipse cx="4" cy="11" rx="2" ry="2.5" />
      <ellipse cx="20" cy="11" rx="2" ry="2.5" />
      <path d="M12 22c-4 0-7-3-7-6 0-2 2-4 4-5a5 5 0 0 1 6 0c2 1 4 3 4 5 0 3-3 6-7 6z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Variant: Bold Banner                                                      */
/* -------------------------------------------------------------------------- */

function BannerVariant({
  badge, heading, description, price, priceLabel, ctaLabel, footnote, clinicInfo,
}: PromotionBlockProps) {
  const bookingUrl = clinicInfo?.bookingUrl
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] noise-overlay"
          style={{ background: 'linear-gradient(135deg, #144a3b 0%, #1a7058 40%, #208c6b 70%, #2dad86 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 blob-1 bg-white/5 float-slow" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 blob-2 bg-gold-500/10 float-delayed" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-seafoam-400/[0.08]" />
          <div className="absolute inset-0 paw-pattern opacity-60" />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {badge && (
                  <div
                    className="inline-flex items-center gap-2 text-bark font-bold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-6"
                    style={{
                      background: 'linear-gradient(110deg, #c9a46c 0%, #dfc088 25%, #f5edda 50%, #dfc088 75%, #c9a46c 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 4s ease-in-out infinite',
                    }}
                  >
                    <StarIcon className="w-4 h-4" />
                    {badge}
                  </div>
                )}

                {heading && (
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                    {heading}
                  </h2>
                )}

                {description && (
                  <p className="text-seafoam-100 text-lg lg:text-xl max-w-lg mb-8 mx-auto lg:mx-0">
                    {description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  {ctaLabel && bookingUrl && (
                    <a
                      href={bookingUrl}
                      className="btn-pill inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-bark px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-black/20"
                    >
                      {ctaLabel}
                      <ArrowIcon className="w-5 h-5" />
                    </a>
                  )}
                  {footnote && <span className="text-white/60 text-sm">{footnote}</span>}
                </div>
              </div>

              {/* Price circle */}
              {price && (
                <div className="flex-shrink-0">
                  <div className="relative" style={{ animation: 'pricePulse 3s ease-in-out infinite' }}>
                    <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-2xl scale-110" />
                    <div className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex flex-col items-center justify-center">
                      {priceLabel && (
                        <span className="text-gold-300 text-sm font-semibold uppercase tracking-[0.2em] mb-1">Only</span>
                      )}
                      <span className="font-display text-7xl lg:text-8xl text-white leading-none">{price}</span>
                      {priceLabel && <span className="text-white/80 text-sm mt-1">{priceLabel}</span>}

                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center rotate-12 shadow-lg">
                        <PawIcon className="w-6 h-6 text-bark" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Variant: Coupon Card                                                      */
/* -------------------------------------------------------------------------- */

function CardVariant({
  badge, heading, description, price, priceLabel, originalPrice, ctaLabel, footnote, clinicInfo,
}: PromotionBlockProps) {
  const bookingUrl = clinicInfo?.bookingUrl
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="card-lift relative bg-white rounded-[2rem] border border-seafoam-100 overflow-hidden shadow-sm">
          {/* Ribbon */}
          {badge && (
            <div
              className="absolute top-5 right-[-35px] rotate-45 w-[150px] text-center py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase bg-gold-500 text-bark z-20 shadow-md"
            >
              {badge}
            </div>
          )}

          <div className="flex flex-col md:flex-row">
            {/* Price panel */}
            <div className="relative md:w-56 lg:w-64 flex-shrink-0 bg-gradient-to-br from-seafoam-50 to-seafoam-100/50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-seafoam-100">
              {/* Ticket notch */}
              <div className="hidden md:block absolute top-1/2 right-[-10px] -translate-y-1/2 w-5 h-5 bg-cream rounded-full" style={{ boxShadow: 'inset 2px 0 4px rgba(20,74,59,0.06)' }} />

              <div className="text-center">
                <div className="w-14 h-14 bg-seafoam-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                  <PawIcon className="w-7 h-7 text-white" />
                </div>
                {priceLabel && (
                  <span className="text-seafoam-600 text-xs font-semibold uppercase tracking-[0.15em] block mb-1">{priceLabel}</span>
                )}
                {price && (
                  <span className="font-display text-6xl text-seafoam-900 leading-none block">{price}</span>
                )}
                {originalPrice && (
                  <span className="text-seafoam-600 text-sm mt-1 block line-through">{originalPrice}</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
              {heading && (
                <h3 className="font-display text-3xl lg:text-4xl text-seafoam-900 mb-3">{heading}</h3>
              )}

              {description && (
                <p className="text-seafoam-700 text-base mb-6 max-w-sm">{description}</p>
              )}

              <div className="flex items-center gap-4">
                {ctaLabel && bookingUrl && (
                  <a
                    href={bookingUrl}
                    className="btn-pill inline-flex items-center gap-2 bg-seafoam-600 hover:bg-seafoam-700 text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-seafoam-600/25"
                  >
                    {ctaLabel}
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          {footnote && (
            <div className="px-8 py-3 bg-seafoam-50/50 border-t border-seafoam-100 flex items-center justify-between">
              <span className="text-seafoam-600 text-xs font-medium">{footnote}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-seafoam-400 animate-pulse" />
                <span className="text-seafoam-600 text-xs font-medium">Available now</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Variant: Minimal Elegant                                                  */
/* -------------------------------------------------------------------------- */

function MinimalVariant({
  badge, heading, description, price, ctaLabel, footnote, clinicInfo,
}: PromotionBlockProps) {
  const bookingUrl = clinicInfo?.bookingUrl
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-seafoam-50 to-gold-50 rounded-[2rem] p-10 sm:p-14 lg:p-20 border border-seafoam-100/60 overflow-hidden">
          <div className="absolute inset-0 paw-pattern opacity-40" />

          {/* Gold accent line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full"
            style={{ background: 'linear-gradient(90deg, #d4a966, #c9a46c, #d4a966)' }}
          />

          <div className="relative z-10 text-center">
            {badge && (
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="h-px w-8 bg-gold-400" />
                <span className="text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">{badge}</span>
                <div className="h-px w-8 bg-gold-400" />
              </div>
            )}

            {heading && (
              <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl text-seafoam-900 mb-2 leading-[1.1]">
                {heading}
              </h3>
            )}

            {price && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-seafoam-200" />
                <span className="font-display text-6xl sm:text-7xl lg:text-8xl text-gradient leading-none">{price}</span>
                <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-seafoam-200" />
              </div>
            )}

            {description && (
              <p className="text-seafoam-700 text-lg sm:text-xl max-w-md mx-auto mb-10 leading-relaxed">
                {description}
              </p>
            )}

            {ctaLabel && bookingUrl && (
              <a
                href={bookingUrl}
                className="btn-pill inline-flex items-center gap-3 bg-seafoam-900 hover:bg-seafoam-950 text-white px-10 py-4 rounded-full text-base font-semibold shadow-2xl shadow-seafoam-900/20"
              >
                {ctaLabel}
                <ArrowIcon className="w-5 h-5" />
              </a>
            )}

            {footnote && (
              <p className="text-seafoam-600 text-xs uppercase tracking-[0.15em] mt-8">{footnote}</p>
            )}
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold-300/40 rounded-tl-xl" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold-300/40 rounded-tr-xl" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold-300/40 rounded-bl-xl" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold-300/40 rounded-br-xl" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main Export                                                               */
/* -------------------------------------------------------------------------- */

export function PromotionBlock(props: PromotionBlockProps) {
  const variant = props.variant ?? 'banner'

  switch (variant) {
    case 'card':
      return <CardVariant {...props} />
    case 'minimal':
      return <MinimalVariant {...props} />
    default:
      return <BannerVariant {...props} />
  }
}
