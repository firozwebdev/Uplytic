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
        🤖 AI Insights & Recommendations
      </h4>
      <div
        class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
        :class="
          insights.insights.length === 0
            ? isDark
              ? 'bg-green-900/50 text-green-400'
              : 'bg-green-100 text-green-800'
            : insights.insights.some(i => i.severity === 'critical')
            ? isDark
              ? 'bg-red-900/50 text-red-400'
              : 'bg-red-100 text-red-800'
            : isDark
            ? 'bg-yellow-900/50 text-yellow-400'
            : 'bg-yellow-100 text-yellow-800'
        "
      >
        <span v-if="insights.insights.length === 0">✅ All Good</span>
        <span v-else-if="insights.insights.some(i => i.severity === 'critical')">
          🚨 {{ insights.insights.filter(i => i.severity === 'critical').length }} Critical
        </span>
        <span v-else>
          ⚠️ {{ insights.insights.filter(i => i.severity === 'warning').length }} Warnings
        </span>
      </div>
    </div>

    <!-- Summary -->
    <div
      class="mb-4 p-4 rounded-lg transition-colors duration-300"
      :class="
        insights.insights.length === 0
          ? isDark
            ? 'bg-green-900/20 border border-green-700/50'
            : 'bg-green-50 border border-green-200'
          : isDark
          ? 'bg-gray-700 border border-gray-600'
          : 'bg-gray-50 border border-gray-200'
      "
    >
      <p
        class="text-sm transition-colors duration-300"
        :class="
          insights.insights.length === 0
            ? isDark
              ? 'text-green-400'
              : 'text-green-700'
            : isDark
            ? 'text-gray-300'
            : 'text-gray-700'
        "
      >
        {{ insights.summary }}
      </p>
    </div>

    <!-- Insights List -->
    <div v-if="insights.insights.length > 0" class="space-y-3">
      <div
        v-for="insight in insights.insights"
        :key="insight.ruleId"
        class="p-4 rounded-lg border-l-4 transition-colors duration-300"
        :class="
          insight.severity === 'critical'
            ? isDark
              ? 'bg-red-900/20 border-red-500'
              : 'bg-red-50 border-red-500'
            : isDark
            ? 'bg-yellow-900/20 border-yellow-500'
            : 'bg-yellow-50 border-yellow-500'
        "
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h5
              class="font-medium mb-1 transition-colors duration-300"
              :class="
                insight.severity === 'critical'
                  ? isDark
                    ? 'text-red-400'
                    : 'text-red-800'
                  : isDark
                  ? 'text-yellow-400'
                  : 'text-yellow-800'
              "
            >
              {{ insight.title }}
            </h5>
            <p
              class="text-sm mb-2 transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-gray-600'"
            >
              {{ insight.message }}
            </p>
            <div
              class="flex items-center text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              <span class="mr-2">💡</span>
              <span class="font-medium">Recommendation:</span>
              <span class="ml-1">{{ insight.recommendation }}</span>
            </div>
          </div>
          <div
            class="ml-3 flex-shrink-0 w-2 h-2 rounded-full"
            :class="
              insight.severity === 'critical'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- No Insights State -->
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p class="text-sm">No issues detected. Your API is performing well!</p>
    </div>

    <!-- Recommendations -->
    <div v-if="recommendations.length > 0" class="mt-6">
      <h5
        class="text-sm font-medium mb-3 transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        📋 Action Items
      </h5>
      <div class="space-y-2">
        <div
          v-for="rec in recommendations"
          :key="rec.title"
          class="flex items-start space-x-3 p-3 rounded-lg transition-colors duration-300"
          :class="
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          "
        >
          <div
            class="flex-shrink-0 w-2 h-2 rounded-full mt-2"
            :class="
              rec.type === 'error'
                ? 'bg-red-500'
                : rec.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            "
          ></div>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ rec.title }}
            </p>
            <p
              class="text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              {{ rec.description }}
            </p>
            <p
              class="text-xs font-medium mt-1 transition-colors duration-300"
              :class="isDark ? 'text-blue-400' : 'text-blue-600'"
            >
              → {{ rec.action }}
            </p>
          </div>
        </div>
      </div>
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

const insights = computed(() => {
  return insightsEngine.analyzeApi(props.api, props.logs);
});

const recommendations = computed(() => {
  return insightsEngine.generateRecommendations(props.api, props.logs);
});
</script> 