import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  addApi as addApiService,
  deleteApi as deleteApiService,
  fetchApis,
  updateApi as updateApiService,
} from "../services/apiService";
import { addLog as addLogService, fetchLogs } from "../services/logService";

export const useApiStore = defineStore("api", () => {
  // State
  const apis = ref([]);
  const selectedApiId = ref(null);
  const logs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const selectedApi = computed(() => {
    return apis.value.find((api) => api.id === selectedApiId.value);
  });

  const apiStats = computed(() => {
    return apis.value.map((api) => {
      const apiLogs = logs.value.filter((log) => log.api_id === api.id);
      const totalChecks = apiLogs.length;
      const successfulChecks = apiLogs.filter(
        (log) => log.status_code < 400
      ).length;
      const uptime =
        totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 0;
      const avgLatency =
        apiLogs.length > 0
          ? apiLogs.reduce((sum, log) => sum + log.latency_ms, 0) /
            apiLogs.length
          : 0;
      return {
        id: api.id,
        name: api.name,
        url: api.url,
        uptime: Math.round(uptime * 100) / 100,
        avgLatency: Math.round(avgLatency),
        totalChecks,
        lastCheck:
          apiLogs.length > 0 ? apiLogs[apiLogs.length - 1].created_at : null,
        status:
          apiLogs.length > 0 ? apiLogs[apiLogs.length - 1].status_code : null,
      };
    });
  });

  // Actions
  async function loadApis() {
    isLoading.value = true;
    error.value = null;
    try {
      apis.value = await fetchApis();
      // Optionally select the first API by default
      if (apis.value.length > 0 && !selectedApiId.value) {
        selectedApiId.value = apis.value[0].id;
      }
    } catch (err) {
      error.value = err.message || "Failed to load APIs";
    } finally {
      isLoading.value = false;
    }
  }

  async function loadLogs(apiId) {
    isLoading.value = true;
    error.value = null;
    try {
      logs.value = await fetchLogs(apiId);
    } catch (err) {
      error.value = err.message || "Failed to load logs";
    } finally {
      isLoading.value = false;
    }
  }

  async function addApi(api) {
    isLoading.value = true;
    error.value = null;
    try {
      const newApi = await addApiService(api);
      apis.value.push(newApi);
      return newApi;
    } catch (err) {
      error.value = err.message || "Failed to add API";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateApi(id, updates) {
    isLoading.value = true;
    error.value = null;
    try {
      const updated = await updateApiService(id, updates);
      const index = apis.value.findIndex((api) => api.id === id);
      if (index !== -1) apis.value[index] = updated;
      return updated;
    } catch (err) {
      error.value = err.message || "Failed to update API";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteApi(id) {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteApiService(id);
      apis.value = apis.value.filter((api) => api.id !== id);
      if (selectedApiId.value === id) selectedApiId.value = null;
    } catch (err) {
      error.value = err.message || "Failed to delete API";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function selectApi(id) {
    selectedApiId.value = id;
    // Optionally load logs for the selected API
    loadLogs(id);
  }

  async function addLog(log) {
    isLoading.value = true;
    error.value = null;
    try {
      const newLog = await addLogService(log);
      logs.value.unshift(newLog);
      return newLog;
    } catch (err) {
      error.value = err.message || "Failed to add log";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // State
    apis,
    selectedApiId,
    logs,
    isLoading,
    error,
    // Getters
    selectedApi,
    apiStats,
    // Actions
    loadApis,
    loadLogs,
    addApi,
    updateApi,
    deleteApi,
    selectApi,
    addLog,
  };
});
