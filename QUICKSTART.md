# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Prerequisites
- Node.js 18+ installed
- XAMPP with MySQL running
- Git

### 2. Setup Database
1. Start XAMPP
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create database: `partnergize`

### 3. Install & Configure
```bash
# Install dependencies
npm install

# Copy environment file
copy env.example .env

# Edit .env file - update database URL:
DATABASE_URL="mysql://root:@localhost:3306/partnergize"
```

### 4. Initialize Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create admin user
npm run db:init
```

### 5. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000

## 🔑 Default Admin Login
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@partnergize.com
- **Password**: admin123

## 📧 Email Setup (Optional)
To enable email notifications, update your `.env` file:
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

## 🎯 Test the Flow
1. Visit landing page
2. Click "Get Started" and register
3. Check email for Arise.com instructions
4. Login as admin to see the user
5. Send a message to the user

## 🛠️ Troubleshooting
- **Database connection error**: Check XAMPP is running and database exists
- **Port 3000 in use**: Kill other processes or change port in nuxt.config.ts
- **Email not working**: Check email credentials in .env file

## 📱 Features Ready
✅ Landing page with all sections
✅ User registration & auto-login
✅ User dashboard with verification
✅ Admin dashboard with user management
✅ Email notifications
✅ Arise.com integration
✅ Message system
✅ Responsive design
