import type { GlobalConfig, Field } from 'payload'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

function dayFields(day: typeof DAYS[number]): Field {
  const label = day.charAt(0).toUpperCase() + day.slice(1)
  return {
    name: day,
    type: 'group',
    label,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'closed',
            type: 'checkbox',
            label: 'Closed',
            defaultValue: false,
            admin: {
              width: '20%',
            },
          },
          {
            name: 'open',
            type: 'text',
            label: 'Open',
            admin: {
              placeholder: '08:00',
              description: '24h format (e.g. 08:00)',
              width: '40%',
              condition: (data, siblingData) => !siblingData?.closed,
            },
          },
          {
            name: 'close',
            type: 'text',
            label: 'Close',
            admin: {
              placeholder: '18:00',
              description: '24h format (e.g. 18:00)',
              width: '40%',
              condition: (data, siblingData) => !siblingData?.closed,
            },
          },
        ],
      },
    ],
  }
}

export const ClinicInfo: GlobalConfig = {
  slug: 'clinic-info',
  label: 'Clinic Info',
  admin: {
    description: 'Contact details, hours, and booking link used across the site.',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Display format, e.g. "(520) 555-0123"',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Booking URL',
      admin: {
        description: 'Link for the "Schedule Appointment" button',
      },
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'Street',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              type: 'text',
              label: 'City',
            },
            {
              name: 'state',
              type: 'text',
              label: 'State',
            },
            {
              name: 'zip',
              type: 'text',
              label: 'ZIP',
            },
          ],
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
        },
      ],
    },
    {
      name: 'hours',
      type: 'group',
      label: 'Hours of Operation',
      fields: DAYS.map(dayFields),
    },
  ],
}
