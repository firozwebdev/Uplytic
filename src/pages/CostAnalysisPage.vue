<template>
  <div class="cost-analysis-page min-h-screen transition-colors duration-300" :class="isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-2">💰 Enhanced Cost Analysis</h1>
            <p class="text-purple-100">AI-powered financial insights with WOW factor visualizations</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300"
            >
              <svg v-if="isDark" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            <router-link
              to="/dashboard"
              class="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
            >
              Back to Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-8">
      <!-- API Selection -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold mb-4">Select API for Analysis</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="api in apiStore.apis"
              :key="api.id"
              @click="selectApi(api)"
              class="api-card p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105"
              :class="
                selectedApi?.id === api.id
                  ? isDark
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-purple-500 bg-purple-50'
                  : isDark
                    ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              "
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold">{{ api.name }}</h3>
                <div class="w-3 h-3 rounded-full" :class="getStatusColor(api)"></div>
              </div>
              <p class="text-sm opacity-75 mb-2">{{ api.url }}</p>
              <div class="text-sm font-medium">
                Cost: ${{ api.cost_per_hour }}/hr
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Cost Analysis -->
      <div v-if="selectedApi">
        <EnhancedCostAnalysis
          :api="selectedApi"
          :logs="logsForSelectedApi"
          :is-dark="isDark"
        />
      </div>

      <!-- No API Selected State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold mb-2">Select an API to Begin</h3>
        <p class="text-gray-600 dark:text-gray-400">Choose an API from the list above to see enhanced cost analysis with WOW factor features</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useApiStore } from '../stores/api';
import EnhancedCostAnalysis from '../components/dashboard/EnhancedCostAnalysis.vue';

const apiStore = useApiStore();
const selectedApi = ref(null);
const isDark = ref(false);

const logsForSelectedApi = computed(() => {
  if (!selectedApi.value) return [];
  return apiStore.logs.filter(log => log.api_id === selectedApi.value.id);
});

function selectApi(api) {
  selectedApi.value = api;
}

function getStatusColor(api) {
  const stats = apiStore.apiStats.find(s => s.id === api.id);
  if (!stats?.lastCheck) return 'bg-gray-300';
  if (stats.status >= 400) return 'bg-red-500';
  return 'bg-green-500';
}

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<style scoped>
.api-card {
  @apply shadow-md hover:shadow-lg;
}

/* Enhanced animations */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Gradient animations */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 