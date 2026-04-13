import Image from 'next/image'
import type { Service } from '@/payload-types'
import { ServiceIcon } from '@/components/service-icons'

type PricingItem = {
  service: string | Service
  tierLabel?: string | null
  id?: string | null
}

export type PricingBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  pricingItems?: PricingItem[] | null
}

function savingsPercent(ours: number, theirs: number) {
  return Math.round(((theirs - ours) / theirs) * 100)
}

type ResolvedRow = {
  id: string
  label: string
  icon: Service['icon']
  ours: number | null
  theirs: number | null
}

function resolveRows(items: PricingItem[]): ResolvedRow[] {
  return items
    .map((item) => {
      const service = typeof item.service === 'string' ? null : item.service
      if (!service) return null

      const tierLabel = item.tierLabel?.trim()
      if (tierLabel && service.priceTiers && service.priceTiers.length > 0) {
        const tier = service.priceTiers.find(
          (t) => t.label.toLowerCase() === tierLabel.toLowerCase(),
        )
        if (tier) {
          return {
            id: item.id ?? `${service.id}-${tier.label}`,
            label: `${service.title} (${tier.label})`,
            icon: service.icon,
            ours: tier.price,
            theirs: tier.competitorPrice ?? null,
          }
        }
      }

      return {
        id: item.id ?? service.id,
        label: service.title,
        icon: service.icon,
        ours: service.startingPrice ?? null,
        theirs: service.competitorPrice ?? null,
      }
    })
    .filter(Boolean) as ResolvedRow[]
}

export function PricingBlock({ eyebrow, heading, description, pricingItems }: PricingBlockProps) {
  const rows = pricingItems ? resolveRows(pricingItems) : []

  const avgSavings = (() => {
    const pcts = rows
      .filter((r) => r.ours && r.theirs)
      .map((r) => savingsPercent(r.ours!, r.theirs!))
    return pcts.length > 0 ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null
  })()

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
            <p className="text-seafoam-700 text-lg">{description}</p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-seafoam-100 overflow-hidden max-w-4xl mx-auto shadow-sm">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-12 items-center px-8 py-5 bg-seafoam-50/50 border-b border-seafoam-100">
            <div className="col-span-4">
              <span className="text-xs font-bold text-seafoam-600 uppercase tracking-wider">Service</span>
            </div>
            <div className="col-span-3 text-center">
              <span className="text-xs font-bold text-seafoam-600 uppercase tracking-wider">Other Clinics</span>
            </div>
            <div className="col-span-3 text-center">
              <Image src="/petcare-logo-text.svg" alt="Pet Care" width={120} height={46} className="h-8 w-auto mx-auto" />
            </div>
            <div className="col-span-2 text-right">
              <span className="text-xs font-bold text-seafoam-600 uppercase tracking-wider">You Save</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-seafoam-100/60">
            {rows.map((row) => {
              const pct = row.ours && row.theirs ? savingsPercent(row.ours, row.theirs) : null

              return (
                <div key={row.id}>
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-12 items-center px-8 py-5 hover:bg-seafoam-50/30 transition-colors group">
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-seafoam-50 rounded-xl flex items-center justify-center group-hover:bg-seafoam-100 transition-colors">
                        <ServiceIcon icon={row.icon} className="w-5 h-5 text-seafoam-600" />
                      </div>
                      <span className="font-medium text-seafoam-800">{row.label}</span>
                    </div>
                    <div className="col-span-3 text-center">
                      {row.theirs && (
                        <span className="text-seafoam-600 line-through text-lg">${row.theirs}</span>
                      )}
                    </div>
                    <div className="col-span-3 text-center">
                      {row.ours && (
                        <span className="font-display text-2xl text-seafoam-700">${row.ours}</span>
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

                  {/* Mobile row */}
                  <div className="md:hidden px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-seafoam-50 rounded-lg flex items-center justify-center">
                          <ServiceIcon icon={row.icon} className="w-4 h-4 text-seafoam-600" />
                        </div>
                        <span className="font-medium text-seafoam-800 text-sm">{row.label}</span>
                      </div>
                      {pct && (
                        <span className="inline-flex items-center bg-gold-100 text-gold-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          Save {pct}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-4 pl-12">
                      {row.theirs && (
                        <span className="text-seafoam-600 text-sm">
                          <span className="text-seafoam-600 text-xs uppercase tracking-wider">Others </span>
                          <span className="line-through">${row.theirs}</span>
                        </span>
                      )}
                      {row.ours && (
                        <span className="text-sm">
                          <span className="text-seafoam-600 text-xs uppercase tracking-wider">Ours </span>
                          <span className="font-display text-xl text-seafoam-700">${row.ours}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 md:px-8 md:py-5 bg-seafoam-900 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-white/85 text-center sm:text-left">All prices are starting rates. No hidden fees, ever.</span>
            {avgSavings && (
              <span className="text-xs sm:text-sm font-bold text-gold-400 whitespace-nowrap">Average savings: {avgSavings}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
