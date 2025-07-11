<template>
  <div class="relative">
    <canvas ref="chartCanvas" class="w-full h-64"></canvas>
    <!-- Status legend -->
    <div class="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-300"
          >Success</span
        >
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-300"
          >Warning</span
        >
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-300"
          >Error</span
        >
      </div>
    </div>
    <!-- Uptime indicator -->
    <div
      class="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50 dark:border-gray-600/50"
    >
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Uptime</div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ uptimePercentage }}%
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

const statusData = computed(() => {
  const statuses = props.logs.length > 0 ? props.logs : generateSampleData();
  const success = statuses.filter((s) => s.status_code < 400).length;
  const warning = statuses.filter(
    (s) => s.status_code >= 400 && s.status_code < 500
  ).length;
  const error = statuses.filter((s) => s.status_code >= 500).length;

  return [
    { label: "Success", value: success, color: "#10b981" },
    { label: "Warning", value: warning, color: "#f59e0b" },
    { label: "Error", value: error, color: "#ef4444" },
  ];
});

const uptimePercentage = computed(() => {
  const total = statusData.value.reduce((acc, item) => acc + item.value, 0);
  if (total === 0) return 100;
  const success =
    statusData.value.find((item) => item.label === "Success")?.value || 0;
  return Math.round((success / total) * 100);
});

const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: statusData.value.map((item) => item.label),
      datasets: [
        {
          data: statusData.value.map((item) => item.value),
          backgroundColor: statusData.value.map((item) => item.color),
          borderColor: props.isDark ? "#1f2937" : "#ffffff",
          borderWidth: 3,
          hoverBorderColor: props.isDark ? "#374151" : "#f3f4f6",
          hoverBorderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      animation: {
        animateRotate: true,
        animateScale: true,
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
          displayColors: true,
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((context.parsed / total) * 100);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
};

const generateSampleData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const random = Math.random();
    if (random < 0.85) {
      data.push({ status_code: 200 + Math.floor(Math.random() * 200) }); // Success
    } else if (random < 0.95) {
      data.push({ status_code: 400 + Math.floor(Math.random() * 100) }); // Warning
    } else {
      data.push({ status_code: 500 + Math.floor(Math.random() * 100) }); // Error
    }
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
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.relative {
  animation: fadeInScale 0.8s ease-out;
}
</style>
