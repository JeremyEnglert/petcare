export const siteConfig = {
  name: 'Pet Care',
  title: 'Pet Care - Affordable Veterinarian in Tucson',
  description: 'Affordable Tucson vet offering wellness exams, vaccinations, dental cleanings, spay & neuter, and more. Locally owned, transparent pricing.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/opengraph-image',
} as const
