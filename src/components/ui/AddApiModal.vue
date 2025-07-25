<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all"
      >
        <!-- Header -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Add New API</h3>
          <p class="text-sm text-gray-500">
            Monitor your API endpoint for health and performance
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- API Name -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              API Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., User Service API"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>

          <!-- API URL -->
          <div>
            <label
              for="url"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              API URL
            </label>
            <input
              id="url"
              v-model="form.url"
              type="url"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://api.example.com/health"
            />
            <p v-if="errors.url" class="text-xs text-red-500 mt-1">{{ errors.url }}</p>
          </div>

          <!-- Cost per Hour -->
          <div>
            <label
              for="cost"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Cost per Hour ($)
            </label>
            <input
              id="cost"
              v-model.number="form.cost_per_hour"
              type="number"
              min="0"
              step="0.01"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
            />
            <p class="text-xs text-gray-500 mt-1">
              Used for downtime cost calculations
            </p>
            <p v-if="errors.cost_per_hour" class="text-xs text-red-500 mt-1">{{ errors.cost_per_hour }}</p>
          </div>

          <!-- Latitude -->
          <div>
            <label for="lat" class="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              id="lat"
              v-model="form.lat"
              type="number"
              min="-90"
              max="90"
              step="any"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="37.7749"
            />
            <p v-if="errors.lat" class="text-xs text-red-500 mt-1">{{ errors.lat }}</p>
          </div>

          <!-- Longitude -->
          <div>
            <label for="lng" class="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              id="lng"
              v-model="form.lng"
              type="number"
              min="-180"
              max="180"
              step="any"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="-122.4194"
            />
            <p v-if="errors.lng" class="text-xs text-red-500 mt-1">{{ errors.lng }}</p>
          </div>

          <!-- Public Access -->
          <div class="flex items-center">
            <input
              id="public"
              v-model="form.is_public"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="public" class="ml-2 text-sm text-gray-700">
              Make this API publicly accessible
            </label>
          </div>

          <!-- Actions -->
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Adding...</span>
              <span v-else>Add API</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '../../stores/api';
import { useToast } from 'vue-toastification';

const apiStore = useApiStore();
const isSubmitting = ref(false);
const toast = useToast();

const form = ref({
  name: "",
  url: "",
  cost_per_hour: 0,
  is_public: false,
  lat: '',
  lng: '',
});

const errors = ref({
  name: '',
  url: '',
  cost_per_hour: '',
  lat: '',
  lng: '',
});

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateForm() {
  let valid = true;
  errors.value = { name: '', url: '', cost_per_hour: '', lat: '', lng: '' };

  if (!form.value.name.trim()) {
    errors.value.name = 'API Name is required.';
    valid = false;
  } else if (apiStore.apis.some(api => api.name.trim().toLowerCase() === form.value.name.trim().toLowerCase())) {
    errors.value.name = 'An API with this name already exists.';
    valid = false;
  }
  if (!form.value.url.trim()) {
    errors.value.url = 'API URL is required.';
    valid = false;
  } else if (!validateUrl(form.value.url)) {
    errors.value.url = 'Please enter a valid URL (e.g., https://api.example.com/health).';
    valid = false;
  } else if (apiStore.apis.some(api => api.url.trim().toLowerCase() === form.value.url.trim().toLowerCase())) {
    errors.value.url = 'An API with this URL already exists.';
    valid = false;
  }
  if (form.value.cost_per_hour === '' || form.value.cost_per_hour === null || isNaN(form.value.cost_per_hour)) {
    errors.value.cost_per_hour = 'Cost per Hour is required and must be a number.';
    valid = false;
  } else if (form.value.cost_per_hour < 0) {
    errors.value.cost_per_hour = 'Cost per Hour cannot be negative.';
    valid = false;
  }
  if (form.value.lat === '' || isNaN(form.value.lat)) {
    errors.value.lat = 'Latitude is required and must be a number.';
    valid = false;
  } else if (form.value.lat < -90 || form.value.lat > 90) {
    errors.value.lat = 'Latitude must be between -90 and 90.';
    valid = false;
  }
  if (form.value.lng === '' || isNaN(form.value.lng)) {
    errors.value.lng = 'Longitude is required and must be a number.';
    valid = false;
  } else if (form.value.lng < -180 || form.value.lng > 180) {
    errors.value.lng = 'Longitude must be between -180 and 180.';
    valid = false;
  }
  return valid;
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  isSubmitting.value = true;

  try {
    const newApi = await apiStore.addApi({
      name: form.value.name,
      url: form.value.url,
      cost_per_hour: form.value.cost_per_hour,
      is_public: form.value.is_public,
      lat: parseFloat(form.value.lat),
      lng: parseFloat(form.value.lng),
    });

    // Reset form
    form.value = {
      name: "",
      url: "",
      cost_per_hour: 0,
      is_public: false,
      lat: '',
      lng: '',
    };

    // Emit success
    toast.success('API added successfully!');
    emit("api-added", newApi);
    emit("close");
  } catch (error) {
    toast.error(error.message || "Error adding API");
    console.error("Error adding API:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const emit = defineEmits(["close", "api-added"]);
</script>
