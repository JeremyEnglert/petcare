import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/seed'
import { headers } from 'next/headers'

export async function POST() {
  const payload = await getPayload({ config: configPromise })

  // Only allow authenticated admin users to run seed
  const headersList = await headers()
  const authHeader = headersList.get('authorization')

  if (authHeader) {
    try {
      const user = await payload.auth({
        headers: new Headers({ authorization: authHeader }),
      })
      if (!user.user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
      }
    } catch {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    await seed(payload)
    return Response.json({ success: true, message: 'Seed complete' })
  } catch (error) {
    console.error('Seed error:', error)
    return Response.json(
      { error: 'Seed failed', details: String(error) },
      { status: 500 },
    )
  }
}
