<template>
  <div
    class="rounded-xl border p-6 transition-colors duration-300"
    :class="
      isDark
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    "
  >
    <div class="flex items-center justify-between mb-4">
      <h4
        class="text-lg font-semibold transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        💰 Cost Impact Analysis
      </h4>
      <div
        class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
        :class="
          costImpact && costImpact.totalLoss > 0
            ? isDark
              ? 'bg-red-900/50 text-red-400'
              : 'bg-red-100 text-red-800'
            : isDark
            ? 'bg-green-900/50 text-green-400'
            : 'bg-green-100 text-green-800'
        "
      >
        <span v-if="costImpact && costImpact.totalLoss > 0">
          💸 ${{ costImpact.totalLoss.toFixed(2) }} Loss
        </span>
        <span v-else>✅ No Loss</span>
      </div>
    </div>

    <div v-if="costImpact" class="space-y-4">
      <!-- Cost Overview -->
      <div
        class="p-4 rounded-lg transition-colors duration-300"
        :class="
          costImpact.totalLoss > 0
            ? isDark
              ? 'bg-red-900/20 border border-red-700/50'
              : 'bg-red-50 border border-red-200'
            : isDark
            ? 'bg-green-900/20 border border-green-700/50'
            : 'bg-green-50 border border-green-200'
        "
      >
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div
              class="text-2xl font-bold transition-colors duration-300"
              :class="
                costImpact.totalLoss > 0
                  ? isDark
                    ? 'text-red-400'
                    : 'text-red-700'
                  : isDark
                  ? 'text-green-400'
                  : 'text-green-700'
              "
            >
              ${{ costImpact.totalLoss.toFixed(2) }}
            </div>
            <div
              class="text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Total Loss (24h)
            </div>
          </div>
          <div>
            <div
              class="text-2xl font-bold transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ costImpact.downtimeMinutes }}
            </div>
            <div
              class="text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Downtime (min)
            </div>
          </div>
          <div>
            <div
              class="text-2xl font-bold transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              ${{ costImpact.costPerHour }}/hr
            </div>
            <div
              class="text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Cost Rate
            </div>
          </div>
        </div>
      </div>

      <!-- Uptime Impact -->
      <div
        class="p-4 rounded-lg transition-colors duration-300"
        :class="
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        "
      >
        <div class="flex items-center justify-between mb-2">
          <span
            class="text-sm font-medium transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-900'"
          >
            Uptime Impact
          </span>
          <span
            class="text-sm font-bold transition-colors duration-300"
            :class="
              costImpact.uptimePercentage >= 99
                ? isDark
                  ? 'text-green-400'
                  : 'text-green-700'
                : costImpact.uptimePercentage >= 95
                ? isDark
                  ? 'text-yellow-400'
                  : 'text-yellow-700'
                : isDark
                ? 'text-red-400'
                : 'text-red-700'
            "
          >
            {{ costImpact.uptimePercentage.toFixed(2) }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-300"
            :class="
              costImpact.uptimePercentage >= 99
                ? 'bg-green-500'
                : costImpact.uptimePercentage >= 95
                ? 'bg-yellow-500'
                : 'bg-red-500'
            "
            :style="{ width: `${costImpact.uptimePercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Projections -->
      <div
        class="p-4 rounded-lg transition-colors duration-300"
        :class="
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        "
      >
        <h5
          class="text-sm font-medium mb-3 transition-colors duration-300"
          :class="isDark ? 'text-white' : 'text-gray-900'"
        >
          📊 Financial Projections
        </h5>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div
              class="font-medium transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Daily Loss
            </div>
            <div
              class="text-lg font-bold transition-colors duration-300"
              :class="
                costImpact.totalLoss > 0
                  ? isDark
                    ? 'text-red-400'
                    : 'text-red-700'
                  : isDark
                  ? 'text-green-400'
                  : 'text-green-700'
              "
            >
              ${{ (costImpact.totalLoss * 24).toFixed(2) }}
            </div>
          </div>
          <div>
            <div
              class="font-medium transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Monthly Loss
            </div>
            <div
              class="text-lg font-bold transition-colors duration-300"
              :class="
                costImpact.totalLoss > 0
                  ? isDark
                    ? 'text-red-400'
                    : 'text-red-700'
                  : isDark
                  ? 'text-green-400'
                  : 'text-green-700'
              "
            >
              ${{ (costImpact.totalLoss * 24 * 30).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div
        class="p-4 rounded-lg transition-colors duration-300"
        :class="
          isDark ? 'bg-blue-900/20 border border-blue-700/50' : 'bg-blue-50 border border-blue-200'
        "
      >
        <h5
          class="text-sm font-medium mb-2 transition-colors duration-300"
          :class="isDark ? 'text-blue-400' : 'text-blue-800'"
        >
          💡 Cost Optimization Tips
        </h5>
        <ul class="text-xs space-y-1">
          <li
            class="transition-colors duration-300"
            :class="isDark ? 'text-blue-300' : 'text-blue-700'"
          >
            • Implement auto-scaling to handle traffic spikes
          </li>
          <li
            class="transition-colors duration-300"
            :class="isDark ? 'text-blue-300' : 'text-blue-700'"
          >
            • Set up monitoring alerts to catch issues early
          </li>
          <li
            class="transition-colors duration-300"
            :class="isDark ? 'text-blue-300' : 'text-blue-700'"
          >
            • Consider CDN for improved response times
          </li>
          <li
            class="transition-colors duration-300"
            :class="isDark ? 'text-blue-300' : 'text-blue-700'"
          >
            • Regular performance audits and optimization
          </li>
        </ul>
      </div>
    </div>

    <!-- No Cost Data State -->
    <div
      v-else
      class="text-center py-8 transition-colors duration-300"
      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
    >
      <div class="mx-auto w-12 h-12 mb-3">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      </div>
      <p class="text-sm mb-2">No cost data available</p>
      <p class="text-xs">Set cost per hour in API settings to see financial impact</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { insightsEngine } from '../../utils/insightsEngine';

const props = defineProps({
  api: {
    type: Object,
    required: true
  },
  logs: {
    type: Array,
    default: () => []
  },
  isDark: {
    type: Boolean,
    default: false
  }
});

const costImpact = computed(() => {
  const insights = insightsEngine.analyzeApi(props.api, props.logs);
  return insights.costImpact;
});
</script> 