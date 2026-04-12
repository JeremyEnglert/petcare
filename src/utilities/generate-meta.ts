import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './merge-open-graph'
import { siteConfig } from './site-config'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const siteUrl = siteConfig.url

  let url = `${siteUrl}${siteConfig.ogImage}`

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    if (ogUrl) {
      url = `${siteUrl}${ogUrl}`
    } else if (image.url) {
      url = `${siteUrl}${image.url}`
    }
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  // Fall back to featuredImage for posts when no SEO image is set
  const seoImage = doc?.seo?.image
  const featuredImage = doc && 'featuredImage' in doc ? doc.featuredImage : undefined
  const ogImage = getImageURL(seoImage ?? featuredImage ?? null)

  // Fall back to excerpt for posts when no SEO description is set
  const excerpt = doc && 'excerpt' in doc ? (doc.excerpt as string | undefined) : undefined
  const description = doc?.seo?.description || excerpt || siteConfig.description

  // SEO title is used verbatim (absolute); doc title uses layout template suffix
  // Home page falls back to the site-wide default title
  const isHome = doc?.slug === 'home'
  const title = doc?.seo?.title
    ? { absolute: doc.seo.title }
    : isHome
      ? { absolute: siteConfig.title }
      : doc?.title
        ? doc.title
        : { absolute: siteConfig.title }

  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug || '')
  const canonicalUrl = slug && slug !== 'home'
    ? `${siteConfig.url}/${slug}`
    : siteConfig.url

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: typeof title === 'string' ? title : title.absolute,
      url: slug || '/',
    }),
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
