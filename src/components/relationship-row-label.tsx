'use client'

import { useEffect, useState } from 'react'
import { useRowLabel } from '@payloadcms/ui'

type Props = {
  relationField: string
  relationTo: string
  titleField: string
  fallback: string
}

const RelationshipRowLabel = ({ relationField, relationTo, titleField, fallback }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const relationValue = data?.[relationField]
  const [title, setTitle] = useState<string | null>(null)

  // The relation value can be an ID string/number or a populated object
  const id =
    relationValue && typeof relationValue === 'object'
      ? (relationValue as Record<string, unknown>)?.id
      : relationValue

  useEffect(() => {
    if (!id) {
      setTitle(null)
      return
    }

    fetch(`/api/${relationTo}/${id}?depth=0`)
      .then((res) => res.json())
      .then((doc) => {
        if (doc?.[titleField]) {
          setTitle(String(doc[titleField]))
        }
      })
      .catch(() => setTitle(null))
  }, [id, relationTo, titleField])

  return <span>{title || `${fallback} ${(rowNumber ?? 0) + 1}`}</span>
}

export default RelationshipRowLabel
