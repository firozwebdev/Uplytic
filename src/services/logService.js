import { supabase } from "./supabaseClient";

// Fetch logs for an API or all logs if no api_id is provided
export async function fetchLogs(api_id) {
  let query = supabase.from("logs").select("*").order("created_at", { ascending: false });
  if (api_id) {
    query = query.eq("api_id", api_id).limit(10);
  } else {
    query = query.limit(500); // Fetch more logs for all APIs
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Add log entry
export async function addLog(log) {
  const { data, error } = await supabase.from("logs").insert([log]).select();
  if (error) throw error;
  return data[0];
}
