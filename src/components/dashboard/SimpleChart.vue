<template>
  <div class="relative">
    <canvas ref="chartRef" class="w-full h-64"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  logs: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: "line",
  },
});

const chartRef = ref(null);

const createSimpleChart = () => {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  // Simple bar chart for now
  const recentLogs = props.logs
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .slice(-10);

  // Clear canvas
  ctx.clearRect(0, 0, chartRef.value.width, chartRef.value.height);

  if (recentLogs.length === 0) return;

  const maxLatency = Math.max(...recentLogs.map((log) => log.latency_ms));
  const barWidth = chartRef.value.width / recentLogs.length - 4;
  const maxHeight = chartRef.value.height - 40;

  recentLogs.forEach((log, index) => {
    const x = index * (barWidth + 4) + 2;
    const height = (log.latency_ms / maxLatency) * maxHeight;
    const y = chartRef.value.height - height - 20;

    // Color based on status
    if (log.status_code >= 400) {
      ctx.fillStyle = "#ef4444"; // red
    } else if (log.latency_ms > 1000) {
      ctx.fillStyle = "#f59e0b"; // amber
    } else {
      ctx.fillStyle = "#10b981"; // green
    }

    ctx.fillRect(x, y, barWidth, height);

    // Draw latency text
    ctx.fillStyle = "#374151";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `${log.latency_ms}ms`,
      x + barWidth / 2,
      chartRef.value.height - 5
    );
  });
};

onMounted(() => {
  createSimpleChart();
});

watch(
  () => props.logs,
  () => {
    createSimpleChart();
  },
  { deep: true }
);
</script>
