<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="flex items-center justify-center gap-3 mb-2">
          <h1 class="text-3xl font-bold text-primary">{{ t('app.name') }}</h1>
          <div class="flex items-center gap-1 bg-white border border-slate-200 rounded-full p-1">
            <button
              v-for="l in availableLocales"
              :key="l.code"
              type="button"
              @click="setLocale(l.code)"
              :class="['text-xs px-2 py-1 rounded-full', locale === l.code ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100']"
            >
              {{ l.label }}
            </button>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-slate-900">{{ t('auth.userLogin') }}</h2>
        <p class="mt-2 text-sm text-slate-600">{{ t('auth.signInToAccount') }}</p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-semibold text-slate-700 mb-2">{{ t('auth.email') }}</label>
            <input
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 mb-2">{{ t('auth.password') }}</label>
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Signing in...' : t('auth.signIn') }}</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-slate-500">{{ t('auth.dontHaveAccount') }}</span>
            </div>
          </div>
          <div class="mt-6 text-center">
            <NuxtLink to="/" class="text-primary hover:text-primary/80 font-medium">
              {{ t('auth.registerHere') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '~/composables/useI18n'

// Disable SSR for this page to prevent hydration mismatches
definePageMeta({
  ssr: false
})

const { t, availableLocales, locale, setLocale } = useI18n()
const form = ref({
  email: '',
  password: ''
})

const isSubmitting = ref(false)
const error = ref('')

const handleLogin = async () => {
  isSubmitting.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        ...form.value,
        type: 'user'
      }
    })
    
    if (response.success) {
      // Store token in localStorage as backup and write cookie proactively
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
        const secure = location.protocol === 'https:'
        document.cookie = `auth-token=${response.token}; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`
      }
      // Ensure cookie is present before navigating (retry briefly)
      const ensureCookie = async () => {
        for (let i = 0; i < 10; i++) {
          const hasCookie = document.cookie.split('; ').some(c => c.startsWith('auth-token='))
          if (hasCookie) return
          await new Promise(r => setTimeout(r, 50))
          // try rewrite in case browser deferred it
          if (response.token) {
            const secure = location.protocol === 'https:'
            document.cookie = `auth-token=${response.token}; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`
          }
        }
      }
      await ensureCookie()
      window.location.href = '/dashboard'
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Login failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
