import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { Hero } from '@/components/hero'
import { getClinicInfo } from '@/utilities/get-clinic-info'
import { ServiceMarquee } from '@/components/service-marquee'
import { ServicesBlock } from '@/components/services-block'
import { AboutBlock } from '@/components/about-block'
import { PricingBlock } from '@/components/pricing-block'
import { TestimonialsBlock } from '@/components/testimonials-block'
import { CtaBlock } from '@/components/cta-block'
import { PromotionBlock } from '@/components/promotion-block'
import { LocationBlock } from '@/components/location-block'
import { cn } from '@/lib/utils'

type PageContent = NonNullable<NonNullable<Page['content']>>
type PageBlock = PageContent[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- block components accept varying props per block
const blockComponents: Partial<Record<PageBlock['blockType'], React.ComponentType<any>>> = {
  hero: Hero,
  'service-marquee': ServiceMarquee,
  services: ServicesBlock,
  about: AboutBlock,
  pricing: PricingBlock,
  testimonials: TestimonialsBlock,
  cta: CtaBlock,
  promotion: PromotionBlock,
  location: LocationBlock,
}

const spacingTopClasses: Record<string, string> = {
  '0': '',
  '8': 'pt-8',
  '16': 'pt-16',
  '24': 'pt-24',
  '32': 'pt-32',
}

const spacingBottomClasses: Record<string, string> = {
  '0': '',
  '8': 'pb-8',
  '16': 'pb-16',
  '24': 'pb-24',
  '32': 'pb-32',
}

type BlockSettings = {
  anchorId?: string | null
  spacingTop?: string | null
  spacingBottom?: string | null
}

function getBlockSettings(block: PageBlock) {
  const settings = 'blockSettings' in block
    ? (block.blockSettings as BlockSettings | undefined)
    : undefined
  if (!settings) return { className: undefined, anchorId: undefined }

  const pt = settings.spacingTop ? spacingTopClasses[settings.spacingTop] : undefined
  const pb = settings.spacingBottom ? spacingBottomClasses[settings.spacingBottom] : undefined

  return {
    className: cn(pt, pb) || undefined,
    anchorId: settings.anchorId || undefined,
  }
}

export async function RenderBlocks({ blocks }: { blocks: PageContent }) {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  const hasHero = blocks.some((b) => b.blockType === 'hero')
  const hasCtaWithSocial = blocks.some((b) => b.blockType === 'cta' && 'showSocialIcons' in b && b.showSocialIcons)
  const hasLocation = blocks.some((b) => b.blockType === 'location')
  const hasPromotion = blocks.some((b) => b.blockType === 'promotion')
  const clinicInfo = (hasHero || hasCtaWithSocial || hasLocation || hasPromotion) ? await getClinicInfo() : null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            const { className, anchorId } = getBlockSettings(block)
            const extraProps = (blockType === 'hero' || blockType === 'cta' || blockType === 'location' || blockType === 'promotion') && clinicInfo ? { clinicInfo } : {}

            return (
              <section id={anchorId} className={className} key={index}>
                <Block {...(block as React.ComponentProps<typeof Block>)} {...extraProps} />
              </section>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
