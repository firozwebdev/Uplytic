<template>
  <div class="relative">
    <canvas ref="chartRef" class="w-full h-64"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  logs: {
    type: Array,
    required: true,
  },
});

const chartRef = ref(null);
let chart = null;

const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartRef.value.getContext("2d");

  // Prepare data
  const recentLogs = props.logs
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .slice(-20); // Last 20 logs

  const labels = recentLogs.map((log) => {
    const date = new Date(log.created_at);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  const data = recentLogs.map((log) => log.latency_ms);
  const colors = recentLogs.map((log) => {
    if (log.status_code >= 400) return "#ef4444"; // red
    if (log.latency_ms > 1000) return "#f59e0b"; // amber
    return "#10b981"; // green
  });

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Response Time (ms)",
          data,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors,
          pointBorderColor: colors,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#3b82f6",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function (context) {
              const log = recentLogs[context.dataIndex];
              return [
                `Response Time: ${context.parsed.y}ms`,
                `Status: ${log.status_code}`,
                `Time: ${new Date(log.created_at).toLocaleString()}`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
            maxRotation: 45,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
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

onMounted(() => {
  createChart();
});

watch(
  () => props.logs,
  () => {
    createChart();
  },
  { deep: true }
);
</script>
