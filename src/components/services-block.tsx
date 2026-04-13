import Link from 'next/link'
import type { Service } from '@/payload-types'
import { ServiceIcon } from '@/components/service-icons'
import { ArrowRight } from 'lucide-react'

export type ServicesBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  services?: (Service | string)[] | null
  showCtaCard?: boolean | null
  ctaHeading?: string | null
  ctaDescription?: string | null
  ctaButtonLabel?: string | null
  ctaButtonLink?: string | null
}

export function ServicesBlock({
  eyebrow,
  heading,
  description,
  services,
  showCtaCard,
  ctaHeading,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonLink,
}: ServicesBlockProps) {
  const resolvedServices = services?.filter(
    (s): s is Service => typeof s !== 'string',
  )

  return (
    <div id="services" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          {eyebrow && (
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 mb-4">{heading}</h2>
          )}
          {description && (
            <p className="text-seafoam-700 text-lg leading-relaxed">{description}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedServices?.map((service) => (
            <Link
              key={service.id}
              href={`/services/${(service as Service & { slug?: string }).slug || service.id}`}
              className="card-lift bg-white rounded-3xl p-8 border border-seafoam-100 group block flex flex-col"
            >
              <div className="w-14 h-14 bg-seafoam-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-seafoam-100 transition-colors">
                <ServiceIcon icon={service.icon} className="w-7 h-7 text-seafoam-600" />
              </div>
              <h3 className="font-display text-xl text-seafoam-900 mb-2">{service.title}</h3>
              {service.description && (
                <p className="text-seafoam-600 text-sm leading-relaxed mb-4">{service.description}</p>
              )}
              <div className="mt-auto flex items-end justify-between">
                {(() => {
                  const tiers = service.priceTiers
                  const lowestPrice = tiers && tiers.length > 0
                    ? Math.min(...tiers.map((t) => t.price))
                    : service.startingPrice
                  const lowestCompetitor = tiers && tiers.length > 0
                    ? Math.min(...tiers.filter((t) => t.competitorPrice).map((t) => t.competitorPrice!))
                    : service.competitorPrice

                  return lowestPrice ? (
                    <div>
                      <p className="text-gold-600 font-semibold text-sm">Starting at ${lowestPrice}</p>
                      {lowestCompetitor && (
                        <p className="text-seafoam-600 text-xs mt-0.5">Other clinics charge ${lowestCompetitor}</p>
                      )}
                    </div>
                  ) : null
                })()}
                <span className="inline-flex items-center gap-1 text-seafoam-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}

          {showCtaCard && (
            <div className="card-lift bg-gradient-to-br from-seafoam-600 to-seafoam-700 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden noise-overlay">
              <div className="relative z-10">
                {ctaHeading && <h3 className="font-display text-xl mb-2">{ctaHeading}</h3>}
                {ctaDescription && (
                  <p className="text-seafoam-100 text-sm leading-relaxed mb-8">{ctaDescription}</p>
                )}
              </div>
              {ctaButtonLabel && ctaButtonLink && (
                <a
                  href={ctaButtonLink}
                  className="relative z-10 btn-pill inline-flex items-center justify-center gap-2 bg-white text-seafoam-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold-50"
                >
                  {ctaButtonLabel}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
