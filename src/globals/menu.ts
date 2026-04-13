import type { GlobalConfig } from 'payload'

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menu',
  admin: {
    description: 'Manage the main navigation menu.',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      admin: {
        components: {
          RowLabel: {
            path: '@/components/row-label',
            clientProps: {
              fieldName: 'label',
              fallback: 'Item',
            },
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: {
            description: 'Relative path (e.g. "/#services") or full URL',
          },
        },
      ],
    },
  ],
}
