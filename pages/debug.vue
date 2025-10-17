<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Debug Login Issues</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Test Admin Login -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Test Admin Login</h2>
          <form @submit.prevent="testAdminLogin" class="space-y-4">
            <input v-model="adminForm.email" type="email" placeholder="Email" class="input-field" />
            <input v-model="adminForm.password" type="password" placeholder="Password" class="input-field" />
            <button type="submit" class="btn-primary w-full">Test Admin Login</button>
          </form>
          <div v-if="adminResult" class="mt-4 p-4 bg-slate-100 rounded">
            <pre>{{ JSON.stringify(adminResult, null, 2) }}</pre>
          </div>
        </div>

        <!-- Test User Login -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Test User Login</h2>
          <form @submit.prevent="testUserLogin" class="space-y-4">
            <input v-model="userForm.email" type="email" placeholder="Email" class="input-field" />
            <input v-model="userForm.password" type="password" placeholder="Password" class="input-field" />
            <button type="submit" class="btn-primary w-full">Test User Login</button>
          </form>
          <div v-if="userResult" class="mt-4 p-4 bg-slate-100 rounded">
            <pre>{{ JSON.stringify(userResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Current Cookie Status -->
      <div class="card p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Current Cookie Status</h2>
        <p><strong>Auth Token:</strong> {{ authToken || 'None' }}</p>
        <button @click="clearCookie" class="btn-secondary mt-4">Clear Cookie</button>
      </div>

      <!-- Test API Endpoints -->
      <div class="card p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Test API Endpoints</h2>
        <div class="space-y-4">
          <button @click="testUserProfile" class="btn-outline">Test User Profile API</button>
          <button @click="testAdminUsers" class="btn-outline">Test Admin Users API</button>
        </div>
        <div v-if="apiResult" class="mt-4 p-4 bg-slate-100 rounded">
          <pre>{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const adminForm = ref({
  email: 'admin@partnergize.com',
  password: 'admin123'
})

const userForm = ref({
  email: 'john.doe@example.com',
  password: 'password123'
})

const adminResult = ref(null)
const userResult = ref(null)
const apiResult = ref(null)
const authToken = ref('')

onMounted(() => {
  const token = useCookie('auth-token')
  authToken.value = token.value || 'None'
})

const testAdminLogin = async () => {
  try {
    const result = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        ...adminForm.value,
        type: 'admin'
      }
    })
    adminResult.value = result
    
    // Update token display
    const token = useCookie('auth-token')
    authToken.value = token.value || 'None'
  } catch (error: any) {
    adminResult.value = { error: error.data || error.message }
  }
}

const testUserLogin = async () => {
  try {
    const result = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        ...userForm.value,
        type: 'user'
      }
    })
    userResult.value = result
    
    // Update token display
    const token = useCookie('auth-token')
    authToken.value = token.value || 'None'
  } catch (error: any) {
    userResult.value = { error: error.data || error.message }
  }
}

const testUserProfile = async () => {
  try {
    const result = await $fetch('/api/user/profile')
    apiResult.value = result
  } catch (error: any) {
    apiResult.value = { error: error.data || error.message }
  }
}

const testAdminUsers = async () => {
  try {
    const result = await $fetch('/api/admin/users')
    apiResult.value = result
  } catch (error: any) {
    apiResult.value = { error: error.data || error.message }
  }
}

const clearCookie = () => {
  const token = useCookie('auth-token')
  token.value = null
  authToken.value = 'None'
}
</script>
