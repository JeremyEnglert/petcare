import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const PricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
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
        description: 'Small text above heading, e.g. "Transparent Pricing"',
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
      admin: {
        description: 'Select services to display with their prices',
      },
    },
  ]),
}
