import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Force datasource URL from env to avoid stale credentials baked into client
const prismaClient = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
})

export const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
