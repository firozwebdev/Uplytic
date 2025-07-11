<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Public Banner -->
    <div class="bg-blue-600 text-white py-3 px-4 text-center">
      <div class="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span class="text-sm font-medium"
          >Public Dashboard - Read Only View</span
        >
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Loading API status...</p>
      </div>

      <div v-else-if="!api" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">API Not Found</h3>
        <p class="text-gray-500">
          The API you're looking for doesn't exist or is not publicly
          accessible.
        </p>
      </div>

      <div v-else class="space-y-6">
        <!-- API Header -->
        <div class="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ api.name }}
              </h1>
              <p class="text-gray-500 text-lg">{{ api.url }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">Last Updated</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ formatLastUpdate }}
              </div>
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="flex items-center justify-center mb-6">
            <div class="flex items-center space-x-4">
              <div class="h-8 w-8 rounded-full" :class="statusColor"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">
                  {{ statusText }}
                </div>
                <div class="text-sm text-gray-500">{{ statusDescription }}</div>
              </div>
            </div>
          </div>

          <!-- KPI Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center p-4 rounded-xl bg-blue-50">
              <div class="text-3xl font-bold text-blue-600">
                {{ apiStats.uptime }}%
              </div>
              <div class="text-sm text-blue-700 font-medium">Uptime</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-green-50">
              <div class="text-3xl font-bold text-green-600">
                {{ apiStats.avgLatency }}ms
              </div>
              <div class="text-sm text-green-700 font-medium">Avg Response</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-purple-50">
              <div class="text-3xl font-bold text-purple-600">
                {{ apiStats.totalChecks }}
              </div>
              <div class="text-sm text-purple-700 font-medium">
                Total Checks
              </div>
            </div>
            <div class="text-center p-4 rounded-xl bg-orange-50">
              <div class="text-3xl font-bold text-orange-600">
                {{ downtimeCount }}
              </div>
              <div class="text-sm text-orange-700 font-medium">
                Downtime Events
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Response Time Chart -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Response Time (Last 24 Hours)
            </h3>
            <div class="h-64 flex items-center justify-center text-gray-500">
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p>Chart will be implemented with Chart.js</p>
              </div>
            </div>
          </div>

          <!-- Status Distribution -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Status Distribution
            </h3>
            <div class="h-64 flex items-center justify-center text-gray-500">
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                <p>Pie chart will be implemented</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="rounded-xl bg-white shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Response Time
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="log in recentLogs"
                  :key="log.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatTime(log.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusClass(log.status_code)"
                    >
                      {{ log.status_code }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ log.latency_ms }}ms
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ getStatusText(log.status_code) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center py-8">
          <div
            class="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
          >
            <p class="text-sm text-gray-600 mb-2">
              Powered by
              <span class="font-semibold text-blue-600">Uplytic</span> - API
              Health Monitor
            </p>
            <p class="text-xs text-gray-500">
              Built for DevNetwork Hackathon 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApiStore } from '../stores/api'

const route = useRoute()
const apiStore = useApiStore()
const loading = ref(true)
const api = ref(null)

onMounted(async () => {
  const uuid = route.params.uuid

  // Find API by UUID
  api.value = apiStore.apis.find(a => a.uuid === uuid)

  if (api.value && !api.value.is_public) {
    api.value = null // Not publicly accessible
  }

  loading.value = false
})

const apiStats = computed(() => {
  if (!api.value) return { uptime: 0, avgLatency: 0, totalChecks: 0 }
  return apiStore.apiStats.find(stats => stats.id === api.value.id) || {
    uptime: 0,
    avgLatency: 0,
    totalChecks: 0
  }
})

const recentLogs = computed(() => {
  if (!api.value) return []
  return apiStore.logs
    .filter(log => log.api_id === api.value.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 20)
})

const downtimeCount = computed(() => {
  if (!api.value) return 0
  return apiStore.logs.filter(log =>
    log.api_id === api.value.id && log.status_code >= 400
  ).length
})

const formatLastUpdate = computed(() => {
  if (!apiStats.value.lastCheck) return 'Never'
  const date = new Date(apiStats.value.lastCheck)
  return date.toLocaleString()
})

const statusColor = computed(() => {
  if (!apiStats.value.lastCheck) return 'bg-gray-300'
  if (apiStats.value.status >= 400) return 'bg-red-500'
  return 'bg-green-500'
})

const statusText = computed(() => {
  if (!apiStats.value.lastCheck) return 'Unknown'
  if (apiStats.value.status >= 400) return 'Down'
  return 'Operational'
})

const statusDescription = computed(() => {
  if (!apiStats.value.lastCheck) return 'No data available'
  if (apiStats.value.status >= 400) return 'Service is experiencing issues'
  return 'All systems operational'
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const getStatusClass = (statusCode) => {
  if (statusCode < 300) return 'bg-green-100 text-green-800'
  if (statusCode < 400) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getStatusText = (statusCode) => {
  if (statusCode < 300) return 'Success'
  if (statusCode < 400) return 'Redirect'
  if (statusCode < 500) return 'Client Error'
  return 'Server Error'
}
</script>
