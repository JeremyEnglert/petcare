import type { ClinicInfo } from '@/payload-types'

type DayHours = {
  closed?: boolean | null
  open?: string | null
  close?: string | null
}

const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

function padTime(time: string): string {
  const [h, m] = time.split(':')
  return `${h.padStart(2, '0')}:${m || '00'}`
}
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
const SCHEMA_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

function formatTime(time: string): string {
  const [hoursStr, minutesStr] = time.split(':')
  const hours = parseInt(hoursStr, 10)
  const minutes = minutesStr || '00'
  const suffix = hours >= 12 ? 'pm' : 'am'
  const display = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return minutes === '00' ? `${display}${suffix}` : `${display}:${minutes}${suffix}`
}

function getDayHours(hours: ClinicInfo['hours'], key: typeof DAY_KEYS[number]): DayHours | null {
  if (!hours) return null
  return (hours as Record<string, DayHours>)[key] || null
}

/**
 * Returns one row per weekday, with Saturday and Sunday bundled into one row.
 */
export function getDisplayHours(hours: ClinicInfo['hours']): { days: string; hours: string }[] {
  if (!hours) return []

  const formatDay = (key: typeof DAY_KEYS[number]) => {
    const day = getDayHours(hours, key)
    return day?.closed ? 'Closed' : (day?.open && day?.close ? `${formatTime(day.open)} – ${formatTime(day.close)}` : '')
  }

  const weekdays = DAY_KEYS.slice(0, 5).map((key, i) => ({
    days: DAY_LABELS[i],
    hours: formatDay(key),
  })).filter((entry) => entry.hours !== '')

  const satHours = formatDay('saturday')
  const sunHours = formatDay('sunday')

  if (satHours && sunHours && satHours === sunHours) {
    weekdays.push({ days: 'Sat – Sun', hours: satHours })
  } else {
    if (satHours) weekdays.push({ days: 'Saturday', hours: satHours })
    if (sunHours) weekdays.push({ days: 'Sunday', hours: sunHours })
  }

  return weekdays
}

/**
 * Generates Schema.org OpeningHoursSpecification entries.
 */
export function getSchemaHours(hours: ClinicInfo['hours']): {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string
  opens: string
  closes: string
}[] {
  if (!hours) return []

  return DAY_KEYS.map((key, i) => {
    const day = getDayHours(hours, key)
    return {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: SCHEMA_DAYS[i],
      opens: day?.closed ? '00:00' : padTime(day?.open || '00:00'),
      closes: day?.closed ? '00:00' : padTime(day?.close || '00:00'),
    }
  }).filter((entry) => entry.opens !== '00:00' || entry.closes !== '00:00')
}
