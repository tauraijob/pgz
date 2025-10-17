import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export interface UserPayload {
  id: string
  email: string
  name: string
  type: 'user' | 'admin'
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: UserPayload): string {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtSecret) as UserPayload
  } catch {
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<UserPayload | null> {
  console.log(`🔍 Looking for user with email: ${email}`)
  
  const user = await prisma.user.findUnique({
    where: { email }
  })

  console.log(`👤 User found:`, user ? 'Yes' : 'No')
  
  if (!user) {
    console.log('❌ User not found in database')
    return null
  }

  const passwordMatch = await verifyPassword(password, user.password)
  console.log(`🔐 Password match:`, passwordMatch ? 'Yes' : 'No')

  if (!passwordMatch) {
    console.log('❌ Password does not match')
    return null
  }

  console.log('✅ User authentication successful')
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    type: 'user'
  }
}

export async function authenticateAdmin(email: string, password: string): Promise<UserPayload | null> {
  console.log(`🔍 Looking for admin with email: ${email}`)
  
  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  console.log(`👤 Admin found:`, admin ? 'Yes' : 'No')
  
  if (!admin) {
    console.log('❌ Admin not found in database')
    return null
  }

  const passwordMatch = await verifyPassword(password, admin.password)
  console.log(`🔐 Password match:`, passwordMatch ? 'Yes' : 'No')

  if (!passwordMatch) {
    console.log('❌ Password does not match')
    return null
  }

  console.log('✅ Admin authentication successful')
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    type: 'admin'
  }
}
