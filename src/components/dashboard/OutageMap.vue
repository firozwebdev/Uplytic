<template>
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
      </l-marker>
    </l-map>
    
    <!-- Map Legend -->
    <div class="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50 dark:border-gray-600/50">
      <div class="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">API Status</div>
      <div class="space-y-1">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
          <span class="text-xs text-gray-600 dark:text-gray-400">Healthy</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
          <span class="text-xs text-gray-600 dark:text-gray-400">Down</span>
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

// Placeholder icons - using simple icons first to ensure they show up
const healthyIcon = L.divIcon({
  className: 'leaflet-div-icon',
  html: '<div style="background:#22c55e;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const outageIcon = L.divIcon({
  className: 'leaflet-div-icon',
  html: '<div style="background:#ef4444;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
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

/* Ensure div icons are visible */
.leaflet-div-icon {
  background: transparent !important;
  border: none !important;
}

/* Debug: Add a border to see the map container */
.rounded-xl {
  border: 2px solid #e5e7eb;
}

/* Custom popup styling */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

:deep(.leaflet-popup-content) {
  margin: 12px 16px;
  font-family: 'Inter', sans-serif;
}

:deep(.leaflet-popup-tip) {
  background: white;
}

/* Dark mode support for popups */
.dark :deep(.leaflet-popup-content-wrapper) {
  background: #1f2937;
  color: white;
}

.dark :deep(.leaflet-popup-tip) {
  background: #1f2937;
}
</style> 