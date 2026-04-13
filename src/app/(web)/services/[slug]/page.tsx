import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import type { Service } from '@/payload-types'
import { ServiceDetailContent } from '@/components/service-detail'
import { siteConfig } from '@/utilities/site-config'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
    select: { slug: true },
  })
  return services.docs
    .filter((s) => s.slug)
    .map((s) => ({ slug: s.slug! }))
}

type Args = { params: Promise<{ slug: string }> }

const queryService = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs?.[0] || null
})

const queryOtherServices = cache(async (excludeId: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    where: { id: { not_equals: excludeId } },
    limit: 3,
    sort: '_order',
  })
  return result.docs
})

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const service = await queryService(slug) as (Service & { seo?: { title?: string; description?: string } }) | null
  if (!service) return { title: 'Service Not Found' }

  const fallbackTitle = `Low Cost ${service.title} in Tucson - Affordable Vet - Pet Care`
  const title = service.seo?.title || fallbackTitle
  const lowestPrice = service.priceTiers && service.priceTiers.length > 0
    ? Math.min(...service.priceTiers.map((t) => t.price))
    : service.startingPrice || 35
  const description = service.seo?.description || `Affordable ${service.title.toLowerCase()} starting at $${lowestPrice} at Pet Care in Tucson. 40% less than the average vet. Walk-ins welcome, no hidden fees.`

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/services/${slug}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const service = await queryService(slug)
  if (!service) notFound()

  const otherServices = await queryOtherServices(service.id)
  const features = (service as Service & { features?: { feature: string; description?: string | null; id?: string }[] }).features

  // JSON-LD structured data for local business service
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: `${service.title} — Pet Care Veterinary Clinic`,
    description: service.longDescription || service.description,
    url: `${siteConfig.url}/services/${slug}`,
    areaServed: {
      '@type': 'City',
      name: 'Tucson',
      addressRegion: 'AZ',
    },
    priceRange: (() => {
      const tiers = service.priceTiers
      if (tiers && tiers.length > 0) {
        const prices = tiers.map((t) => t.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        return min === max ? `From $${min}` : `$${min} - $${max}`
      }
      return service.startingPrice ? `From $${service.startingPrice}` : '$'
    })(),
    provider: {
      '@type': 'VeterinaryCare',
      name: 'Pet Care Veterinary Clinic',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tucson',
        addressRegion: 'AZ',
      },
      telephone: '(555) 012-3456',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent
        service={service}
        features={features || []}
        otherServices={otherServices}
      />
    </>
  )
}
