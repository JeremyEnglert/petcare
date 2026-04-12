import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'updatedAt'],
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Author Name',
      required: true,
      admin: {
        description: 'e.g. "Maria R."',
      },
    },
    {
      name: 'authorDescription',
      type: 'text',
      label: 'Author Description',
      admin: {
        description: 'e.g. "Dog mom to Biscuit"',
      },
    },
    {
      name: 'authorInitials',
      type: 'text',
      label: 'Author Initials',
      admin: {
        description: 'e.g. "MR" (displayed in avatar circle)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
  ],
}
