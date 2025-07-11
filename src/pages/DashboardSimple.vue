<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Uplytic Dashboard</h1>
            <p class="text-gray-600">API Health Monitoring</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500"
              >{{ apiStore.apis.length }} APIs</span
            >
            <span class="text-sm text-gray-500">{{ totalChecks }} Checks</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <div
          class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl"
        >
          <h2 class="text-3xl font-bold mb-2">Welcome to Uplytic</h2>
          <p class="text-blue-100 text-lg">
            Monitor your APIs in real-time with beautiful insights and analytics
          </p>
        </div>
      </div>

      <!-- API Cards -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="api in apiStore.apis"
          :key="api.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
          @click="selectApi(api.id)"
        >
          <!-- Status Indicator -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ api.name }}</h3>
            <div class="h-3 w-3 rounded-full bg-green-500"></div>
          </div>

          <p class="text-sm text-gray-500 mb-4 truncate">{{ api.url }}</p>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
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
        </div>
      </div>

      <!-- Selected API Details -->
      <div v-if="selectedApi" class="mt-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ selectedApi.name }}
          </h3>
          <p class="text-gray-600 mb-4">{{ selectedApi.url }}</p>

          <!-- KPI Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="text-center p-4 rounded-lg bg-blue-50">
              <div class="text-2xl font-bold text-blue-600">
                {{ getApiStats(selectedApi.id).uptime }}%
              </div>
              <div class="text-sm text-blue-700">Uptime</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-green-50">
              <div class="text-2xl font-bold text-green-600">
                {{ getApiStats(selectedApi.id).avgLatency }}ms
              </div>
              <div class="text-sm text-green-700">Avg Latency</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-purple-50">
              <div class="text-2xl font-bold text-purple-600">
                {{ getApiStats(selectedApi.id).totalChecks }}
              </div>
              <div class="text-sm text-purple-700">Total Checks</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-orange-50">
              <div class="text-2xl font-bold text-orange-600">
                ${{ costImpact }}
              </div>
              <div class="text-sm text-orange-700">Cost Impact</div>
            </div>
          </div>

          <!-- Recent Logs -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h4>
            <div class="space-y-2">
              <div
                v-for="log in recentLogs"
                :key="log.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-900">{{
                    formatTime(log.created_at)
                  }}</span>
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(log.status_code)"
                  >
                    {{ log.status_code }}
                  </span>
                </div>
                <span class="text-sm text-gray-600"
                  >{{ log.latency_ms }}ms</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useApiStore } from "../stores/api";

const apiStore = useApiStore();
const selectedApi = ref(null);

const totalChecks = computed(() => {
  return apiStore.logs.length;
});

const getApiStats = (apiId) => {
  return (
    apiStore.apiStats.find((stats) => stats.id === apiId) || {
      uptime: 0,
      avgLatency: 0,
      totalChecks: 0,
      lastCheck: null,
    }
  );
};

const recentLogs = computed(() => {
  if (!selectedApi.value) return [];
  return apiStore.logs
    .filter((log) => log.api_id === selectedApi.value.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);
});

const costImpact = computed(() => {
  if (!selectedApi.value) return "0.00";
  const failedLogs = apiStore.logs.filter(
    (log) => log.api_id === selectedApi.value.id && log.status_code >= 400
  );
  const downtimeHours = failedLogs.length * (1 / 60);
  return (downtimeHours * selectedApi.value.cost_per_hour).toFixed(2);
});

const selectApi = (apiId) => {
  selectedApi.value = apiStore.apis.find((api) => api.id === apiId);
};

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};

const getStatusClass = (statusCode) => {
  if (statusCode < 300) return "bg-green-100 text-green-800";
  if (statusCode < 400) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};
</script>
