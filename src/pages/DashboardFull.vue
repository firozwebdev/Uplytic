<template>
  <DashboardLayout v-slot="{ isDark }">
    <!-- Welcome Section -->
    <div class="mb-8">
      <div
        class="rounded-2xl p-8 shadow-xl transition-all duration-300"
        :class="
          isDark
            ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600/50'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600'
        "
      >
        <div class="flex items-center justify-between">
          <div>
            <h1
              class="text-3xl font-bold mb-2 transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-white'"
            >
              Welcome to Uplytic
            </h1>
            <p
              class="text-lg transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-blue-100'"
            >
              Monitor your APIs in real-time with beautiful insights and
              analytics
            </p>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <div
                  class="text-2xl font-bold transition-colors duration-300"
                  :class="isDark ? 'text-white' : 'text-white'"
                >
                  {{ apiStore.apis.length }}
                </div>
                <div
                  class="text-sm transition-colors duration-300"
                  :class="isDark ? 'text-gray-300' : 'text-blue-100'"
                >
                  APIs Monitored
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl font-bold transition-colors duration-300"
                  :class="isDark ? 'text-white' : 'text-white'"
                >
                  {{ totalChecks }}
                </div>
                <div
                  class="text-sm transition-colors duration-300"
                  :class="isDark ? 'text-gray-300' : 'text-blue-100'"
                >
                  Total Checks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Management Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2
          class="text-2xl font-bold transition-colors duration-300"
          :class="isDark ? 'text-white' : 'text-gray-900'"
        >
          Your APIs
        </h2>
        <button
          @click="showAddApiModal = true"
          class="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="
            isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-gray-900'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-white'
          "
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
        <div
          class="mx-auto h-24 w-24 mb-4 transition-colors duration-300"
          :class="isDark ? 'text-gray-600' : 'text-gray-300'"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3
          class="text-lg font-medium mb-2 transition-colors duration-300"
          :class="isDark ? 'text-white' : 'text-gray-900'"
        >
          No APIs added yet
        </h3>
        <p
          class="mb-6 transition-colors duration-300"
          :class="isDark ? 'text-gray-400' : 'text-gray-500'"
        >
          Get started by adding your first API endpoint to monitor
        </p>
        <button
          @click="showAddApiModal = true"
          class="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200"
          :class="
            isDark
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          "
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
          v-for="(api, index) in apiStore.apis"
          :key="api.id"
          class="group relative rounded-xl p-6 shadow-sm border transition-all duration-500 cursor-pointer hover:shadow-2xl hover:scale-105"
          :class="[
            isDark
              ? 'bg-gradient-to-br from-gray-800 via-gray-750 to-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gradient-to-br hover:from-gray-750 hover:via-gray-700 hover:to-gray-750'
              : 'bg-gradient-to-br from-white via-gray-50 to-white border-gray-200 hover:border-gray-300 hover:bg-gradient-to-br hover:from-gray-50 hover:via-white hover:to-gray-50',
            selectedApiId === api.id
              ? isDark
                ? 'ring-2 ring-blue-500 border-blue-500/50 shadow-blue-500/25'
                : 'ring-2 ring-blue-500 shadow-blue-500/25'
              : '',
          ]"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="selectApi(api.id)"
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
            <h3
              class="text-lg font-semibold mb-1 transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ api.name }}
            </h3>
            <p
              class="text-sm truncate transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              {{ api.url }}
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div
                class="text-2xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ getApiStats(api.id).uptime }}%
              </div>
              <div
                class="text-xs transition-colors duration-300"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Uptime
              </div>
            </div>
            <div>
              <div
                class="text-2xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ getApiStats(api.id).avgLatency }}ms
              </div>
              <div
                class="text-xs transition-colors duration-300"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Avg Latency
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <button
                @click.stop="editApi(api)"
                class="rounded-lg p-2 transition-colors duration-200"
                :class="
                  isDark
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                "
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
                class="rounded-lg p-2 transition-colors duration-200"
                :class="
                  isDark
                    ? 'text-gray-400 hover:bg-red-900/50 hover:text-red-400'
                    : 'text-gray-400 hover:bg-red-100 hover:text-red-600'
                "
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
            <div
              class="text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-500' : 'text-gray-400'"
            >
              {{ formatLastCheck(getApiStats(api.id).lastCheck) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected API Details -->
    <div v-if="selectedApi" class="mb-8">
      <div
        class="rounded-xl shadow-sm border overflow-hidden transition-colors duration-300"
        :class="
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        "
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b transition-colors duration-300"
          :class="
            isDark
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600'
              : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
          "
        >
          <div class="flex items-center justify-between">
            <div>
              <h3
                class="text-xl font-semibold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ selectedApi.name }}
              </h3>
              <p
                class="text-sm mt-1 transition-colors duration-300"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                {{ selectedApi.url }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div
                  class="text-sm transition-colors duration-300"
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                >
                  Status
                </div>
                <div class="flex items-center mt-1">
                  <div
                    class="h-2 w-2 rounded-full mr-2"
                    :class="getStatusColor(selectedApi)"
                  ></div>
                  <span
                    class="text-sm font-medium transition-colors duration-300"
                    :class="isDark ? 'text-green-400' : 'text-green-700'"
                  >
                    {{
                      selectedApiStats.value && typeof selectedApiStats.value.status !== 'undefined'
                        ? (selectedApiStats.value.status < 400 ? 'Healthy' : (selectedApiStats.value.status ? 'Error' : 'Unknown'))
                        : 'Unknown'
                    }}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div
                  class="text-sm transition-colors duration-300"
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                >
                  Last Check
                </div>
                <div
                  class="text-sm font-medium transition-colors duration-300"
                  :class="isDark ? 'text-white' : 'text-gray-900'"
                >
                  {{
                    selectedApiStats.value && typeof selectedApiStats.value.lastCheck !== 'undefined'
                      ? formatLastCheck(selectedApiStats.value.lastCheck)
                      : 'Never'
                  }}
                </div>
              </div>
              <!-- PDF Export Button -->
              <button
                @click="exportPDF"
                :disabled="isExporting"
                class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-gray-900 disabled:opacity-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-white disabled:opacity-50'
                "
              >
                <svg
                  v-if="!isExporting"
                  class="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div
                  v-else
                  class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                ></div>
                {{ isExporting ? 'Generating...' : 'Export PDF' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Animated KPI Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <AnimatedKpiCard
              :value="apiStore.apis.length"
              label="APIs Monitored"
              :icon="ApiIcon"
              variant="blue"
              :is-dark="isDark"
              trend="up"
              trend-value="+2"
            />

            <AnimatedKpiCard
              :value="selectedApiStats.value && typeof selectedApiStats.value.avgLatency === 'number' ? selectedApiStats.value.avgLatency : 0"
              label="Avg Response Time"
              :icon="SpeedIcon"
              variant="green"
              :is-dark="isDark"
              trend="down"
              trend-value="-12ms"
            />

            <AnimatedKpiCard
              :value="selectedApiStats.value && typeof selectedApiStats.value.uptime === 'number' ? selectedApiStats.value.uptime : 0"
              label="Uptime"
              :icon="UptimeIcon"
              variant="purple"
              :is-dark="isDark"
              trend="up"
              trend-value="+0.2%"
            />

            <AnimatedKpiCard
              :value="logsForSelectedApi.filter(log => log.status_code >= 400).length"
              label="Errors (24h)"
              :icon="ErrorIcon"
              variant="orange"
              :is-dark="isDark"
              trend="down"
              trend-value="-1"
            />
          </div>

          <!-- Outage Map Section -->
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-900'">
              Real-Time Outage Map
            </h3>
            <OutageMap :apis="mapApisForOutageMap" :center="mapCenter" :zoom="mapZoom" />
          </div>

          <!-- Charts Section -->
          <div class="grid gap-6 md:grid-cols-2 mb-8">
            <!-- Latency Chart -->
            <div
              class="rounded-lg border p-6 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              "
            >
              <h4
                class="text-lg font-semibold mb-4 transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                Response Time Trends
              </h4>
              <LatencyChart :logs="logsForSelectedApi" :is-dark="isDark" />
            </div>

            <!-- Status Distribution Chart -->
            <div
              class="rounded-lg border p-6 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              "
            >
              <h4
                class="text-lg font-semibold mb-4 transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                Status Distribution
              </h4>
              <StatusChart :logs="logsForSelectedApi" :is-dark="isDark" />
            </div>
          </div>

          <!-- AI Insights & Cost Analysis Section -->
          <div class="grid gap-6 md:grid-cols-2 mb-8">
            <!-- AI Insights -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span></span>
                <button
                  @click="showPostmortemModal = true"
                  class="inline-flex items-center rounded-lg px-3 py-2 text-xs font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  :class="isDark ? 'bg-blue-900 text-blue-100 hover:bg-blue-800 focus:ring-offset-gray-900' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-offset-white'"
                >
                  <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" stroke-width="2" />
                  </svg>
                  Generate Postmortem
                </button>
              </div>
              <InsightsBox 
                :api="selectedApi" 
                :logs="logsForSelectedApi" 
                :is-dark="isDark" 
              />
            </div>
            <!-- Cost Impact -->
            <CostImpact 
              :api="selectedApi" 
              :logs="logsForSelectedApi" 
              :is-dark="isDark" 
            />
          </div>

          <!-- Recent Activity & Alerts -->
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Recent Activity -->
            <div
              class="rounded-lg border p-6 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              "
            >
              <h4
                class="text-lg font-semibold mb-4 transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                Recent Activity
              </h4>
              <div class="space-y-3">
                <div v-if="logsForSelectedApi.length === 0" class="text-gray-400 text-sm">No recent activity for this API.</div>
                <div
                  v-for="log in logsForSelectedApi.slice(0, 10)"
                  :key="log.id"
                  class="flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-300"
                  :class="isDark ? 'bg-gray-900' : 'bg-gray-50'"
                >
                  <div class="flex items-center">
                    <div
                      class="h-2 w-2 rounded-full mr-3"
                      :class="log.status_code < 400 ? 'bg-green-500' : (log.status_code < 500 ? 'bg-yellow-500' : 'bg-red-500')"
                    ></div>
                    <div>
                      <div
                        class="text-sm font-medium transition-colors duration-300"
                        :class="isDark ? 'text-white' : 'text-gray-900'"
                      >
                        {{ log.status_code }} - {{ log.latency_ms }}ms
                      </div>
                      <div
                        class="text-xs transition-colors duration-300"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      >
                        {{ formatLastCheck(log.created_at) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alerts Panel -->
            <AlertsPanel 
              :api-id="selectedApiId" 
              :is-dark="isDark" 
            />
          </div>
        </div>
      </div>
    </div>
    <AskUplyticAI
      :is-dark="isDark"
      :logs="apiStore.logs"
      :stats="selectedApiStats.value"
      :cost="selectedApiStats.value && selectedApiStats.value.costImpact ? selectedApiStats.value.costImpact : {}"
    />
  </DashboardLayout>
  <AddApiModal
    v-if="showAddApiModal"
    @close="showAddApiModal = false"
    @api-added="handleApiAdded"
  />
  <div
    v-if="showSpinner"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div
      class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
  <!-- Postmortem Modal -->
  <PostmortemModal
    :open="showPostmortemModal"
    :onClose="() => (showPostmortemModal = false)"
    :logs="logsForSelectedApi"
    :stats="selectedApiStats.value"
    :isDark="isDark"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useApiStore } from "../stores/api.js";
import LatencyChart from "../components/charts/LatencyChart.vue";
import StatusChart from "../components/charts/StatusChart.vue";
import AnimatedKpiCard from "../components/dashboard/AnimatedKpiCard.vue";
import InsightsBox from "../components/dashboard/InsightsBox.vue";
import CostImpact from "../components/dashboard/CostImpact.vue";
import AlertsPanel from "../components/dashboard/AlertsPanel.vue";
import {
  ApiIcon,
  SpeedIcon,
  UptimeIcon,
  ErrorIcon,
} from "../components/icons/ApiIcons.vue";
import AddApiModal from "../components/ui/AddApiModal.vue";
import { startPollingApis } from '../services/pollingService';
import { pdfExporter } from '../utils/pdfExport';
import { insightsEngine } from '../utils/insightsEngine';
import AskUplyticAI from '../components/ui/AskUplyticAI.vue';
import PostmortemModal from '../components/dashboard/PostmortemModal.vue';
import OutageMap from '../components/dashboard/OutageMap.vue';

const apiStore = useApiStore();
const showAddApiModal = ref(false);
const showSpinner = ref(false);
const isExporting = ref(false);
const selectedApiId = ref(null);
const selectedApi = ref(null);
const showPostmortemModal = ref(false);

const totalChecks = computed(() => {
  return apiStore.logs.length;
});

const logsForSelectedApi = computed(() => {
  if (!selectedApiId.value) return [];
  return apiStore.logs.filter(log => Number(log.api_id) === Number(selectedApiId.value));
});

const selectedApiStats = computed(() => {
  return (
    apiStore.apiStats.find((stats) => stats.id === selectedApiId.value) || {
      uptime: 0,
      avgLatency: 0,
      totalChecks: 0,
      errors: 0,
    }
  );
});

const mapApisForOutageMap = computed(() => {
  return apiStore.apis
    .map(api => {
      const stats = apiStore.apiStats.find(s => s.id === api.id);
      const lat = Number(api.lat);
      const lng = Number(api.lng);
      
      // Only include APIs with valid coordinates
      if (isNaN(lat) || isNaN(lng)) return null;
      
      return {
        id: api.id,
        name: api.name,
        lat,
        lng,
        status: stats?.status || 200,
        lastCheck: stats?.lastCheck || new Date().toISOString(),
      };
    })
    .filter(api => api !== null); // Remove null entries
});

// Map center and zoom based on selected API
const mapCenter = computed(() => {
  if (selectedApi.value && selectedApi.value.lat && selectedApi.value.lng) {
    const lat = Number(selectedApi.value.lat);
    const lng = Number(selectedApi.value.lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }
  return [20, 0]; // Default center
});

const mapZoom = computed(() => {
  if (selectedApi.value && selectedApi.value.lat && selectedApi.value.lng) {
    return 6; // Zoom in when API is selected, but not too much
  }
  return 2; // Default zoom for overview
});



onMounted(() => {
  apiStore.loadApis().then(() => {
    if (apiStore.apis.length > 0 && !selectedApiId.value) {
      selectApi(apiStore.apis[0].id);
    }
    startPollingApis();
    // Refresh logs every 60 seconds to keep UI in sync
    setInterval(() => {
      apiStore.loadLogs();
    }, 60000);
  });
});

const getApiStats = (apiId) => {
  return (
    apiStore.apiStats.find((stats) => stats.id === apiId) || {
      uptime: 99.8,
      avgLatency: 245,
      lastCheck: new Date().toISOString(),
    }
  );
};

const getStatusColor = (api) => {
  const stats = getApiStats(api.id);
  if (!stats.lastCheck) return "bg-gray-300";
  if (stats.status >= 400) return "bg-red-500";
  return "bg-green-500";
};

const formatLastCheck = (timestamp) => {
  if (!timestamp) return "Never";
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

const selectApi = (apiId) => {
  selectedApiId.value = Number(apiId);
  selectedApi.value = apiStore.apis.find((api) => Number(api.id) === Number(selectedApiId.value));
};

const editApi = (api) => {
  console.log("Edit API:", api);
};

const deleteApi = (apiId) => {
  if (confirm("Are you sure you want to delete this API?")) {
    apiStore.deleteApi(apiId);
  }
};

// Add this method to handle spinner and API reload
const handleApiAdded = async () => {
  showSpinner.value = true;
  // Start loading APIs
  const loadPromise = apiStore.loadApis();
  // Wait for either 1.2s or APIs to load, whichever is longer
  await Promise.all([
    loadPromise,
    new Promise((resolve) => setTimeout(resolve, 1200)),
  ]);
  showSpinner.value = false;
};

// PDF Export functionality
const exportPDF = async () => {
  if (!selectedApi.value) return;
  
  isExporting.value = true;
  try {
    const insights = insightsEngine.analyzeApi(selectedApi.value, logsForSelectedApi.value);
    await pdfExporter.exportApiReport(
      selectedApi.value,
      logsForSelectedApi.value,
      insights
    );
  } catch (error) {
    console.error('Error exporting PDF:', error);
    // You could add a toast notification here
  } finally {
    isExporting.value = false;
  }
};

watch(mapApisForOutageMap, (val) => {
  console.log('Map APIs for OutageMap:', val);
}, { immediate: true });

// Debug: Watch for changes in selected API and map center/zoom
watch([selectedApi, mapCenter, mapZoom], ([api, center, zoom]) => {
  console.log('Selected API changed:', api?.name, 'Map center:', center, 'Map zoom:', zoom);
}, { immediate: true });
</script>

<style scoped>
/* Staggered animation for API cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Hover effects for API cards */
.group:hover {
  transform: translateY(-4px) scale(1.02);
}

.group:hover .absolute {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Smooth transitions for all elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Gradient animations */
.bg-gradient-to-br {
  background-size: 200% 200%;
}

.group:hover .bg-gradient-to-br {
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Chart container animations */
.chart-container {
  animation: slideInUp 0.8s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* KPI card hover effects */
.kpi-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.kpi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Status indicator pulse */
.status-indicator {
  animation: statusPulse 2s infinite;
}

@keyframes statusPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
}

/* Loading animation for charts */
.chart-loading {
  animation: chartLoading 1.5s ease-in-out infinite;
}

@keyframes chartLoading {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
