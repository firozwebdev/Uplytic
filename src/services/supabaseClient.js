import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co"; // TODO: Replace with your Supabase project URL
const supabaseAnonKey = "YOUR_ANON_KEY"; // TODO: Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
