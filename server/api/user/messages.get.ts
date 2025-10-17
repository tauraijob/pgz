import { verifyToken } from '~/lib/auth'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Accept cookie or Authorization header
    let token = getCookie(event, 'auth-token')
    if (!token) {
      const auth = getHeader(event, 'authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) {
        token = auth.slice(7)
      }
    }

    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const payload = verifyToken(token)
    if (!payload || payload.type !== 'user') {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const messages = await prisma.message.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        subject: true,
        content: true,
        isRead: true,
        createdAt: true,
        attachments: { select: { id: true, filename: true, path: true, mimeType: true, size: true } }
      }
    })

    return { success: true, messages }
  } catch (error) {
    console.error('Fetch user messages error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch messages' })
  }
})


