import type { GlobalConfig } from 'payload'

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
        description: 'Display format, e.g. "(555) 012-3456"',
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
      name: 'hours',
      type: 'array',
      label: 'Hours of Operation',
      admin: {
        components: {
          RowLabel: {
            path: '@/components/row-label',
            clientProps: {
              fieldName: 'days',
              fallback: 'Hour',
            },
          },
        },
      },
      fields: [
        {
          name: 'days',
          type: 'text',
          label: 'Days',
          required: true,
          admin: {
            description: 'e.g. "Mon–Fri" or "Saturday"',
          },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Hours',
          required: true,
          admin: {
            description: 'e.g. "8am – 6pm" or "Closed"',
          },
        },
      ],
    },
  ],
}
