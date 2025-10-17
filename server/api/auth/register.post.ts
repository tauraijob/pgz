import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { hashPassword, generateToken } from '~/lib/auth'
import { sendEmail, generateRegistrationEmail } from '~/lib/email'

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().min(10)
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, name, phone } = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User already exists with this email'
      })
    }
    
    // Generate a random password
    const randomPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await hashPassword(randomPassword)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword
      }
    })
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      type: 'user'
    })
    
    // Send registration email with Arise link (optional - don't fail if email fails)
    try {
      const config = useRuntimeConfig()
      const emailHtml = generateRegistrationEmail(name, config.public.ariseLink)
      await sendEmail(email, 'Welcome to Partnergize - Next Steps', emailHtml)
    } catch (emailError) {
      console.warn('Email sending failed, but registration continues:', emailError)
      // Don't fail registration if email fails
    }
    
    // Set cookie with development-friendly settings (host-only cookie, no domain)
    setCookie(event, 'auth-token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })
    
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        ariseVerified: user.ariseVerified
      },
      token: token // Also return token for localStorage fallback
    }
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input data'
      })
    }
    
    // Check if it's a Prisma error
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 400,
        statusMessage: 'User already exists with this email'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `Registration failed: ${error.message || 'Unknown error'}`
    })
  }
})
