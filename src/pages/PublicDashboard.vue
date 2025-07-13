<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Public Banner -->
    <div class="bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 text-center">
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
      <div v-if="loading" class="space-y-6">
        <!-- Loading Skeleton -->
        <div class="rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="animate-pulse">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
            <div class="flex items-center justify-center mb-6">
              <div class="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="animate-pulse">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
              <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="animate-pulse">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
              <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!api" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">API Not Found</h3>
        <p class="text-gray-500 dark:text-gray-400">
          The API you're looking for doesn't exist or is not publicly
          accessible.
        </p>
      </div>

      <div v-else class="space-y-6">
        <!-- API Header -->
        <div class="rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {{ api.name }}
              </h1>
              <p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg break-all">{{ api.url }}</p>
            </div>
            <div class="text-left sm:text-right">
              <div class="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
              <div class="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ formatLastUpdate }}
              </div>
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="flex items-center justify-center mb-6">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <div class="h-8 w-8 rounded-full" :class="statusColor"></div>
                <div v-if="apiStats.status < 400" class="absolute inset-0 h-8 w-8 rounded-full bg-green-500 animate-ping opacity-20"></div>
                <div v-else-if="apiStats.status >= 400" class="absolute inset-0 h-8 w-8 rounded-full bg-red-500 animate-ping opacity-20"></div>
              </div>
              <div class="text-center">
                <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {{ statusText }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ statusDescription }}</div>
              </div>
            </div>
          </div>

          <!-- KPI Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div class="text-center p-3 sm:p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
              <div class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
                {{ apiStats.uptime }}%
              </div>
              <div class="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">Uptime</div>
            </div>
            <div class="text-center p-3 sm:p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
              <div class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 transition-all duration-300">
                {{ apiStats.avgLatency }}ms
              </div>
              <div class="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">Avg Response</div>
            </div>
            <div class="text-center p-3 sm:p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
              <div class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-300">
                {{ apiStats.totalChecks }}
              </div>
              <div class="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                Total Checks
              </div>
            </div>
            <div class="text-center p-3 sm:p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
              <div class="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 transition-all duration-300">
                {{ downtimeCount }}
              </div>
              <div class="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                Downtime Events
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Response Time Chart -->
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Response Time (Last 24 Hours)
            </h3>
            <div v-if="responseTimeChartData.labels.length > 0" class="h-64">
              <Line
                :data="responseTimeChartData"
                :options="responseTimeChartOptions"
              />
            </div>
            <div v-else class="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4"
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
                <p>No data available</p>
              </div>
            </div>
          </div>

          <!-- Status Distribution -->
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Status Distribution
            </h3>
            <div v-if="statusDistributionData.labels.length > 0" class="h-64">
              <Doughnut
                :data="statusDistributionData"
                :options="statusDistributionOptions"
              />
            </div>
            <div v-else class="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4"
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
                <p>No data available</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <!-- Uptime Trend -->
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Uptime Trend</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Last Hour</span>
                <span class="text-sm font-semibold" :class="getUptimeColor(hourlyUptime)">
                  {{ hourlyUptime }}%
                </span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Last 24 Hours</span>
                <span class="text-sm font-semibold" :class="getUptimeColor(dailyUptime)">
                  {{ dailyUptime }}%
                </span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Last 7 Days</span>
                <span class="text-sm font-semibold" :class="getUptimeColor(weeklyUptime)">
                  {{ weeklyUptime }}%
                </span>
              </div>
            </div>
          </div>

          <!-- Response Time Stats -->
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Response Time Stats</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Average</span>
                <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">{{ apiStats.avgLatency }}ms</span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Min</span>
                <span class="text-sm font-semibold text-green-600 dark:text-green-400">{{ minLatency }}ms</span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Max</span>
                <span class="text-sm font-semibold text-red-600 dark:text-red-400">{{ maxLatency }}ms</span>
              </div>
            </div>
          </div>

          <!-- Error Analysis -->
          <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Error Analysis</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">4xx Errors</span>
                <span class="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{{ clientErrors }}</span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">5xx Errors</span>
                <span class="text-sm font-semibold text-red-600 dark:text-red-400">{{ serverErrors }}</span>
              </div>
              <div class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                <span class="text-sm text-gray-600 dark:text-gray-400">Network Errors</span>
                <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ networkErrors }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Response Time
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="log in recentLogs"
                  :key="log.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ formatTime(log.created_at) }}
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusClass(log.status_code)"
                    >
                      {{ log.status_code }}
                    </span>
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ log.latency_ms }}ms
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
            class="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border border-blue-200 dark:border-blue-800"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Powered by
              <span class="font-semibold text-blue-600 dark:text-blue-400">Uplytic</span> - API
              Health Monitor
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500">
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
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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

