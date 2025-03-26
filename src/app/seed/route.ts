import { seedDatabase } from '../lib/db'

export async function GET() {
  try {
    seedDatabase()
    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Database seeding error:', error)
    return Response.json({ error }, { status: 500 })
  }
}
