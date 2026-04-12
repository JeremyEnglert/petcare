import Image from 'next/image'
import type { Service } from '@/payload-types'
import { ServiceIcon } from '@/components/service-icons'

export type PricingBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  services?: (Service | string)[] | null
}

function savingsPercent(ours: number, theirs: number) {
  return Math.round(((theirs - ours) / theirs) * 100)
}

export function PricingBlock({ eyebrow, heading, description, services }: PricingBlockProps) {
  const resolvedServices = services?.filter(
    (s): s is Service => typeof s !== 'string',
  )

  return (
    <div id="pricing" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {eyebrow && (
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 mb-4">{heading}</h2>
          )}
          {description && (
            <p className="text-seafoam-700/60 text-lg">{description}</p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-seafoam-100 overflow-hidden max-w-4xl mx-auto shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-12 items-center px-8 py-5 bg-seafoam-50/50 border-b border-seafoam-100">
            <div className="col-span-4">
              <span className="text-xs font-bold text-bark/30 uppercase tracking-wider">Service</span>
            </div>
            <div className="col-span-3 text-center">
              <span className="text-xs font-bold text-bark/30 uppercase tracking-wider">Other Clinics</span>
            </div>
            <div className="col-span-3 text-center">
              <Image src="/petcare-logo-text.svg" alt="Pet Care" width={120} height={46} className="h-8 w-auto mx-auto" />
            </div>
            <div className="col-span-2 text-right">
              <span className="text-xs font-bold text-bark/30 uppercase tracking-wider">You Save</span>
            </div>
          </div>

          {/* Rows */}
          <div className="grid divide-y divide-seafoam-100/60">
            {resolvedServices?.map((service) => {
              const ours = service.startingPrice
              const theirs = service.competitorPrice
              const pct = ours && theirs ? savingsPercent(ours, theirs) : null

              return (
                <div key={service.id} className="grid grid-cols-12 items-center px-8 py-5 hover:bg-seafoam-50/30 transition-colors group">
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-seafoam-50 rounded-xl flex items-center justify-center group-hover:bg-seafoam-100 transition-colors">
                      <ServiceIcon icon={service.icon} className="w-5 h-5 text-seafoam-600" />
                    </div>
                    <span className="font-medium text-seafoam-800">{service.title}</span>
                  </div>
                  <div className="col-span-3 text-center">
                    {theirs && (
                      <span className="text-bark/30 line-through text-lg">${theirs}</span>
                    )}
                  </div>
                  <div className="col-span-3 text-center">
                    {ours && (
                      <span className="font-display text-2xl text-seafoam-700">${ours}</span>
                    )}
                  </div>
                  <div className="col-span-2 text-right">
                    {pct && (
                      <span className="inline-flex items-center bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-bold">
                        {pct}%
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-seafoam-900 flex items-center justify-between">
            <span className="text-sm font-medium text-white/70">All prices are starting rates. No hidden fees, ever.</span>
            <span className="text-sm font-bold text-gold-400">Average savings: 53%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
