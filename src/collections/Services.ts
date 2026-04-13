import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '../utilities/generate-preview-path'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'startingPrice'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'services',
        req,
      }),
  },
  orderable: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'longDescription',
              type: 'textarea',
              label: 'Long Description',
              admin: {
                description: 'Detailed description shown on the service detail page',
              },
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Heart', value: 'heart' },
                { label: 'Syringe', value: 'syringe' },
                { label: 'Smile', value: 'smile' },
                { label: 'Scissors', value: 'scissors' },
                { label: 'Monitor', value: 'monitor' },
                { label: 'Chip', value: 'chip' },
              ],
            },
            {
              name: 'features',
              type: 'array',
              label: 'What\'s Included',
              admin: {
                description: 'Bullet points shown on the service detail page',
                components: {
                  RowLabel: {
                    path: '@/components/row-label',
                    clientProps: {
                      fieldName: 'feature',
                      fallback: 'Feature',
                    },
                  },
                },
              },
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'startingPrice',
              type: 'number',
              label: 'Starting Price',
              admin: {
                description: 'Default price in dollars (whole number, no $ sign). Used when no price tiers are set.',
              },
            },
            {
              name: 'competitorPrice',
              type: 'number',
              label: 'Competitor Price',
              admin: {
                description: 'Average competitor price in dollars (whole number, no $ sign). e.g. 60, 250',
              },
            },
            {
              name: 'priceTiers',
              type: 'array',
              label: 'Price Tiers',
              admin: {
                description: 'Optional per-animal or per-size pricing. When tiers exist, they display instead of the single starting price.',
                components: {
                  RowLabel: {
                    path: '@/components/row-label',
                    clientProps: {
                      fieldName: 'label',
                      fallback: 'Tier',
                    },
                  },
                },
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. Dogs, Cats, Small Dogs, Large Dogs',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Price in dollars (whole number, no $ sign)',
                  },
                },
                {
                  name: 'competitorPrice',
                  type: 'number',
                  admin: {
                    description: 'Competitor price for this tier',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'seo.title',
              descriptionPath: 'seo.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
}
