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

  nitro: {
    experimental: {
      wasm: true
    },
    alias: {
      ".prisma/client/index-browser": "./node_modules/@prisma/client/index.js"
    }
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    databaseUrl: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/partnergize',
    emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
    emailPort: process.env.EMAIL_PORT || 587,
    emailUser: process.env.EMAIL_USER || '',
    emailPass: process.env.EMAIL_PASS || '',
    public: {
      ariseLink: process.env.ARISE_LINK || 'https://ariseworkfromhome.com'
    }
  },
})
