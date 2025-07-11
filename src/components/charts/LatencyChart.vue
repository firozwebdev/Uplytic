<template>
  <div class="relative">
    <canvas ref="chartCanvas" class="w-full h-64"></canvas>
    <!-- Floating stats overlay -->
    <div
      class="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50 dark:border-gray-600/50"
    >
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Average Latency
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ avgLatency }}ms
      </div>
    </div>
    <!-- Trend indicator -->
    <div class="absolute top-4 right-4 flex items-center space-x-2">
      <div class="flex items-center space-x-1">
        <svg
          v-if="trend === 'up'"
          class="w-4 h-4 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 10.586z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L12 9.414z"
            clip-rule="evenodd"
          />
        </svg>
        <span
          class="text-sm font-medium"
          :class="trend === 'up' ? 'text-red-500' : 'text-green-500'"
        >
          {{ trendPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  logs: {
    type: Array,
    default: () => [],
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

const chartCanvas = ref(null);
let chart = null;

const avgLatency = computed(() => {
  if (!props.logs.length) return 0;
  const sum = props.logs.reduce((acc, log) => acc + log.latency_ms, 0);
  return Math.round(sum / props.logs.length);
});

const trend = computed(() => {
  if (props.logs.length < 2) return "stable";
  const recent = props.logs.slice(-5);
  const older = props.logs.slice(-10, -5);
  if (recent.length === 0 || older.length === 0) return "stable";

  const recentAvg =
    recent.reduce((acc, log) => acc + log.latency_ms, 0) / recent.length;
  const olderAvg =
    older.reduce((acc, log) => acc + log.latency_ms, 0) / older.length;

  return recentAvg > olderAvg ? "up" : "down";
});

const trendPercentage = computed(() => {
  if (props.logs.length < 2) return 0;
  const recent = props.logs.slice(-5);
  const older = props.logs.slice(-10, -5);
  if (recent.length === 0 || older.length === 0) return 0;

  const recentAvg =
    recent.reduce((acc, log) => acc + log.latency_ms, 0) / recent.length;
  const olderAvg =
    older.reduce((acc, log) => acc + log.latency_ms, 0) / older.length;

  return Math.abs(Math.round(((recentAvg - olderAvg) / olderAvg) * 100));
});

const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  // Use logs for chart data
  const chartData = props.logs.length > 0
    ? props.logs.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    : generateSampleData();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.map((log, index) => {
        const date = new Date(log.created_at);
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }),
      datasets: [
        {
          label: "Latency (ms)",
          data: chartData.map((log) => log.latency_ms),
          borderColor: props.isDark ? "#60a5fa" : "#3b82f6",
          backgroundColor: props.isDark
            ? "rgba(96, 165, 250, 0.1)"
            : "rgba(59, 130, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: props.isDark ? "#60a5fa" : "#3b82f6",
          pointBorderColor: props.isDark ? "#1e40af" : "#1d4ed8",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: props.isDark ? "#93c5fd" : "#60a5fa",
          pointHoverBorderColor: props.isDark ? "#60a5fa" : "#3b82f6",
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: props.isDark
            ? "rgba(31, 41, 55, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          titleColor: props.isDark ? "#f3f4f6" : "#1f2937",
          bodyColor: props.isDark ? "#d1d5db" : "#374151",
          borderColor: props.isDark ? "#4b5563" : "#e5e7eb",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `Latency: ${context.parsed.y}ms`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: props.isDark
              ? "rgba(75, 85, 99, 0.2)"
              : "rgba(229, 231, 235, 0.5)",
            drawBorder: false,
          },
          ticks: {
            color: props.isDark ? "#9ca3af" : "#6b7280",
            font: {
              size: 11,
            },
          },
        },
        y: {
          grid: {
            color: props.isDark
              ? "rgba(75, 85, 99, 0.2)"
              : "rgba(229, 231, 235, 0.5)",
            drawBorder: false,
          },
          ticks: {
            color: props.isDark ? "#9ca3af" : "#6b7280",
            font: {
              size: 11,
            },
            callback: function (value) {
              return value + "ms";
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
};

const generateSampleData = () => {
  const data = [];
  const baseLatency = 200;
  for (let i = 0; i < 20; i++) {
    data.push({
      latency: baseLatency + Math.random() * 100 + Math.sin(i * 0.5) * 20,
      timestamp: new Date(Date.now() - (19 - i) * 60000),
    });
  }
  return data;
};

onMounted(() => {
  createChart();
});

watch(
  () => props.isDark,
  () => {
    createChart();
  }
);

watch(
  () => props.logs,
  () => {
    createChart();
  },
  { deep: true }
);
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.relative {
  animation: fadeInUp 0.6s ease-out;
}
</style>
