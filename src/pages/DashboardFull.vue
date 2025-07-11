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
          v-for="api in apiStore.apis"
          :key="api.id"
          class="group relative rounded-xl p-6 shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-lg"
          :class="[
            isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
              : 'bg-white border-gray-200 hover:border-gray-300',
            selectedApiId === api.id
              ? isDark
                ? 'ring-2 ring-blue-500 border-blue-500/50'
                : 'ring-2 ring-blue-500'
              : '',
          ]"
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
                  <div class="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                  <span
                    class="text-sm font-medium transition-colors duration-300"
                    :class="isDark ? 'text-green-400' : 'text-green-700'"
                  >
                    Healthy
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
                  2 minutes ago
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- KPI Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div
              class="rounded-lg p-4 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-700/30'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100'
              "
            >
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
                  <div
                    class="text-2xl font-bold transition-colors duration-300"
                    :class="isDark ? 'text-blue-300' : 'text-blue-900'"
                  >
                    99.8%
                  </div>
                  <div
                    class="text-sm transition-colors duration-300"
                    :class="isDark ? 'text-blue-400' : 'text-blue-700'"
                  >
                    Uptime
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-lg p-4 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border border-green-700/30'
                  : 'bg-gradient-to-br from-green-50 to-green-100'
              "
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
                  <div
                    class="text-2xl font-bold transition-colors duration-300"
                    :class="isDark ? 'text-green-300' : 'text-green-900'"
                  >
                    245ms
                  </div>
                  <div
                    class="text-sm transition-colors duration-300"
                    :class="isDark ? 'text-green-400' : 'text-green-700'"
                  >
                    Avg Response Time
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-lg p-4 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-700/30'
                  : 'bg-gradient-to-br from-purple-50 to-purple-100'
              "
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
                  <div
                    class="text-2xl font-bold transition-colors duration-300"
                    :class="isDark ? 'text-purple-300' : 'text-purple-900'"
                  >
                    1,247
                  </div>
                  <div
                    class="text-sm transition-colors duration-300"
                    :class="isDark ? 'text-purple-400' : 'text-purple-700'"
                  >
                    Total Checks
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-lg p-4 transition-colors duration-300"
              :class="
                isDark
                  ? 'bg-gradient-to-br from-orange-900/50 to-orange-800/50 border border-orange-700/30'
                  : 'bg-gradient-to-br from-orange-50 to-orange-100'
              "
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
                  <div
                    class="text-2xl font-bold transition-colors duration-300"
                    :class="isDark ? 'text-orange-300' : 'text-orange-900'"
                  >
                    3
                  </div>
                  <div
                    class="text-sm transition-colors duration-300"
                    :class="isDark ? 'text-orange-400' : 'text-orange-700'"
                  >
                    Errors (24h)
                  </div>
                </div>
              </div>
            </div>
          </div>

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
              <div
                class="flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-300"
                :class="isDark ? 'bg-gray-900' : 'bg-gray-50'"
              >
                <div class="flex items-center">
                  <div class="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <div
                      class="text-sm font-medium transition-colors duration-300"
                      :class="isDark ? 'text-white' : 'text-gray-900'"
                    >
                      200 - 245ms
                    </div>
                    <div
                      class="text-xs transition-colors duration-300"
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                    >
                      2 minutes ago
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-300"
                :class="isDark ? 'bg-gray-900' : 'bg-gray-50'"
              >
                <div class="flex items-center">
                  <div class="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <div
                      class="text-sm font-medium transition-colors duration-300"
                      :class="isDark ? 'text-white' : 'text-gray-900'"
                    >
                      200 - 238ms
                    </div>
                    <div
                      class="text-xs transition-colors duration-300"
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                    >
                      4 minutes ago
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-300"
                :class="isDark ? 'bg-gray-900' : 'bg-gray-50'"
              >
                <div class="flex items-center">
                  <div class="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                  <div>
                    <div
                      class="text-sm font-medium transition-colors duration-300"
                      :class="isDark ? 'text-white' : 'text-gray-900'"
                    >
                      429 - 1,245ms
                    </div>
                    <div
                      class="text-xs transition-colors duration-300"
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                    >
                      6 minutes ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useApiStore } from "../stores/api.js";

const apiStore = useApiStore();
const showAddApiModal = ref(false);
const selectedApiId = ref(null);
const selectedApi = ref(null);

const totalChecks = computed(() => {
  return apiStore.logs.length;
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
  selectedApiId.value = apiId;
  selectedApi.value = apiStore.apis.find((api) => api.id === apiId);
};

const editApi = (api) => {
  console.log("Edit API:", api);
};

const deleteApi = (apiId) => {
  if (confirm("Are you sure you want to delete this API?")) {
    apiStore.deleteApi(apiId);
  }
};
</script>