const apiLogs = computed(() => {
  if (!api.value) return []
  return apiStore.logs
    .filter(log => log.api_id === api.value.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
})

// Chart data computations
const responseTimeChartData = computed(() => {
  const logs = apiLogs.value.slice(-24) // Last 24 data points
  if (logs.length === 0) return { labels: [], datasets: [] }
  
  return {
    labels: logs.map(log => new Date(log.created_at).toLocaleTimeString()),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: logs.map(log => log.latency_ms),
        borderColor: document.documentElement.classList.contains('dark') ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        backgroundColor: document.documentElement.classList.contains('dark') ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: document.documentElement.classList.contains('dark') ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

const statusDistributionData = computed(() => {
  const logs = apiLogs.value
  if (logs.length === 0) return { labels: [], datasets: [] }
  
  const statusCounts = {
    '2xx Success': 0,
    '3xx Redirect': 0,
    '4xx Client Error': 0,
    '5xx Server Error': 0,
    'Network Error': 0
  }
  
  logs.forEach(log => {
    if (log.status_code === 0) statusCounts['Network Error']++
    else if (log.status_code < 300) statusCounts['2xx Success']++
    else if (log.status_code < 400) statusCounts['3xx Redirect']++
    else if (log.status_code < 500) statusCounts['4xx Client Error']++
    else statusCounts['5xx Server Error']++
  })
  
  return {
    labels: Object.keys(statusCounts).filter(key => statusCounts[key] > 0),
    datasets: [
      {
        data: Object.values(statusCounts).filter(value => value > 0),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 2
      }
    ]
  }
})

// Chart options
const responseTimeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#374151'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#374151'
      }
    }
  }
}

const statusDistributionOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#374151'
      }
    }
  }
}

// Performance metrics
const downtimeCount = computed(() => {
  if (!api.value) return 0
  return apiStore.logs.filter(log =>
    log.api_id === api.value.id && log.status_code >= 400
  ).length
})

const hourlyUptime = computed(() => {
  const logs = apiLogs.value.slice(-60) // Last 60 checks (1 hour)
  if (logs.length === 0) return 0
  const successful = logs.filter(log => log.status_code < 400).length
  return Math.round((successful / logs.length) * 100)
})

const dailyUptime = computed(() => {
  const logs = apiLogs.value.slice(-1440) // Last 1440 checks (24 hours)
  if (logs.length === 0) return 0
  const successful = logs.filter(log => log.status_code < 400).length
  return Math.round((successful / logs.length) * 100)
})

const weeklyUptime = computed(() => {
  const logs = apiLogs.value.slice(-10080) // Last 10080 checks (7 days)
  if (logs.length === 0) return 0
  const successful = logs.filter(log => log.status_code < 400).length
  return Math.round((successful / logs.length) * 100)
})

const minLatency = computed(() => {
  const logs = apiLogs.value
  if (logs.length === 0) return 0
  return Math.min(...logs.map(log => log.latency_ms))
})

const maxLatency = computed(() => {
  const logs = apiLogs.value
  if (logs.length === 0) return 0
  return Math.max(...logs.map(log => log.latency_ms))
})

const clientErrors = computed(() => {
  return apiLogs.value.filter(log => log.status_code >= 400 && log.status_code < 500).length
})

const serverErrors = computed(() => {
  return apiLogs.value.filter(log => log.status_code >= 500).length
})

const networkErrors = computed(() => {
  return apiLogs.value.filter(log => log.status_code === 0).length
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

const getUptimeColor = (uptime) => {
  if (uptime >= 99.9) return 'text-green-600'
  if (uptime >= 99) return 'text-blue-600'
  if (uptime >= 95) return 'text-yellow-600'
  return 'text-red-600'
}
</script>
