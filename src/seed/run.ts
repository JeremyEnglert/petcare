import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from './index'

async function run() {
  const payload = await getPayload({ config })
  await seed(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
