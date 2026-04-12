import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Services',
    plural: 'Services',
  },
  admin: {
    disableBlockName: true,
  },
  fields: blockFields([
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: 'Small text above heading, e.g. "What We Offer"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'services',
      type: 'relationship',
      label: 'Services',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'showCtaCard',
      type: 'checkbox',
      label: 'Show CTA Card',
      defaultValue: true,
    },
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA Card Heading',
      admin: {
        condition: (_, siblingData) => siblingData?.showCtaCard,
      },
    },
    {
      name: 'ctaDescription',
      type: 'text',
      label: 'CTA Card Description',
      admin: {
        condition: (_, siblingData) => siblingData?.showCtaCard,
      },
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      label: 'CTA Button Label',
      admin: {
        condition: (_, siblingData) => siblingData?.showCtaCard,
      },
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
      label: 'CTA Button Link',
      admin: {
        condition: (_, siblingData) => siblingData?.showCtaCard,
      },
    },
  ]),
}
