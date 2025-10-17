const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...')
    
    // Check users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true
      }
    })
    
    console.log(`👥 Found ${users.length} users:`)
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Active: ${user.isActive}`)
    })
    
    // Check admins
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
    
    console.log(`👑 Found ${admins.length} admins:`)
    admins.forEach(admin => {
      console.log(`  - ${admin.name} (${admin.email})`)
    })
    
    // Create admin if none exists
    if (admins.length === 0) {
      console.log('⚠️  No admin found! Creating default admin...')
      
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const admin = await prisma.admin.create({
        data: {
          email: 'admin@partnergize.com',
          name: 'Admin User',
          password: hashedPassword
        }
      })
      
      console.log('✅ Admin created successfully!')
      console.log(`   Email: admin@partnergize.com`)
      console.log(`   Password: admin123`)
    }
    
    // Create test user if none exists
    if (users.length === 0) {
      console.log('⚠️  No users found! Creating test user...')
      
      const hashedPassword = await bcrypt.hash('password123', 12)
      
      const user = await prisma.user.create({
        data: {
          email: 'john.doe@example.com',
          name: 'John Doe',
          phone: '1234567890',
          password: hashedPassword
        }
      })
      
      console.log('✅ Test user created successfully!')
      console.log(`   Email: john.doe@example.com`)
      console.log(`   Password: password123`)
    }
    
  } catch (error) {
    console.error('❌ Error checking users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
