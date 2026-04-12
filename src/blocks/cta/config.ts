import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const CtaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  admin: {
    disableBlockName: true,
  },
  fields: blockFields([
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
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Variant',
          defaultValue: 'default',
          options: [
            {
              label: 'Primary',
              value: 'default',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
      ],
    },
  ]),
}
