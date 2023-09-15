import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!
);
