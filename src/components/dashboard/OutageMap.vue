<template>
  <div class="space-y-4">
    <!-- Map Container -->
    <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <l-map
        ref="mapRef"
        style="height: 400px; width: 100%"
        :zoom="zoom"
        :center="center"
        :zoomControl="true"
        :scrollWheelZoom="true"
        @ready="onMapReady"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <l-marker
          v-for="api in displayApis"
          :key="`api-${api.id}`"
          :lat-lng="[Number(api.lat), Number(api.lng)]"
          :icon="api.status >= 400 ? outageIcon : healthyIcon"
        >
          <l-popup>
            <div class="min-w-[200px]">
              <div class="flex items-center mb-2">
                <div class="w-3 h-3 rounded-full mr-2" :class="api.status >= 400 ? 'bg-red-500' : 'bg-green-500'"></div>
                <div class="font-bold text-base">{{ api.name }}</div>
              </div>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span :class="api.status >= 400 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
                    {{ api.status >= 400 ? 'Down' : 'Healthy' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Code:</span>
                  <span class="font-mono" :class="api.status >= 400 ? 'text-red-500' : 'text-green-500'">{{ api.status }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Last check:</span>
                  <span class="text-gray-500">{{ formatLastCheck(api.lastCheck) }}</span>
                </div>
              </div>
            </div>
          </l-popup>
          <div v-if="api.status >= 400" class="pulse-marker"></div>
        </l-marker>
      </l-map>
      
      <!-- Outage Alert -->
      <div v-if="outageCount > 0" class="absolute top-4 left-1/2 transform -translate-x-1/2 outage-alert">
        <div class="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span class="font-semibold">{{ outageCount }} API{{ outageCount > 1 ? 's' : '' }} Down</span>
        </div>
      </div>
    </div>
    
    <!-- Status Information Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Total APIs Card -->
      <div class="status-card bg-white dark:bg-gray-800/95 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">Total APIs</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Monitored endpoints</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{{ displayApis.length }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Active endpoints</div>
        </div>
      </div>
      
      <!-- Healthy APIs Card -->
      <div class="status-card bg-white dark:bg-gray-800/95 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">Healthy</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Operational APIs</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ displayApis.filter(api => api.status < 400).length }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Running smoothly</div>
        </div>
      </div>
      
      <!-- Down APIs Card -->
      <div class="status-card bg-white dark:bg-gray-800/95 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">Down</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Issues detected</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{{ displayApis.filter(api => api.status >= 400).length }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Needs attention</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Placeholder icons - using beautiful animated icons with inline styles
const healthyIcon = L.divIcon({
  className: 'leaflet-div-icon healthy-marker',
  html: `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    ">
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        border: 3px solid #ffffff;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        position: relative;
        z-index: 3;
        animation: healthyGlow 2s ease-in-out infinite alternate;
      "></div>
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.3);
        border: 2px solid rgba(34, 197, 94, 0.5);
        z-index: 2;
        animation: pulse 2s infinite;
      "></div>
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%);
        filter: blur(4px);
        z-index: 1;
        animation: glow 3s ease-in-out infinite;
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const outageIcon = L.divIcon({
  className: 'leaflet-div-icon outage-marker',
  html: `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    ">
      <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border: 3px solid #ffffff;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        position: relative;
        z-index: 3;
        animation: outageGlow 1.5s ease-in-out infinite alternate;
      "></div>
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.4);
        border: 2px solid rgba(239, 68, 68, 0.6);
        z-index: 2;
        animation: pulse 1.2s infinite;
      "></div>
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%);
        filter: blur(4px);
        z-index: 1;
        animation: glow 2s ease-in-out infinite;
      "></div>
      <div style="
        position: absolute;
        top: -8px;
        right: -8px;
        width: 16px;
        height: 16px;
        background: #fbbf24;
        color: #92400e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        z-index: 4;
        animation: alertPulse 1s ease-in-out infinite;
        box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
      ">!</div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
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
  zoom: {
    type: Number,
    default: 2,
  },
  center: {
    type: Array,
    default: () => [20, 0],
  },
});

// Debug: Watch for changes in props
watch(() => props.apis, (newApis) => {
  console.log('OutageMap received APIs:', newApis);
  if (newApis && newApis.length > 0) {
    console.log('First API coordinates:', newApis[0].lat, newApis[0].lng);
  }
}, { immediate: true, deep: true });



// Watch for changes in center and zoom to update map
const mapRef = ref(null);
const leafletMap = ref(null);

watch([() => props.center, () => props.zoom], ([newCenter, newZoom]) => {
  if (leafletMap.value && newCenter && newZoom) {
    console.log('Updating map center and zoom:', newCenter, newZoom);
    leafletMap.value.setView(newCenter, newZoom);
  }
}, { immediate: true });



onMounted(() => {
  console.log('OutageMap mounted with center:', props.center, 'zoom:', props.zoom);
});

// Ensure we have data to display
const displayApis = computed(() => {
  console.log('OutageMap displayApis computed - props.apis:', props.apis);
  
  if (props.apis && props.apis.length > 0) {
    console.log('Using provided APIs:', props.apis);
    // Validate coordinates
    const validApis = props.apis.filter(api => {
      const lat = Number(api.lat);
      const lng = Number(api.lng);
      const isValid = !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
      if (!isValid) {
        console.warn('Invalid coordinates for API:', api.name, 'lat:', api.lat, 'lng:', api.lng);
      }
      return isValid;
    });
    console.log('Valid APIs for markers:', validApis);
    return validApis;
  }
  
  // Fallback to default data if no APIs provided
  console.log('Using fallback test data');
  return [
    { id: 1, name: 'API US', lat: 37.7749, lng: -122.4194, status: 200, lastCheck: new Date().toISOString() },
    { id: 2, name: 'API EU', lat: 52.52, lng: 13.405, status: 503, lastCheck: new Date().toISOString() },
    { id: 3, name: 'API Asia', lat: 1.3521, lng: 103.8198, status: 200, lastCheck: new Date().toISOString() },
  ];
});

// Count outages for alert
const outageCount = computed(() => {
  return displayApis.value.filter(api => api.status >= 400).length;
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

function onMapReady(map) {
  console.log('OutageMap map is ready');
  leafletMap.value = map;
  // Set initial view
  if (props.center && props.zoom) {
    map.setView(props.center, props.zoom);
  }
  
  // Debug: Check if markers are being added
  setTimeout(() => {
    console.log('Map is ready, display APIs for markers:', displayApis.value);
  }, 1000);
}
</script>

<style scoped>
/* Ensure map container is visible */
.leaflet-container {
  z-index: 1;
}

/* Marker container */
.marker-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Marker dot */
.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
}

.marker-dot.healthy {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  animation: healthyGlow 2s ease-in-out infinite alternate;
}

.marker-dot.outage {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  width: 20px;
  height: 20px;
  animation: outageGlow 1.5s ease-in-out infinite alternate;
}

/* Pulse animation */
.marker-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  animation: pulse 2s infinite;
}

.marker-pulse.healthy-pulse {
  background: rgba(34, 197, 94, 0.3);
  border: 2px solid rgba(34, 197, 94, 0.5);
}

.marker-pulse.outage-pulse {
  background: rgba(239, 68, 68, 0.4);
  border: 2px solid rgba(239, 68, 68, 0.6);
  animation: pulse 1.2s infinite;
}

/* Glow effect */
.marker-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  filter: blur(4px);
  animation: glow 3s ease-in-out infinite;
}

.marker-glow.healthy-glow {
  background: radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%);
}

