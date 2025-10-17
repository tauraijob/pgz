const jwt = require('jsonwebtoken')

// Test JWT token generation and verification
const JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production"

console.log('🧪 Testing JWT token generation...')

const payload = {
  id: 'test-id',
  email: 'test@example.com',
  name: 'Test User',
  type: 'user'
}

try {
  // Generate token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  console.log('✅ Token generated successfully')
  console.log('Token:', token.substring(0, 50) + '...')
  
  // Verify token
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('✅ Token verified successfully')
  console.log('Decoded payload:', decoded)
  
} catch (error) {
  console.error('❌ JWT error:', error.message)
}
