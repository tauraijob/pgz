import { z } from 'zod'
import { authenticateUser, authenticateAdmin, generateToken } from '~/lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  type: z.enum(['user', 'admin'])
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, type } = loginSchema.parse(body)
    
    console.log(`🔐 Login attempt: ${type} - ${email}`)
    
    let payload
    if (type === 'admin') {
      console.log('🔍 Authenticating admin...')
      payload = await authenticateAdmin(email, password)
    } else {
      console.log('🔍 Authenticating user...')
      payload = await authenticateUser(email, password)
    }
    
    console.log('🎫 Authentication result:', payload ? 'Success' : 'Failed')
    
    if (!payload) {
      console.log('❌ Authentication failed - invalid credentials')
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }
    
    const token = generateToken(payload)
    
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
      user: payload,
      token: token // Also return token for localStorage fallback
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input data'
      })
    }
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Login failed'
    })
  }
})
