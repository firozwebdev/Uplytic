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

  // Calculate status distribution
  const statusCounts = {};
  props.logs.forEach((log) => {
    let status = "Success";
    if (log.status_code >= 500) status = "Server Error";
    else if (log.status_code >= 400) status = "Client Error";
    else if (log.status_code >= 300) status = "Redirect";

    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const labels = Object.keys(statusCounts);
  const data = Object.values(statusCounts);
  const colors = [
    "#10b981", // green for success
    "#f59e0b", // amber for redirect
    "#ef4444", // red for client error
    "#dc2626", // darker red for server error
  ];

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
            color: "#374151",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#3b82f6",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            },
          },
        },
      },
      cutout: "60%",
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
