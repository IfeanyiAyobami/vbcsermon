import {createClient} from "@supabase/supabase-js";

// Public, read-only client — safe for Server Components since RLS only allows
// public SELECT on these tables (writes require an authenticated admin session).
export const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
