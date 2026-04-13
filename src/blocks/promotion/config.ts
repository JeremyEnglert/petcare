import type { Block } from 'payload'
import { blockFields } from '@/fields/block-settings'

export const PromotionBlock: Block = {
  slug: 'promotion',
  labels: {
    singular: 'Promotion',
    plural: 'Promotions',
  },
  admin: {
    disableBlockName: true,
  },
  fields: blockFields([
    {
      name: 'variant',
      type: 'select',
      label: 'Style',
      defaultValue: 'banner',
      required: true,
      options: [
        { label: 'Bold Banner', value: 'banner' },
        { label: 'Coupon Card', value: 'card' },
        { label: 'Minimal Elegant', value: 'minimal' },
      ],
      admin: {
        description: 'Choose a visual style for this promotion',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        description: 'Small label text, e.g. "Grand Opening Special" or "Limited Time"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
      admin: {
        description: 'The promotional price to highlight, e.g. "$18"',
      },
    },
    {
      name: 'priceLabel',
      type: 'text',
      label: 'Price Label',
      admin: {
        description: 'Text below the price, e.g. "per vaccine"',
      },
    },
    {
      name: 'originalPrice',
      type: 'text',
      label: 'Original Price',
      admin: {
        description: 'Crossed-out comparison price, e.g. "$35+"',
      },
    },
{
      name: 'ctaLabel',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Book Now',
      admin: {
        description: 'Links to the booking URL from Clinic Info',
      },
    },
    {
      name: 'footnote',
      type: 'text',
      label: 'Footnote',
      admin: {
        description: 'Small text at the bottom, e.g. "No appointment needed — walk-ins welcome"',
      },
    },
  ]),
}
