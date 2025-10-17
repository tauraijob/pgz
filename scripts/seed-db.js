const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with sample data...')
  
  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        email: 'john.doe@example.com',
        name: 'John Doe',
        phone: '+1-555-0123',
        password: hashedPassword,
        isVerified: true,
        isActive: true,
        ariseVerified: false
      }
    }),
    
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        phone: '+1-555-0456',
        password: hashedPassword,
        isVerified: true,
        isActive: true,
        ariseVerified: true,
        verifiedAt: new Date()
      }
    }),
    
    prisma.user.upsert({
      where: { email: 'mike.johnson@example.com' },
      update: {},
      create: {
        email: 'mike.johnson@example.com',
        name: 'Mike Johnson',
        phone: '+1-555-0789',
        password: hashedPassword,
        isVerified: true,
        isActive: false,
        ariseVerified: false
      }
    })
  ])
  
  console.log('Created users:', users.length)
  
  // Get admin user
  const admin = await prisma.admin.findUnique({
    where: { email: 'admin@partnergize.com' }
  })
  
  if (admin) {
    // Create sample messages
    const messages = await Promise.all([
      prisma.message.upsert({
        where: { id: 'msg-1' },
        update: {},
        create: {
          id: 'msg-1',
          userId: users[0].id,
          adminId: admin.id,
          subject: 'Welcome to Partnergize!',
          content: 'Thank you for joining our platform. Please complete your Arise.com verification to get started with your work-from-home journey.',
          isRead: false
        }
      }),
      
      prisma.message.upsert({
        where: { id: 'msg-2' },
        update: {},
        create: {
          id: 'msg-2',
          userId: users[1].id,
          adminId: admin.id,
          subject: 'Next Steps After Verification',
          content: 'Congratulations on completing your Arise.com verification! Please check your email for the next steps and training schedule.',
          isRead: true
        }
      })
    ])
    
    console.log('Created messages:', messages.length)
  }
  
  console.log('Database seeding completed successfully!')
  console.log('\nSample user credentials:')
  console.log('Email: john.doe@example.com | Password: password123')
  console.log('Email: jane.smith@example.com | Password: password123')
  console.log('Email: mike.johnson@example.com | Password: password123')
  console.log('\nAdmin credentials:')
  console.log('Email: admin@partnergize.com | Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
