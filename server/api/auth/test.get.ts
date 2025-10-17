import { verifyToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  try {
    let token = getCookie(event, 'auth-token')
    if (!token) {
      const auth = getHeader(event, 'authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) {
        token = auth.slice(7)
      }
    }
    
    if (!token) {
      return {
        success: false,
        message: 'No token found in cookie'
      }
    }
    
    const payload = verifyToken(token)
    
    return {
      success: true,
      message: 'Token is valid',
      payload: payload
    }
  } catch (error) {
    return {
      success: false,
      message: 'Token verification failed'
    }
  }
})
