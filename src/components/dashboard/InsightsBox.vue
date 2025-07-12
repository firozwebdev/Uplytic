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

    <!-- Gemini AI Button & Output -->
    <div class="mb-4 flex items-center space-x-3">
      <button
        @click="fetchGemini"
        :disabled="isGeminiLoading"
        class="inline-flex items-center rounded-lg px-3 py-2 text-xs font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="
          isDark
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-gray-900 disabled:opacity-50'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-offset-white disabled:opacity-50'
        "
      >
        <svg
          v-if="!isGeminiLoading"
          class="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 01-8 0M12 3v4m0 0v4m0-4h4m-4 0H8"
          />
        </svg>
        <div
          v-else
          class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
        ></div>
        {{ isGeminiLoading ? 'Getting AI Insight...' : 'Get Gemini AI Insight' }}
      </button>
      <span v-if="geminiError" class="text-xs text-red-500">{{ geminiError }}</span>
    </div>
    <div v-if="geminiText" class="mb-4 p-4 rounded-lg shadow-sm text-xs whitespace-pre-line flex items-start gap-3 relative"
      :class="[
        isDark
          ? 'bg-gray-900 text-blue-200 border border-blue-700'
          : 'bg-blue-50 text-blue-900 border border-blue-200',
        'transition-colors duration-300'
      ]"
    >
      <div class="flex-shrink-0 mt-1">
        <svg v-if="!isDark" class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <svg v-else class="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </div>
      <div class="flex-1">
        <div class="font-semibold mb-1 text-sm" :class="isDark ? 'text-blue-300' : 'text-blue-700'">
          Gemini AI Insight
        </div>
        <div class="font-mono leading-relaxed tracking-tight" style="word-break: break-word;">
          <component :is="markdownComponent" :source="geminiText" :class="isDark ? 'prose prose-invert' : 'prose'" />
        </div>
      </div>
      <!-- Copy button -->
      <button
        @click="copyGeminiText"
        class="absolute top-2 right-2 p-1 rounded transition-colors duration-200"
        :class="isDark ? 'bg-gray-800 hover:bg-gray-700 text-blue-200' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'"
        title="Copy to clipboard"
      >
        <template v-if="copied">
          <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </template>
        <template v-else>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-8-4h8" />
          </svg>
        </template>
      </button>
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
import { ref, computed, nextTick } from 'vue';
import { insightsEngine } from '../../utils/insightsEngine';
import { getGeminiInsights } from '../../utils/aiGeminiClient';
import MarkdownIt from 'markdown-it';
import { defineAsyncComponent } from 'vue';

const markdownComponent = defineAsyncComponent(() => import('vue3-markdown-it'));

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

// Gemini AI integration
const isGeminiLoading = ref(false);
const geminiText = ref('');
const geminiError = ref('');
const copied = ref(false);

async function fetchGemini() {
  isGeminiLoading.value = true;
  geminiText.value = '';
  geminiError.value = '';
  try {
    geminiText.value = await getGeminiInsights({
      logs: props.logs,
      stats: insights.value,
      cost: insights.value.costImpact,
      prompt: `You are an expert API monitoring assistant. Analyze the following API logs, stats, and cost impact, and provide a concise summary, highlight any anomalies, and suggest actionable recommendations.\n\nLogs: ${JSON.stringify(props.logs)}\n\nStats: ${JSON.stringify(insights.value)}\n\nCost Impact: ${JSON.stringify(insights.value.costImpact)}`
    });
  } catch (e) {
    geminiError.value = e.message || 'Failed to get AI insight';
  } finally {
    isGeminiLoading.value = false;
  }
}

async function copyGeminiText() {
  if (!geminiText.value) return;
  await navigator.clipboard.writeText(geminiText.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1200);
}
</script> 