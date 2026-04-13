import Image from 'next/image'
import type { Media, ClinicInfo } from '@/payload-types'
import type { ReactNode } from 'react'

export type HeroProps = {
  badge?: string | null
  title: string
  subtitle?: string | null
  heroImage?: Media | string | null
  floatingBadge?: string | null
  showPriceBadge?: boolean | null
  priceBadgeLabel?: string | null
  priceBadgePrice?: string | null
  trustSignalText?: string | null
  clinicInfo?: ClinicInfo
}

function renderTitle(title: string): ReactNode[] {
  const parts = title.split(/(\{\{.*?\}\})/g)
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return (
        <em key={i} className="text-gradient not-italic">{part.slice(2, -2)}</em>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function formatPhoneForTel(phone: string): string {
  return 'tel:' + phone.replace(/\D/g, '')
}

export function Hero({ badge, title, subtitle, heroImage, floatingBadge, showPriceBadge, priceBadgeLabel, priceBadgePrice, trustSignalText, clinicInfo }: HeroProps) {

  return (
    <section className="relative min-h-screen flex items-center pt-8 paw-pattern">
      <div className="absolute top-32 -left-20 w-72 h-72 bg-seafoam-200/40 blob-1 blur-3xl float-slow" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gold-200/30 blob-2 blur-3xl float-delayed" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {badge && (
            <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-gold-100 text-gold-800 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              {badge}
            </div>
          )}

          <h1 className="fade-up fade-up-2 font-display text-5xl sm:text-6xl lg:text-7xl text-seafoam-900 leading-[1.05] mb-6">
            {renderTitle(title)}
          </h1>

          {subtitle && (
            <p className="fade-up fade-up-3 text-lg text-seafoam-700 leading-relaxed mb-10 max-w-md">
              {subtitle}
            </p>
          )}

          {(clinicInfo?.phone || clinicInfo?.bookingUrl) ? (
            <div className="fade-up fade-up-4 flex flex-wrap gap-4">
              {clinicInfo.bookingUrl && (
                <a
                  href={clinicInfo.bookingUrl}
                  className="btn-pill inline-flex items-center gap-3 bg-seafoam-600 hover:bg-seafoam-700 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Appointment
                </a>
              )}
              {clinicInfo.phone && (
                <a
                  href={formatPhoneForTel(clinicInfo.phone)}
                  className="btn-pill inline-flex items-center gap-3 bg-white hover:bg-seafoam-50 text-seafoam-700 px-8 py-4 rounded-full text-base font-semibold border-2 border-seafoam-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {clinicInfo.phone}
                </a>
              )}
            </div>
          ) : (
            <div className="fade-up fade-up-4 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2.5 bg-seafoam-600 text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Opening in May
              </div>
              {clinicInfo?.address && (clinicInfo.address.street || clinicInfo.address.city) && (
                <span className="text-sm text-seafoam-700">
                  {[clinicInfo.address.street, clinicInfo.address.city, clinicInfo.address.state].filter(Boolean).join(', ')}
                  {clinicInfo.address.zip && ` ${clinicInfo.address.zip}`}
                </span>
              )}
            </div>
          )}

          {trustSignalText && (
            <div className="fade-up fade-up-5 flex items-center gap-6 mt-12 pt-8 border-t border-seafoam-200/50">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-seafoam-300 border-2 border-cream flex items-center justify-center text-xs font-bold text-seafoam-800">JM</div>
                <div className="w-10 h-10 rounded-full bg-gold-300 border-2 border-cream flex items-center justify-center text-xs font-bold text-gold-800">SK</div>
                <div className="w-10 h-10 rounded-full bg-seafoam-400 border-2 border-cream flex items-center justify-center text-xs font-bold text-white">AL</div>
                <div className="w-10 h-10 rounded-full bg-gold-200 border-2 border-cream flex items-center justify-center text-xs font-bold text-gold-700">+</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-seafoam-600 mt-0.5">{trustSignalText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Hero image area */}
        <div className="relative hidden lg:block">
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-seafoam-200 to-seafoam-300 blob-1 overflow-hidden">
              {heroImage && typeof heroImage === 'object' && heroImage.url ? (
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt || ''}
                  fill
                  className="object-cover mix-blend-multiply opacity-60"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-seafoam-300" />
              )}
            </div>
            {showPriceBadge && priceBadgePrice && (
              <div className="absolute -bottom-6 -left-8 float-delayed">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-seafoam-900/8 px-5 py-4 border border-seafoam-100/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-seafoam-50 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-seafoam-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                    </div>
                    <div>
                      {priceBadgeLabel && (
                        <p className="text-xs text-seafoam-600/70 font-medium">{priceBadgeLabel}</p>
                      )}
                      <p className="text-xl font-display text-seafoam-900 leading-tight">{priceBadgePrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {floatingBadge && (
              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl px-5 py-3 float-slow">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <p className="text-sm font-semibold text-seafoam-800">{floatingBadge}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
