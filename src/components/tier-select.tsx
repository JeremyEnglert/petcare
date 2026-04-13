'use client'

import React, { useEffect, useState } from 'react'
import { TextFieldClientProps } from 'payload'
import { useField, useFormFields, FieldLabel, useConfig } from '@payloadcms/ui'

// Derives the sibling service field path from this field's path
// e.g. "content.3.pricingItems.0.tierLabel" -> "content.3.pricingItems.0.service"
function getServiceFieldPath(tierPath: string): string {
  const parts = tierPath.split('.')
  parts[parts.length - 1] = 'service'
  return parts.join('.')
}

type PriceTier = {
  label: string
  price: number
  id?: string | null
}

export const TierSelect: React.FC<TextFieldClientProps> = ({
  field,
  path,
}) => {
  const { label } = field
  const fieldPath = path || field.name
  const serviceFieldPath = getServiceFieldPath(fieldPath)

  const { value, setValue } = useField<string>({ path: fieldPath })
  const [tiers, setTiers] = useState<PriceTier[]>([])
  const { config } = useConfig()
  const serverURL = config.serverURL || ''
  const apiRoute = config.routes?.api || '/api'

  const serviceValue = useFormFields(([fields]) => {
    const fieldData = fields[serviceFieldPath]
    return fieldData?.value as string | undefined
  })

  useEffect(() => {
    if (!serviceValue) {
      setTiers([])
      return
    }

    const fetchTiers = async () => {
      try {
        const res = await fetch(`${serverURL}${apiRoute}/services/${serviceValue}?depth=0`)
        if (!res.ok) return
        const data = await res.json()
        setTiers(data.priceTiers || [])
      } catch {
        setTiers([])
      }
    }

    fetchTiers()
  }, [serviceValue, serverURL, apiRoute])

  // Hide entirely when the selected service has no tiers
  if (tiers.length === 0) {
    return null
  }

  return (
    <div className="field-type" style={{ marginBottom: '1.5rem' }}>
      <FieldLabel htmlFor={`field-${fieldPath}`} label={label} />
      <select
        id={`field-${fieldPath}`}
        value={value || ''}
        onChange={(e) => setValue(e.target.value || null)}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          borderRadius: '0.25rem',
          border: '1px solid var(--theme-elevation-150)',
          background: 'var(--theme-input-bg)',
          color: 'var(--theme-elevation-800)',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        }}
      >
        <option value="">Use default service price</option>
        {tiers.map((tier) => (
          <option key={tier.id ?? tier.label} value={tier.label}>
            {tier.label} (${tier.price})
          </option>
        ))}
      </select>
      <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)', marginTop: '0.375rem' }}>
        Select a specific tier or leave blank to use the default service price.
      </p>
    </div>
  )
}
