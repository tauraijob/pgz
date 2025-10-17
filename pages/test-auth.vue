<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Authentication Test</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Cookie Status -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Cookie Status</h2>
          <p><strong>Auth Token:</strong> {{ authToken || 'None' }}</p>
          <p><strong>Token Length:</strong> {{ authToken ? authToken.length : 0 }}</p>
          <button @click="checkCookie" class="btn-primary mt-4">Check Cookie</button>
        </div>

        <!-- Token Verification -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Token Verification</h2>
          <p><strong>Token Valid:</strong> {{ tokenValid ? 'Yes' : 'No' }}</p>
          <p><strong>User Type:</strong> {{ userType || 'None' }}</p>
          <p><strong>User ID:</strong> {{ userId || 'None' }}</p>
          <button @click="verifyToken" class="btn-primary mt-4">Verify Token</button>
        </div>
      </div>

      <!-- Test Login -->
      <div class="card p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Test Admin Login</h2>
        <form @submit.prevent="testLogin" class="space-y-4">
          <input v-model="testForm.email" type="email" placeholder="Email" class="input-field" />
          <input v-model="testForm.password" type="password" placeholder="Password" class="input-field" />
          <button type="submit" class="btn-primary">Test Login</button>
        </form>
        <div v-if="loginResult" class="mt-4 p-4 bg-slate-100 rounded">
          <pre>{{ JSON.stringify(loginResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- Navigation Test -->
      <div class="card p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Navigation Test</h2>
        <div class="space-y-4">
          <button @click="goToAdminDashboard" class="btn-outline">Go to Admin Dashboard</button>
          <button @click="goToUserDashboard" class="btn-outline">Go to User Dashboard</button>
          <button @click="clearCookie" class="btn-secondary">Clear Cookie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const authToken = ref('')
const tokenValid = ref(false)
const userType = ref('')
const userId = ref('')
const loginResult = ref(null)

const testForm = ref({
  email: 'admin@partnergize.com',
  password: 'admin123'
})

onMounted(() => {
  checkCookie()
})

const checkCookie = () => {
  const token = useCookie('auth-token')
  authToken.value = token.value || ''
  console.log('Cookie value:', token.value)
}

const verifyToken = async () => {
  if (!authToken.value) {
    console.log('No token to verify')
    return
  }
  
  try {
    const { verifyToken } = await import('~/lib/auth')
    const payload = verifyToken(authToken.value)
    
    if (payload) {
      tokenValid.value = true
      userType.value = payload.type
      userId.value = payload.id
      console.log('Token payload:', payload)
    } else {
      tokenValid.value = false
      userType.value = ''
      userId.value = ''
    }
  } catch (error) {
    console.error('Token verification error:', error)
    tokenValid.value = false
  }
}

const testLogin = async () => {
  try {
    const result = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        ...testForm.value,
        type: 'admin'
      }
    })
    loginResult.value = result
    
    // Check cookie after login
    setTimeout(() => {
      checkCookie()
      verifyToken()
    }, 100)
  } catch (error: any) {
    loginResult.value = { error: error.data || error.message }
  }
}

const goToAdminDashboard = () => {
  window.location.href = '/admin/dashboard'
}

const goToUserDashboard = () => {
  window.location.href = '/dashboard'
}

const clearCookie = () => {
  const token = useCookie('auth-token')
  token.value = null
  authToken.value = ''
  tokenValid.value = false
  userType.value = ''
  userId.value = ''
}
</script>
