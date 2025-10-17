<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-8">🔧 Authentication Debug Center</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Registration Test -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">Test Registration</h2>
          <form @submit.prevent="testRegistration" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input v-model="regForm.name" type="text" class="input-field" placeholder="John Doe" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input v-model="regForm.email" type="email" class="input-field" placeholder="john.doe@example.com" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
              <input v-model="regForm.phone" type="tel" class="input-field" placeholder="1234567890" required />
            </div>
            <button type="submit" :disabled="isTestingReg" class="btn-primary w-full">
              {{ isTestingReg ? 'Testing...' : 'Test Registration' }}
            </button>
          </form>
          <div v-if="regResult" class="mt-4 p-4 rounded" :class="regResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
            {{ regResult.message }}
          </div>
        </div>

        <!-- Login Test -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">Test Login</h2>
          <form @submit.prevent="testLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input v-model="loginForm.email" type="email" class="input-field" placeholder="john.doe@example.com" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input v-model="loginForm.password" type="password" class="input-field" placeholder="password123" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Type</label>
              <select v-model="loginForm.type" class="input-field">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" :disabled="isTestingLogin" class="btn-primary w-full">
              {{ isTestingLogin ? 'Testing...' : 'Test Login' }}
            </button>
          </form>
          <div v-if="loginResult" class="mt-4 p-4 rounded" :class="loginResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
            {{ loginResult.message }}
          </div>
        </div>
      </div>

      <!-- Token Status -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Token Status</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 bg-slate-100 rounded">
            <h3 class="font-semibold mb-2">Cookie Token</h3>
            <p class="text-sm">{{ cookieToken ? 'Present' : 'Missing' }}</p>
            <p v-if="cookieToken" class="text-xs font-mono break-all mt-2">{{ cookieToken }}</p>
          </div>
          <div class="p-4 bg-slate-100 rounded">
            <h3 class="font-semibold mb-2">LocalStorage Token</h3>
            <p class="text-sm">{{ localStorageToken ? 'Present' : 'Missing' }}</p>
            <p v-if="localStorageToken" class="text-xs font-mono break-all mt-2">{{ localStorageToken }}</p>
          </div>
          <div class="p-4 bg-slate-100 rounded">
            <h3 class="font-semibold mb-2">Token Test API</h3>
            <p class="text-sm">{{ tokenTestResult || 'Not tested' }}</p>
          </div>
        </div>
        <div class="mt-4 flex space-x-4">
          <button @click="checkTokens" class="btn-secondary">Refresh Status</button>
          <button @click="testTokenAPI" class="btn-secondary">Test Token API</button>
          <button @click="clearTokens" class="btn-secondary bg-red-500 hover:bg-red-600 text-white">Clear All Tokens</button>
        </div>
      </div>

      <!-- Navigation Test -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Navigation Test</h2>
        <div class="flex space-x-4">
          <button @click="goToUserDashboard" class="btn-outline">Go to User Dashboard</button>
          <button @click="goToAdminDashboard" class="btn-outline">Go to Admin Dashboard</button>
          <button @click="goToHome" class="btn-outline">Go to Home</button>
        </div>
      </div>

      <!-- Debug Logs -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Debug Logs</h2>
        <div class="bg-slate-900 text-green-400 p-4 rounded text-sm font-mono max-h-60 overflow-y-auto">
          <div v-for="(log, index) in logs" :key="index" class="mb-1">
            {{ log }}
          </div>
        </div>
        <button @click="clearLogs" class="mt-4 btn-secondary">Clear Logs</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  ssr: false
})

const regForm = ref({
  name: 'Test User',
  email: `test.user.${Date.now()}@example.com`,
  phone: '1234567890'
})

const loginForm = ref({
  email: 'john.doe@example.com',
  password: 'password123',
  type: 'user'
})

const isTestingReg = ref(false)
const isTestingLogin = ref(false)
const regResult = ref(null)
const loginResult = ref(null)
const tokenTestResult = ref('')

const cookieToken = ref('')
const localStorageToken = ref('')
const logs = ref([])

const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.push(`[${timestamp}] ${message}`)
  console.log(`[${timestamp}] ${message}`)
}

const checkTokens = () => {
  const cookie = useCookie('auth-token')
  cookieToken.value = cookie.value || ''
  localStorageToken.value = localStorage.getItem('auth-token') || ''
  
  addLog(`Token check - Cookie: ${cookieToken.value ? 'Present' : 'Missing'}, LocalStorage: ${localStorageToken.value ? 'Present' : 'Missing'}`)
}

const testTokenAPI = async () => {
  try {
    addLog('Testing token API...')
    const response = await $fetch('/api/auth/test')
    tokenTestResult.value = response.success ? 'Valid' : 'Invalid'
    addLog(`Token API result: ${JSON.stringify(response)}`)
  } catch (error) {
    tokenTestResult.value = 'Error'
    addLog(`Token API error: ${error.message}`)
  }
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
  isTestingReg.value = true
  regResult.value = null
  
  try {
    addLog(`Starting registration for: ${regForm.value.email}`)
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: regForm.value
    })
    
    addLog(`Registration response: ${JSON.stringify(response)}`)
    
    if (response.success) {
      addLog('Registration successful, storing token...')
      
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
        addLog('Token stored in localStorage')
      }
      
      regResult.value = {
        success: true,
        message: `✅ Registration successful! User: ${response.user.name} (${response.user.email})`
      }
      
      checkTokens()
      
    } else {
      regResult.value = {
        success: false,
        message: '❌ Registration failed: No success response'
      }
    }
  } catch (err: any) {
    addLog(`Registration error: ${err.message}`)
    regResult.value = {
      success: false,
      message: `❌ Registration failed: ${err.data?.statusMessage || err.message || 'Unknown error'}`
    }
  } finally {
    isTestingReg.value = false
  }
}

const testLogin = async () => {
  isTestingLogin.value = true
  loginResult.value = null
  
  try {
    addLog(`Starting ${loginForm.value.type} login for: ${loginForm.value.email}`)
    
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm.value
    })
    
    addLog(`Login response: ${JSON.stringify(response)}`)
    
    if (response.success) {
      addLog('Login successful, storing token...')
      
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
        addLog('Token stored in localStorage')
      }
      
      loginResult.value = {
        success: true,
        message: `✅ ${loginForm.value.type} login successful! User: ${response.user.name} (${response.user.email})`
      }
      
      checkTokens()
      
    } else {
      loginResult.value = {
        success: false,
        message: '❌ Login failed: No success response'
      }
    }
  } catch (err: any) {
    addLog(`Login error: ${err.message}`)
    loginResult.value = {
      success: false,
      message: `❌ Login failed: ${err.data?.statusMessage || err.message || 'Unknown error'}`
    }
  } finally {
    isTestingLogin.value = false
  }
}

const goToUserDashboard = () => {
  addLog('Navigating to user dashboard...')
  window.location.href = '/dashboard'
}

const goToAdminDashboard = () => {
  addLog('Navigating to admin dashboard...')
  window.location.href = '/admin/dashboard'
}

const goToHome = () => {
  addLog('Navigating to home...')
  window.location.href = '/'
}

const clearLogs = () => {
  logs.value = []
}

onMounted(() => {
  checkTokens()
  addLog('Auth debug page loaded')
})
</script>
