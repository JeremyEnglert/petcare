export const siteConfig = {
  name: 'Pet Care',
  title: 'Pet Care - Affordable Veterinary Clinic in Tucson, AZ',
  description: 'Affordable Tucson vet offering wellness exams, vaccinations, dental cleanings, spay & neuter, and more. Locally owned, transparent pricing, walk-ins welcome.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
} as const
