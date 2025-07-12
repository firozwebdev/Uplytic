<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative border"
        :class="isDark ? 'border-blue-900' : 'border-blue-200'">
        <button @click="onClose" class="absolute top-4 right-4 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="mb-4 flex items-center gap-2">
          <svg class="h-7 w-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="10" stroke-width="2" />
          </svg>
          <h2 class="text-2xl font-bold" :class="isDark ? 'text-blue-200' : 'text-blue-700'">AI-Generated Postmortem</h2>
        </div>
        <div class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Get a full incident report, timeline, root cause, and recommendations—instantly, powered by Gemini AI.
        </div>
        <div class="mb-4 flex items-center gap-3">
          <button @click="generatePostmortem" :disabled="isLoading" class="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
            <span v-if="isLoading">
              <svg class="inline h-4 w-4 animate-spin mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
              Generating...
            </span>
            <span v-else>Generate Postmortem</span>
          </button>
          <button v-if="postmortemText" @click="copyPostmortem" class="px-3 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium hover:bg-blue-200 dark:hover:bg-blue-700">
            <svg v-if="!copied" class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-8-4h8" />
            </svg>
            <svg v-else class="inline h-4 w-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div v-if="error" class="mb-4 text-red-500 text-sm">{{ error }}</div>
        <div v-if="postmortemText" class="mb-2 p-4 rounded-lg border text-sm overflow-y-auto max-h-80"
          :class="isDark ? 'bg-gray-900 text-blue-200 border-blue-900' : 'bg-blue-50 text-blue-900 border-blue-200'">
          <component :is="markdownComponent" :source="postmortemText" :class="isDark ? 'prose prose-invert' : 'prose'" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { getGeminiInsights } from '../../utils/aiGeminiClient';
import { defineAsyncComponent } from 'vue';

const markdownComponent = defineAsyncComponent(() => import('vue3-markdown-it'));

const props = defineProps({
  open: Boolean,
  onClose: Function,
  logs: Array,
  stats: Object,
  isDark: Boolean
});

const isLoading = ref(false);
const postmortemText = ref('');
const error = ref('');
const copied = ref(false);

async function generatePostmortem() {
  isLoading.value = true;
  error.value = '';
  postmortemText.value = '';
  try {
    postmortemText.value = await getGeminiInsights({
      logs: props.logs,
      stats: props.stats,
      prompt: `You are an expert SRE. Generate a postmortem report for this incident. Include a timeline, root cause, impact, and actionable recommendations. Use the logs and stats below.\n\nLogs: ${JSON.stringify(props.logs)}\n\nStats: ${JSON.stringify(props.stats)}`
    });
  } catch (e) {
    error.value = e.message || 'Failed to generate postmortem.';
  } finally {
    isLoading.value = false;
  }
}

async function copyPostmortem() {
  if (!postmortemText.value) return;
  await navigator.clipboard.writeText(postmortemText.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1200);
}
</script> 