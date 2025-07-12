<template>
  <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <l-map
      style="height: 400px; width: 100%"
      :zoom="2"
      :center="[20, 0]"
      :zoomControl="true"
      :scrollWheelZoom="true"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <l-marker
        v-for="api in apis"
        :key="api.id"
        :lat-lng="[api.lat, api.lng]"
        :icon="api.status >= 400 ? outageIcon : healthyIcon"
      >
        <l-popup>
          <div class="min-w-[160px]">
            <div class="font-bold text-base mb-1">{{ api.name }}</div>
            <div class="text-xs mb-1">Status: <span :class="api.status >= 400 ? 'text-red-500' : 'text-green-500'">{{ api.status }}</span></div>
            <div class="text-xs text-gray-500">Last check: {{ formatLastCheck(api.lastCheck) }}</div>
          </div>
        </l-popup>
        <div v-if="api.status >= 400" class="pulse-marker"></div>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Placeholder icons
const healthyIcon = L.divIcon({
  className: 'leaflet-div-icon',
  html: '<div style="background:#22c55e;width:16px;height:16px;border-radius:50%;border:2px solid #fff;"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});
const outageIcon = L.divIcon({
  className: 'leaflet-div-icon',
  html: '<div class="pulse"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Props: apis = [{ id, name, lat, lng, status, lastCheck }]
const props = defineProps({
  apis: {
    type: Array,
    default: () => [
      { id: 1, name: 'API US', lat: 37.7749, lng: -122.4194, status: 200, lastCheck: new Date().toISOString() },
      { id: 2, name: 'API EU', lat: 52.52, lng: 13.405, status: 503, lastCheck: new Date().toISOString() },
      { id: 3, name: 'API Asia', lat: 1.3521, lng: 103.8198, status: 200, lastCheck: new Date().toISOString() },
    ],
  },
});

function formatLastCheck(timestamp) {
  if (!timestamp) return 'Never';
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}
</script>

<style scoped>
.pulse {
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  animation: pulse 1.5s infinite;
  border: 2px solid #fff;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}
</style> 