import type { ClinicInfo } from '@/payload-types'
import type { ReactNode } from 'react'
import { LocationMap } from '@/components/location-map'

export type LocationBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  grandOpeningLabel?: string | null
  clinicInfo?: ClinicInfo | null
}

function renderHeading(text: string): ReactNode[] {
  const parts = text.split(/(\{\{.*?\}\})/g)
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return (
        <em key={i} className="text-gradient not-italic">{part.slice(2, -2)}</em>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function LocationBlock({
  eyebrow,
  heading,
  description,
  grandOpeningLabel,
  clinicInfo,
}: LocationBlockProps) {
  const address = clinicInfo?.address
  const fullAddress = address
    ? [address.street, address.city, address.state, address.zip].filter(Boolean).join(', ')
    : null

  return (
    <div className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-seafoam-200/20 blob-2 blur-3xl float-delayed" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-10 fade-up fade-up-1">
          {eyebrow && (
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 leading-tight mb-4">
              {renderHeading(heading)}
            </h2>
          )}
          {description && (
            <p className="text-seafoam-700 text-lg max-w-xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Grand opening badge */}
        {grandOpeningLabel && (
          <div className="text-center mb-10 fade-up fade-up-2">
            <div className="inline-flex items-center gap-2 bg-gold-100 border border-gold-200 px-5 py-2 rounded-full text-sm font-semibold text-gold-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
              {grandOpeningLabel}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="fade-up fade-up-3 max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-seafoam-100 shadow-lg shadow-seafoam-200/20">
          {fullAddress ? (
            <div className="h-[340px] lg:h-[400px]">
              <LocationMap address={fullAddress} />
            </div>
          ) : (
            <div className="w-full h-[340px] lg:h-[400px] bg-gradient-to-br from-seafoam-100 to-seafoam-200 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-seafoam-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
