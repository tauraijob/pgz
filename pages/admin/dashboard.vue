<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-slate-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-900 mb-2">Loading Admin Dashboard</h2>
        <p class="text-slate-600">Please wait while we verify your access...</p>
      </div>
    </div>

    <!-- Main Dashboard Content -->
<div v-if="!isLoading">
    <!-- Toasts -->
    <transition-group
      tag="div"
      class="fixed top-4 right-4 z-[60] space-y-3"
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="[
          'w-80 rounded-xl shadow-lg border px-4 py-3 bg-white flex items-start gap-3',
          t.type === 'success' ? 'border-green-200' : t.type === 'error' ? 'border-red-200' : 'border-slate-200'
        ]"
      >
        <div :class="[
            'mt-0.5 rounded-md p-1.5',
            t.type === 'success' ? 'bg-green-100 text-green-700' : t.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
          ]">
          <svg v-if="t.type==='success'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="t.type==='error'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
        <div class="text-sm text-slate-800 flex-1">
          {{ t.message }}
        </div>
        <button class="text-slate-400 hover:text-slate-600" @click="removeToast(t.id)">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-3">
            <img src="/brand/logo.png" alt="Partnergize" class="h-22 w-20 rounded-xl object-contain bg-white/70 p-1 shadow translate-y-1 -mb-1" />
            <h1 class="text-2xl font-bold text-primary">Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">Welcome, Admin</span>
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
      <!-- Stats Overview -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 group hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Total Users</h3>
              <p class="text-2xl font-bold text-primary">{{ users.length }}</p>
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
              <h3 class="text-lg font-semibold text-slate-900">Verified Users</h3>
              <p class="text-2xl font-bold text-green-600">{{ verifiedUsers }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 group hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Pending Verification</h3>
              <p class="text-2xl font-bold text-amber-600">{{ pendingVerification }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 group hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-slate-900">Inactive Users</h3>
              <p class="text-2xl font-bold text-red-600">{{ inactiveUsers }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card">
        <div class="px-6 py-4 border-b border-slate-200">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">User Management</h3>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Verification</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-medium">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-slate-900">{{ user.name }}</div>
                      <div class="text-sm text-slate-500">{{ user.email }}</div>
                      <div class="text-sm text-slate-500">{{ user.phone }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="user.isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'"
                    class="inline-flex px-3 py-1 text-xs font-semibold rounded-full border"
                  >
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="user.ariseVerified ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'"
                    class="inline-flex px-3 py-1 text-xs font-semibold rounded-full border"
                  >
                    {{ user.ariseVerified ? 'Verified' : 'Pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="openMessageModal(user)"
                      class="inline-flex items-center gap-1 h-8 px-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                      title="Message user"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-xs">Message</span>
                    </button>
                    <button 
                      @click="toggleUserStatus(user)"
                      :class="user.isActive ? 'border-red-300 text-red-700 hover:bg-red-50' : 'border-green-300 text-green-700 hover:bg-green-50'"
                      class="inline-flex items-center gap-1 h-8 px-3 rounded-full border transition-colors"
                      :title="user.isActive ? 'Deactivate user' : 'Activate user'"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-xs">{{ user.isActive ? 'Deactivate' : 'Activate' }}</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click.self="closeMessageModal">
      <div class="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Send Message</h3>
          </div>
          <button @click="closeMessageModal" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="sendMessage" class="space-y-6">
          <div class="bg-slate-50 p-4 rounded-lg">
            <label class="block text-sm font-semibold text-slate-700 mb-1">To: {{ selectedUser?.name }}</label>
            <p class="text-sm text-slate-500">{{ selectedUser?.email }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
            <input 
              v-model="messageForm.subject"
              type="text" 
              required
              class="input-field"
              placeholder="Enter message subject"
              ref="subjectInputRef"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Message</label>
            <textarea 
              v-model="messageForm.content"
              required
              rows="4"
              class="input-field resize-none"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Attachments</label>
            <input
              type="file"
              multiple
              @change="onFilesSelected"
              class="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
            <div v-if="selectedFiles.length" class="mt-2 space-y-1">
              <div v-for="(file, idx) in selectedFiles" :key="idx" class="text-xs text-slate-600 truncate">{{ file.name }} ({{ Math.ceil(file.size/1024) }} KB)</div>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              type="submit"
              :disabled="isSending"
              class="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <svg v-if="!isSending" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSending ? 'Sending...' : 'Send Message' }}</span>
            </button>
            <button 
              type="button"
              @click="closeMessageModal"
              class="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// No middleware - completely disabled
definePageMeta({
  ssr: false
})

const users = ref([])
const showMessageModal = ref(false)
const subjectInputRef = ref<HTMLInputElement | null>(null)
const selectedUser = ref(null)
const isSending = ref(false)
const isLoading = ref(true)

const messageForm = ref({
  subject: '',
  content: ''
})
const selectedFiles = ref<File[]>([])

const verifiedUsers = computed(() => {
  return users.value.filter(user => user.ariseVerified).length
})

const pendingVerification = computed(() => {
  return users.value.filter(user => !user.ariseVerified).length
})

const inactiveUsers = computed(() => {
  return users.value.filter(user => !user.isActive).length
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

// Authentication is now handled by middleware

const loadUsers = async () => {
  try {
    const response = await $fetch('/api/admin/users')
    if (response.success) {
      users.value = response.users
    }
  } catch (error) {
    console.error('Failed to load users:', error)
  }
}

const openMessageModal = (user: any) => {
  selectedUser.value = user
  messageForm.value = {
    subject: '',
    content: ''
  }
  showMessageModal.value = true
  // lock body scroll
  if (process.client) document.body.style.overflow = 'hidden'
  // focus subject input next tick
  queueMicrotask(() => subjectInputRef.value?.focus())
}

const closeMessageModal = () => {
  showMessageModal.value = false
  selectedUser.value = null
  messageForm.value = {
    subject: '',
    content: ''
  }
  selectedFiles.value = []
  // unlock body scroll
  if (process.client) document.body.style.overflow = ''
}

const sendMessage = async () => {
  isSending.value = true
  
  try {
    const formData = new FormData()
    formData.append('userId', selectedUser.value.id)
    formData.append('subject', messageForm.value.subject)
    formData.append('content', messageForm.value.content)
    for (const file of selectedFiles.value) {
      formData.append('attachments', file, file.name)
    }

    const response = await $fetch('/api/admin/send-message', {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      // toast
      // eslint-disable-next-line no-console
      console.log('Message sent successfully!')
      showToast('Message sent successfully!', 'success')
      closeMessageModal()
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    showToast('Failed to send message. Please try again.', 'error')
  } finally {
    isSending.value = false
  }
}

const onFilesSelected = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  selectedFiles.value = Array.from(input.files)
}

const toggleUserStatus = async (user: any) => {
  try {
    const response = await $fetch('/api/admin/toggle-user', {
      method: 'POST',
      body: {
        userId: user.id,
        isActive: !user.isActive
      }
    })
    
    if (response.success) {
      const newState = !user.isActive
      user.isActive = newState
      showToast(`User ${newState ? 'activated' : 'deactivated'} successfully!`, 'success')
    }
  } catch (error) {
    console.error('Failed to toggle user status:', error)
    showToast('Failed to update user status. Please try again.', 'error')
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
    window.location.href = '/admin/login'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const checkAuth = async () => {
  try {
    // Ask server to validate cookie-hosted token
    const res = await $fetch('/api/auth/test')
    if (!res.success) {
      window.location.href = '/admin/login'
      return false
    }
    // Extra guard: ensure the token type is admin if payload exists
    if (res.payload && res.payload.type !== 'admin') {
      window.location.href = '/admin/login'
      return false
    }
    return true
  } catch (e) {
    window.location.href = '/admin/login'
    return false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showMessageModal.value) {
    closeMessageModal()
  }
}

onMounted(async () => {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) return
  await loadUsers()
  isLoading.value = false
  if (process.client) {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>
