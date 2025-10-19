// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  ssr: true,

  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/@prisma/client/index.js',
        '.prisma/client/default': './node_modules/@prisma/client/default.js',
        '.prisma/client': './node_modules/@prisma/client',
        '.prisma': './node_modules/.prisma'
      }
    },
    optimizeDeps: {
      exclude: ['@prisma/client', '.prisma/client/index-browser']
    },
    ssr: {
      noExternal: ['@prisma/client']
    }
  },

  nitro: {
    experimental: { wasm: true },
    alias: {
      ".prisma/client/index-browser": "./node_modules/@prisma/client/index.js"
    }
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    databaseUrl: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/partnergize',
    // Mailtrap Sandbox SMTP defaults (can be overridden by env)
    emailHost: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    emailPort: Number(process.env.EMAIL_PORT || 2525),
    emailUser: process.env.EMAIL_USER || 'f96972e2dba277',
    emailPass: process.env.EMAIL_PASS || 'af9ab0ba3b32ab',
    public: {
      ariseLink: process.env.ARISE_LINK || 'https://ariseworkfromhome.com'
    }
  },
})