.marker-glow.outage-glow {
  background: radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%);
  animation: glow 2s ease-in-out infinite;
}

/* Alert indicator for outages */
.marker-alert {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  background: #fbbf24;
  color: #92400e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  z-index: 4;
  animation: alertPulse 1s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
}

/* Marker animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.8);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes healthyGlow {
  0% {
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
  100% {
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.6);
  }
}

@keyframes outageGlow {
  0% {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
  100% {
    box-shadow: 0 4px 24px rgba(239, 68, 68, 0.8);
  }
}

@keyframes alertPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* Hover effects for markers */
.leaflet-div-icon:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}

/* Debug: Add a border to see the map container */
.rounded-xl {
  border: 2px solid #e5e7eb;
}

/* Custom popup styling */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.leaflet-popup-content) {
  margin: 16px 20px;
  font-family: 'Inter', sans-serif;
}

:deep(.leaflet-popup-tip) {
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Dark mode support for popups */
.dark :deep(.leaflet-popup-content-wrapper) {
  background: rgba(31, 41, 55, 0.95);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark :deep(.leaflet-popup-tip) {
  background: rgba(31, 41, 55, 0.95);
}

/* Enhanced legend */
.legend {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 200px;
}

.legend:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
}

.dark .legend {
  background: rgba(31, 41, 55, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.dark .legend:hover {
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5);
}

/* Status counter specific styling */
.legend .text-3xl {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .legend .text-3xl {
  background: linear-gradient(135deg, #818cf8, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Icon container styling */
.legend .w-8.h-8 {
  transition: all 0.3s ease;
}

.legend:hover .w-8.h-8 {
  transform: scale(1.1);
}

/* Status row styling */
.legend .bg-green-50,
.legend .bg-red-50 {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.legend .bg-green-50:hover,
.legend .bg-red-50:hover {
  transform: translateX(4px);
  border-color: rgba(0, 0, 0, 0.1);
}

.dark .legend .bg-green-50:hover,
.dark .legend .bg-red-50:hover {
  border-color: rgba(255, 255, 255, 0.1);
}

/* Outage alert styling */
.outage-alert {
  z-index: 1000;
}

.outage-alert > div {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
  animation: alertBounce 2s ease-in-out infinite;
}

@keyframes alertBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Enhanced map container */
.rounded-xl {
  position: relative;
  overflow: hidden;
}

.rounded-xl::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Status cards styling */
.status-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  backdrop-filter: blur(8px);
}

.status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.1);
}

.dark .status-card {
  background: rgba(31, 41, 55, 0.95);
  border-color: rgba(75, 85, 99, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.dark .status-card:hover {
  border-color: rgba(156, 163, 175, 0.4);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.4);
  background: rgba(31, 41, 55, 0.98);
}

/* Icon container animations */
.status-card .w-10.h-10 {
  transition: all 0.3s ease;
}

.status-card:hover .w-10.h-10 {
  transform: scale(1.1);
}

.dark .status-card .w-10.h-10 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Number animations */
.status-card .text-3xl {
  transition: all 0.3s ease;
}

.status-card:hover .text-3xl {
  transform: scale(1.05);
}

/* Dark theme specific text improvements */
.dark .status-card .text-gray-100 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .status-card .text-3xl {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style> 