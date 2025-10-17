import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { verifyToken } from '~/lib/auth'
import { sendEmail, generateVerificationNotificationEmail } from '~/lib/email'

const verifySchema = z.object({
  verificationImage: z.string().url().optional()
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
    if (!payload || payload.type !== 'user') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
    
    const body = await readBody(event)
    const { verificationImage } = verifySchema.parse(body)
    
    // Update user verification status
    const user = await prisma.user.update({
      where: { id: payload.id },
      data: {
        ariseVerified: true,
        verificationImage,
        verifiedAt: new Date()
      }
    })
    
    // Send notification email to admin
    const config = useRuntimeConfig()
    await sendEmail(
      config.emailUser, // Admin email
      'New User Verification - Partnergize',
      generateVerificationNotificationEmail(user.name, config.emailUser)
    )
    
    return {
      success: true,
      message: 'Verification submitted successfully'
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
      statusMessage: 'Verification failed'
    })
  }
})
