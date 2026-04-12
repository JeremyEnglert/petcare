import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
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
        description: 'Small text above heading, e.g. "Kind Words"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      label: 'Testimonials',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ]),
}
