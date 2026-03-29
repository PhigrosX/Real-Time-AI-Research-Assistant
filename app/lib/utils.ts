import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl)
    return { client: null, message: "Missing SUPABASE_URL in environment" };
  if (!supabaseKey)
    return { client: null, message: "Missing SUPABASE_KEY in environment" };

  const supabase = createClient(supabaseUrl, supabaseKey);
  if (!supabase)
    return { client: null, message: "Error in initializing supabase client" };

  return {
    client: supabase,
    message: "successful in initializing supabase client",
  };
}
