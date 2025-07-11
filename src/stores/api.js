import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useApiStore = defineStore("api", () => {
  // State
  const apis = ref([
    {
      id: "1",
      name: "User Service API",
      url: "https://api.example.com/users",
      is_public: true,
      uuid: "550e8400-e29b-41d4-a716-446655440001",
      cost_per_hour: 25.0,
      created_at: "2025-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "Payment Gateway",
      url: "https://payments.example.com/health",
      is_public: false,
      uuid: "550e8400-e29b-41d4-a716-446655440002",
      cost_per_hour: 50.0,
      created_at: "2025-01-14T15:30:00Z",
    },
    {
      id: "3",
      name: "Email Service",
      url: "https://email.example.com/api/status",
      is_public: true,
      uuid: "550e8400-e29b-41d4-a716-446655440003",
      cost_per_hour: 15.0,
      created_at: "2025-01-13T09:15:00Z",
    },
  ]);

  const selectedApiId = ref("1");
  const logs = ref([
    // User Service API logs
    {
      id: "1",
      api_id: "1",
      status_code: 200,
      latency_ms: 45,
      created_at: "2025-01-15T14:30:00Z",
    },
    {
      id: "2",
      api_id: "1",
      status_code: 200,
      latency_ms: 52,
      created_at: "2025-01-15T14:29:00Z",
    },
    {
      id: "3",
      api_id: "1",
      status_code: 500,
      latency_ms: 1200,
      created_at: "2025-01-15T14:28:00Z",
    },
    {
      id: "4",
      api_id: "1",
      status_code: 200,
      latency_ms: 48,
      created_at: "2025-01-15T14:27:00Z",
    },
    {
      id: "5",
      api_id: "1",
      status_code: 200,
      latency_ms: 51,
      created_at: "2025-01-15T14:26:00Z",
    },
    {
      id: "6",
      api_id: "1",
      status_code: 200,
      latency_ms: 47,
      created_at: "2025-01-15T14:25:00Z",
    },
    {
      id: "7",
      api_id: "1",
      status_code: 200,
      latency_ms: 49,
      created_at: "2025-01-15T14:24:00Z",
    },
    {
      id: "8",
      api_id: "1",
      status_code: 200,
      latency_ms: 53,
      created_at: "2025-01-15T14:23:00Z",
    },
    {
      id: "9",
      api_id: "1",
      status_code: 200,
      latency_ms: 46,
      created_at: "2025-01-15T14:22:00Z",
    },
    {
      id: "10",
      api_id: "1",
      status_code: 200,
      latency_ms: 50,
      created_at: "2025-01-15T14:21:00Z",
    },

    // Payment Gateway logs
    {
      id: "11",
      api_id: "2",
      status_code: 200,
      latency_ms: 78,
      created_at: "2025-01-15T14:30:00Z",
    },
    {
      id: "12",
      api_id: "2",
      status_code: 200,
      latency_ms: 82,
      created_at: "2025-01-15T14:29:00Z",
    },
    {
      id: "13",
      api_id: "2",
      status_code: 200,
      latency_ms: 75,
      created_at: "2025-01-15T14:28:00Z",
    },
    {
      id: "14",
      api_id: "2",
      status_code: 503,
      latency_ms: 5000,
      created_at: "2025-01-15T14:27:00Z",
    },
    {
      id: "15",
      api_id: "2",
      status_code: 503,
      latency_ms: 5000,
      created_at: "2025-01-15T14:26:00Z",
    },
    {
      id: "16",
      api_id: "2",
      status_code: 200,
      latency_ms: 79,
      created_at: "2025-01-15T14:25:00Z",
    },
    {
      id: "17",
      api_id: "2",
      status_code: 200,
      latency_ms: 81,
      created_at: "2025-01-15T14:24:00Z",
    },
    {
      id: "18",
      api_id: "2",
      status_code: 200,
      latency_ms: 77,
      created_at: "2025-01-15T14:23:00Z",
    },
    {
      id: "19",
      api_id: "2",
      status_code: 200,
      latency_ms: 80,
      created_at: "2025-01-15T14:22:00Z",
    },
    {
      id: "20",
      api_id: "2",
      status_code: 200,
      latency_ms: 76,
      created_at: "2025-01-15T14:21:00Z",
    },

    // Email Service logs
    {
      id: "21",
      api_id: "3",
      status_code: 200,
      latency_ms: 32,
      created_at: "2025-01-15T14:30:00Z",
    },
    {
      id: "22",
      api_id: "3",
      status_code: 200,
      latency_ms: 35,
      created_at: "2025-01-15T14:29:00Z",
    },
    {
      id: "23",
      api_id: "3",
      status_code: 200,
      latency_ms: 30,
      created_at: "2025-01-15T14:28:00Z",
    },
    {
      id: "24",
      api_id: "3",
      status_code: 200,
      latency_ms: 33,
      created_at: "2025-01-15T14:27:00Z",
    },
    {
      id: "25",
      api_id: "3",
      status_code: 200,
      latency_ms: 31,
      created_at: "2025-01-15T14:26:00Z",
    },
    {
      id: "26",
      api_id: "3",
      status_code: 200,
      latency_ms: 34,
      created_at: "2025-01-15T14:25:00Z",
    },
    {
      id: "27",
      api_id: "3",
      status_code: 200,
      latency_ms: 29,
      created_at: "2025-01-15T14:24:00Z",
    },
    {
      id: "28",
      api_id: "3",
      status_code: 200,
      latency_ms: 36,
      created_at: "2025-01-15T14:23:00Z",
    },
    {
      id: "29",
      api_id: "3",
      status_code: 200,
      latency_ms: 32,
      created_at: "2025-01-15T14:22:00Z",
    },
    {
      id: "30",
      api_id: "3",
      status_code: 200,
      latency_ms: 30,
      created_at: "2025-01-15T14:21:00Z",
    },
  ]);

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
  const addApi = (api) => {
    const newApi = {
      id: Date.now().toString(),
      ...api,
      uuid: generateUUID(),
      created_at: new Date().toISOString(),
    };
    apis.value.push(newApi);
    return newApi;
  };

  const updateApi = (id, updates) => {
    const index = apis.value.findIndex((api) => api.id === id);
    if (index !== -1) {
      apis.value[index] = { ...apis.value[index], ...updates };
    }
  };

  const deleteApi = (id) => {
    apis.value = apis.value.filter((api) => api.id !== id);
    if (selectedApiId.value === id) {
      selectedApiId.value = null;
    }
  };

  const selectApi = (id) => {
    selectedApiId.value = id;
  };

  const addLog = (log) => {
    logs.value.push({
      id: Date.now().toString(),
      ...log,
      created_at: new Date().toISOString(),
    });
  };

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

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
    addApi,
    updateApi,
    deleteApi,
    selectApi,
    addLog,
  };
});
