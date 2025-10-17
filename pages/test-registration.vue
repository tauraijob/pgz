<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-8">🧪 Registration Test Page</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Registration Test -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">Test Registration</h2>
          <form @submit.prevent="testRegistration" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input v-model="form.name" type="text" class="input-field" placeholder="John Doe" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input v-model="form.email" type="email" class="input-field" placeholder="john.doe@example.com" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
              <input v-model="form.phone" type="tel" class="input-field" placeholder="1234567890" required />
            </div>
            <button type="submit" :disabled="isTesting" class="btn-primary w-full">
              {{ isTesting ? 'Testing...' : 'Test Registration' }}
            </button>
          </form>
          <div v-if="result" class="mt-4 p-4 rounded" :class="result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
            {{ result.message }}
          </div>
        </div>

        <!-- Token Status -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">Token Status</h2>
          <div class="space-y-2">
            <p><strong>Cookie Token:</strong> {{ cookieToken ? 'Present' : 'Missing' }}</p>
            <p><strong>LocalStorage Token:</strong> {{ localStorageToken ? 'Present' : 'Missing' }}</p>
            <p><strong>Token Value:</strong> {{ tokenValue || 'None' }}</p>
          </div>
          <div class="mt-4 flex space-x-4">
            <button @click="checkTokens" class="btn-secondary">Refresh Status</button>
            <button @click="clearTokens" class="btn-secondary bg-red-500 hover:bg-red-600 text-white">Clear All Tokens</button>
          </div>
        </div>
      </div>

      <!-- Navigation Test -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Navigation Test</h2>
        <div class="flex space-x-4">
          <button @click="goToDashboard" class="btn-outline">Go to User Dashboard</button>
          <button @click="goToHome" class="btn-outline">Go to Home</button>
        </div>
      </div>

      <!-- Registration Logs -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Registration Logs</h2>
        <div class="bg-slate-100 p-4 rounded text-sm font-mono max-h-40 overflow-y-auto">
          <div v-for="(log, index) in logs" :key="index" class="mb-1">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  ssr: false
})

const form = ref({
  name: 'Test User',
  email: `test.user.${Date.now()}@example.com`,
  phone: '1234567890'
})

const isTesting = ref(false)
const result = ref(null)
const logs = ref([])

const cookieToken = ref('')
const localStorageToken = ref('')
const tokenValue = ref('')

const addLog = (message: string) => {
  logs.value.push(`[${new Date().toLocaleTimeString()}] ${message}`)
}

const checkTokens = () => {
  const cookie = useCookie('auth-token')
  cookieToken.value = cookie.value || ''
  localStorageToken.value = localStorage.getItem('auth-token') || ''
  tokenValue.value = cookieToken.value || localStorageToken.value || ''
  
  addLog(`Token check - Cookie: ${cookieToken.value ? 'Present' : 'Missing'}, LocalStorage: ${localStorageToken.value ? 'Present' : 'Missing'}`)
}

const clearTokens = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  } catch (e) {
    // Ignore errors
  }
  
  if (process.client) {
    localStorage.removeItem('auth-token')
  }
  
  checkTokens()
  addLog('All tokens cleared')
}

const testRegistration = async () => {
  isTesting.value = true
  result.value = null
  
  try {
    addLog(`Starting registration for: ${form.value.email}`)
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value
    })
    
    addLog(`Registration response received: ${JSON.stringify(response)}`)
    
    if (response.success) {
      addLog('Registration successful, storing token...')
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
        addLog('Token stored in localStorage')
      }
      
      result.value = {
        success: true,
        message: `✅ Registration successful! User: ${response.user.name} (${response.user.email}) - You are now logged in!`
      }
      
      checkTokens()
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        addLog('Auto-redirecting to dashboard...')
        window.location.href = '/dashboard'
      }, 2000)
      
    } else {
      result.value = {
        success: false,
        message: '❌ Registration failed: No success response'
      }
    }
  } catch (err: any) {
    addLog(`Registration error: ${err.message}`)
    result.value = {
      success: false,
      message: `❌ Registration failed: ${err.data?.statusMessage || err.message || 'Unknown error'}`
    }
  } finally {
    isTesting.value = false
  }
}

const goToDashboard = () => {
  addLog('Navigating to dashboard...')
  window.location.href = '/dashboard'
}

const goToHome = () => {
  addLog('Navigating to home...')
  window.location.href = '/'
}

onMounted(() => {
  checkTokens()
  addLog('Test page loaded')
})
</script>
