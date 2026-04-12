'use client'

import { useRowLabel } from '@payloadcms/ui'

type Props = {
  fieldName: string
  fallback: string
}

const RowLabel = ({ fieldName, fallback }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const value = data?.[fieldName]

  return <span>{typeof value === 'string' && value ? value : `${fallback} ${(rowNumber ?? 0) + 1}`}</span>
}

export default RowLabel
