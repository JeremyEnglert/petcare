import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const ServiceMarqueeBlock: Block = {
  slug: 'service-marquee',
  labels: {
    singular: 'Service Marquee',
    plural: 'Service Marquees',
  },
  admin: {
    disableBlockName: true,
  },
  fields: blockFields([
    {
      name: 'excludeServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Exclude Services',
      admin: {
        description: 'Optionally hide specific services from the marquee',
      },
    },
  ]),
}
