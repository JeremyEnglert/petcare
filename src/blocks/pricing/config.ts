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
      name: 'pricingItems',
      type: 'array',
      label: 'Pricing Items',
      admin: {
        description: 'Each item is one row in the pricing table. Pick a service and optionally a specific tier.',
        components: {
          RowLabel: {
            path: '@/components/relationship-row-label',
            clientProps: {
              relationField: 'service',
              relationTo: 'services',
              titleField: 'title',
              fallback: 'Pricing Item',
            },
          },
        },
      },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
        {
          name: 'tierLabel',
          type: 'text',
          label: 'Tier',
          admin: {
            components: {
              Field: {
                path: '@/components/tier-select#TierSelect',
              },
            },
          },
        },
      ],
    },
  ]),
}
