import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { verifyToken } from '~/lib/auth'

const toggleSchema = z.object({
  userId: z.string(),
  isActive: z.boolean()
})

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth-token')
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }
    
    const payload = verifyToken(token)
    if (!payload || payload.type !== 'admin') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }
    
    const body = await readBody(event)
    const { userId, isActive } = toggleSchema.parse(body)
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive }
    })
    
    return {
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input data'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user status'
    })
  }
})
