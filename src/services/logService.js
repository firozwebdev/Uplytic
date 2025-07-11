import { supabase } from "./supabaseClient";

// Fetch logs for an API
export async function fetchLogs(api_id) {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("api_id", api_id)
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
}

// Add log entry
export async function addLog(log) {
  const { data, error } = await supabase.from("logs").insert([log]).select();
  if (error) throw error;
  return data[0];
}
