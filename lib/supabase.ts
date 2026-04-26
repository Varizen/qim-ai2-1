import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function getUserUsage(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("usage")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) return null;
  return data;
}

export async function logUsage(userId: string, action: string, tokens: number) {
  if (!supabase) return;
  await supabase.from("usage").upsert({
    user_id: userId,
    action,
    tokens,
    created_at: new Date().toISOString(),
  });
}
