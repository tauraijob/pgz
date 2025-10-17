const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Initializing database...')
  
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@partnergize.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword
    }
  })
  
  console.log('Admin user created:', admin.email)
  console.log('Default admin credentials:')
  console.log('Email:', adminEmail)
  console.log('Password:', adminPassword)
  console.log('Please change these credentials in production!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
