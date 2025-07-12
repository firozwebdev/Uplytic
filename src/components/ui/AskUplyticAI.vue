<template>
  <div>
    <!-- Floating button with chat icon -->
    <button
      @click="open = !open"
      class="fixed z-50 bottom-8 right-8 shadow-lg rounded-full p-4 flex items-center justify-center transition-colors duration-200 border-2"
      :class="open
        ? (isDark ? 'bg-blue-700 text-white border-blue-400' : 'bg-blue-600 text-white border-blue-300')
        : (isDark ? 'bg-gray-900 text-blue-200 border-blue-700 hover:bg-blue-700' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white')"
      title="Ask Uplytic AI"
      style="box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.15);"
    >
      <svg v-if="!open" class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2m5-4h-4a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2z" />
      </svg>
      <svg v-else class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Chat panel -->
    <transition name="fade">
      <div v-if="open" class="fixed z-50 bottom-24 right-8 w-80 max-w-full rounded-2xl shadow-2xl flex flex-col border"
        :class="isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-blue-900' : 'bg-gradient-to-br from-white via-blue-50 to-white border-blue-200'"
        style="min-height: 370px; max-height: 70vh;">
        <div class="flex items-center justify-between px-4 py-3 border-b"
          :class="isDark ? 'border-blue-900' : 'border-blue-200'">
          <div class="font-semibold text-blue-700 dark:text-blue-300 text-lg flex items-center gap-2">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
            </svg>
            Ask Uplytic AI
          </div>
          <button @click="open = false" class="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-800">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
          <div v-for="(msg, i) in messages" :key="i" class="flex flex-col gap-1">
            <div :class="msg.role === 'user' ? 'items-end' : 'items-start'" class="flex">
              <span :class="[
                'inline-block px-4 py-2 rounded-xl max-w-[85%] break-words shadow',
                msg.role === 'user'
                  ? (isDark ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
                  : (isDark ? 'bg-gray-800 text-blue-200 border border-blue-900' : 'bg-blue-50 text-blue-900 border border-blue-200')
              ]">
                {{ msg.content }}
              </span>
            </div>
          </div>
          <div v-if="isLoading" class="flex items-center gap-2 text-blue-500 text-xs">
            <svg class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
            </svg>
            Thinking...
          </div>
        </div>
        <form @submit.prevent="askAI" class="flex items-center border-t"
          :class="isDark ? 'border-blue-900' : 'border-blue-200'">
          <input
            v-model="input"
            type="text"
            class="flex-1 bg-transparent outline-none px-3 py-2 text-sm rounded-xl"
            :class="isDark ? 'text-blue-100 placeholder-blue-300' : 'text-blue-900 placeholder-blue-400'"
            :placeholder="isLoading ? 'Waiting for response...' : 'Ask anything about your APIs...'"
            :disabled="isLoading"
            autocomplete="off"
          />
          <button type="submit" :disabled="isLoading || !input.trim()" class="ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 shadow">
            Send
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getGeminiInsights } from '../../utils/aiGeminiClient';

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  logs: {
    type: Array,
    default: () => []
  },
  stats: {
    type: Object,
    default: () => ({})
  },
  cost: {
    type: Object,
    default: () => ({})
  }
});

const open = ref(false);
const input = ref('');
const isLoading = ref(false);
const messages = ref([
  { role: 'assistant', content: 'Hi! I am Uplytic AI. Ask me anything about your API health, cost, incidents, or performance.' }
]);

async function askAI() {
  if (!input.value.trim()) return;
  const userMsg = input.value.trim();
  messages.value.push({ role: 'user', content: userMsg });
  input.value = '';
  isLoading.value = true;
  try {
    const aiText = await getGeminiInsights({
      logs: props.logs,
      stats: props.stats,
      cost: props.cost,
      prompt: `You are an expert API monitoring assistant. The user asked: "${userMsg}". Use the following logs, stats, and cost data to answer as helpfully as possible.\n\nLogs: ${JSON.stringify(props.logs)}\n\nStats: ${JSON.stringify(props.stats)}\n\nCost Impact: ${JSON.stringify(props.cost)}`
    });
    messages.value.push({ role: 'assistant', content: aiText });
  } catch (e) {
    messages.value.push({ role: 'assistant', content: e.message || 'Sorry, I could not get an answer from AI.' });
  } finally {
    isLoading.value = false;
  }
}

// Optional: auto-scroll to bottom on new message
watch(messages, () => {
  setTimeout(() => {
    const panel = document.querySelector('.fixed.bottom-24.right-8 .overflow-y-auto');
    if (panel) panel.scrollTop = panel.scrollHeight;
  }, 100);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 8px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
}
</style> 