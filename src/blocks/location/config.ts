import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const LocationBlock: Block = {
  slug: 'location',
  labels: {
    singular: 'Location',
    plural: 'Locations',
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
        description: 'Small text above heading, e.g. "Our Location"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Wrap text in {{double braces}} to apply the gradient style.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'grandOpeningLabel',
      type: 'text',
      label: 'Grand Opening Label',
      admin: {
        description: 'Optional badge text, e.g. "Grand Opening May 2026". Leave blank to hide.',
      },
    },
  ]),
}
