<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-8">🔧 Login Test Page</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Admin Login Test -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">Admin Login Test</h2>
          <form @submit.prevent="testAdminLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input v-model="adminForm.email" type="email" class="input-field" placeholder="admin@partnergize.com" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input v-model="adminForm.password" type="password" class="input-field" placeholder="admin123" />
            </div>
            <button type="submit" :disabled="isTestingAdmin" class="btn-primary w-full">
              {{ isTestingAdmin ? 'Testing...' : 'Test Admin Login' }}
            </button>
          </form>
          <div v-if="adminResult" class="mt-4 p-4 rounded" :class="adminResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
            {{ adminResult.message }}
          </div>
        </div>

        <!-- User Login Test -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">User Login Test</h2>
          <form @submit.prevent="testUserLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input v-model="userForm.email" type="email" class="input-field" placeholder="john.doe@example.com" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input v-model="userForm.password" type="password" class="input-field" placeholder="password123" />
            </div>
            <button type="submit" :disabled="isTestingUser" class="btn-primary w-full">
              {{ isTestingUser ? 'Testing...' : 'Test User Login' }}
            </button>
          </form>
          <div v-if="userResult" class="mt-4 p-4 rounded" :class="userResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
            {{ userResult.message }}
          </div>
        </div>
      </div>

      <!-- Token Status -->
      <div class="mt-8 card p-6">
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

      <!-- Navigation Test -->
      <div class="mt-8 card p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Navigation Test</h2>
        <div class="flex space-x-4">
          <button @click="goToAdminDashboard" class="btn-outline">Go to Admin Dashboard</button>
          <button @click="goToUserDashboard" class="btn-outline">Go to User Dashboard</button>
          <button @click="goToHome" class="btn-outline">Go to Home</button>
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

const adminForm = ref({
  email: 'admin@partnergize.com',
  password: 'admin123'
})

const userForm = ref({
  email: 'john.doe@example.com',
  password: 'password123'
})

const isTestingAdmin = ref(false)
const isTestingUser = ref(false)
const adminResult = ref(null)
const userResult = ref(null)

const cookieToken = ref('')
const localStorageToken = ref('')
const tokenValue = ref('')

const checkTokens = () => {
  const cookie = useCookie('auth-token')
  cookieToken.value = cookie.value || ''
  localStorageToken.value = localStorage.getItem('auth-token') || ''
  tokenValue.value = cookieToken.value || localStorageToken.value || ''
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
}

const testAdminLogin = async () => {
  isTestingAdmin.value = true
  adminResult.value = null
  
  try {
    console.log('Testing admin login...')
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { ...adminForm.value, type: 'admin' }
    })
    
    console.log('Admin login response:', response)
    
    if (response.success) {
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
      }
      
      adminResult.value = {
        success: true,
        message: `✅ Admin login successful! User: ${response.user.name} (${response.user.email})`
      }
      
      checkTokens()
    } else {
      adminResult.value = {
        success: false,
        message: '❌ Admin login failed: No success response'
      }
    }
  } catch (err: any) {
    console.error('Admin login error:', err)
    adminResult.value = {
      success: false,
      message: `❌ Admin login failed: ${err.data?.statusMessage || err.message || 'Unknown error'}`
    }
  } finally {
    isTestingAdmin.value = false
  }
}

const testUserLogin = async () => {
  isTestingUser.value = true
  userResult.value = null
  
  try {
    console.log('Testing user login...')
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { ...userForm.value, type: 'user' }
    })
    
    console.log('User login response:', response)
    
    if (response.success) {
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
      }
      
      userResult.value = {
        success: true,
        message: `✅ User login successful! User: ${response.user.name} (${response.user.email})`
      }
      
      checkTokens()
    } else {
      userResult.value = {
        success: false,
        message: '❌ User login failed: No success response'
      }
    }
  } catch (err: any) {
    console.error('User login error:', err)
    userResult.value = {
      success: false,
      message: `❌ User login failed: ${err.data?.statusMessage || err.message || 'Unknown error'}`
    }
  } finally {
    isTestingUser.value = false
  }
}

const goToAdminDashboard = () => {
  window.location.href = '/admin/dashboard'
}

const goToUserDashboard = () => {
  window.location.href = '/dashboard'
}

const goToHome = () => {
  window.location.href = '/'
}

onMounted(() => {
  checkTokens()
})
</script>
