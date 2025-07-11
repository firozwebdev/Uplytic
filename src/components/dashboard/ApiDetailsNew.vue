<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ api.name }}</h3>
          <p class="text-sm text-gray-600 mt-1">{{ api.url }}</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <div class="text-sm text-gray-500">Status</div>
            <div class="flex items-center mt-1">
              <div
                class="h-2 w-2 rounded-full mr-2"
                :class="getStatusColor()"
              ></div>
              <span class="text-sm font-medium" :class="getStatusTextColor()">
                {{ getStatusText() }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">Last Check</div>
            <div class="text-sm font-medium text-gray-900">
              {{ formatLastCheck() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div class="flex items-center">
            <div class="p-2 bg-blue-500 rounded-lg mr-3">
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-900">
                {{ getApiStats().uptime }}%
              </div>
              <div class="text-sm text-blue-700">Uptime</div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4"
        >
          <div class="flex items-center">
            <div class="p-2 bg-green-500 rounded-lg mr-3">
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-green-900">
                {{ getApiStats().avgLatency }}ms
              </div>
              <div class="text-sm text-green-700">Avg Response Time</div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4"
        >
          <div class="flex items-center">
            <div class="p-2 bg-purple-500 rounded-lg mr-3">
              <svg
                class="h-5 w-5 text-white"
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
            </div>
            <div>
              <div class="text-2xl font-bold text-purple-900">
                {{ getApiStats().totalChecks }}
              </div>
              <div class="text-sm text-purple-700">Total Checks</div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4"
        >
          <div class="flex items-center">
            <div class="p-2 bg-orange-500 rounded-lg mr-3">
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-900">
                {{ getApiStats().errors }}
              </div>
              <div class="text-sm text-orange-700">Errors (24h)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Response Time Chart -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">
            Response Time (24h)
          </h4>
          <div
            class="h-64 flex items-center justify-center bg-gray-50 rounded-lg"
          >
            <div class="text-center">
              <svg
                class="h-16 w-16 text-gray-300 mx-auto mb-4"
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
              <p class="text-gray-500">Chart.js integration coming soon</p>
            </div>
          </div>
        </div>

        <!-- Status Distribution -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">
            Status Distribution
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">Success (2xx)</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{
                getApiStats().successCount
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">Client Error (4xx)</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{
                getApiStats().clientErrorCount
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-3 w-3 bg-red-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">Server Error (5xx)</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{
                getApiStats().serverErrorCount
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-3 w-3 bg-gray-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">Timeout/Network</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{
                getApiStats().timeoutCount
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h4>
        <div class="space-y-3">
          <div
            v-for="log in getRecentLogs()"
            :key="log.id"
            class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center">
              <div
                class="h-2 w-2 rounded-full mr-3"
                :class="getLogStatusColor(log)"
              ></div>
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ log.status }} - {{ log.responseTime }}ms
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatTimestamp(log.timestamp) }}
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-400">
              {{ log.url }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useApiStore } from "../../stores/api";

const props = defineProps({
  api: {
    type: Object,
    required: true,
  },
});

const apiStore = useApiStore();

const getApiStats = () => {
  return (
    apiStore.apiStats.find((stats) => stats.id === props.api.id) || {
      uptime: 99.8,
      avgLatency: 245,
      totalChecks: 1247,
      errors: 3,
      successCount: 1180,
      clientErrorCount: 45,
      serverErrorCount: 12,
      timeoutCount: 10,
      lastCheck: new Date().toISOString(),
    }
  );
};

const getStatusColor = () => {
  const stats = getApiStats();
  if (!stats.lastCheck) return "bg-gray-300";
  if (stats.errors > 0) return "bg-yellow-500";
  return "bg-green-500";
};

const getStatusTextColor = () => {
  const stats = getApiStats();
  if (!stats.lastCheck) return "text-gray-500";
  if (stats.errors > 0) return "text-yellow-700";
  return "text-green-700";
};

const getStatusText = () => {
  const stats = getApiStats();
  if (!stats.lastCheck) return "Unknown";
  if (stats.errors > 0) return "Warning";
  return "Healthy";
};

const formatLastCheck = () => {
  const stats = getApiStats();
  if (!stats.lastCheck) return "Never";
  const date = new Date(stats.lastCheck);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

const getRecentLogs = () => {
  return apiStore.logs.filter((log) => log.apiId === props.api.id).slice(0, 5);
};

const getLogStatusColor = (log) => {
  if (log.status >= 500) return "bg-red-500";
  if (log.status >= 400) return "bg-yellow-500";
  return "bg-green-500";
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
</script>
