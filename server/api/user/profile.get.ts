import { verifyToken } from '~/lib/auth'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    let token = getCookie(event, 'auth-token')
    if (!token) {
      // Fallback: Authorization header
      const auth = getHeader(event, 'authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) {
        token = auth.slice(7)
      }
    }
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No authentication token'
      })
    }
    
    const payload = verifyToken(token)
    
    if (!payload || payload.type !== 'user') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
    
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isActive: true,
        ariseVerified: true,
        ariseScreenshot: true,
        verifiedAt: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    return {
      success: true,
      user
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed'
    })
  }
})
