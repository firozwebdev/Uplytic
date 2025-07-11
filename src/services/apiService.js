import { supabase } from "./supabaseClient";

// Fetch all APIs
export async function fetchApis() {
  const { data, error } = await supabase.from("apis").select("*");
  if (error) throw error;
  return data;
}

// Add new API
export async function addApi(api) {
  const { data, error } = await supabase.from("apis").insert([api]).select();
  if (error) throw error;
  return data[0];
}

// Update API
export async function updateApi(id, updates) {
  const { data, error } = await supabase
    .from("apis")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
}

// Delete API
export async function deleteApi(id) {
  const { error } = await supabase.from("apis").delete().eq("id", id);
  if (error) throw error;
}
