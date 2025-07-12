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
        🚨 Alerts & Notifications
      </h4>
      <div
        class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
        :class="
          alerts.length === 0
            ? isDark
              ? 'bg-green-900/50 text-green-400'
              : 'bg-green-100 text-green-800'
            : criticalAlerts.length > 0
            ? isDark
              ? 'bg-red-900/50 text-red-400'
              : 'bg-red-100 text-red-800'
            : isDark
            ? 'bg-yellow-900/50 text-yellow-400'
            : 'bg-yellow-100 text-yellow-800'
        "
      >
        <span v-if="alerts.length === 0">✅ No Alerts</span>
        <span v-else-if="criticalAlerts.length > 0">
          🚨 {{ criticalAlerts.length }} Critical
        </span>
        <span v-else>
          ⚠️ {{ warningAlerts.length }} Warnings
        </span>
      </div>
    </div>

    <!-- Alerts List -->
    <div v-if="alerts.length > 0" class="space-y-3 max-h-96 overflow-y-auto">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="p-4 rounded-lg border-l-4 transition-colors duration-300"
        :class="
          alert.severity === 'critical'
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
            <div class="flex items-center space-x-2 mb-1">
              <h5
                class="font-medium transition-colors duration-300"
                :class="
                  alert.severity === 'critical'
                    ? isDark
                      ? 'text-red-400'
                      : 'text-red-800'
                    : isDark
                    ? 'text-yellow-400'
                    : 'text-yellow-800'
                "
              >
                {{ alert.title }}
              </h5>
              <span
                v-if="alert.resolved"
                class="px-2 py-1 text-xs rounded-full"
                :class="
                  isDark
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-green-100 text-green-800'
                "
              >
                Resolved
              </span>
            </div>
            <p
              class="text-sm mb-2 transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-gray-600'"
            >
              {{ alert.message }}
            </p>
            <div
              class="flex items-center justify-between text-xs transition-colors duration-300"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              <span>{{ formatTime(alert.timestamp) }}</span>
              <span v-if="alert.recommendation" class="text-blue-500">
                💡 {{ alert.recommendation }}
              </span>
            </div>
          </div>
          <div class="ml-3 flex-shrink-0">
            <button
              v-if="!alert.resolved"
              @click="resolveAlert(alert.id)"
              class="p-1 rounded transition-colors duration-200"
              :class="
                isDark
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              "
              title="Mark as resolved"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Alerts State -->
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
      <p class="text-sm">No alerts at the moment</p>
      <p class="text-xs mt-1">Your APIs are running smoothly!</p>
    </div>

    <!-- Alert Statistics -->
    <div v-if="alertStats.total > 0" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h5
        class="text-sm font-medium mb-3 transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        Alert Statistics
      </h5>
      <div class="grid grid-cols-4 gap-4 text-center">
        <div>
          <div
            class="text-lg font-bold transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-900'"
          >
            {{ alertStats.total }}
          </div>
          <div
            class="text-xs transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Total
          </div>
        </div>
        <div>
          <div
            class="text-lg font-bold transition-colors duration-300"
            :class="isDark ? 'text-red-400' : 'text-red-700'"
          >
            {{ alertStats.critical }}
          </div>
          <div
            class="text-xs transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Critical
          </div>
        </div>
        <div>
          <div
            class="text-lg font-bold transition-colors duration-300"
            :class="isDark ? 'text-yellow-400' : 'text-yellow-700'"
          >
            {{ alertStats.warning }}
          </div>
          <div
            class="text-xs transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Warnings
          </div>
        </div>
        <div>
          <div
            class="text-lg font-bold transition-colors duration-300"
            :class="isDark ? 'text-green-400' : 'text-green-700'"
          >
            {{ alertStats.resolved }}
          </div>
          <div
            class="text-xs transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Resolved
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { alertService } from '../../services/alertService';

const props = defineProps({
  apiId: {
    type: [String, Number],
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  }
});

const alerts = ref([]);
const alertStats = ref({
  total: 0,
  critical: 0,
  warning: 0,
  resolved: 0,
  unresolved: 0
});

const criticalAlerts = computed(() => 
  alerts.value.filter(alert => alert.severity === 'critical' && !alert.resolved)
);

const warningAlerts = computed(() => 
  alerts.value.filter(alert => alert.severity === 'warning' && !alert.resolved)
);

const loadAlerts = async () => {
  try {
    const [alertsData, statsData] = await Promise.all([
      alertService.fetchAlerts(props.apiId),
      alertService.getAlertStats(props.apiId)
    ]);
    
    alerts.value = alertsData;
    alertStats.value = statsData;
  } catch (error) {
    console.error('Error loading alerts:', error);
  }
};

const resolveAlert = async (alertId) => {
  try {
    await alertService.resolveAlert(alertId);
    await loadAlerts(); // Reload alerts
  } catch (error) {
    console.error('Error resolving alert:', error);
  }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

onMounted(() => {
  loadAlerts();
});

// Reload alerts when apiId changes
watch(() => props.apiId, () => {
  if (props.apiId) {
    loadAlerts();
  }
});

// Refresh alerts every 30 seconds
setInterval(() => {
  if (props.apiId) {
    loadAlerts();
  }
}, 30000);
</script> 