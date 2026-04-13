import Image from 'next/image'
import type { Media } from '@/payload-types'

export type AboutBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  body?: Record<string, unknown> | null
  images?: { image: Media | string; id?: string | null }[] | null
  stats?: { value: string; label: string; id?: string | null }[] | null
}

export function AboutBlock({ eyebrow, heading, body, images, stats }: AboutBlockProps) {
  const resolvedImages = images
    ?.map((item) => (typeof item.image !== 'string' ? item.image : null))
    .filter(Boolean) as Media[] | undefined

  // Extract plain text paragraphs from rich text
  const paragraphs = extractParagraphs(body)

  return (
    <div id="about" className="py-20 lg:py-24 bg-seafoam-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative bg-seafoam-200 rounded-3xl aspect-square overflow-hidden">
                  {resolvedImages?.[0] && (
                    <Image
                      src={resolvedImages[0].url ?? ''}
                      alt={resolvedImages[0].alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="relative bg-gold-200 rounded-3xl aspect-[4/3] overflow-hidden">
                  {resolvedImages?.[1] && (
                    <Image
                      src={resolvedImages[1].url ?? ''}
                      alt={resolvedImages[1].alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="relative bg-seafoam-300 rounded-3xl aspect-[4/3] overflow-hidden">
                  {resolvedImages?.[2] && (
                    <Image
                      src={resolvedImages[2].url ?? ''}
                      alt={resolvedImages[2].alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="relative bg-gold-100 rounded-3xl aspect-square overflow-hidden">
                  {resolvedImages?.[3] && (
                    <Image
                      src={resolvedImages[3].url ?? ''}
                      alt={resolvedImages[3].alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-gold-200/50 blob-2" />
          </div>

          {/* Copy */}
          <div>
            {eyebrow && (
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-4xl sm:text-5xl text-seafoam-900 mb-6 leading-tight">
                {heading}
              </h2>
            )}

            {paragraphs.length > 0 && (
              <div className="space-y-4 text-seafoam-700 leading-relaxed">
                {paragraphs.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-seafoam-200">
                {stats.map((stat, i) => (
                  <div key={stat.id ?? i}>
                    <p className={`font-display text-3xl ${i % 2 === 1 ? 'text-gold-600' : 'text-seafoam-700'}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-seafoam-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function extractParagraphs(richText: Record<string, unknown> | null | undefined): string[] {
  if (!richText) return []
  const root = richText.root as { children?: Array<{ children?: Array<{ text?: string }> }> } | undefined
  if (!root?.children) return []

  return root.children
    .map((node) => {
      if (!node.children) return ''
      return node.children.map((child) => child.text ?? '').join('')
    })
    .filter(Boolean)
}
