const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('🧪 Testing login credentials...')
    
    // Test admin login
    console.log('\n🔐 Testing admin login...')
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@partnergize.com' }
    })
    
    if (admin) {
      console.log('✅ Admin found in database')
      const passwordMatch = await bcrypt.compare('admin123', admin.password)
      console.log(`🔐 Password 'admin123' matches: ${passwordMatch ? 'Yes' : 'No'}`)
      
      if (!passwordMatch) {
        console.log('⚠️  Password mismatch! Updating admin password...')
        const newHashedPassword = await bcrypt.hash('admin123', 12)
        await prisma.admin.update({
          where: { id: admin.id },
          data: { password: newHashedPassword }
        })
        console.log('✅ Admin password updated to: admin123')
      }
    } else {
      console.log('❌ Admin not found')
    }
    
    // Test user login
    console.log('\n🔐 Testing user login...')
    const user = await prisma.user.findUnique({
      where: { email: 'john.doe@example.com' }
    })
    
    if (user) {
      console.log('✅ User found in database')
      const passwordMatch = await bcrypt.compare('password123', user.password)
      console.log(`🔐 Password 'password123' matches: ${passwordMatch ? 'Yes' : 'No'}`)
      
      if (!passwordMatch) {
        console.log('⚠️  Password mismatch! Updating user password...')
        const newHashedPassword = await bcrypt.hash('password123', 12)
        await prisma.user.update({
          where: { id: user.id },
          data: { password: newHashedPassword }
        })
        console.log('✅ User password updated to: password123')
      }
    } else {
      console.log('❌ User not found')
    }
    
    console.log('\n🎯 Test credentials:')
    console.log('Admin: admin@partnergize.com / admin123')
    console.log('User: john.doe@example.com / password123')
    
  } catch (error) {
    console.error('❌ Error testing login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()
