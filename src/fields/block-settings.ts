import type { Field } from 'payload'

const spacingOptions = [
  { label: 'None', value: '0' },
  { label: 'Small', value: '8' },
  { label: 'Medium', value: '16' },
  { label: 'Large', value: '24' },
  { label: 'Extra Large', value: '32' },
]

export function blockFields(contentFields: Field[], extraSettingsFields?: Field[]): Field[] {
  return [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: contentFields,
        },
        {
          label: 'Settings',
          fields: [
            ...(extraSettingsFields ?? []),
            {
              name: 'blockSettings',
              type: 'group',
              label: false,
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'spacingTop',
                      type: 'select',
                      label: 'Spacing Top',
                      defaultValue: '0',
                      options: spacingOptions,
                    },
                    {
                      name: 'spacingBottom',
                      type: 'select',
                      label: 'Spacing Bottom',
                      defaultValue: '0',
                      options: spacingOptions,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
