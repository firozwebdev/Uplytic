<template>
  <DashboardLayout>
    <!-- Welcome Section -->
    <div class="mb-8">
      <div
        class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Welcome to Uplytic</h1>
            <p class="text-blue-100 text-lg">
              Monitor your APIs in real-time with beautiful insights and
              analytics
            </p>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <div class="text-2xl font-bold">{{ apiStore.apis.length }}</div>
                <div class="text-blue-100 text-sm">APIs Monitored</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">{{ totalChecks }}</div>
                <div class="text-blue-100 text-sm">Total Checks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Management Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Your APIs</h2>
        <button
          @click="showAddApiModal = true"
          class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New API
        </button>
      </div>

      <!-- API Cards Grid -->
      <div v-if="apiStore.apis.length === 0" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No APIs added yet
        </h3>
        <p class="text-gray-500 mb-6">
          Get started by adding your first API endpoint to monitor
        </p>
        <button
          @click="showAddApiModal = true"
          class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Your First API
        </button>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="api in apiStore.apis"
          :key="api.id"
          class="group relative rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
          :class="
            apiStore.selectedApiId === api.id ? 'ring-2 ring-blue-500' : ''
          "
          @click="apiStore.selectApi(api.id)"
        >
          <!-- Status Indicator -->
          <div class="absolute top-4 right-4">
            <div
              class="h-3 w-3 rounded-full"
              :class="getStatusColor(api)"
            ></div>
          </div>

          <!-- API Info -->
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ api.name }}
            </h3>
            <p class="text-sm text-gray-500 truncate">{{ api.url }}</p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-2xl font-bold text-gray-900">
                {{ getApiStats(api.id).uptime }}%
              </div>
              <div class="text-xs text-gray-500">Uptime</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">
                {{ getApiStats(api.id).avgLatency }}ms
              </div>
              <div class="text-xs text-gray-500">Avg Latency</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <button
                @click.stop="editApi(api)"
                class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click.stop="deleteApi(api.id)"
                class="rounded-lg p-2 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div class="text-xs text-gray-400">
              {{ formatLastCheck(getApiStats(api.id).lastCheck) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected API Details -->
    <div v-if="apiStore.selectedApi" class="mb-8">
      <ApiDetails :api="apiStore.selectedApi" />
    </div>

    <!-- Add API Modal -->
    <AddApiModal
      v-if="showAddApiModal"
      @close="showAddApiModal = false"
      @api-added="onApiAdded"
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, computed mport AddApiModal from '../components/ui/AddApiModal.vue'

const apiStore = useApiStore()
const showAddApiModal = ref(false)

const totalChecks = computed(() => {
  return apiStore.logs.length
})

const getApiStats = (apiId) => {
  return apiStore.apiStats.find(stats => stats.id === apiId) || {
    uptime: 0,
    avgLatency: 0,
    lastCheck: null
  }
}

const getStatusColor = (api) => {
  const stats = getApiStats(api.id)
  if (!stats.lastCheck) return 'bg-gray-300'
  if (stats.status >= 400) return 'bg-red-500'
  return 'bg-green-500'
}

const formatLastCheck = (timestamp) => {
  if (!timestamp) return 'Never'
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}

const editApi = (api) => {
  // TODO: Implement edit functionality
  console.log('Edit API:', api)
}

const deleteApi = (apiId) => {
  if (confirm('Are you sure you want to delete this API?')) {
    apiStore.deleteApi(apiId)
  }
}

const onApiAdded = (api) => {
  showAddApiModal.value = false
  // TODO: Start polling for the new API
}
</script>
