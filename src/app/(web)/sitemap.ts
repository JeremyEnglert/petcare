import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { siteConfig } from '@/utilities/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  const [pages, posts, services] = await Promise.all([
    payload.find({ collection: 'pages', limit: 1000, select: { slug: true, updatedAt: true } }),
    payload.find({ collection: 'posts', limit: 1000, select: { slug: true, updatedAt: true } }),
    payload.find({ collection: 'services', limit: 1000, select: { slug: true, updatedAt: true } }),
  ])

  const pageEntries: MetadataRoute.Sitemap = pages.docs.map((page) => ({
    url: page.slug === 'home'
      ? siteConfig.url
      : `${siteConfig.url}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: page.slug === 'home' ? 1.0 : 0.8,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.docs.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const serviceEntries: MetadataRoute.Sitemap = services.docs.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...pageEntries, ...serviceEntries, ...postEntries]
}
