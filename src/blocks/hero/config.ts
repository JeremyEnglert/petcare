import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  admin: {
    disableBlockName: true,
  },
  fields: blockFields([
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      admin: {
        description: 'Small pill text above the heading, e.g. "Locally owned · Affordable care"',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Wrap text in {{double braces}} to apply the gradient style.',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image',
      relationTo: 'media',
    },
    {
      name: 'floatingBadge',
      type: 'text',
      label: 'Floating Badge',
      admin: {
        description: 'Small badge floating over the hero image, e.g. "Walk-ins Welcome"',
      },
    },
    {
      name: 'showPriceBadge',
      type: 'checkbox',
      label: 'Show Price Badge',
      defaultValue: true,
      admin: {
        description: 'Floating badge on the hero image showing a starting price.',
      },
    },
    {
      name: 'priceBadgeLabel',
      type: 'text',
      label: 'Price Badge Label',
      defaultValue: 'Exams from',
      admin: {
        condition: (_, siblingData) => siblingData?.showPriceBadge,
      },
    },
    {
      name: 'priceBadgePrice',
      type: 'text',
      label: 'Price Badge Price',
      defaultValue: '$35',
      admin: {
        condition: (_, siblingData) => siblingData?.showPriceBadge,
      },
    },
    {
      name: 'trustSignalText',
      type: 'text',
      label: 'Trust Signal Text',
      admin: {
        description: 'e.g. "500+ happy pet families"',
      },
    },
  ]),
}
