import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Service } from '@/payload-types'

export type ServiceMarqueeProps = {
  excludeServices?: (Service | string)[] | null
}

export async function ServiceMarquee({ excludeServices }: ServiceMarqueeProps) {
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: '_order',
    limit: 100,
    depth: 0,
  })

  const excludeIds = new Set(
    excludeServices?.map((s) => (typeof s === 'string' ? s : s.id)) ?? [],
  )

  const filtered = excludeIds.size > 0
    ? services.filter((s) => !excludeIds.has(s.id))
    : services

  if (!filtered.length) return null

  // Duplicate for seamless loop
  const allItems = [...filtered, ...filtered]

  return (
    <section className="bg-seafoam-600 text-white py-4 overflow-hidden">
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
        {allItems.map((service, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            {service.title}
          </span>
        ))}
      </div>
    </section>
  )
}
