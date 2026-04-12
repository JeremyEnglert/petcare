import { Heart, Syringe, Smile, Scissors, Monitor, Cpu } from 'lucide-react'

const icons = {
  heart: Heart,
  syringe: Syringe,
  smile: Smile,
  scissors: Scissors,
  monitor: Monitor,
  chip: Cpu,
} as const

export function ServiceIcon({ icon, className }: { icon?: string | null; className?: string }) {
  const Icon = icons[(icon || 'heart') as keyof typeof icons] || Heart
  return <Icon className={className} />
}
