import { useApiStore } from '../stores/api';
import { supabase } from './supabaseClient';
import { alertService } from './alertService';

let pollingInterval = null;
const corsProxy = 'https://corsproxy.io/?'; // For development/demo only

// Helper to measure latency
async function pollApi(api) {
  const start = performance.now();
  let status_code = 0;
  let errorMsg = null;
  try {
    const response = await fetch(corsProxy + api.url, { method: 'GET' });
    status_code = response.status;
  } catch (e) {
    status_code = 0; // 0 for network error
    errorMsg = e.message || 'Unknown error';
    console.error(`Polling error for API (${api.name} - ${api.url}):`, errorMsg);
  }
  const latency_ms = Math.round(performance.now() - start);
  return { status_code, latency_ms, errorMsg };
}

export function startPollingApis() {
  if (pollingInterval) return; // Prevent multiple intervals
  const apiStore = useApiStore();
  pollingInterval = setInterval(async () => {
    const apis = apiStore.apis;
    for (const api of apis) {
      if (!api.url || !api.id) {
        console.warn('Skipping API with missing url or id:', api);
        continue;
      }
      const { status_code, latency_ms, errorMsg } = await pollApi(api);
      if (errorMsg) {
        // Optionally, you could log this error to a separate error log table
        continue; // Skip logging to Supabase for failed requests
      }
      try {
        await supabase.from('logs').insert([
          {
            api_id: api.id,
            status_code,
            latency_ms,
            created_at: new Date().toISOString(),
          },
        ]);

        // Check for alerts after logging
        const apiLogs = await supabase
          .from('logs')
          .select('*')
          .eq('api_id', api.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (apiLogs.data) {
          const alerts = await alertService.checkAlerts(api, apiLogs.data);
          if (alerts.length > 0) {
            await alertService.saveAlerts(alerts);
          }
        }
      } catch (dbErr) {
        console.error(`Failed to log polling result for API (${api.name}):`, dbErr.message || dbErr);
      }
    }
  }, 60000); // 60 seconds
}

export function stopPollingApis() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
} 