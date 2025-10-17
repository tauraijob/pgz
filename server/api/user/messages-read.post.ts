import { z } from 'zod'
import { verifyToken } from '~/lib/auth'
import { prisma } from '~/lib/prisma'

const schema = z.object({ messageId: z.string() })

export default defineEventHandler(async (event) => {
  try {
    let token = getCookie(event, 'auth-token')
    if (!token) {
      const auth = getHeader(event, 'authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) token = auth.slice(7)
    }
    if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const payload = verifyToken(token)
    if (!payload || payload.type !== 'user') throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const body = await readBody(event)
    const { messageId } = schema.parse(body)

    const message = await prisma.message.findUnique({ where: { id: messageId } })
    if (!message || message.userId !== payload.id) {
      throw createError({ statusCode: 404, statusMessage: 'Message not found' })
    }

    await prisma.message.update({ where: { id: messageId }, data: { isRead: true } })
    return { success: true }
  } catch (error) {
    console.error('Mark message read error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to mark message as read' })
  }
})


