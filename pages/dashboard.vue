<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-slate-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-900 mb-2">Loading Dashboard</h2>
        <p class="text-slate-600">Please wait while we load your data...</p>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div v-if="!isLoading">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-3">
            <img src="/brand/logo.png" alt="Partnergize" class="h-22 w-20 rounded-xl object-contain bg-white/70 p-1 shadow translate-y-1 -mb-1" />
            <h1 class="text-2xl font-bold text-primary">Partnergize</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">Welcome, {{ user?.name }}</span>
            </div>
            <button 
              @click="handleLogout"
              class="btn-secondary text-sm px-4 py-2 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
        <p class="text-gray-600">Track your progress and manage your work-from-home journey.</p>
      </div>

      <!-- Status Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 group hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Account Status</h3>
              <p class="text-sm text-slate-600">{{ user?.isActive ? 'Active' : 'Inactive' }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 group hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Arise Verification</h3>
              <p class="text-sm text-slate-600">{{ user?.ariseVerified ? 'Verified' : 'Pending' }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 group hover:scale-105 transition-transform duration-300 cursor-pointer" @click="openMessagesModal" title="View messages">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Messages</h3>
              <p class="text-sm text-slate-600">{{ unreadMessages }} unread</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Arise Verification Section -->
        <div class="card p-8">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900">Arise.com Verification</h3>
          </div>
          
          <div v-if="!user?.ariseVerified" class="space-y-6">
            <div class="bg-gradient-to-r from-primary/10 to-blue-50 p-6 rounded-xl border border-primary/20">
              <h4 class="font-semibold text-primary mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Next Steps:
              </h4>
              <ol class="list-decimal list-inside text-sm text-slate-700 space-y-2">
                <li>Complete your registration on Arise.com</li>
                <li>Use referral code: <span class="font-bold text-primary">6525094</span></li>
                <li>Use service partner ID: <span class="font-bold text-primary">1220816</span></li>
                <li>Upload a screenshot of your verification</li>
              </ol>
            </div>
            
            <div class="space-y-4">
              <a 
                :href="ariseLink" 
                target="_blank"
                class="block w-full btn-primary text-center flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span>Go to Arise.com Registration</span>
              </a>
              
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Upload Verification Screenshot</label>
                <input 
                  v-model="verificationImage"
                  type="url" 
                  placeholder="Paste screenshot URL here"
                  class="input-field"
                />
                <p class="text-xs text-slate-500 mt-2">Upload your screenshot to an image hosting service and paste the URL here</p>
              </div>
              
              <button 
                @click="submitVerification"
                :disabled="!verificationImage || isSubmitting"
                class="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Submitting...' : 'Submit Verification' }}</span>
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-green-900 mb-3">Verification Complete!</h4>
              <p class="text-green-700 mb-4">You have successfully verified your Arise.com account. Our admin team will review your submission and send you the next steps.</p>
              <p class="text-sm text-green-600 font-medium">Verified on: {{ formatDate(user?.verifiedAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Messages Section -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Messages from Admin</h3>
          
          <div v-if="messages.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <p class="text-gray-500">No messages yet</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="message in messages" 
              :key="message.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-900">{{ message.subject }}</h4>
                <span class="text-sm text-gray-500">{{ formatDate(message.createdAt) }}</span>
              </div>
              <p class="text-gray-600 text-sm">{{ message.content }}</p>
              <div v-if="!message.isRead" class="mt-2">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

  <!-- Messages Modal -->
  <div v-if="showMessagesModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click.self="closeMessagesModal">
    <div class="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Your Messages</h3>
        </div>
        <button @click="closeMessagesModal" class="text-slate-400 hover:text-slate-600" aria-label="Close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="grid md:grid-cols-3 gap-0">
        <!-- Message list -->
        <div class="md:border-r border-slate-200 max-h-[60vh] overflow-y-auto">
          <div 
            v-for="(msg, idx) in messages" 
            :key="msg.id"
            @click="activeMessageIndex = idx"
            :class="['px-5 py-4 cursor-pointer border-b border-slate-100 transition-colors', activeMessageIndex === idx ? 'bg-slate-50' : 'hover:bg-slate-50']"
          >
            <div class="flex items-start justify-between">
              <h4 class="text-sm font-semibold text-slate-900 truncate pr-3">{{ msg.subject }}</h4>
              <span v-if="!msg.isRead" class="ml-2 inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">New</span>
            </div>
            <p class="mt-1 text-xs text-slate-500">{{ formatDate(msg.createdAt) }}</p>
            <p class="mt-2 text-sm text-slate-600 line-clamp-2">{{ msg.content }}</p>
          </div>
          <div v-if="messages.length === 0" class="p-6 text-center text-slate-500 text-sm">No messages yet</div>
        </div>

        <!-- Message content -->
        <div class="md:col-span-2 max-h-[60vh] overflow-y-auto p-6">
          <div v-if="activeMessage">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="text-lg font-semibold text-slate-900">{{ activeMessage.subject }}</h4>
                <p class="text-xs text-slate-500">{{ formatDate(activeMessage.createdAt) }}</p>
              </div>
              <button 
                v-if="!activeMessage.isRead" 
                @click="markActiveAsRead"
                class="text-xs px-3 py-1 rounded-full border border-green-300 text-green-700 hover:bg-green-50"
              >
                Mark as read
              </button>
            </div>
            <p class="text-slate-700 whitespace-pre-wrap leading-relaxed">{{ activeMessage.content }}</p>
            <div v-if="activeMessage.attachments?.length" class="mt-4">
              <h5 class="text-sm font-semibold text-slate-900 mb-2">Attachments</h5>
              <ul class="space-y-1">
                <li v-for="att in activeMessage.attachments" :key="att.id">
                  <a :href="att.path" target="_blank" class="text-primary hover:underline text-sm">
                    {{ att.filename }}
                  </a>
                  <span v-if="att.size" class="text-xs text-slate-500"> ({{ Math.ceil(att.size/1024) }} KB)</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="text-center text-slate-500 text-sm">Select a message to read.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// No middleware - completely disabled
definePageMeta({
  ssr: false
})

const user = ref(null)
const messages = ref([])
const showMessagesModal = ref(false)
const activeMessageIndex = ref<number | null>(null)
const activeMessage = computed(() => {
  if (activeMessageIndex.value == null) return null
  return messages.value[activeMessageIndex.value] || null
})
const verificationImage = ref('')
const isSubmitting = ref(false)
const isLoading = ref(true)
const ariseLink = ref('https://ariseworkfromhome.com')

const unreadMessages = computed(() => {
  return messages.value.filter(msg => !msg.isRead).length
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

const writeCookieFromLocalIfMissing = async (): Promise<boolean> => {
  if (!process.client) return false
  const hasCookie = document.cookie.split('; ').some(c => c.startsWith('auth-token='))
  if (hasCookie) return false
  const token = localStorage.getItem('auth-token')
  if (!token) return false
  const secure = location.protocol === 'https:'
  document.cookie = `auth-token=${token}; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`
  await new Promise(r => setTimeout(r, 50))
  return true
}

const loadUserData = async () => {
  try {
    const token = process.client ? localStorage.getItem('auth-token') : null
    const response = await $fetch('/api/user/profile', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
    if (response.success) {
      user.value = response.user
      return
    }
  } catch (error: any) {
    console.error('Failed to load user data (1st try):', error)
    // Fallback: write cookie from localStorage and retry once
    const wrote = await writeCookieFromLocalIfMissing()
    if (wrote) {
      try {
        const response2 = await $fetch('/api/user/profile', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        if (response2.success) {
          user.value = response2.user
          return
        }
      } catch (error2) {
        console.error('Failed to load user data (2nd try):', error2)
      }
    }
  }
  // If we reach here, do not redirect; keep dashboard shell and show minimal state
  console.warn('User profile could not be loaded after retries; staying on dashboard shell')
}

const loadMessages = async () => {
  try {
    const token = process.client ? localStorage.getItem('auth-token') : null
    const res = await $fetch('/api/user/messages', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
    if (res.success) {
      messages.value = res.messages
    }
  } catch (error) {
    console.error('Failed to load messages:', error)
  }
}

const openMessagesModal = () => {
  showMessagesModal.value = true
  if (messages.value.length > 0) {
    activeMessageIndex.value = 0
  }
}

const closeMessagesModal = () => {
  showMessagesModal.value = false
}

const markActiveAsRead = async () => {
  if (activeMessageIndex.value == null) return
  const msg = messages.value[activeMessageIndex.value]
  if (!msg || msg.isRead) return
  try {
    const token = process.client ? localStorage.getItem('auth-token') : null
    await $fetch('/api/user/messages-read', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: { messageId: msg.id }
    })
    msg.isRead = true
  } catch (e) {
    console.error('Failed to mark as read', e)
  }
}

const submitVerification = async () => {
  isSubmitting.value = true
  
  try {
    const response = await $fetch('/api/user/verify-arise', {
      method: 'POST',
      body: {
        verificationImage: verificationImage.value
      }
    })
    
    if (response.success) {
      user.value.ariseVerified = true
      user.value.verifiedAt = new Date().toISOString()
      verificationImage.value = ''
      alert('Verification submitted successfully!')
    }
  } catch (error) {
    console.error('Verification failed:', error)
    alert('Verification failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    // Clear localStorage as well
    if (process.client) {
      localStorage.removeItem('auth-token')
    }
    window.location.href = '/'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const checkAuth = async () => {
  // First attempt: validate cookie on server
  const validate = async () => {
    try {
      const token = process.client ? localStorage.getItem('auth-token') : null
      const res = await $fetch('/api/auth/test', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
      return !!(res && res.success && (!res.payload || res.payload.type === 'user'))
    } catch {
      return false
    }
  }

  let ok = await validate()
  if (ok) return true

  // Fallback: if cookie not present yet, restore from localStorage and retry once
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    if (token) {
      const secure = location.protocol === 'https:'
      document.cookie = `auth-token=${token}; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`
      // tiny delay to allow cookie write
      await new Promise(r => setTimeout(r, 50))
      ok = await validate()
      if (ok) return true
    }
  }

  window.location.href = '/login'
  return false
}

onMounted(async () => {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) return
  await loadUserData()
  await loadMessages()
  isLoading.value = false
})
</script>
