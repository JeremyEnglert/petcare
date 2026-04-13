import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'About',
    plural: 'About',
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
        description: 'Small text above heading, e.g. "Our Story"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 3,
      admin: {
        components: {
          RowLabel: {
            path: '@/components/row-label',
            clientProps: {
              fieldName: 'label',
              fallback: 'Stat',
            },
          },
        },
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "8+", "5k+", "40%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Years serving our community"',
          },
        },
      ],
    },
  ]),
}
